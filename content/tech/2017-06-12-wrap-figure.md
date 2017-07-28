---
title: LaTeX 如何在文档的侧面插入图片实现“绕排” z
date: 2017-06-12
categories: ["4-LaTeX"]
tags: ["4-LaTeX"]
slug: wrap-figure
show_toc: true
---

**原文地址**：<https://www.zhihu.com/question/26837705>

买了我书的读者，请看 5.3.5 节「文字绕排」。

本质上绕排功能都是通过在 TeX 中使用 `\parshape` 命令控制段落形状，挖出一个空洞出来，然后把图表内容填进去来完成的。Knuth 排版 TAOCP 就都是手工完成这种绕排工作的。不过手工完成这种工作非常繁琐，在 LaTeX 中通常还是使用现成的宏包工具。

# 主要宏包

实现文字绕排工具很多，效果各有千秋。按当前版本的时间顺序排是：

- `picins`：1992 年 3.0 版，早于 LaTeX2e，因许可证问题现已从 TeXLive 中删除，MiKTeX 仍可用；
- `picinpar`：1993 年 1.2a 版，早于 LaTeX2e；
- `floatflt`：1997 年 1.31 版，最早版本发布于 1994 年，LaTeX2e 代码；
- `wrapfig`：2003 年 3.6 版，最早版本发布于 1991 年，现为 LaTeX2e 代码；
- `cutwin`：2010 年 0.1 版，LaTeX2e 代码。

为什么会有这么多宏包？因为绕排问题复杂，要求繁多，并没有哪一个宏包能在各方面完美地解决文字绕排的问题。所以多少需要选着用。

各个宏包的其本用法可以看各自的手册，但注意 `picins` 的手册是一个文本文件，而 `picinpar` 的手册要看德文版 pdf（看例子）配合源代码里面的注释。其中 `picins`、`picinpar`、`wrapfig` 的一个集中（但有些过时）的介绍可以看《LaTeX2e 插图指南》的一节：[30. 图文混排](http://www.ctex.org/documents/latex/graphics/node114.html)。

# 功能差异

我们忽略掉在 TeX Live 下无法使用的老宏包 `picins`，下面主要考虑一些功能上的差别：

- `wrapfig` 代码较新，语法与标准的 `figure` 环境接近，基本功能比较全面，可以指定宽度高度也可以自动计算，可以设置伸出版心。此外在页面放不下时还有浮动到下一段的功能（这块儿我的书写错了）。但位置限定较多，一般只用在段落开头，图片出现在段落（包括连续几段）的左上角或右上角。
- `picinpar` 位置灵活，水平方向和垂直方向都可以放在一段的中间。但语法比较怪异，也不能直接指定内容大小。
- `floatflt` 功能和语法都与 `wrapfig` 接近，但可以控制的参数更少。它的特色是对列表 `\item` 项有特殊处理，并且对奇偶页面可以有不同的位置处理。
- `cutwin` 的特色是对位置的控制最强，不仅可以把图片放在段落的各种不对称位置，而且还支持特殊形状的挖洞，可以自己定义三角形、圆形之类的空洞来放置特殊的图片。但 `cutwin` 语法麻烦，在其他方面的功能也较弱，比如 `cutwin` 就没有提供 `\caption` 功能，只提供了基本的挖洞功能。所以如果有图表标题又不想自己实现，就不要选 `cutwin` 宏包。而 `picins`、`picinpar`、`floatflt`、`wrapfig` 都支持图表标题，并且有 `caption` 宏包支持。

# 选用小结

1. 在需求简单的情况下，使用 `wrapfig` 或 `floatflt` 就可以满足要求，优先选择功能多的 `wrapfig`；
2. 如果对插入图表的位置有特殊要求，用 `picinpar`；
3. 如果对位置或形状有较高要求，用 `cutwin`。

# 示例

![图文绕排示例](/images/Tech/LaTeX/wrap-figure.jpg)

```tex
\documentclass{article}

\usepackage{graphicx}

\usepackage{wrapfig}
\usepackage{picinpar}
\usepackage{cutwin}

\begin{document}

\section{wrapfig}

\begin{wrapfigure}{l}[1cm]{0pt}
\includegraphics[width=3cm]{example-image-a}
\caption{wrapfig}
\end{wrapfigure}
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text

\section{picinpar}

\begin{figwindow}[2,c,
  {\includegraphics[width=3cm]{example-image-b}},
  picinpar]
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
\end{figwindow}

\section{cutwin}

\renewcommand{\windowpagestuff}{%
  \quad\includegraphics[width=3cm]{example-image-c}}
\begin{cutout}{2}{2.2cm}{6.2cm}{6}
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
text text text text text text text text text text text text
\end{cutout}

\end{document}
```