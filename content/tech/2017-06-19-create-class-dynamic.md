---
title: Python 动态创建类 z
date: 2017-06-19
categories: ["4-Python"]
tags: ["4-Python", "4-Class", "4-类"]
slug: create-class-dynamic
show_toc: true
---

# 廖雪峰 Metaclass-ORM 个人理解

1. 默认的类看不出是动态创建的；
2. `eval()`, `getattr` 动态创建对象 - 见下面内容；
3. 区分`__getattr__()`方法与`getattr()`函数；前者是访问不存在的属性时动态返回一个属性或函数，后者是返回指定类属性的取值；

<!-- more -->

------

1. 廖雪峰的 ORM 的例子中中，`Model`里面只有非常抽象的`save()`等方法，在`ModelMetaclass`里面根据`User`中的属性动态创建映射关系，然后再实时返回一个创建好的具体的`User`类；
    1. `Users`中由使用者指定需要映射的具体条目，对于不同的使用者，要映射的条目不相同，比如现在要的是`username, email`，下次的场景就可能是`user, password`；
    2. 即使要映射的条目相同，使用者定义的`Users`的属性名称也可能不同，比如有人是`username`，有人可能是`userid`；
    3. 但我们不希望每次需求不同时，就重新定义一个面向特定需求的类，类中包含需要的各种属性；
2. 分离出来的`Model`负责实现与数据库的交互，但`Model`不清楚究竟要与哪张表交互，有哪些字段；
3. `ModelMetaclass`在 new Users 的时候，就把`Users`中指定好的条目对（本地条目、数据库表的字段）接管过来，保存好`属性-字段`关系，将其作为一部分参数重新传递给`type()`函数重新创建`User`类，也就是在`Users()`创建的时候拦截下来，做了修改之后再按规划创建一个规范的`User`类
4. `User`如果不用`ModelMetaclass`的话，其创建的时候，自身是无法知道接下来会有什么属性和属性名的。
5. 这时`User`继承自`Model`的`Save()`其实在此之前并不知道会有哪些条目，但是经过`ModelMetaclass`之后，就可以从动态生成的`__mappings__`中获知这一点；
6. 现在`User`只管根据需要即时创建好条目对，之后由`ModelMetaclass`创建修改后的类，创建初始化完成后，参数再传递到继承自`Model`的`Save()`方法，最后`Save()`根据收到的参数：对象的具体参数以及具体需要的条目对完成数据库操作。

------

- `User`中只有条目对作为属性；
- `ModelMetaclass`中只有`__new__()`；
- `Model`中包含具体的初始化以及业务逻辑。

# 利用 eval()

**原文地址**：<http://blog.chinaunix.net/uid-608135-id-3774614.htmlz>

某些时候我们需要创建一个对象的时候，要根据运行环境来确定对象的类型，这个时候就需要一种方法来动态的创建对象，也就是说类的名字是不确定的。

```python
def getObj(name):
    return eval(name+'()')
```

# 利用 getattr() 函数 - 未理解


比如

```python
modulename = 'haha' #模块字符串
```
然后：

```python
m = __import__(mymodule)
```

下面方法就可以用 Python 动态创建类。如果要取得模块中的一个属性的话：可以用`getattr()`，比如：

```python
c = getattr(m, 'myclass') 
myobject = c()
```


但是要注意：如果`myclass`并不在`mymodule`的自动导出列表中（`__all__`），则必须显式地导入，例如：

```python
m = __import__('mymodule', globals(), locals(), ['myclass']) 
c = getattr(m, 'myclass') 
myobject = c()
```

简单的可以用`globals()[class_name]()`

```python
def create_obj(cls_name):
    names = cls_name.split(".")
    cls = globals()[names[0]]
    for name in names[1:]:
        cls = getattr(cls, name)

    if isinstance(cls, type):
        return cls()
    else:
        raise Exception("no such class")
```

如果要使用当前模块：

```python
classname = 'blabla';
mod       = sys.modules[__name__];
dynclass  = getattr(mod, classname)
object    = dynclass(params);
```

# 利用 type()

# 利用 Metaclass + return type()

# class in function - 不如 eval 彻底

**代码出处**：<https://stackoverflow.com/questions/100003/what-is-a-metaclass-in-python>

如同 **e-satis** 所说的，这里的方案还不够动态，因为仍然需要自己编写整个类的代码。

```python
>>> def choose_class(name):
…       if name == 'foo':
…           class Foo(object):
…               pass
…           return Foo          # 返回的是类，不是类的实例
…       else:
…           class Bar(object):
…               pass
…           return Bar
…
>>> MyClass = choose_class('foo')
>>> print MyClass               # 函数返回的是类，不是类的实例
<class '__main__'.Foo>
>>> print MyClass()             # 你可以通过这个类创建类实例，也就是对象
<__main__.Foo object at 0x89c6d4c>
```