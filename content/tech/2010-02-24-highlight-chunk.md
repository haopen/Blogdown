---
title: 语法高亮：给部分代码添加背景颜色
date: 2010-02-24
categories: ["4-LaTeX"]
tags: ["4-LaTeX", "4-lstlistings", "4-语法高亮", "4-highlight"]
slug: highlight-chunk
---

**原文地址**：<http://stackoverflow.com/questions/1304315/highlighting-a-chunk-of-code-within-a-lstlisting>

> **基本思路**：在`lstlisting`环境中使用 escape character，同时用`\colorbox`生成背景颜色^[`realboxes`包提供的是`Colorbox`，[这个地址](https://tex.stackexchange.com/questions/357227/adding-background-color-to-verb-or-lstinline-command-without-colorbox)给出了一个具体的示例。]。

在导言区中添加如下代码：

```tex
\usepackage{color}
\definecolor{light-gray}{gray}{0.80}
```

之后在正文中按如下方法给部分代码添加背景颜色^[注意在`!`之间的部分。]：

```tex
\begin{lstlisting}[escapechar=!]
def mult(m: Matrix[Int], n: Matrix[Int]) {
val p = !\colorbox{light-gray}{new MatrixInt}!(m.rows, n.cols)
}
\end{lstlisting}
```