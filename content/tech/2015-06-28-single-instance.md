---
title: 飘逸的 Python - 单例模式乱弹 z
date: 2015-06-28
categories: ["4-Python"]
tags: ["4-Python", "4-Class", "4-类", "4-设计模式", "4-单例模式", "4-装饰器"]
slug: single-instance
---

**原文地址**：<http://blog.csdn.net/handsomekang/article/details/46672047>

这篇的内容暂时不理解，是在找 Metaclass 资料时从其它页面跳转来的。

<!-- more -->

# 装饰器

利用“装饰器只会执行一次”这个特点：

```python
def singleton(cls):
    instances = []# 为什么这里不直接为None,因为内部函数没法访问外部函数的非容器变量
    def getinstance(*args, **kwargs):
        if not instances:
            instances.append(cls(*args, **kwargs))
        return instances[0]
    return getinstance

@singleton
class Foo:
    a = 1

f1 = Foo()
f2 = Foo()
print id(f1), id(f2)
```

# 基类

利用“类变量对所有对象唯一”，即`cls._instance`

```python
class Singleton(object):
    def __new__(cls, *args, **kwargs):
        if not hasattr(cls, '_instance'):
            cls._instance = object.__new__(cls, *args, **kwargs)
        return cls._instance

class Foo(Singleton):
    a = 1
```

# metaclass

利用“类变量对所有对象唯一”，即`cls._instance`

```python
class Singleton(type):
    def __call__(cls, *args, **kwargs):
        if not hasattr(cls, '_instance'):
            cls._instance = super(Singleton, cls).__call__(*args, **kwargs)
        return cls._instance

class Foo():
    __metaclass__ = Singleton
```

# Borg 模式

利用“类变量对所有对象唯一”，即`__share_state`

```python
class Foo:
   __share_state = {}
   def __init__(self):
       self.__dict__ = self.__share_state
```

# 利用 import

利用“模块只会被`import`一次”

```python
#在文件mysingleton中
class Foo(object):
     pass

f = Foo()
```

然后在其它模块，`from mysingleton import f`，直接拿`f`当作单例的对象来用。