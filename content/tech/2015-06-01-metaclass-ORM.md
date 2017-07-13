---
title: MetaClass 与 ORM z
date: 2015-06-01
categories: ["4-Python"]
tags: ["4-Python", "4-Class", "4-类", "4-ORM", "4-MetaClass", "4-元类"]
slug: metaclass-orm
---

**原文地址**：<http://blog.csdn.net/langqing12345/article/details/46318503>

# type 与 MetaClass

## type

实例指的是某类的对象，如`husky`是`Dog`类的实例，但`husky`同时也是对象，即单独称呼时叫对象，附属于某类时叫某类的实例。

Python 默认的元类是`type`（缺省元类），就连`object`也是`type`创造出来的类，`type`是一切类型的缺省元类，所以`object`类也是一种`type`；但同时`type`也是`object`的类，构造出的世间万物都是`object`的实例。所以就算声明一个类不继承自`object`，它也依然是`object`的实例，只是不继承自`object`而已，虽然没有从`object`继承它的一些方法，但是从构造器`object. __new__()`中获得了作为一个对象所需要的数据结构和参数。

<!-- more -->

```python
>>> isinstance(object, type)
True
>>> isinstance(type, object)
True



>>> class Ok:
...     pass
...
>>> o=Ok()
>>> isinstance(o, ok)
True
>>> isinstance(Ok, object)
True
>>>
>>>
>>> isinstance(o, object)
True
```

用`type`来`动态创建`类：

```python
>>> def fn(self, name='world'): # 先定义函数
...     print('Hello, %s.' % name)
...
>>> Hello = type('Hello', (object,), dict(hello=fn)) # 创建Hello class
```

使用`type`创建新的类的语法如下：

    class type(name, bases, dict)

return a new type object。

```python
>>> x=type('y', (object,), dict(a=1))
>>> x
<class '__main__.y>
>>> x()
<__main__.y object at 0x021FD210
>>> h=x()
>>> h
<__main__.y object at 0x021FD270
>>> y
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'y' is not defined
>>>
>>> class x_1:
...     pass
...
>>> x_1
<class __main__.x_1 at 0x01D1EA40>
>>> h_1=x_1()
>>> h_1
<__main__.x_1 instance at 0x01D68328
>>>
>>>
>>> class x_1(object):
...     pass
...
>>> x_1
<class '__main__.x_1'>
>>> x_1()
<__main__.x_1 object at 0x021FD1D0>
>>>
```

由上可知，用`type()`和`class`创建类，`type()`中的`y`和`class`中的`x_1`是等同的，都是类名，赋值给`__name__`属性，但是`type()`创建的类却不能用类名`y`来创建实例，只能用`type`的返回值`x`来创建`h = x()`，为了避免混淆，我们最好把类名和`type()`的返回值设置成相同的字符串，如`X=type('X', (object, ), dict(a=1))`。

## MetaClass

参考资料：[深刻理解python中的元类](http://blog.jobbole.com/21351/)（没看）。MetaClass 翻译过来就是元类，什么叫元？元者，源也，根也，本也！所谓元类就是能够创造出其他类的类，即原始类。下面看看怎么用 MetaClass 来动态创建类。

```python

# -*- coding:utf-8 -*-

# metaclass是创建类，所以必须从 'type' 类派生
class ListMetaclass(type):
	def __new__(cls, name, bases, attrs):
		print 'attrs:%s\n' %attrs
		attrs['add'] = lambda self, value: self.append(value)
		print 'cls: %s, \n name: %s, \n bases: %s, \n attrs: %s\n' %(cls, name, bases, attrs)
		print type.__new__(cls, name, bases, attrs)
		return type.__new__(cls, name, bases, attrs)  #用type申请内存空间(并返回用metaclass创建好的MyList对象)

class MyList(list):
	__metaclass__ = ListMetaclass                     #指示使用ListMetaclass来定制类
```

结果：

```
E:\shizhan>python ok5.py
attrs:{'__module__': '__main__', '__metaclass__': <class '__main__.ListMetaclass'>}

cls: <class '__main__.ListMetaclass'>,
name: Mylist,
bases: (<type 'list'>,),
attrs: {'__module__': '__main__', '__metaclass__': <class '__main__.ListMetaclass'>, 'add': <function <lambda> at 0x020401B0>}

<class '__main__.MyList'>
```

值得注意的是，`attrs`是`dict`类型的数据，它存储着 MetaClass 调用者的所有属性和方法，其中属性包括类属性和实例的属性，所以我们可以向用 Metaclass 创建的类中添加方法 ，这实际上就是给`attrs`添加`key - value`值对。给`attrs`赋值时要用`dict`的方式`attrs[ ' ' ] =  ?`。

关于类属性和实例属性：直接在`class`中定义的是类属性：

```python
class Student(object):
    name = 'Student'
```

实例属性必须通过实例来绑定，比如`self.name =  'xxx'`。来测试一下：

```python

>>> # 创建实例s：
>>> s = Student()
>>> # 打印name属性，因为实例并没有name属性，所以会继续查找class的name属性：
>>> print(s.name)
Student
>>> # 这和调用Student.name是一样的：
>>> print(Student.name)
Student
>>> # 给实例绑定name属性：
>>> s.name = 'Michael'
>>> # 由于实例属性优先级比类属性高，因此，它会屏蔽掉类的name属性：
>>> print(s.name)
Michael
>>> # 但是类属性并未消失，用Student.name仍然可以访问：
>>> print(Student.name)
Student
>>> # 如果删除实例的name属性：
>>> del s.name
>>> # 再次调用s.name，由于实例的name属性没有找到，类的name属性就显示出来了：
>>> print(s.name)
Student
```

因此，在编写程序的时候，千万不要把实例属性和类属性使用相同的名字(如果碰到这种情况)。

创建一个实例时调用了其类的构造器`__new__()`，当解释器看到类声明时，就调用`type`的构造器`__new__()`，把类声明中写的东西作为`name, bases, attrs`参数传递进去，然后`__new__()`就申请内存创建了一个类的对象（实例），并返回它。`cls`参数是 metaclass 简称，指它调用的`metaclass`。

用`type()`创建一个类，是调用了`type()`的构造器`__new__()`，从而创建了一个`type`的新实例，也就是一个新的类。如果解释器在类声明中读到了`__metaclass__`属性，那就会用这个自定义元类的构造器`__new__()`来造这个类，如果没有，那就会用`type`的构造器`__new__()`来造这个类，也就是说`type`就是缺省元类。

有了自定义元类，就可以使真实造出来的类和类声明中写的有所不同，只要覆盖元类的构造器就行了，当然，它需要调用`type`的构造器来申请空间。

这样，我们就用 Metaclass 创建了`list`的派生类`MyList`，并添加了一个方法`add()`。关于`lambda`的用法疑问，可以用下面例子解释：

```python

>>>x = lambda a,b : a*b
>>>x(2,3)
6
```

看来调用`lambda`函数就是用括号里穿参数的形式。这样就可以解释下面调用`add()`方法的疑问

```python

>>>from ok5 import MyList
>>>L=MyList()
>>>L.add(1)        # self 就是 L，调用add，就是调用 lambda 函数 
>>>L
[1]
```

调用`add()`方法，就是调用 lambda 函数。

## 定制类：`__str__`用作自定义打印实例


我们先定义一个`Student`类，打印一个实例：

```python
>>> class Student(object):
...     def __init__(self, name):
...         self.name = name
...
>>> print Student('Michael')
<__main__.Student object at 0x109afb190>
```

打印出一堆`<__main__.Student object at 0x109afb190>`，不好看。怎么才能打印得好看呢？只需要定义好`__str__()`方法，返回一个好看的字符串就可以了：

```python
>>> class Student(object):
...     def __init__(self, name):
...         self.name = name
...     def __str__(self):
...         return 'Student object (name: %s)' % self.name
...
>>> print Student('Michael')
Student object (name: Michael)
```

这样打印出来的实例，不但好看，而且容易看出实例内部重要的数据。

# ORM
为什么 ORM 一定要用 Metaclass 来创建？很简单，假设我们已经写好了 ORM，用户会怎么调用呢？

```python

class User(Model):
	id_key = IntegerField('uid')
	name_key = StringField('username')
	email_key = StringField('email')
	password_key = StringField('password')
```

这就是用户调用 ORM 的方式，但是我们并不知道用户会用哪些类属性，在这里的类属性是`id_key`、`name_key`、`email_key`、`password_key`，但是下一次可能用户定义的就是`id`、`address`、`cellphone`、`name`、`email`、`password`等，所以我们必须把用户创建的类属性动态加入，这就要用到 Metaclass，总结一句话，`Metaclass`就是给动态创建的类【添加属性和方法的】。拿上面的例子来说，

![](/images/Tech/Python/ORM-Metaclass/1)

```
 attrs: {'id_key': <__main__.IntegerField object at 0x020ED8F0>, '__module__': '__main__', 'password_key': <__main__.StringField object at 0x020ED950>, 'email_key': <__main__.StringField object at 0x020ED930>, 'name_key': <__main__.StringField object at 0x020ED910>}
```

在`User`类调用的 MetaClass 中打印`attrs`得到上面的结果，可见在`User`中定义的类属性变成了其所调用的 MetaClass 的`attrs`的`key`，类属性的值则作为`attrs`的`value`，类属性的值可以是任何类型的数据，这里是`IntergetField`或`StringField`类的实例。

![](/images/Tech/Python/ORM-Metaclass/2)

另外，利用上面的`__str__()`方法，我们在打印类属性的值由于其是实例(`object`)类型的数据时，所以我们可以自己选择打印格式，而不是类似`<__main__.IntegerField object at 0x0220D8D0>`这样冷冰冰的东西。（当然不设置`__str__()`也并没有影响）

ORM 代码：

```python
# -*- coding: utf-8 -*-

' Simple ORM using metaclass '


class Field(object):
	def __init__(self, name, column_type):
		self.name = name
		self.column_type = column_type
		
	def __str__(self):                    #定义__str__()方法的目的：一旦打印Field实例就调用
		return '<%s:%s>' % (self.__class__.__name__, self.name)

class StringField(Field):
    def __init__(self, name):
        super(StringField, self).__init__(name, 'varchar(100)')

class IntegerField(Field):
    def __init__(self, name):
        super(IntegerField, self).__init__(name, 'bigint')

class ModelMetaclass(type):

    def __new__(cls, name, bases, attrs):
		if name=='Model':
			return type.__new__(cls, name, bases, attrs)
		
		print('Found model: %s' % name)
		
		print '-------------------------------------------------'
		print 'cls: %s, \n name: %s, \n bases: %s, \n attrs: %s\n' %(cls, name, bases, attrs)
		print '-------------------------------------------------'
		
		mappings = dict()
		for key, value in attrs.iteritems():
			if isinstance(value, Field):
				print('Found mapping: %s ==> %s' % (key, value))  #打印v时调用__str__()方法
				mappings[key] = value		
				
		for key in mappings.iterkeys():
			attrs.pop(key)
		attrs['__mappings__'] = mappings
		'''
		以上那么做的目的很明显，就是为了让attrs的结构更清晰，让所有的类属性都集中到mappings dict中,再赋值给attrs的__mappings__
		这样类属性就整合为一个整体作为attrs的__mappings__的 value
		'''
		
		attrs['__table__'] = name # 假设表名和类名一致
		return type.__new__(cls, name, bases, attrs)

class Model(dict):
    __metaclass__ = ModelMetaclass     #User和Model都会调用ModelMetaclass，不过Model调用ModelMetaclass会什么都不做就返回(if name=='Model')

    def __init__(self, **kw):
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
		
		'''
		print '-------------------------------------------------'
		print '__mappings__:%s,\n'  %self.__mappings__
		print '-------------------------------------------------'
		'''
		
		#self是u，u是User的实例,但是 u 没有属性__mappings__，__mappings__是类的属性
		#u继承类的属性，所以这里的self.__mappings__是User.__mappings__
		for k, v in self.__mappings__.iteritems():   
			#print k,v
			fields.append(v.name)  #v本身就是实例(object)，所以可以有自己的属性
			params.append('?')
			args.append(self[k])   
		sql = 'insert into %s (%s) values (%s)' % (self.__table__, ','.join(fields), ','.join(params))
		print('SQL: %s' % sql)
		print('ARGS: %s' % str(args))
```

测试代码：

```python

class User(Model):
	id_key = IntegerField('uid')  #括号里的是数据库表的列名，因为 fields.append(v.name)，而v.name就是uid，uid等作为sql的 values 
	name_key = StringField('username')
	email_key = StringField('email')
	password_key = StringField('password')

'''
print '-------------------------------------------------'
print 'User.__mappings__:%s,\n User.__table__:%s,\n User.__module__:%s\n' %(User.__mappings__,User.__table__,User.__module__)
print '-------------------------------------------------'
'''

#########################################################################################
u = User(id_key=12345, name_key='zhuma', email_key='test@orm.org', password_key='zhangpan')
#括号里的全部是**kw 关键字参数(dict), self 是 u . id, name, email, password变成了实例u的属性，而非User的类属性
#根据User的类属性key，找到实例u的对应的value(u的key一定要和User类属性的名称保持一致).

'''
print '-------------------------------------------------'
print 'u.__mappings__:%s,\n u.__table__:%s,\n u.__module__:%s\n' %(u.__mappings__,u.__table__,u.__module__)
print '-------------------------------------------------'
'''

u.save()
```

`u=User()`会调用`User`的父类`Model`初始化参数，而`Model`的父类又是`dict`，所以`u = User(id_key=12345, name_key='Michael', email_key='test@orm.org', password_key='my-pwd')`括号里的参数会被`dict`初始化，同时`Model`又定义了`__getattr__()`和`__setattr__()`方法，所以初始化后可以用`u[id_key]`和`u.id_key`来访问`u`的属性。

注意很重要的一点：`save()`方法中

    args.append(self[k])

`self`是`u`，而`k`是`User`定义的`id_key`、`name_key`、`email_key`、`password_key`，所以要想用`self [k]`找到`u`对应的`value`，就必须`u`的`key`一定要和`User`类属性(即上面的`k`)的名称保持一致。