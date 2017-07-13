---
title: 《廖雪峰 Python 教程》笔记 5：面向对象编程2
date: 2017-06-18
categories: ["4-Python"]
tags: ["4-Python", "4-Class", "4-类"]
slug: python-class-2
---

**原文地址**：

<http://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/00143186738532805c392f2cc09446caf3236c34e3f980f000>

**进一步阅读**资料，了解关于 Metaclass 的相关细节：

- [深刻理解Python中的元类(metaclass)](/stylus/2014/08/10/python-class-object/>)；
- [Python 动态创建类z](/stylus/2017/06/18/create-class-dynamic/)；

Python 是动态语言，因此创建了一个`class`的实例后，可以给该实例绑定任何属性和方法。但是，给一个实例绑定的方法，对另一个实例是不起作用的。为了给所有实例都绑定方法，可以给`class`绑定方法，之后该方法所有实例均可调用。

<!-- more -->

# 定制类

## __slots__ - 限制实例可以添加的属性和方法

试图绑定不允许的属性将得到`AttributeError`的错误。但要注意，`__slots__`定义的属性仅对当前类实例起作用，对继承的子类是不起作用的，除非在子类中也定义`__slots__`，这样，子类实例允许定义的属性就是自身的`__slots__`加上父类的`__slots__`。

```python
class Student(object):
    __slots__ = ('name', 'age') # 用tuple定义允许绑定的属性名称
```

## \_\_str\_\_(), \_\_repr\_\_() - 结果看上去更人性化

- `__str__()`：`print()`类的实例时结果看上去更人性化；
- `__repr__()`：直接访问类实例，不`print()`时的结果更人性化。

```python
class Student(object):
    def __init__(self, name):
        self.name = name
    def __str__(self):
        return 'Student object (name=%s)' % self.name
    __repr__ = __str__
```

## \_\_iter\_\_() - 类似 list 或 tuple 那样可以 for... in

```
class Fib(object):
    def __init__(self):
        self.a, self.b = 0, 1 # 初始化两个计数器a，b

    def __iter__(self):
        return self # 实例本身就是迭代对象，故返回自己

    def __next__(self):
        self.a, self.b = self.b, self.a + self.b # 计算下一个值
        if self.a > 100000: # 退出循环的条件
            raise StopIteration()
        return self.a # 返回下一个值
```

## \_\_getitem\_\_() - 更像 list 下标、切片访问

```python
class Fib(object):
    def __getitem__(self, n):
        a, b = 1, 1
        for x in range(n):
            a, b = b, a + b
        return a

>>> f = Fib()
>>> f[0]
1
>>> f[1]
```

### 切片访问

```python
class Fib(object):
    def __getitem__(self, n):
        if isinstance(n, int): # n是索引
            a, b = 1, 1
            for x in range(n):
                a, b = b, a + b
            return a
        if isinstance(n, slice): # n是切片
            start = n.start
            stop = n.stop
            if start is None:
                start = 0
            a, b = 1, 1
            L = []
            for x in range(stop):
                if x >= start:
                    L.append(a)
                a, b = b, a + b
            return L
```

切片的`step`功能，即`f[:10:2]`中的`2`，负数处理等都需要额外的代码实现。所以，要正确实现一个`__getitem__()`还是有很多工作要做的。

此外，如果把对象看成`dict`，`__getitem__()`的参数也可能是一个可以作`key`的`object`，例如`str`。

与之对应的是`__setitem__()`方法，把对象视作`list`或`dict`来对集合赋值。最后，还有一个`__delitem__()`方法，用于删除某个元素。

总之，通过上面的方法，我们自己定义的类表现得和 Python 自带的`list`、`tuple`、`dict`没什么区别，这完全归功于动态语言的“鸭子类型”，不需要强制继承某个接口。

> **理解**：可能直接继承自`list()`，然后将返回值变成一个`list`值的对象可能更容易达到目的。

## \_\_getattr\_\_() - 动态返回一个不存在的属性或函数

注意与`getattr()`函数区分开：`c = getattr(m, 'myclass')`。前者是返回指定类属性的取值，后者是访问不存在的属性时动态返回一个属性或函数。

```python
class Student(object):

    def __init__(self):
        self.name = 'Michael'

    def __getattr__(self, attr):
        if attr=='score':
            return 99

>>> s = Student()
>>> s.name
'Michael'
>>> s.score
99

# 返回函数
class Student(object):

    def __getattr__(self, attr):
        if attr=='age':
            return lambda: 25
只是调用方式要变为：

>>> s.age()     # 注意调用方法
25
```

注意到任意调用如`s.abc`都会返回`None`，这是因为我们定义的`__getattr__()`默认返回就是`None`。要让`class`只响应特定的几个属性，我们就要按照约定，抛出`AttributeError`的错误：

```python
class Student(object):

    def __getattr__(self, attr):
        if attr=='age':
            return lambda: 25
        raise AttributeError('\'Student\' object has no attribute \'%s\'' % attr)
```

**理解**：理解教程中 REST 的关键就在于，一个 URL 对应一个功能接口，所以在链式方式调用某个功能时，利用`__getattr__()`可以动态实现一个特定的 URL 字符串，这样就不必要针对每个功能的 URL 专门定义一个方法或属性，而是动态生成即可。

```python
class Chain(object):

    def __init__(self, path='GET '):
        self._path = path

    def __getattr__(self, path):
        return Chain('%s/%s' % (self._path, path))

    def __call__(self,path):
        return Chain('%s/%s' % (self._path, path))

    def __str__(self):
        return self._path

    __repr__ = __str__


print(Chain().users('lidu').repos)
```

`Chain() -> init`得到`'GET '`，`.user()`没有这个方法，所以走`__getattr__()`，这时，`self._path`是`GET `，`path`是`user`，然后在传给`Chain`时，被连接了起来`GET /user`，然后又调用了`Chain -> init`，这时，`path`为`GET /user`， 因为`Chain()`将生成一个实例，而这个实例后面跟着`('lidu')`，所以将调用`__call__()`，把`lidu`与`_path`连接起来，然后`__call__()`中又调用`Chain()`，继续走`init`, 把`GET /user/lidu`给了`_path`，后面又跟了一个`.repos`，没有这个属性，走`__getatter__()`，就如一开始那样，把`repos`也连接起来了。

最后，外面是一个`print`，里面是一个`Chain`的实例，所以会调用`str`，类中定义`str`返回`_path`，就是上面一连串过程后，生成的字符串：`GET /user/lidu/repos`。

## \_\_call\_\_() - 让实例像函数一样 callable

这部分可以参考[Python 中 \_\_init\_\_ 和 \_\_call\_\_ 的区别z](/stylus/2015/04/19/python-call/)。

一个对象实例可以有自己的属性和方法，当我们调用实例方法时，我们用`instance.method()`来调用。能不能直接在实例本身上调用呢？在 Python 中，答案是肯定的。

任何类，只需要定义一个`__call__()`方法，就可以直接对实例进行调用。请看示例：

```python
class Student(object):
    def __init__(self, name):
        self.name = name

    def __call__(self):
        print('My name is %s.' % self.name)
```

调用方式如下：

```python
>>> s = Student('Michael')
>>> s() # self参数不要传入
My name is Michael.
```

`__call__()`还可以定义参数。对实例进行直接调用就好比对一个函数进行调用一样，所以你完全可以把对象看成函数，把函数看成对象，因为这两者之间本来就没啥根本的区别。

如果你把对象看成函数，那么函数本身其实也可以在运行期动态创建出来，因为类的实例都是运行期创建出来的，这么一来，我们就模糊了对象和函数的界限。

那么，怎么判断一个变量是对象还是函数呢？其实，更多的时候，我们需要判断一个对象是否能被调用，能被调用的对象就是一个 Callable 对象，比如函数和我们上面定义的带有`__call__()`的类实例：

```
>>> callable(Student())
True
>>> callable(max)
True
>>> callable([1, 2, 3])
False
>>> callable(None)
False
>>> callable('str')
False
```

通过`callable()`函数，我们就可以判断一个对象是否是`可调用`对象。

# @property - 方便的 set(), get()

在绑定属性时，如果我们直接把属性暴露出去，虽然写起来很简单，但是，没办法检查参数。为解决这一缺陷，[初级方法中的解决方案](/stylus/2017/06/17/Python-class/)是将属性设定为私有类型，然后提供相应的`set(), get()`方法来访问属性。但是，上面的调用方法又略显复杂，没有直接用属性这么直接简单。有没有既能检查参数，又可以用类似属性这样简单的方式来访问类的变量呢？Python内置的`@property`装饰器就是负责把一个方法变成属性调用的。

```python
class Student(object):

    @property
    def score(self):
        return self._score

    @score.setter
    def score(self, value):
        if not isinstance(value, int):
            raise ValueError('score must be an integer!')
        if value < 0 or value > 100:
            raise ValueError('score must between 0 ~ 100!')
        self._score = value
```

`@property`的实现比较复杂，我们先考察如何使用。

> **用法**：把一个`getter()`方法变成属性，只需要加上`@property`就可以了，此时，`@property`本身又创建了另一个装饰器`@score.setter`，负责把一个`setter()`方法变成属性赋值，于是，我们就拥有一个可控的属性操作：

```python
>>> s = Student()
>>> s.score = 60 # OK，实际转化为s.set_score(60)
>>> s.score # OK，实际转化为s.get_score()
60
>>> s.score = 9999
Traceback (most recent call last):
  ...
ValueError: score must between 0 ~ 100!
```

注意到这个神奇的`@property`，我们在对实例属性操作的时候，就知道该属性很可能不是直接暴露的，而是通过`getter()`和`setter()`方法来实现的。还可以定义只读属性，只定义`getter()方法，不定义`setter()方法就是一个只读属性：

```python
class Student(object):

    @property
    def birth(self):
        return self._birth

    @birth.setter
    def birth(self, value):
        self._birth = value

    @property
    def age(self):
        return 2015 - self._birth
```

# 多重继承, MixIn

通过多重继承，一个子类就可以同时获得多个父类的所有功能。

在设计类的继承关系时，通常，**主线**都是`单一`继承下来的，例如，`Ostrich`继承自`Bird`。但是，如果需要“混入”额外的功能，通过多重继承就可以实现，比如，让`Ostrich`除了继承自`Bird`外，再同时继承`Runnable`。这种设计通常称之为**MixIn**。

为了更好地看出继承关系，我们把`Runnable`和`Flyable`改为`RunnableMixIn`和`FlyableMixIn`。类似的，你还可以定义出肉食动物`CarnivorousMixIn`和植食动物`HerbivoresMixIn`，让某个动物同时拥有好几个`MixIn`：

```python
class Dog(Mammal, RunnableMixIn, CarnivorousMixIn):
    pass
```

MixIn 的目的就是给一个类增加多个功能，这样，在设计类的时候，我们优先考虑通过多重继承来组合多个 MixIn 的功能，而不是设计~~`多层次`~~的复杂的继承关系^[由于 Python 允许使用多重继承，因此，MixIn 就是一种常见的设计。只允许单一继承的语言（如 Java）不能使用 MixIn 的设计。]。

> **理解**：MixIn 本身在语法上和主线上的继承类没有区别，但是在名称上加了`MixIn`以后，可以更清晰的看到继承的主与次？

Python 自带的很多库也使用了 MixIn。举个例子，Python 自带了`TCPServer`和`UDPServer`这两类网络服务，而要同时服务多个用户就必须使用多进程或多线程模型，这两种模型由`ForkingMixIn`和`ThreadingMixIn`提供。通过组合，我们就可以创造出合适的服务来。

比如，编写一个多进程模式的 TCP 服务，定义如下：

```python
class MyTCPServer(TCPServer, ForkingMixIn):
    pass
```

编写一个多线程模式的 UDP 服务，定义如下：

```python
class MyUDPServer(UDPServer, ThreadingMixIn):
    pass
```

如果你打算搞一个更先进的协程模型，可以编写一个`CoroutineMixIn`：

```python
class MyTCPServer(TCPServer, CoroutineMixIn):
    pass
```

这样一来，我们不需要复杂而庞大的继承链，只要选择组合不同的类的功能，就可以快速构造出所需的子类。

# 枚举

Python提供了`Enum`类来实现这个功能：

```python
from enum import Enum

Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
```

这样我们就获得了`Month`类型的枚举类，可以直接使用`Month.Jan`来引用一个常量，或者枚举它的所有成员：

```python
for name, member in Month.__members__.items():
    print(name, '=>', member, ',', member.value)

Jan => Month.Jan , 1
Feb => Month.Feb , 2
Mar => Month.Mar , 3
Apr => Month.Apr , 4
May => Month.May , 5
Jun => Month.Jun , 6
Jul => Month.Jul , 7
Aug => Month.Aug , 8
Sep => Month.Sep , 9
Oct => Month.Oct , 10
Nov => Month.Nov , 11
Dec => Month.Dec , 12
```

`value`属性则是自动赋给成员的`int`常量，默认从`1`开始计数。

如果需要更精确地控制枚举类型，可以从`Enum`派生出自定义类：

```python
from enum import Enum, unique

@unique
class Weekday(Enum):
    Sun = 0 # Sun的value被设定为0
    Mon = 1
    Tue = 2
    Wed = 3
    Thu = 4
    Fri = 5
    Sat = 6
```

`@unique`装饰器可以帮助我们检查保证没有重复值。

访问这些枚举类型可以有若干种方法：

```python
>>> day1 = Weekday.Mon
>>> print(day1)
Weekday.Mon
>>> print(Weekday.Tue)
Weekday.Tue
>>> print(Weekday['Tue'])
Weekday.Tue
>>> print(Weekday.Tue.value)
2
>>> print(day1 == Weekday.Mon)
True
>>> print(day1 == Weekday.Tue)
False
>>> print(Weekday(1))
Weekday.Mon
>>> print(day1 == Weekday(1))
True
>>> Weekday(7)
Traceback (most recent call last):
  ...
ValueError: 7 is not a valid Weekday
>>> for name, member in Weekday.__members__.items():
...     print(name, '=>', member)
...
Sun => Weekday.Sun
Mon => Weekday.Mon
Tue => Weekday.Tue
Wed => Weekday.Wed
Thu => Weekday.Thu
Fri => Weekday.Fri
Sat => Weekday.Sat
```

可见，既可以用成员名称引用枚举常量，又可以直接根据`value`的值获得枚举常量。

# 元类

- `type`类是一切之祖，是 Python 的内建 Metaclass，`type()`函数可以查看类型；
- `type()`函数既可以返回一个对象的类型，又可以创建出新的类型，比如，我们可以通过`type()`函数创建出`Hello`类，而无需通过`class Hello(object)...`的定义：

```python
>>> def fn(self, name='world'): # 先定义函数
...     print('Hello, %s.' % name)
...
>>> Hello = type('Hello', (object,), dict(hello=fn)) # 创建Hello class
>>> h = Hello()
>>> h.hello()
Hello, world.
>>> print(type(Hello))
<class 'type'>
>>> print(type(h))
<class '__main__.Hello'>
```

要创建一个`class`对象，`type()`函数依次传入 3 个参数：

1. `class`的名称；
2. 继承的父类集合，注意 Python 支持多重继承，如果只有一个父类，别忘了`tuple`的单元素写法；
3. `class`的方法名称与函数绑定，这里我们把函数`fn`绑定到方法名`hello`上。

通过`type()`函数创建的类和直接写 class 是完全一样的，因为 Python  解释器遇到 class 定义时，仅仅是扫描一下 class 定义的语法，然后调用`type()`函数创建出`class`。

正常情况下，我们都用`class Xxx...`来定义类，但是，`type()`函数也允许我们动态创建出类来，也就是说，动态语言本身支持运行期动态创建类，这和静态语言有非常大的不同，要在静态语言运行期创建类，必须构造源代码字符串再调用编译器，或者借助一些工具生成字节码实现，本质上都是动态编译，会非常复杂。

> **理解**：教程中关于 Metaclass 的内容不好理解，一是例子本身比较深奥，二是讲解也不到位。但需要注意的是普通的 class 不仅是一个类，而且也是一个 object，这是 Python 的一个非常特殊的概念。而所有 class 的祖先就是 type，但 type 的实现又用了一些特殊的技巧，`class`这个关键词实际上就是告诉 Python 在创建一个 class 的时候，也会创建一个对应的 classObject。
>
> `type`就是 Python 的内建元类，当然了，你也可以创建自己的元类。
>
> 除了一些代码中不能理解的东西外，还不好理解的是为什么 ORM 适合用 Metaclass 来实现，这一部分教程写的非常不够。<https://stackoverflow.com/questions/100003/what-is-a-metaclass-in-python> 的讲解虽然好（[中文版](http://blog.jobbole.com/21351/)），但这一问题仍然感觉不到位。


对于教程中的代码：

```python
# metaclass是类的模板，所以必须从`type`类型派生：
class ListMetaclass(type):
    def __new__(cls, name, bases, attrs):   // cls 是固定写法，new 阶段还没有 self，也就无法用 self 为参数
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)
```

现在难以理解的是这里的`ListMetaclass`中的`name`和`bases`究竟是什么。

## Metaclass

除了使用`type()`动态创建类以外，要控制类的创建行为，还可以使用`Metaclass`。`Metaclass`，直译为元类，简单的解释就是：

- 当我们定义了类以后，就可以根据这个类创建出实例，所以：`先定义类，然后创建实例`。
- 但是如果我们想创建出类呢？那就必须根据`Metaclass`创建出类，所以：`先定义 Metaclass，然后创建类`。
- 连接起来就是：`先定义 Metaclass，就可以创建类，最后创建实例`。

所以，Metaclass允许你创建类或者修改类。换句话说，你可以把类看成是 Metaclass 创建出来的实例，也就是前面总结的，普通的类不仅是一个 class，同时还是一个由 Metaclass 而来的 object，。

Metaclass 是 Python 面向对象里最难理解，也是最难使用的魔术代码。正常情况下，你不会碰到需要使用 Metaclass 的情况，所以，以下内容看不懂也没关系，因为基本上你不会用到。

我们先看一个简单的例子，这个 Metaclass 可以给我们自定义的`MyList`增加一个`add`方法：

定义`ListMetaclass`，按照默认习惯，Metaclass 的类名总是以 Metaclass 结尾，以便清楚地表示这是一个 Metaclass：

```python
# Metaclass 是类的模板，所以必须从`type`类型派生：
class ListMetaclass(type):
    def __new__(cls, name, bases, attrs):
        // new 的时候还没有 object，到 init 时才有，所以不能是 self，只能是 cls
        attrs['add'] = lambda self, value: self.append(value)
        return type.__new__(cls, name, bases, attrs)
```

有了`ListMetaclass`，我们在定义类的时候还要指示使用`ListMetaclass`来定制类，传入关键字参数`metaclass`：

```python
class MyList(list, metaclass=ListMetaclass):
    pass
```

当我们传入关键字参数`metaclass`时，魔术就生效了，它指示 Python 解释器在创建`MyList`时，要通过`ListMetaclass.__new__()`来创建，在此，我们可以修改类的定义，比如，加上新的方法，然后，返回修改后的定义。

`__new__()`方法接收到的参数依次是：

1. 当前准备创建的类的对象；
2. 类的名字；
3. 类继承的父类集合；
4. 类的方法集合。

测试一下`MyList`是否可以调用`add()`方法：

```python
>>> L = MyList()
>>> L.add(1)
>> L
[1]
```

而普通的`list`没有`add()`方法：

```python
>>> L2 = list()
>>> L2.add(1)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'list' object has no attribute 'add'
```

动态修改有什么意义？直接在`MyList`定义中写上`add()`方法不是更简单吗？正常情况下，确实应该直接写，通过 Metaclass 修改纯属变态。但是，总会遇到需要通过 Metaclass 修改类定义的。ORM 就是一个典型的例子。

## Metaclass - ORM 实例

ORM 全称`Object Relational Mapping`，即`对象-关系映射`，就是把关系数据库的一行映射为一个对象^[这里对应`User`。]，也就是一个类`User-Class`对应一个表`User-Table`，这样，写代码更简单，不用直接操作 SQL 语句。

> **不理解**：要编写一个 ORM 框架，所有的类都只能动态定义，因为只有使用者才能根据表的结构定义出对应的类来。

让我们来尝试编写一个 ORM 框架。

编写底层模块的第一步，就是先把调用接口写出来。比如，使用者如果使用这个 ORM 框架，想定义一个`User`类来操作对应的数据库表`User`，我们期待他写出这样的代码：

```python
class User(Model):
    # 定义类的属性到列的映射：
    id = IntegerField('id')
    name = StringField('username')
    email = StringField('email')
    password = StringField('password')
    // 这部分的语法用于指定 User 的属性，但实际上最终被 Metaclass `pop` 了

# 创建一个实例：
u = User(id=12345, name='Michael', email='test@orm.org', password='my-pwd')
    // User 的 __init__() 可以直接用 Model 的 __init()?
# 保存到数据库：
u.save()
```

其中，父类`Model`和属性类型`StringField`、`IntegerField`是由 ORM 框架提供的，剩下的魔术方法比如`save()`全部由`metaclass`自动完成。虽然`metaclass`的编写会比较复杂，但 ORM 的使用者用起来却异常简单。

现在，我们就按上面的接口来实现该 ORM。

首先来定义`Field`类，它负责保存数据库表的字段名和字段类型：

```python
class Field(object):

    def __init__(self, name, column_type):
        self.name = name
        self.column_type = column_type

    def __str__(self):
        return '<%s:%s>' % (self.__class__.__name__, self.name)
```

在`Field`的基础上，进一步定义各种类型的`Field`，比如`StringField`，`IntegerField`等等：

```python
class StringField(Field):

    def __init__(self, name):
        super(StringField, self).__init__(name, 'varchar(100)')

class IntegerField(Field):

    def __init__(self, name):
        super(IntegerField, self).__init__(name, 'bigint')
```

下一步，就是编写最复杂的`ModelMetaclass`了：

```python
class ModelMetaclass(type):

    def __new__(cls, name, bases, attrs):
        # cls 固定；name, bases, attrs 对应为将来准备使用的参数，来自 User，走向新 User
        # 参考《深刻理解Python中的元类(metaclass)》可知是未来的
        if name=='Model':
            return type.__new__(cls, name, bases, attrs)
        print('Found model: %s' % name)
        mappings = dict()
        for k, v in attrs.items():
            if isinstance(v, Field):
                print('Found mapping: %s ==> %s' % (k, v))
                mappings[k] = v
        for k in mappings.keys():
            attrs.pop(k)
        attrs['__mappings__'] = mappings    # 保存属性和列的映射关系
        attrs['__table__'] = name           # 假设表名和类名一致
        return type.__new__(cls, name, bases, attrs)
```
        
以及基类`Model`：

```python
class Model(dict, metaclass=ModelMetaclass):

    def __init__(self, **kw):
        # **kw 在初始化 User 时用到
        super(Model, self).__init__(**kw)

    def __getattr__(self, key):
        try:
            return self[key]
        except KeyError:
            raise AttributeError(r"'Model' object has no attribute '%s'" % key)

    def __setattr__(self, key, value):
        self[key] = value

    def save(self):
        fields = []
        params = []
        args = []
        for k, v in self.__mappings__.items():
            fields.append(v.name)
            params.append('?')
            args.append(getattr(self, k, None))
        sql = 'insert into %s (%s) values (%s)' % (self.__table__, ','.join(fields), ','.join(params))
        print('SQL: %s' % sql)
        print('ARGS: %s' % str(args))
```

当用户定义一个`class User(Model)`时，Python 解释器首先在当前类`User`的定义中查找`metaclass`，如果没有找到，就继续在父类`Model`中查找`metaclass`，找到了，就使用`Model`中定义的`metaclass`的`ModelMetaclass`来创建`User`类，也就是说，`metaclass`可以隐式地继承到子类，但子类自己却感觉不到。

在`ModelMetaclass`中，一共做了几件事情：

1. 排除掉对`Model`类的修改^[这个对应于`if name=='Model'`，但不明白含义。]；
2. 在当前类（比如`User`）中查找定义的类的所有属性，如果找到一个`Field`属性，就把它保存到一个`__mappings__`的`dict`中，同时从类属性中删除该`Field`属性，否则，容易造成运行时错误（实例的属性会遮盖类的同名属性^[没有彻底的理解。]；
3. 把表名保存到`__table__`中，这里简化为表名默认为类名。
4. 在`Model`类中，就可以定义各种操作数据库的方法，比如`save()`，`delete()`，`find()`，`update()`等等。
5. 我们实现了`save()`方法，把一个实例保存到数据库中。因为有表名，属性到字段的映射和属性值的集合，就可以构造出`INSERT`语句。

编写代码试试：

```python
u = User(id=12345, name='Michael', email='test@orm.org', password='my-pwd')
u.save()
```

输出如下：

```
Found model: User
Found mapping: email ==> <StringField:email>
Found mapping: password ==> <StringField:password>
Found mapping: id ==> <IntegerField:uid>
Found mapping: name ==> <StringField:username>
SQL: insert into User (password,email,username,id) values (?,?,?,?)
ARGS: ['my-pwd', 'test@orm.org', 'Michael', 12345]
```

可以看到，`save()`方法已经打印出了可执行的 SQL 语句，以及参数列表，只需要真正连接到数据库，执行该 SQL 语句，就可以完成真正的功能。

不到 100 行代码，我们就通过`metaclass`实现了一个精简的 ORM 框架。