---
title: "用 Python 搭建一个简单的 Web 服务器"
author: "彭浩"
date: "2017-07-06T21:49:57-07:00"
categories: ["4-Python"]
tags: ["4-Web Server"]
slug: python-web-server
---

在 RStudio 中运行 Hugo 的站点时，含有中文的地址解析都会出错，就想查出到底是 Hugo 的原因还是 Blogdown 的原因，先是发现 <https://blog.coderzh.com/> 里面的中文分类以及中文 URL 地址在 Chrome 中都可以正常工作。于是接下来想自己搭一个简单的 Web 服务器，看看在非 Blogdown 的环境中会有什么样的结果。

1. 参考 <http://bbs.chinaunix.net/thread-743286-1-1.html> 在 Hugo 的 `\public\` 目录下放置一个包含如下内容的 Python 脚本：
```python
import SimpleHTTPServer
SimpleHTTPServer.test()
```
按照作者的说明，此时可以双击开启 `8000` 端口并启动一个简单的 Web 服务，但由于是 Windows，因此根据廖雪峰的 Python 3.X 的讲义，不可能双击执行。于是在 CMD 窗口中尝试用 Python 命令来启动，仍然**失败**，提示没有 `SimpleHTTPServer` 包。

2. 参考 <http://www.cnblogs.com/harry-xiaojun/p/6739003.html>，在 CMD 窗口中输入：
```dos
python -m http.server 80
```

这次成功启动。在 Chrome 中浏览发现带有中文 URL 地址的内容在这个简单的 Web 服务器下解析正常，因此大致上可以确定是 Blogdown 在接管 Hugo 提供的 Server 服务时，做了一些额外的事情，或者做的工作不够，导致中文 URL 地址解析出错。