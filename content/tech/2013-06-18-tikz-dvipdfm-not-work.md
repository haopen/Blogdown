---
title: latex+dvipdfmx 编译 pgf 图形无效的解决方法 z
date: 2007-07-18
categories: ["4-LaTeX"]
tags: ["4-LaTeX", "4-pgf"]
slug: tikz-dvipdfm-not-work
---

原文地址：<http://bbs.ctex.org/forum.php?mod=viewthread&tid=76106&extra=&page=1>

> 最好的方法是升级`expl3`宏包

```tex
\documentclass[cs4size,openany,twoside,UTF8]{ctexbook}
\usepackage[]{graphicx}

\def\pgfsysdriver{pgfsys-dvipdfm.def}

\usepackage{tikz}

\begin{document}
\begin{tikzpicture}
\draw (2,2) circle (10ex);
\end{tikzpicture}
\end{document}
```