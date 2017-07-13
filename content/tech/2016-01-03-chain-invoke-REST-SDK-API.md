---
title: Python - SDK 动态调用 z
date: 2016-01-03
categories: ["4-Python"]
tags: ["4-Python", "4-Class", "4-类"]
slug: chain-invoke-rest-sdk-api
---

**原文地址**：<http://blog.csdn.net/zxvivian/article/details/50450070>

现在很多网站搞 REST API，如新浪微博，豆瓣，知乎，如果要写 SDK，给每个 URL 写一个对应的 API 太麻烦，可以利用 Python 中完全动态的 `__getattr__` 完成链式调用。

如 GitHub 的 API：`Get /user/:user/repos`，调用时将`:user`替换为实际用户名。

```python
class Chain(object):
	def __init__(self,user=''):
		self.user = user
	def __getattr__(self, attr):
		return Chain('%s/%s' % (self.user,attr))
	def __str__(self):
		return self.user
	def __call__(self,param):
		return Chain('%s/%s' % (self.user,param))
print(Chain().users('michael').repos)
```

输出：`/users/michael/repos`。


上面的类可以进行完善，支持所有类型的参数：

```python
class Chain2(object):
	def __init__(self, path=''):
		self.path = path
	def __getattr__(self, attr):
		return Chain2('%s/%s' %(self.path, attr))
	def __str__(self):
		return self.path
	def __call__(self, param):
		return Chain2('%s/%s' %(self.path, str(param)))
	__repr__ = __str__
print(Chain2().users('michael').age(12345).repos)
```

输出：`/users/michael/age/12345/repos`。