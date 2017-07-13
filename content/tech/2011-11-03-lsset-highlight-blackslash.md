---
title: listings 排源代码，如何让反斜杠高亮显示？z
date: 2011-11-03
categories: ["4-LaTeX"]
tags: ["4-LaTeX", "4-语法高亮", "4-highlight"]
slug: lsset-highlight-blackslash
---

原文地址：<http://bbs.chinatex.org/forum.php?mod=viewthread&tid=7282&extra=page%3D1>

原始出处：<http://tex.stackexchange.com/questions/17774/listings-package-can-i-include-a-backslash-in-language-keyword-begin-for>

![latex-listings-1](https://cssdpq.bn1.livefilestore.com/y2pGqgY27OrXetmEiHWF5D3gNxS0mky6ut1_scRtpvFnd9A82ruV-sovfRSWmNGMNIh00yUqvodbvdRcnGsI_AfnpKNdeEMSCCb_hUYTmSM4Ik/latex-listings-1.png?psid=1)

如第一幅图所示，高亮的结果是有问题的，也不太好看，实际，我们需要用 `texcsstyle` 来设置即可，有关该指令的作用参考 `listings` 宏包的手册或<http://www.chinatex.org/archives/620>，这里的 **cs** 即控制序列。

```tex
\documentclass{article}
\usepackage[T1]{fontenc}
\usepackage[scaled=0.82]{beramono}
\usepackage{listings,xcolor}
\begin{document}
\begin{lstlisting}[basicstyle=\small\ttfamily,language={[LaTeX]TeX},
                   texcsstyle=*\color{red}\bfseries,
                   keywordstyle=\color{blue}\bfseries,
                   morekeywords=alignat,moretexcs=intertext]
\begin{alignat*}{4}
   y &= -4   &+ 3 &+4     &-7      \\
   y &=      &+ 3 &       &-7      \\
   \intertext{Therefore}
   a &= b    &d   &= cccc &e  &= d \\
   a &= bbbb &d   &= c    &e  &= d
\end{alignat*}
\end{lstlisting}
\end{document}
```

正确的演示效果如下图所示：

![latex-listings-2](https://cssdpq.bn1.livefilestore.com/y2p4k8SF1VY5eeAauY0fr03aQdOpyp0-L7T3e9FMWXAd0-s8BPXRRzlH95Byg38xMAOtvUQMJxIo4trGdxDmDPp6u4n8VPF6H1CDE-BG8orSjY/latex-listings-2.png?psid=1)