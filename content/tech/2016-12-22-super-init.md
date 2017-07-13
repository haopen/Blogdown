---
title: Python 类中 super() 和 __init__() 的区别 z
date: 2016-12-22
categories: ["4-Python"]
tags: ["4-Python", "4-Class", "4-类"]
slug: super-init
---

**原文地址**：<https://my.oschina.net/jhao104/blog/682322>

# 单继承时 `super()` 和 `__init__()` 实现的功能是类似的

```python
class Base(object):
    def __init__(self):
        print 'Base create'

class childA(Base):
    def __init__(self):
        print 'creat A ',
        Base.__init__(self)

class childB(Base):
    def __init__(self):
        print 'creat B ',
        super(childB, self).__init__()

base = Base()

a = childA()
b = childB()
```

输出结果：

```python
Base create
creat A  Base create
creat B  Base create
```

<!-- more -->

使用`super()`继承时不用显式引用基类。

# `super()` 只能用于新式类中

把基类改为旧式类，即不继承任何基类

```python
class Base():
    def __init__(self):
        print 'Base create'
```

执行时，在初始化`b`时就会报错：

```python
    super(childB, self).__init__()
TypeError: must be type, not classobj
```

# super 不是父类，而是继承顺序的下一个类

在多重继承时会涉及继承顺序，`super()`相当于返回继承顺序的下一个类，而不是父类，类似于这样的功能：

```python
def super(class_name, self):
    mro = self.__class__.mro()
    return mro[mro.index(class_name) + 1]
```

`mro()`用来获得类的继承顺序。例如：

```python
class Base(object):
    def __init__(self):
        print 'Base create'

class childA(Base):
    def __init__(self):
        print 'enter A '
        # Base.__init__(self)
        super(childA, self).__init__()
        print 'leave A'

class childB(Base):
    def __init__(self):
        print 'enter B '
        # Base.__init__(self)
        super(childB, self).__init__()
        print 'leave B'

class childC(childA, childB):
    pass

c = childC()
print c.__class__.__mro__
```

输出结果如下：

```python
enter A 
enter B 
Base create
leave B
leave A
(<class '__main__.childC'>, <class '__main__.childA'>, <class '__main__.childB'>, <class '__main__.Base'>, <type 'object'>)
```

`super`和父类没有关联，因此执行顺序是`A —> B—>—>Base`

执行过程相当于：初始化`childC()`时，先会去调用`childA`的构造方法中的`super(childA, self).__init__()`，`super(childA, self)`返回当前类的继承顺序中`childA`后的一个类`childB`；然后再执行`childB().__init()__`，这样顺序执行下去。

在多重继承里，如果把`childA()`中的`super(childA, self).__init__()`换成`Base.__init__(self)`，在执行时，继承`childA`后就会直接跳到`Base`类里，而略过了`childB`：

```python
enter A 
Base create
leave A
(<class '__main__.childC'>, <class '__main__.childA'>, <class '__main__.childB'>, <class '__main__.Base'>, <type 'object'>)
```

从`super()`方法可以看出，`super()`的第一个参数可以是继承链中任意一个类的名字，

- 如果是本身就会依次继承下一个类；如果是继承链里之前的类便会无限递归下去^[不理解什么是**继承链里之前的类**。]；
- 如果是继承链里之后的类便会忽略继承链汇总本身和传入类之间的类；

比如将`childA()`中的`super`改为：`super(childC, self).__init__()`，程序就会无限递归下去。如：

```
  File "C:/Users/Administrator/Desktop/crawler/learn.py", line 10, in __init__
    super(childC, self).__init__()
  File "C:/Users/Administrator/Desktop/crawler/learn.py", line 10, in __init__
    super(childC, self).__init__()
  File "C:/Users/Administrator/Desktop/crawler/learn.py", line 10, in __init__
    super(childC, self).__init__()
  File "C:/Users/Administrator/Desktop/crawler/learn.py", line 10, in __init__
    super(childC, self).__init__()
  File "C:/Users/Administrator/Desktop/crawler/learn.py", line 10, in __init__
    super(childC, self).__init__()
```

# `super()`可以避免重复调用

如果`childA`继承`Base`，`childB`继承`childA`和`Base`，如果`childB`需要调用`Base`的`__init__()`方法时，就会导致`__init__()`被执行两次：

```python
enter A 
Base create
leave A
Base create
```

使用`super()`时可避免重复调用

```python
class Base(object):
    def __init__(self):
        print 'Base create'

class childA(Base):
    def __init__(self):
        print 'enter A '
        super(childA, self).__init__()
        print 'leave A'

class childB(childA, Base):
    def __init__(self):
        super(childB, self).__init__()

b = childB()
print b.__class__.mro()
```

```python
enter A 
Base create
leave A
[<class '__main__.childB'>, <class '__main__.childA'>, <class '__main__.Base'>, <type 'object'>]
```