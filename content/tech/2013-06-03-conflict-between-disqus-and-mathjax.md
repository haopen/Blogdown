---
title: Disqus 与 Mathjax 可能有冲突
author: 彭浩
date: 2013-06-03
categories: ["4-计算机 - 软件应用"]
tags: ["4-Disqus", "4-Mathjax"]
slug: conflict-between-disqus-and-mathjax
---

在系统中添加 Mathjax 支持的时候，发现如果 LaTeX 公式与 Disqus 评论系统同时存在，会导致如下的错误^[到 2017 年时，这个问题已经不再是问题，一切都因为有了 Pandoc。]：

> This page is forcing your browser to use legacy mode, which is not compatible with Disqus. Please see our troubleshooting guide to get more information about this error.

这个错误在 IE 8.0 中出现，但在 Firefox 21 中却不存在，初步怀疑是 Mathjax 调用 `Mootools 1.4.5` 而导致，具体见 <http://wordpress.org/support/topic/disqus-browser-legacy-error>。