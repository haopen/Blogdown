---
title: Python 模拟登陆知乎和 CSDN z
date: 2015-06-25
categories: ["4-Python"]
tags: ["4-Python", "4-爬虫"]
slug: spider-csdn-login
---

**原文地址**：<http://blog.csdn.net/natsuyu/article/details/46641295>

HTTP 协议方面现在懂得还很少，但是感觉比之前用 socket 的时候好多了，有个更加立体的了解！

模拟登陆的思路很简单：

1. 登录的时候有重要数据肯定是用 post 方法提交的，用各种方法找到 post 中的请求数据
2. 用各种方法获取请求数据中的内容
3. 处理头部和 cookie，并带着请求数据 post 给网址

截获 post 包 Windows 上用 fiddle，很好用的貌似。Mac上。其实我现在还没有 get 到优雅的方法。所以是。输入一个错误的密码，然后在开发者控制台中找到刚刚 post 出去的包，里面也会有请求数据。因为如果正确登录的话会出现自动跳转。然后刚刚 post 的包都没有了。

其实对于 cookie 处理这一块并不熟。这里不多做说明。

<!-- more -->

# 初级版本：用`urllib`，`urllib2`来处理

这时候需要处理头部，就是找到 quest 请求后，把内容复制过来作为自己的 head。

例子：知乎登录。先上代码。

```python
# !/usr/bin/env python
# -*- coding:utf-8 -*-

import re
import urllib, urllib2
import cookielib


def get_head(head):
    cj = cookielib.LWPCookieJar()
    cookie_support = urllib2.HTTPCookieProcessor(cj)
    header = urllib2.build_opener(cookie_support, urllib2.HTTPHandler)
    urllib2.install_opener(header)
    # 以上这一段是cookie处理

    li = []
    for key, value in head.items():
        tmp = (key, value)
        li.append(tmp)


    #添加头部
    header.addheaders = li
    return header

url = 'http://www.zhihu.com'
quest = urllib2.Request(url)
page = urllib2.urlopen(quest).read()

pat = re.compile(r'name="_xsrf" value="(\w+?)"')
code = re.search(pat, page)
code =code.group(1)
print code
name = "**********"
password = "*********"
postdict = {"xsrf":code,
            "email":name,
            "password":password,
            "rememberme":'y'}
postdict = urllib.urlencode(postdict).encode()

head = {"Accept": "*/*",
"Accept-Language": "zh-CN,zh;q=0.8",
"Connection": "keep-alive",
"Host":"知乎 - 与世界分享你的知识、经验和见解",
"Referer":"知乎 - 与世界分享你的知识、经验和见解",
"User-Agent": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36"}

opener = get_head(head)

url += '/login'

uop = opener.open(url, postdict)
page = uop.read()
print page
```

有一点要说。虽然现在也不是很明了。本来在请求数据时有一个`_xsrf`是需要从页面中用正则获取的。本来以为是动态的，但是其实好像。每次抓取发现都是同一个值。所以模拟知乎登录的时候直接交用户名和密码上去就好了。（摔！这给我造成了多大的困扰！）然后 cookie 的处理和添加头部那一部分其实并不是很了解。还需 get 技能。

# 升级版本：用`requests`模拟登陆，十分方便！

例子：CSDN登录

CSDN 登录的时候，通过网页源码给我们的提示。那个`lt`值绝壁是很重要的！而且每次都不一样的！所以！用登录知乎的方法就不管用了！因为之前爬了`_xsrf`实际上是没有用的，并且我们两次登录了那个页面，如果`_xsrf`是动态的，那么！爬到的`_xsrf`也是没有用的！之前看了一个爬虫教程！用了这种错误的方法！给了我血淋淋的教训。。也可能是我还不知道怎么用`urllib`用保持状态访问。。所以。这里就说说`request`方法吧。

`requests`的`session()`函数可以生成保持状态的对象，用这个对象获取页面并且 post 数据，妥妥的。

```python
#!/usr/bin/env python
# -*- coding:utf-8 -*-

import requests
import re

url = 'https://passport.csdn.net/account/login'
s = requests.session()
page = s.get(url).text
pat = re.compile(r'name="lt" value="(.*?)".*[\s\S]name="execution" value="(.*?)"',re.S)
ret = re.findall(pat, page)
print ret
lt = ret[0][0]
exe = ret[0][1]
print lt, exe
submit = 'submit'
id = 'natsuyu'
password = '**********'
postdict = {'username':id,
            'password':password,
            'lt':lt,
            'execution':exe,
            '_eventId':submit}
page = s.post(url, data = postdict)
print page.text
```

代码量剧减有没有！`requests`真的是 or human！
