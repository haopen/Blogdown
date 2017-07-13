---
title: renewcommand partname 时的问题
date: 2009-03-24
categories: ["4-LaTeX"]
tags: ["4-LaTeX", "4-Beamer", "4-slides"]
slug: renewcommand-partname
---


在 documentclass 为 `book` 时解决方法如下：

```tex
\documentclass[a4paper]{book}
\usepackage{ctex,CJKnumb}
\renewcommand\thepart{}\renewcommand\partname{第\CJKnumber{\arabic{part}}部分}
\begin{document}
\begin{CJK*}{GBK}{xihei}
\part[asfd]{test asdf}
asdf asdfasfd
\end{CJK*}
\end{document}
```

在`documentclass`为`beamer`时解决方法如下(该方法由黄正华老师提供，但要注意选择不同的 theme 时，要根据实际情况改变 `partpage` 中 `beamercolorbox` 的具体参数，换句话说，这个解决方法与上面的方法不同，它不具有通用性)：

```tex
\documentclass[CJK]{beamer}
\usepackage{CJK,CJKnumb}
\usetheme{Madrid}

\begin{document}
\begin{CJK*}{GBK}{kai}
\renewcommand\partname{第\CJKnumber{\value{part}}部分}
\defbeamertemplate*{part page}{mypartpage}[1][] {
	\begin{centering} {
		\usebeamerfont{part name}\usebeamercolor[fg]{part name}\partname}
		\vskip1em\par
		\begin{beamercolorbox}[rounded=true,shadow=true,sep=8pt,center,#1]{part title}
			\usebeamerfont{part title}\insertpart\par
		\end{beamercolorbox} 
	\end{centering}
}
\setbeamertemplate{part page}[mypartpage][]

\title{test}
\date{}
\part[asfd]{test asdf}
\frame{\partpage}
\end{CJK*}

\end{document}
```