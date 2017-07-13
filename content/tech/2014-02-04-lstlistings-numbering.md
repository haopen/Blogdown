---
title: 语法高亮：如何在文本复制时自动忽略行号 z
date: 2014-02-04
categories: ["4-LaTeX"]
tags: ["4-LaTeX", "4-语法高亮", "4-highlight", "4-lstlistings"]
slug: lstlistings-numbering
---

**原文地址**：<http://www.latexstudio.net/archives/765>

用 `listings` 包排版源代码时通常为了便于说明，会显示代码的行号，但是，我们在文档复制的时候却发现，复制代码的时候，同时会把行号也复制出来了，如下：

![](/images/Tech/LaTeX/lstlistings/lstlistings-Numbering-1.png)

我们想实现如下的复制，更便于读者提取文档中的源代码进行相关测试。

![](/images/Tech/LaTeX/lstlistings/lstlistings-Numbering-2.png)

我们可以使用 `accsupp` 包来实现，具体代码如下：

```tex
\documentclass{article}
\usepackage{xcolor}% http://ctan.org/pkg/xcolor
\usepackage{listings}% http://ctan.org/pkg/listings
\usepackage{accsupp}% http://ctan.org/pkg/accsupp
\renewcommand{\thelstnumber}{% Line number printing mechanism
	\protect\BeginAccSupp{ActualText={}}\arabic{lstnumber}\protect\EndAccSupp{}%
}

\lstset
{
	language={[LaTeX]TeX},
	numbers=left,
	numbersep=1em,
	numberstyle=\tiny,
	frame=single,
	framesep=\fboxsep,
	framerule=\fboxrule,
	rulecolor=\color{red},
	xleftmargin=\dimexpr\fboxsep+\fboxrule\relax,
	xrightmargin=\dimexpr\fboxsep+\fboxrule\relax,
	breaklines=true,
	basicstyle=\small\tt,
	keywordstyle=\color{blue},
	commentstyle=\color[rgb]{0.13,0.54,0.13},
	backgroundcolor=\color{yellow!10},
	tabsize=2,
	columns=flexible,
	morekeywords={maketitle},
}

\begin{document}

\begin{lstlisting}
\documentclass{article}
\usepackage{listings}
\title{Sample Document}
\author{John Smith}
\date{\today}
\begin{document}
\maketitle
Hello World!
% This is a comment.
\end{document}
\end{lstlisting}

\end{document}
```

需要说明的是，这一效果适用于 Adobe Reader PDF 阅读器，~~sumatraPDF~~ 不适用，其他阅读器还未测试。

- <http://tex.stackexchange.com/questions/30783/how-to-make-text-copy-in-pdf-previewers-ignore-lineno-line-numbers>
- <http://tex.stackexchange.com/questions/57141/is-there-a-latex-trick-to-prevent-a-pdf-viewer-from-copying-the-line-number>