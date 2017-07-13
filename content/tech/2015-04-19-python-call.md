---
title: Python 中 __init__ 和 __call__ 的区别 z
date: 2015-04-19
categories: ["4-Python"]
tags: ["4-Python", "4-Class", "4-类"]
slug: python-call
---

**原文地址**：<https://stackoverflow.com/questions/9663562/what-is-difference-between-init-and-call-in-python>

**背景**：廖雪峰的教程中关于 Class 的`__call__()`方法的讲解简略，读过以后无法理解该方法设计的目的，事实上大部分中文站点上的分析对这个方法的交待都不够透彻。

> **结论**：`__init__()`和`__call__()`的区别就在于前者用于创建一个类的实例，而后者使得该实例变得像函数一样 callable，并且这种处理不会影响对象的生命周期，即`__call__()`不影响类的构造和析构过程，只影响介于构造和析构之间的中间过程时对象内部某些成员的具体状态。

- Python 可调用对象`__call__`方法的用法分析：<http://blog.csdn.net/networm3/article/details/8645185>
- Python 2.7 中的`__call__`方法在实际环境中有什么实用的地方？(`cached_property`, `Pipline`)：<https://segmentfault.com/q/1010000006113393?_ea=1020343>

<!-- more -->

# Paolo Maresca \*\*\*\*\*

在 Python 中，函数是一类对象，也就是说，Python 的函数（A）或者方法可以接收某个函数引用（函数名 B-Name）作为参数，并且在 A 的内部可以执行 B。

类的实例——对象可以被当成函数进行处理，即可以作为某个函数或方法的参数，要让对象成为某个函数或方法的参数，就需要为对象对应的类实现一个特定的`__call__()`方法。

`def __call__(self, [args ...])`接受若干参数，现在假定$x$是类$X$的一个实例，那么调用`x.__call__(1, 2)`与调用`x(1,2)`等同，这个实例本身在这里相当于一个函数。

Python 中的`__init__()`实际上就是其它语言中的构造函数（`__del__()`对应于其它语言的析构函数），而`__init__()`和`__call__()`的区别就在于前者用于创建一个类的实例，而后者使得该实例变得像函数一样 callable，并且这种处理不会影响对象的生命周期，即`__call__()`不影响类的构造和析构过程，只影响介于构造和析构之间的中间过程时对象内部某些成员的具体状态。

```python
class Stuff(object):

    def __init__(self, x, y, range):
        super(Stuff, self).__init__()
        self.x = x
        self.y = y
        self.range = range

    def __call__(self, x, y):
        self.x = x
        self.y = y
        print '__call__ with (%d,%d)' % (self.x, self.y)

    def __del__(self):
        del self.x
        del self.y
        del self.range

>>> s = Stuff(1, 2, 3)
>>> s(7, 8)
__call__ with (7,8)
```

# noisy \*\*\*\*

```python
>>> class A:
...      def __init__(self):
...          print "init"
...          
...      def __call__(self):
...          print "call"
... 
>>> 
>>> A()
init
>>> A()()
init
call
```

# Cat Plus Plus \*\*\*\*

下面的代码接收参数并初始化类的某个实例：

```python
class foo:
    def __init__(self, a, b, c):
        # ...

x = foo(1, 2, 3) # __init__
```

下面的代码使得类的实例变得可以像函数一样进行调用或者作为其它函数（方法）的参数：

```python
class foo:
    def __call__(self, a, b, c):
        # ...

x = foo()
x(1, 2, 3) # __call__
```

简言之，初始化类的实例时调用`__init__()`方法，像调用函数一样调用实例时用`__call__()`方法。

# mattkang (先 new，再 init)

这部分的解释比较乱，只有一点是需要注意的，就是：先`__new__()`，而后`__init__()`。

根据 [mattkang](http://blog.csdn.net/handsomekang/article/details/46672251) 的解释，`__new__()`、`__init__()`、`__del__()`、和`__call__()`四者之间的关系比较密切，因此有必要先梳理一下四者的关系。

- `__new__(cls, )`： 对象的**创建**，是一个`静态`方法，第一个参数是`cls`。(想想也是，不可能是~~`self`~~，对象还没创建，哪来的`self`)
- `__init__(self, )`： 对象的**初始化**， 是一个`实例`方法，第一个参数是`self`。
- `__call__()`： 对象 **callable**，注意不是类，是对象。

先有创建，才有初始化。即先`__new__()`，而后`__init__()`。

```python
class Bar(object):
    pass

class Foo(object):
    def __new__(cls, *args, **kwargs):
        return Bar()

print Foo()
<__console__.Bar object at 0x02066F70>
```

可以看到，输出来是一个`Bar`对象。`__new__()`方法在类定义中不是~~`必须`~~写的，如果没定义，默认会调用`object.__new__()`去创建一个对象。如果定义了，就是`override`，可以 custom 创建对象的行为。

聪明的读者可能想到，既然`__new__()`可以 custom 对象的创建，那我在这里做一下手脚，每次创建对象都返回同一个，那不就是**单例模式**了吗？没错，就是这样。可以观摩[飘逸的python - 单例模式乱弹](http://blog.csdn.net/handsomekang/article/details/46672047)。定义单例模式时，因为自定义的`__new__()`重载了父类的`__new__()`，所以要自己显式调用父类的`__new__()`，即`object.__new__(cls, *args, **kwargs)`，或者用`super()`，不然就不是 extend 原来的实例了，而是替换原来的实例。

```python
class Foo(object):  
    def __call__(self):  
        pass  
  
f = Foo()   # 类 Foo 可 call  
f()         # 对象 f 可 call
```

总结，在 Python 中，类的行为就是这样，`__new__()`、`__init__()`、`__call__()`等方法不是必须写的，会默认调用，如果自己定义了，就是 override，可以 custom。既然 override 了，通常也会显式调用进行补偿以达到 extend 的目的。这也是为什么会出现“明明定义`def _init__(self, *args, **kwargs)`，对象怎么不进行初始化”这种看起来诡异的行为。事实上，这里`_init__()`少写了个下划线，因为`__init__()`不是必须写的，所以这里不会报错，而是当做一个新的方法`_init__()`，换言之，Python 根本就不会调用`_init__()`进行类的初始化，而是调用了默认的`__init__()`来完成这个过程。

# Mudit Verma

- 在 Python 中，`__init__()`方法类似于其它语言中的构造函数^[`__del__()`则类似于析构函数。]，该方法在创建对象时由类的`__new__()`方法调用，用于初始化一个实例。
- `__call__()`方法使得类的实例变得`callable`，那什么时候可能会用到呢？考虑如下的场景：已经创建了类的实例——某个对象，现在需要在不销毁的前提下对这个已经创建好的对象进行重新定义，就需要用到`__call()__`方法。

> **不理解**：这里的重定义(redefine)与修改对象的某个属性有什么区别？

