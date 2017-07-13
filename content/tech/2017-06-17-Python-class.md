---
title: 《廖雪峰 Python 教程》笔记 4：面向对象编程1
date: 2017-06-17
categories: ["4-Python"]
tags: ["4-Python", "4-Class", "4-类"]
slug: python-class
---

**原文地址**：

<http://www.liaoxuefeng.com/wiki/0014316089557264a6b348958f449949df42a6d3a2e542c000/0014318645694388f1f10473d7f416e9291616be8367ab5000>

面向对象的设计思想是从自然界中来的，因为在自然界中，类（Class）和实例（Instance）的概念是很自然的。Class 是一种抽象概念，比如我们定义的 Class——Student，是指学生这个概念，而实例（Instance）则是一个个具体的 Student，比如，Bart Simpson 和Lisa Simpson 是两个具体的 Student。所以，面向对象的设计思想是抽象出 Class，根据 Class 创建 Instance。

<!-- more -->

面向对象的抽象程度又比函数要高，因为一个 Class 既包含数据，又包含操作数据的方法。

# 简单示例

## 面向函数
```python
std1 = { 'name': 'Michael', 'score': 98 }
std2 = { 'name': 'Bob', 'score': 81 }

def print_score(std):
    print('%s: %s' % (std['name'], std['score']))
```

## 面向对象

```python
class Student(object):

    def __init__(self, name, score):
        self.name = name
        self.score = score

    def print_score(self):
        print('%s: %s' % (self.name, self.score))

bart = Student('Bart Simpson', 59)
lisa = Student('Lisa Simpson', 87)
bart.print_score()
lisa.print_score()
```

# 类和实例

一般模块文件名称小写，类的名称首字母大写，在新式类的定义中，需要明确指定是继承自哪个父类。

```python
class Student(object):
    pass

>>> bart = Student()
>>> bart
<__main__.Student object at 0x10a67a590>
>>> Student
<class '__main__.Student'>
```

类的实例——对象可以自由添加新的属性^[类在一定条件下也可以实时添加新的属性，具体方法参考高级部分内容。]：

```python
>>> bart.name = 'Bart Simpson'
>>> bart.name
'Bart Simpson'
```

## \_\_init\_\_()

类可以起到模板的作用，因此，可以在初始化实例的时候^[教程中说的是创建实例的时候，实际上创建与`__new__()`对应，要早于`__init__()`。]，把一些我们认为必须绑定的属性强制填写进去。通过定义一个特殊的`__init__()`方法，在初始化实例的时候，就把`name`，`score`等属性绑上去：

```python
class Student(object):

    def __init__(self, name, score):
        self.name = name
        self.score = score
```

> **总结**：`__init__()`方法的第一个参数永远是`self`，表示创建的实例本身，因此，在`__init__()`方法内部，就可以把各种属性绑定到`self`，因为`self`就指向创建的实例本身。有了`__init__()`方法，在创建实例的时候，就不能~~`传入空的参数`~~了，必须传入与`__init__()`方法匹配的参数，但`self`不需要传，Python 解释器自己会把实例变量传进去：

```python
>>> bart = Student('Bart Simpson', 59)
>>> bart.name
'Bart Simpson'
>>> bart.score
59
```

和普通的函数相比，在类中定义的函数只有一点不同，就是第一个参数永远是实例变量`self`，并且，调用时，不用传递该参数。除此之外，类的方法和普通函数没有什么区别，所以，你仍然可以用默认参数、可变参数、关键字参数和命名关键字参数。

## 访问限制

> **总结**：
>
- `__name`式的成员是私有成员，不能外部访问，当然，也可以用`._Class__name`的方式强制访问；
- `_name`式的成员可以外部访问，但习惯上认为没应该从外部访问；
- `__name__`式的可以外部访问，但一般有特殊含义，不建议自己定义的成员使用；
- 私有成员考虑实现`get(), set()`方法来进行访问，这样可以增加访问限制，从而避免无效参数设定；
- 不要给类实例增加`__name`这样的属性，这个名称与实际上内部私有成员的属性名`._Class__name`并不相同。

### 公有、私有成员

如果要让内部属性不被外部访问，可以把属性的名称前加上两个下划线`__`，在 Python 中，实例的变量名如果以`__`开头，就变成了一个私有变量（private），只有内部可以访问，外部不能访问，所以，我们把`Student`类改一改：

```python
class Student(object):

    def __init__(self, name, score):
        self.__name = name
        self.__score = score

    def print_score(self):
        print('%s: %s' % (self.__name, self.__score))
```

改完后，对于外部代码来说，没什么变动，但是已经无法从外部访问实例变量`.__name`和实例变量`.__score`了：

```python
>>> bart = Student('Bart Simpson', 98)
>>> bart.__name
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'Student' object has no attribute '__name'
```

这样就确保了外部代码不能随意修改对象内部的状态，这样通过访问限制的保护，代码更加健壮。

### get(), set()

但是如果外部代码要获取`name`和`score`怎么办？可以给`Student`类增加`get_name()`和`get_score()`这样的方法^[和后面的`getattr()`、`setattr()`不同，那里的两个方法是 Python 实现的适用于全体类的通用方法。]：

```python
class Student(object):
    ...

    def get_name(self):
        return self.__name

    def get_score(self):
        return self.__score
```

如果又要允许外部代码修改`score`怎么办？可以再给`Student`类增加`set_score()`方法：

```python
class Student(object):
    ...

    def set_score(self, score):
        self.__score = score
```

你也许会问，原先那种直接通过`bart.score = 59`也可以修改啊，为什么要定义一个方法大费周折？因为在方法中，可以对参数做检查，避免传入无效的参数：

```python
class Student(object):
    ...

    def set_score(self, score):
        if 0 <= score <= 100:
            self.__score = score
        else:
            raise ValueError('bad score')
```

### 强行访问

需要注意的是，在 Python 中，变量名类似`__xxx__`的，也就是以双下划线开头，并且以双下划线结尾的，是特殊变量，特殊变量是可以直接访问的，不是 private 变量，所以，不能用`__name__()`、`__score__()`这样的变量名。

有些时候，你会看到以一个下划线开头的实例变量名，比如`_name`，这样的实例变量外部是可以访问的，但是，按照约定俗成的规定，当你看到这样的变量时，意思就是，“虽然我可以被访问，但是，请把我视为私有变量，不要随意访问”。

双下划线开头的实例变量是不是一定不能从外部访问呢？其实也不是。不能直接访问`__name`是因为 Python 解释器对外把`__name`变量改成了`_Student__name`，所以，仍然可以通过`_Student__name`来访问`__name`变量：

```python
>>> bart._Student__name
'Bart Simpson'
```

但是强烈建议你不要这么干，因为不同版本的 Python 解释器可能会把`__name`改成不同的变量名。总的来说就是，Python 本身没有任何机制阻止你干坏事，一切全靠自觉。

最后注意下面的这种错误写法：

```python
>>> bart = Student('Bart Simpson', 98)
>>> bart.get_name()
'Bart Simpson'
>>> bart.__name = 'New Name' # 设置__name变量！
>>> bart.__name
'New Name'
```

表面上看，外部代码“成功”地设置了`__name`变量，但实际上这个`__name`变量和 class 内部的`__name`变量不是一个变量！内部的`__name`变量已经被 Python 解释器自动改成了`_Student__name`，而外部代码给`bart`新增了一个`__name`变量。不信试试：

```python
>>> bart.get_name()         # get_name()内部返回self.__name
'Bart Simpson'
```

## 继承和多态

**继承**有什么好处？最大的好处是子类获得了父类的全部功能。由于`Animial`实现了`run()`方法，因此，`Dog`和`Cat`作为它的子类，什么事也没干，就自动拥有了`run()`方法。

当子类和父类都存在相同的`run()`方法时，我们说，子类的`run()`覆盖了父类的`run()`，在代码运行的时候，总是会调用子类的`run()`。这样，我们就获得了继承的另一个好处：**多态**。

对于下面的函数：

```python
def run_twice(animal):
    animal.run()
    animal.run()
```

新增一个`Animal`的子类，不必对`run_twice()`做任何修改，实际上，任何依赖`Animal`作为参数的函数或者方法都可以不加修改地正常运行，原因就在于多态。

多态的好处就是，当我们需要传入`Dog`、`Cat`、`Tortoise`……时，我们只需要接收`Animal`类型就可以了，因为`Dog`、`Cat`、`Tortoise`……都是`Animal`类型，然后，按照`Animal`类型进行操作即可。由于`Animal`类型有`run()`方法，因此，传入的任意类型，只要是`Animal`类或者子类，就会自动调用实际类型的`run()`方法，这就是多态的意思：

> 对于一个变量，我们只需要知道它是`Animal`类型，无需确切地知道它的子类型，就可以放心地调用`run()`方法，而具体调用的`run()`方法是作用在`Animal`、`Dog`、`Cat`还是`Tortoise`对象上，由运行时该对象的确切类型决定，这就是多态真正的威力：调用方只管调用，不管细节，而当我们新增一种`Animal`的子类时，只要确保`run()`方法编写正确，不用管原来的代码是如何调用的。这就是著名的“开闭”原则：

- 对扩展开放：允许新增`Animal`子类；
- 对修改封闭：不需要修改依赖`Animal`类型的`run_twice()`等函数。

## 静态语言 vs 动态语言

对于静态语言（例如 Java）来说，如果需要传入`Animal`类型，则传入的对象必须是`Animal`类型或者它的子类，否则，将无法调用`run()`方法。

对于 Python 这样的动态语言来说，则不一定需要传入`Animal`类型。我们只需要保证传入的对象有一个`run()`方法就可以了：

```python
class Timer(object):
    def run(self):
        print('Start...')
```

这就是动态语言的**鸭子类型**，它并不要求严格的继承体系，一个对象只要`看起来像鸭子，走起路来像鸭子`，那它就可以被看做是鸭子。

Python 的`file-like object`就是一种鸭子类型。对真正的文件对象，它有一个`read()`方法，返回其内容。但是，许多对象，只要有`read()`方法，都被视为`file-like object`。许多函数接收的参数就是`file-like object`，你不一定要传入真正的文件对象，完全可以传入任何实现了`read()`方法的对象。

## 获取对象信息

### type() - 判断对象类型

```python
>>> type(123)==type(456)
True
>>> type(123)==int
True
>>> type('abc')==type('123')
True
>>> type('abc')==str
True
>>> type('abc')==type(123)
False

>>> import types
>>> def fn():
...     pass
...
>>> type(fn)==types.FunctionType
True
>>> type(abs)==types.BuiltinFunctionType
True
>>> type(lambda x: x)==types.LambdaType
True
>>> type((x for x in range(10)))==types.GeneratorType
True
```

### isinstance() - 有继承关系时比 type() 好用

```python
>>> isinstance(h, Husky)
True

>>> isinstance(h, Dog)
True

>>> isinstance(d, Dog) and isinstance(d, Animal)
True

>>> isinstance(d, Husky)
False
```

能用`type()`判断的基本类型也可以用`isinstance()`判断：

```python
>>> isinstance('a', str)
True
>>> isinstance(123, int)
True
>>> isinstance(b'a', bytes)
True
```

并且还可以判断一个变量是否是某些类型中的一种，比如下面的代码就可以判断是否是`list`或者`tuple`：

```python
>>> isinstance([1, 2, 3], (list, tuple))
True
>>> isinstance((1, 2, 3), (list, tuple))
True
```

### dir() - 获得对象的所有属性和方法

```python
dir('ABC')
```

类似`__xxx__`的属性和方法在 Python 中都是有特殊用途的，剩下的都是普通属性或方法。

### getattr()、setattr()、hasattr()

注意这里的`getattr()`和`setattr()`与前面的`get_name()`和`set_name()`不同，这里的两个方法是针对全体类的一个通过实现，而前面的两个方法是程序作者根据需要自己定义的方法，作者通常会在其中添加自己的更多额外工作，如数据有效验证等。

```python
>>> hasattr(obj, 'x') # 有属性'x'吗？
True
>>> obj.x
9
>>> hasattr(obj, 'y') # 有属性'y'吗？
False
>>> setattr(obj, 'y', 19) # 设置一个属性'y'
>>> hasattr(obj, 'y') # 有属性'y'吗？
True
>>> getattr(obj, 'y') # 获取属性'y'
19
>>> obj.y # 获取属性'y'
19
```

如果试图获取不存在的属性，会抛出`AttributeError`的错误：

```
>>> getattr(obj, 'z') # 获取属性'z'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
AttributeError: 'MyObject' object has no attribute 'z'
```

可以传入一个`default`参数，如果属性不存在，就返回默认值：

```python
>>> getattr(obj, 'z', 404) # 获取属性'z'，如果不存在，返回默认值404
404
```

也可以获得对象的方法：

```python
>>> hasattr(obj, 'power') # 有属性'power'吗？
True
>>> getattr(obj, 'power') # 获取属性'power'
<bound method MyObject.power of <__main__.MyObject object at 0x10077a6a0>>
>>> fn = getattr(obj, 'power') # 获取属性'power'并赋值到变量fn
>>> fn # fn指向obj.power
<bound method MyObject.power of <__main__.MyObject object at 0x10077a6a0>>
>>> fn() # 调用fn()与调用obj.power()是一样的
81
```

### 小结

通过内置的一系列函数，我们可以对任意一个 Python 对象进行剖析，拿到其内部的数据。要注意的是，只有在不知道对象信息的时候，我们才会去获取对象信息。如果可以直接写：

```python
sum = obj.x + obj.y
```

就不要写：

```python
sum = getattr(obj, 'x') + getattr(obj, 'y')
```

一个正确的用法的例子如下：

```python
def readImage(fp):
    if hasattr(fp, 'read'):
        return readData(fp)
    return None
```

假设我们希望从文件流`fp`中读取图像，我们首先要判断该`fp`对象是否存在`read()`方法，如果存在，则该对象是一个流，如果不存在，则无法读取。`hasattr()`就派上了用场。

请注意，在 Python 这类动态语言中，根据鸭子类型，有`read()`方法，不代表该`fp`对象就是一个~~`文件流`~~，它也可能是`网络流`，也可能是内存中的一个`字节流`，但只要`read()`方法返回的是有效的图像数据，就不影响读取图像的功能。

## 实例属性和类属性

由于 Python 是动态语言，根据类创建的实例可以任意绑定属性，但这个属性只与实例有关，与类无关。我们定义了一个类属性后，这个属性虽然归类所有，但类的所有实例都可以访问到。编写程序的时候，千万不要把实例属性和类属性使用相同的名字，因为相同名称的实例属性将屏蔽掉类属性，但是删除实例属性后，再使用相同的名称，访问到的将是类属性。