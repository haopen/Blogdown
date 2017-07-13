---
title: 如何理解 Python 装饰器？z
date: 2016-12-13
categories: ["4-Python"]
tags: ["4-Python", "4-decorator", "4-装饰器"]
slug: decorator
show_toc: true
---

**原文地址**：<https://www.zhihu.com/question/26930016>

# 李冬：原理

> **Attention**：为了解释得通俗易懂，所以很多概念没有描述的很准确，很多只是“意思意思”，所以大家重在意会哈。如果各位知友有更好的解释和讲解的方法，还请在评论区不吝赐教。

学习 Python 有一段时间了，对于装饰器的理解又多了一些，现在我重新再写一次对于装饰器的理解。在讲之前我需要先铺垫一下基础知识，如果你已经掌握了就请跳过。

------

## 基础知识

### 万物皆对象

在 Python 中，不管什么东西都是对象。对象是什么东西呢？对象就是你可以用来随意使用的模型。当你需要的时候就拿一个，不需要就让它放在那，垃圾回收机制会自动将你抛弃掉的对象回收。可能对这个理解有一点云里雾里的感觉，甚至还觉得对这个概念很陌生。其实如果你都学到装饰器这里了，你已经使用过不少对象啦。比如，我写了一个函数：

```python
def cal(x, y):
    result = x + y
    return result
```

这时，你可以说，你创造了一个叫做`cal()`的函数对象。然后，你这样使用了它：

```python
cal(1,2)
```

或者，你这样使用了它：

```python
calculate = cal
calculate(1，2)
```

- 在第一种方式下，你直接使用了`cal`这个函数对象；
- 在第二种方式下，你把一个名为`calculate`的变量指向了`cal`这个函数对象。如果各位对类的使用很熟悉的话，可以把这个过程看作**实例化**。

也就是说，对象，就像是一个模子，当你需要的时候，就用它倒一个模型出来，每一个模型可以有自己不同的名字。在上面的例子中，`calculate`是一个模型，而你写的`cal()`函数就是一个模子。

### 理解函数带括号和不带括号时分别代表什么意思
在上一个例子中，如果你只是写一个`cal`（也就是没有括号），那么此时的`cal`仅仅是代表一个函数**对象**；当你这样写`cal(1, 2)`时，就是在告诉编译器`执行 cal 这个函数`。

### 理解带星号的参数是什么意思

这个属于函数基础，要是你还没有听说过，那么就该回去好好[复习](/2017/06/13/Python/)一下了。具体讲解我就略过了。

------

## 装饰器

### 装饰器是什么

装饰器，顾名思义，就是用来“装饰”的。它长这个样：

```python
@xxx
```

其中`xxx`是你的装饰器的名字。它能装饰的东西有：`函数`、`类`。

### 为什么需要装饰器

有一句名言说的好（其实是我自己说的）：“每一个轮子都有自己的用处”，所以，每一个装饰器也有自己的用处。装饰器主要用来“偷懒”（轮子亦是如此）。比如：你写了很多个简单的函数，你想知道在运行的时候是哪些函数在执行，并且你又觉得这个没有必要写测试，只是想要很简单的在执行完毕之前给它打印上一句`'Start'`，那该怎么办呢？你可以这样：

```python
def func_name(arg):
    print 'Start func_name'
    sentences
```

这样做没有错，but， 你想过没有，难道你真的就想给每一个函数后面都加上那么一句吗？等你都运行一遍确定没有问题了，再回来一个一个的删掉`print`不觉得麻烦吗？什么？你觉得写一个还是不麻烦的，那你有十个需要添加的函数呢？二十个？三十个？（请自行将次数加到超过你的忍耐阈值）……如果你知道了装饰器，情况就开始渐渐变得好一些了，你知道可以这样写了：

```python
def log(func):
    def wrapper(*arg, **kw):
        print 'Start %s' % func
        return func(*arg, **kw)
    return wrapper
  
@log
def func_a(arg):
    pass

@log
def func_b(arg):
    pass

@log
def func_c(arg):
    pass
```

其中，`log()`函数是装饰器。

把装饰器写好了之后，只需要把需要装饰的函数前面都加上`@log`就可以了。在这个例子中，我们一次性就给三个函数加上了`print`语句。可以看出，装饰器在这里为我们节省了代码量，并且在你的函数不需要装饰的时候直接把`@log`去掉就可以了，只需要用编辑器全局查找然后删除即可，快捷又方便，不需要自己手工的去寻找和删除`print`的语句在哪一行。

### 装饰器原理

在上一段中，或许你已经注意到了`log 函数是装饰器`这句话。没错，装饰器是函数。

接下来，我将带大家探索一下，装饰器是怎么被造出来的，来直观的感受一下装饰器的原理。先回到刚才的那个添加`'Start'`问题。假设你此时还不知道装饰器。将会以Solution的方式呈现。

- **S1**：我有比在函数中直接添加`print`语句更好的解决方案！

```python
def a():
    pass
def b():
    pass
def c():
    pass

def main():
    print 'Start a'
    a()
    print 'Start b'
    b()
    print 'Start c'
    c()
```

感觉这样做好像没什么错，并且还避免了修改原来的函数，如果要手工删改`print`语句的话也更方便了。嗯，有点进步了，很不错。

- **S2**：我觉得刚刚那个代码太丑了，还可以再优化一下！于是你这样写了：

```python
def a():
    pass
def b():
    pass
def c():
    pass

def decorator(func):
    print 'Start %s'% func
    func()

def main():
    decorator(a)
    decorator(b)
    decorator(c)
```

你现在写了一个函数来代替你为每一个函数写上`print`语句，好像又节省了不少时间。你欣喜的喝了一口 coffee，对自己又一次做出了进步感到很满意。嗯，确实是这样。于是你选择出去上了个厕所，把刚刚憋的尿全部都排空（或许还有你敲代码时喝的 coffee）。回来之后，顿时感觉神清气爽！你定了定神，看了看自己刚才的“成果”，似乎又感到有一些不满意了。因为你想到了会出现这样的情况：

```python
def main():
    decorator(a)
    m = decorator(b)
    n = decorator(c) + m
    for i in decorator(d):
        i = i + n
    ......
```

来，就说你看到满篇的 decorator 你晕不晕！大声说出来！

- **S3**：你又想了一个更好的办法。于是你这样写了：

```python
def a():
    pass
def b():
    pass
def c():
    pass

def decorator(func):
    print 'Start %s' % func
    return func

a = decorator(a)
b = decorator(b)
c = decorator(c)

def main():
    a()
    b()
    c()
```

这下总算是把名字给弄回来了，这样就不会晕了。你的嘴角又一次露出了欣慰的笑容（内心 OS：哈哈哈，爷果然很 6！）。于是你的手习惯性的端起在桌上的 coffee，满意的抿了一口。coffee 的香味萦绕在唇齿之间，你满意的看着屏幕上的代码，突然！脑中仿佛划过一道闪电！要是`a`、`b`、`c`三个函数带参数我该怎么办？！你放下 coffee，手托着下巴开始思考了起来，眉头紧锁。像这样写肯定不行：

```python
a = decorator(a(arg))
```

此时的本应该在 decorator 中做为一个参数对象的`a`加上了括号，也就是说，`a`在括号中被执行了！你只是想要`a`以函数对象的形式存在，乖乖的跑到 decorator 中当参数就好了。执行它并不是你的本意。
那该怎么办呢？你扶了扶眼镜，嘴里开始念念有词“万物皆对象，万物皆对象……”你的额头上开始渐渐的渗出汗珠。突然，你的身后的背景暗了下来，一道光反射在眼镜上！不自觉的说了句“真相はひとつだけ”！

- **S4**（终极）：你飞速的写下如下代码^[复制原始函数的属性参考[《廖雪峰 Python 教程》笔记 2](/2017/06/14/Python/)中的`@functools.wraps`。]。

```python
def a(arg):
    pass
def b(arg):
    pass
def c(arg):
    pass

def decorator(func):
    def wrapper(*arg, **kw)
        print 'Start %s' % func
        return func(*arg, **kw)
    return wrapper

a = decorator(a)
b = decorator(b)
c = decorator(c)

def main():
    a(arg)
    b(arg)
    c(arg)
```

decorator() 函数返回的是`wrapper`，`wrapper`是一个函数对象。而`a = decorator(a)`就相当于是把`a`指向了`wrapper`，由于`wrapper`可以有参数，于是变量`a`也可以有参数了！

终于！你从焦灼中解脱了出来！不过， 有了前几次的经验，你这一次没有笑。你又仔细想了想，能不能将`a = decorator(a)`这个过程给自动化呢？于是你的手又开始在键盘上飞快的敲打，一会儿过后，你终于完成了你的“作品”。你在 Python 中添加了一个语法规则，取名为`@`，曰之**装饰器**。你此时感觉有些累了， 起身打开门， 慢步走出去，深吸一口气，感觉阳光格外新鲜。你的脸上终于露出了一个大大的笑容。


讲到这里，我想大家应该差不多都明白了装饰器的原理。在评论中有知友问到，要是我的装饰器中也有参数该怎么办呢？要是看懂了刚才添加参数的解决方案，也就不觉得难了。再加一层就解决了。

```python
def decorator(arg_of_decorator):
    def log(func):
        def wrapper(*arg, **kw):
            print 'Start %s' % func
            #TODO Add here sentences which use arg_of_decorator 
            return func(*arg, **kw)
       return wrapper
    return log
```

# xlzd：同时支持带参数与不带参数情形

既支持不带参数(如`log()`), 又支持带参数(如`log('text')`)的 decorator：

```python
import functools

def log(argument):
    if not callable(argument):
        def decorator(function):
            @functools.wraps(function)
            def wrapper(*args, **kwargs):
                print 'before function [%s()] run, text: [%s].' % (function.__name__, text)
                rst = function(*args, **kwargs)
                print 'after function [%s()] run, text: [%s].' % (function.__name__, text)
                return rst 
            return wrapper
        return decorator
    def wrapper(*args, **kwargs):
        print 'before function [%s()] run.' % function.__name__
        rst = argument(*args, **kwargs)
        print 'after function [%s()] run.' % function.__name__
        return rst
    return wrapper
```

# zhijun liu：拓展阅读

装饰器本质上是一个 Python 函数，它可以让其他函数在不需要做任何代码变动的前提下增加额外功能，装饰器的返回值也是一个函数对象。它经常用于有切面需求的场景，比如：`插入日志`、`性能测试`、`事务处理`、`缓存`、`权限校验`等场景。装饰器是解决这类问题的绝佳设计，有了装饰器，我们就可以抽离出大量与函数功能本身无关的雷同代码并继续重用。概括的讲，装饰器的作用就是**为已经存在的对象添加额外的功能**。

先来看一个简单例子：

```python
def foo():
    print('i am foo')
```

现在有一个新的需求，希望可以记录下函数的执行日志，于是在代码中添加日志代码：

```python
def foo():
    print('i am foo')
    logging.info("foo is running")
```

`bar()`、`bar2()`也有类似的需求，怎么做？再写一个`logging`在`bar`函数里？这样就造成大量雷同的代码，为了减少重复写代码，我们可以这样做，重新定义一个函数：专门处理日志，日志处理完之后再执行真正的业务代码

```python
def use_logging(func):
    logging.warn("%s is running" % func.__name__)
    func()

def bar():
    print('i am bar')

use_logging(bar)
```

> **提示**：逻辑上不难理解，但是这样的话，我们每次都要将一个函数作为参数传递给`use_logging()`函数。而且这种方式已经破坏了原有的代码逻辑结构，之前执行业务逻辑时，执行运行`bar()`，但是现在不得不改成`use_logging(bar)`。那么有没有更好的方式的呢？当然有，答案就是装饰器。


## 简单装饰器

```python
def use_logging(func):

    def wrapper(*args, **kwargs):
        logging.warn("%s is running" % func.__name__)
        return func(*args, **kwargs)
    return wrapper

def bar():
    print('i am bar')

bar = use_logging(bar)
bar()
```

函数`use_logging()`就是装饰器，它把执行真正业务方法的`func`包裹在函数里面，看起来像`bar`被`use_logging`装饰了。在这个例子中，函数进入和退出时 ，被称为一个**横切面**(Aspect)，这种编程方式被称为面向切面的编程(Aspect-Oriented Programming)。

`@`符号是装饰器的语法糖，在定义函数的时候使用，避免再一次赋值操作

```python
def use_logging(func):

    def wrapper(*args, **kwargs):
        logging.warn("%s is running" % func.__name__)
        return func(*args)
    return wrapper

@use_logging
def foo():
    print("i am foo")

@use_logging
def bar():
    print("i am bar")

bar()
```

如上所示，这样我们就可以省去`bar = use_logging(bar)`这一句了，直接调用`bar()`即可得到想要的结果。如果我们有其他的类似函数，我们可以继续调用装饰器来修饰函数，而不用重复修改函数或者增加新的封装。这样，我们就提高了程序的可重复利用性，并增加了程序的可读性。

装饰器在 Python 使用如此方便都要归因于 Python 的函数能像普通的对象一样能作为参数传递给其他函数，可以被赋值给其他变量，可以作为返回值，可以被定义在另外一个函数内。

## 带参数的装饰器

装饰器还有更大的灵活性，例如带参数的装饰器：在上面的装饰器调用中，比如`@use_logging`，该装饰器唯一的参数就是执行业务的函数。装饰器的语法允许我们在调用时，提供其它参数，比如`@decorator(a)`。这样，就为装饰器的编写和使用提供了更大的灵活性。

```python
def use_logging(level):
    def decorator(func):
        def wrapper(*args, **kwargs):
            if level == "warn":
                logging.warn("%s is running" % func.__name__)
            return func(*args)
        return wrapper

    return decorator

@use_logging(level="warn")
def foo(name='foo'):
    print("i am %s" % name)

foo()
```

上面的`use_logging()`是允许带参数的装饰器。它实际上是对原有装饰器的一个函数封装，并返回一个装饰器。我们可以将它理解为一个`含有参数的闭包`。当我们使用`@use_logging(level="warn")`调用的时候，Python 能够发现这一层的封装，并把参数传递到装饰器的环境中。

## 类装饰器

再来看看类装饰器，相比函数装饰器，类装饰器具有灵活度大、高内聚、封装性等优点。使用类装饰器还可以依靠类内部的`__call__`方法，当使用`@`形式将装饰器附加到函数上时，就会调用此方法。

```python
class Foo(object):
    def __init__(self, func):
    self._func = func

def __call__(self):
    print ('class decorator runing')
    self._func()
    print ('class decorator ending')

@Foo
def bar():
    print ('bar')

bar()
```

## functools.wraps

使用装饰器极大地复用了代码，但是他有一个缺点就是原函数的元信息不见了，比如函数的`docstring`、`__name__`、`参数列表`，先看例子：

```python
# 装饰器
def logged(func):
    def with_logging(*args, **kwargs):
        print func.__name__ + " was called"
        return func(*args, **kwargs)
    return with_logging

# 函数
@logged
def f(x):
   """does some math"""
   return x + x * x
```

该函数完成等价于：

```python
def f(x):
    """does some math"""
    return x + x * x
f = logged(f)
```

不难发现，函数`f()`被`with_logging`取代了，当然它的`docstring`，`__name__`就是变成了`with_logging`函数的信息了。

```python
print f.__name__    # prints 'with_logging'
print f.__doc__     # prints None
```

这个问题就比较严重的，好在我们有`functools.wraps`，`wraps`本身也是一个装饰器，它能把原函数的元信息拷贝到装饰器函数中，这使得装饰器函数也有和原函数一样的元信息了。

```python
from functools import wraps
def logged(func):
    @wraps(func)
    def with_logging(*args, **kwargs):
        print func.__name__ + " was called"
        return func(*args, **kwargs)
    return with_logging

@logged
def f(x):
    """does some math"""
    return x + x * x

print f.__name__  # prints 'f'
print f.__doc__   # prints 'does some math'
```

## 内置装饰器

`@staticmathod`、`@classmethod`、`@property`

## 装饰器的顺序

```python
@a
@b
@c
def f ():
```

等效于

```python
f = a(b(c(f)))
```