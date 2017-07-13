---
title: Python 爬虫—破解 JS 加密的 Cookie z
date: 2016-03-19
categories: ["4-Python"]
tags: ["4-Python", "4-爬虫", "4-Cookies", "4-PyV8"]
slug: crypto-js-cookies
---

**原文地址**：<https://my.oschina.net/jhao104/blog/865966>

> 如何才能使 Python 也能执行这段 JS 呢，答案是**PyV8**。V8 是 Chromium 中内嵌的 javascript 引擎，号称跑的最快。`PyV8`是用 Python 在 V8 的外部 API 包装了一个 Python 壳，这样便可以使 Python 可以直接与 javascript 操作。

# 前言

在 GitHub 上维护了一个[代理池](https://github.com/jhao104/proxy_pool)的项目，代理来源是抓取一些免费的代理发布网站。上午有个小哥告诉我说有个代理抓取接口不能用了，返回状态`521`。抱着帮人解决问题的心态去跑了一遍代码。发现果真是这样。

通过`Fiddler`抓包比较，基本可以确定是 JavaScript 生成加密 Cookie 导致原来的请求返回`521`。

<!-- more -->

# 发现问题

打开 Fiddler 软件，用浏览器打开目标站点(<http://www.kuaidaili.com/proxylist/2/>) 。可以发现浏览器对这个页面加载了两次，第一次返回`521`，第二次才正常返回数据。很多没有写过网站或是爬虫经验不足的童鞋，可能就会觉得奇怪为什么会这样？为什么浏览器可能正常返回数据而代码却不行？

![](/images/Tech/Python/encryptedCookies/1.png)

仔细观察两次返回的结果可以发现：

![](/images/Tech/Python/encryptedCookies/2.png)

![](/images/Tech/Python/encryptedCookies/3.png)

1. 第二次请求比第一次请求的 Cookie 内容多了个这个`_ydclearance=0c316df6ea04c5281b421aa8-5570-47ae-9768-2510d9fe9107-1490254971`；
2. 第一次返回的内容一些复杂看不懂的 JS 代码，第二次返回的就是正确的内容。

其实这是网站反爬虫的常用手段。大致过程是这样的：首次请求数据时，服务端返回动态的混淆加密过的 JS，而这段 JS 的作用是给 Cookie 添加新的内容用于服务端验证，此时返回的状态码是`521`。浏览器带上新的 Cookie 再次请求，服务端验证 Cookie 通过返回数据(这也是为嘛代码不能返回数据的原因)。

# 解决问题

其实我第一次遇到这样的问题是，一开始想的就是既然你是用 JS 生成的 Cookie, 那么我也可以将 JS 函数翻译成 Python 运行。但是最后还是发现我太傻太天真，因为现在的 JS 都流行混淆加密，原始的 JS 这样的：

```javascript
function lq(VA) {
    var qo, mo = "", no = "", oo = [0x8c, 0xcd, 0x4c, 0xf9, 0xd7, 0x4d, 0x25, 0xba, 0x3c, 0x16, 0x96, 0x44, 0x8d, 0x0b, 0x90, 0x1e, 0xa3, 0x39, 0xc9, 0x86, 0x23, 0x61, 0x2f, 0xc8, 0x30, 0xdd, 0x57, 0xec, 0x92, 0x84, 0xc4, 0x6a, 0xeb, 0x99, 0x37, 0xeb, 0x25, 0x0e, 0xbb, 0xb0, 0x95, 0x76, 0x45, 0xde, 0x80, 0x59, 0xf6, 0x9c, 0x58, 0x39, 0x12, 0xc7, 0x9c, 0x8d, 0x18, 0xe0, 0xc5, 0x77, 0x50, 0x39, 0x01, 0xed, 0x93, 0x39, 0x02, 0x7e, 0x72, 0x4f, 0x24, 0x01, 0xe9, 0x66, 0x75, 0x4e, 0x2b, 0xd8, 0x6e, 0xe2, 0xfa, 0xc7, 0xa4, 0x85, 0x4e, 0xc2, 0xa5, 0x96, 0x6b, 0x58, 0x39, 0xd2, 0x7f, 0x44, 0xe5, 0x7b, 0x48, 0x2d, 0xf6, 0xdf, 0xbc, 0x31, 0x1e, 0xf6, 0xbf, 0x84, 0x6d, 0x5e, 0x33, 0x0c, 0x97, 0x5c, 0x39, 0x26, 0xf2, 0x9b, 0x77, 0x0d, 0xd6, 0xc0, 0x46, 0x38, 0x5f, 0xf4, 0xe2, 0x9f, 0xf1, 0x7b, 0xe8, 0xbe, 0x37, 0xdf, 0xd0, 0xbd, 0xb9, 0x36, 0x2c, 0xd1, 0xc3, 0x40, 0xe7, 0xcc, 0xa9, 0x52, 0x3b, 0x20, 0x40, 0x09, 0xe1, 0xd2, 0xa3, 0x80, 0x25, 0x0a, 0xb2, 0xd8, 0xce, 0x21, 0x69, 0x3e, 0xe6, 0x80, 0xfd, 0x73, 0xab, 0x51, 0xde, 0x60, 0x15, 0x95, 0x07, 0x94, 0x6a, 0x18, 0x9d, 0x37, 0x31, 0xde, 0x64, 0xdd, 0x63, 0xe3, 0x57, 0x05, 0x82, 0xff, 0xcc, 0x75, 0x79, 0x63, 0x09, 0xe2, 0x6c, 0x21, 0x5c, 0xe0, 0x7d, 0x4a, 0xf2, 0xd8, 0x9c, 0x22, 0xa3, 0x3d, 0xba, 0xa0, 0xaf, 0x30, 0xc1, 0x47, 0xf4, 0xca, 0xee, 0x64, 0xf9, 0x7b, 0x55, 0xd5, 0xd2, 0x4c, 0xc9, 0x7f, 0x25, 0xfe, 0x48, 0xcd, 0x4b, 0xcc, 0x81, 0x1b, 0x05, 0x82, 0x38, 0x0e, 0x83, 0x19, 0xe3, 0x65, 0x3f, 0xbf, 0x16, 0x88, 0x93, 0xdd, 0x3b];
    qo = "qo=241; do{oo[qo]=(-oo[qo])&0xff; oo[qo]=(((oo[qo]>>3)|((oo[qo]<<5)&0xff))-70)&0xff;} while(--qo>=2);";
    eval(qo);
    qo = 240;
    do {
        oo[qo] = (oo[qo] - oo[qo - 1]) & 0xff;
    } while (--qo >= 3);
    qo = 1;
    for (; ;) {
        if (qo > 240) break;
        oo[qo] = ((((((oo[qo] + 2) & 0xff) + 76) & 0xff) << 1) & 0xff) | (((((oo[qo] + 2) & 0xff) + 76) & 0xff) >> 7);
        qo++;
    }
    po = "";
    for (qo = 1; qo < oo.length - 1; qo++) if (qo % 6) po += String.fromCharCode(oo[qo] ^ VA);
    eval("qo=eval;qo(po);");
}
```

看到这样的 JS 代码，我只能说原谅我 JS 能力差，还原不了。。。

但是前端经验丰富的童鞋马上就能想到还有种方法可解，那就是利用浏览器的 JS 代码调试功能。这样一切就迎刃而解，新建一个 html 文件，将第一次返回的 html 原文复制进去，保存用浏览器打开，在`eval`之前打上断点，看到这样的输出：

![](/images/Tech/Python/encryptedCookies/4.png)

可以看到这个变量`po`为`document.cookie='_ydclearance=0c316df6ea04c5281b421aa8-5570-47ae-9768-2510d9fe9107-1490254971; expires=Thu, 23-Mar-17 07:42:51 GMT; domain=.kuaidaili.com; path=/'; window.document.location=document.URL`，下面还有个`eval("qo=eval;qo(po);")`。JS 里面的`eval`和 Python 的差不多，第二句的意思就是将`eval`方法赋给`qo`。然后去`eval`字符串`po`。而字符串`po`的前半段的意思是给浏览器添加 Cooklie，后半段`window.document.location=document.URL`是刷新当前页面。

这也印证了我上面的说法，首次请求没有 Cookie，服务端回返回一段生成 Cookie 并自动刷新的 JS 代码。浏览器拿到代码能够成功执行，带着新的 Cookie 再次请求获取数据。而 Python 拿到这段代码就只能停留在第一步。

那么如何才能使 Python 也能执行这段 JS 呢，答案是**PyV8**。V8 是 Chromium 中内嵌的 javascript 引擎，号称跑的最快。`PyV8`是用 Python 在 V8 的外部 API 包装了一个 Python 壳，这样便可以使 Python 可以直接与 javascript 操作。`PyV8`的安装大家可以自行百度。

# 代码

分析完成，下面切入正题撸代码。首先是正常请求网页，返回带加密的 JS 函数的 html

```python
import re
import PyV8
import requests

TARGET_URL = "http://www.kuaidaili.com/proxylist/1/"

def getHtml(url, cookie=None):
    header = {
        "Host": "www.kuaidaili.com",
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
    }
    html = requests.get(url=url, headers=header, timeout=30, cookies=cookie).content
    return html
# 第一次访问获取动态加密的JS
first_html = getHtml(TARGET_URL)
```

由于返回的是 html，并不单纯的 JS 函数，所以需要用正则提取 JS 函数的参数的参数。

![](/images/Tech/Python/encryptedCookies/5.png)

```python
# 提取其中的JS加密函数
js_func = ''.join(re.findall(r'(function .*?)</script>', first_html))

print 'get js func:\n', js_func

# 提取其中执行JS函数的参数
js_arg = ''.join(re.findall(r'setTimeout\(\"\D+\((\d+)\)\"', first_html))

print 'get ja arg:\n', js_arg
```

还有一点需要注意，在 JS 函数中并没有返回 cookie，而是直接将 cookie set 到浏览器，所以我们需要将`eval("qo=eval;qo(po);")`替换成`return po`。这样就能成功返回`po`中的内容。

```python
def executeJS(js_func_string, arg):
    ctxt = PyV8.JSContext()
    ctxt.enter()
    func = ctxt.eval("({js})".format(js=js_func_string))
    return func(arg)

# 修改JS函数，使其返回Cookie内容
js_func = js_func.replace('eval("qo=eval;qo(po);")', 'return po')

# 执行JS获取Cookie
cookie_str = executeJS(js_func, js_arg)
```

这样返回的 cookie 是字符串格式，但是用`requests.get()`需要字典形式，所以将其转换成字典：

```python
def parseCookie(string):
    string = string.replace("document.cookie='", "")
    clearance = string.split(';')[0]
    return {clearance.split('=')[0]: clearance.split('=')[1]}

# 将Cookie转换为字典格式
cookie = parseCookie(cookie_str)
```

最后带上解析出来的 Cookie 再次访问网页，成功获取数据：

```python
# 带上Cookie再次访问url,获取正确数据
print getHtml(TARGET_URL, cookie)[0:500]
```

下面是完整[代码](https://github.com/jhao104/memory-notes/blob/master/Python/Python%E7%88%AC%E8%99%AB%E2%80%94%E7%A0%B4%E8%A7%A3JS%E5%8A%A0%E5%AF%86%E7%9A%84Cookie.md)：

```python
# -*- coding: utf-8 -*-
"""
File Name： demo_1.py.py
Description : Python爬虫—破解JS加密的Cookie
快代理网站为例：http://www.kuaidaili.com/proxylist/1/
Document: Author : JHao
date： 2017/3/23
Change Activity: 2017/3/23:
"""
__author__ = 'JHao'

import re
import PyV8
import requests

TARGET_URL = "http://www.kuaidaili.com/proxylist/1/"

def getHtml(url, cookie=None):
    header = {
        "Host": "www.kuaidaili.com",
        'Connection': 'keep-alive',
        'Cache-Control': 'max-age=0',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.87 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, sdch',
        'Accept-Language': 'zh-CN,zh;q=0.8',
    }
    html = requests.get(url=url, headers=header, timeout=30, cookies=cookie).content
    return html

def executeJS(js_func_string, arg):
    ctxt = PyV8.JSContext()
    ctxt.enter()
    func = ctxt.eval("({js})".format(js=js_func_string))
    return func(arg)

def parseCookie(string):
    string = string.replace("document.cookie='", "")
    clearance = string.split(';')[0]
    return {clearance.split('=')[0]: clearance.split('=')[1]}

# 第一次访问获取动态加密的JS
first_html = getHtml(TARGET_URL)

# first_html = """
# <html><body><script language="javascript"> window.onload=setTimeout("lu(158)", 200); function lu(OE) {var qo, mo="", no="", oo = [0x64,0xaa,0x98,0x3d,0x56,0x64,0x8b,0xb0,0x88,0xe1,0x0d,0xf4,0x99,0x31,0xd8,0xb6,0x5d,0x73,0x98,0xc3,0xc4,0x7a,0x1e,0x38,0x9d,0xe8,0x8d,0xe4,0x0a,0x2e,0x6c,0x45,0x69,0x41,0xe5,0xd0,0xe5,0x11,0x0b,0x35,0x7b,0xe4,0x09,0xb1,0x2b,0x6d,0x82,0x7c,0x25,0xdd,0x70,0x5a,0xc4,0xaa,0xd3,0x74,0x98,0x42,0x3c,0x60,0x2d,0x42,0x66,0xe0,0x0a,0x2e,0x96,0xbb,0xe2,0x1d,0x38,0xdc,0xb1,0xd6,0x0e,0x0d,0x76,0xae,0xc3,0xa9,0x3b,0x62,0x47,0x40,0x15,0x93,0xb7,0xee,0xc3,0x3e,0xfd,0xd3,0x0d,0xf6,0x61,0xdc,0xf1,0x2c,0x54,0x8c,0x90,0xfa,0x24,0x5b,0x83,0x0c,0x75,0xaf,0x18,0x01,0x7e,0x68,0xe0,0x0a,0x72,0x1e,0x88,0x33,0xa7,0xcc,0x31,0x9b,0xf3,0x1a,0xf2,0x9a,0xbf,0x58,0x83,0xe4,0x87,0xed,0x07,0x7e,0xe2,0x00,0xe9,0x92,0xc9,0xe8,0x59,0x7d,0x56,0x8d,0xb5,0xb2,0x6c,0xe0,0x49,0x73,0xfc,0xe7,0x20,0x49,0x34,0x09,0x71,0xeb,0x60,0xfd,0x8e,0xad,0x0f,0xb9,0x2e,0x77,0xdc,0x74,0x9b,0xbf,0x8f,0xa5,0x8d,0xb8,0xb0,0x06,0xac,0xc5,0xe9,0x10,0x12,0x77,0x9b,0xb1,0x19,0x4e,0x64,0x5c,0x00,0x98,0xc6,0xed,0x98,0x0d,0x65,0x11,0x35,0x9e,0xf4,0x30,0x93,0x4b,0x00,0xab,0x20,0x8f,0x29,0x4f,0x27,0x8c,0xc2,0x6a,0x04,0xfb,0x51,0xa3,0x4b,0xef,0x09,0x30,0x28,0x4d,0x25,0x8e,0x76,0x58,0xbf,0x57,0xfb,0x20,0x78,0xd1,0xf7,0x9f,0x77,0x0f,0x3a,0x9f,0x37,0xdb,0xd3,0xfc,0x14,0x39,0x11,0x3b,0x94,0x8c,0xad,0x8e,0x5c,0xd3,0x3b];qo = "qo=251; do{oo[qo]=(-oo[qo])&0xff; oo[qo]=(((oo[qo]>>4)|((oo[qo]<<4)&0xff))-0)&0xff;} while(--qo>=2);"; eval(qo);qo = 250; do { oo[qo] = (oo[qo] - oo[qo - 1]) & 0xff; } while (-- qo >= 3 );qo = 1; for (;;) { if (qo > 250) break; oo[qo] = ((((((oo[qo] + 200) & 0xff) + 121) & 0xff) << 6) & 0xff) | (((((oo[qo] + 200) & 0xff) + 121) & 0xff) >> 2); qo++;}po = ""; for (qo = 1; qo < oo.length - 1; qo++) if (qo % 5) po += String.fromCharCode(oo[qo] ^ OE);eval("qo=eval;qo(po);");} </script> </body></html>
# """

# 提取其中的JS加密函数
js_func = ''.join(re.findall(r'(function .*?)</script>', first_html))

print 'get js func:\n', js_func

# 提取其中执行JS函数的参数
js_arg = ''.join(re.findall(r'setTimeout\(\"\D+\((\d+)\)\"', first_html))

print 'get ja arg:\n', js_arg

# 修改JS函数，使其返回Cookie内容
js_func = js_func.replace('eval("qo=eval;qo(po);")', 'return po')

# 执行JS获取Cookie
cookie_str = executeJS(js_func, js_arg)

# 将Cookie转换为字典格式
cookie = parseCookie(cookie_str)

print cookie

# 带上Cookie再次访问url,获取正确数据
print getHtml(TARGET_URL, cookie)[0:500]
```