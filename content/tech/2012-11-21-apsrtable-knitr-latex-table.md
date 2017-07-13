---
title: apsrtable 在 knitr 中生成 LaTeX 表格
date: 2012-11-21
categories: ["4-R"]
tags: ["4-R", "4-表格", "4-LaTeX", "4-knitr"]
slug: apsrtable-knitr-latex-table
---

原文地址：<http://cos.name/cn/topic/108631>

`apsrtable()` 里有个 `Sweave` 参数，若设为 `TRUE`，则生成 `tabular` 环境，若为默认的 `FALSE`，则为 `table` 环境。

```tex
\begin{table}[htbp]
\caption{some text}
\label{tb:ex}
\centering
<<results='asis'>>=
apsrtable(mod1, mod2, mod3, Sweave = TRUE)
@
\end{table}
```

> Yihui: 这大概就是最好的办法了吧……这参数名干嘛非得叫 `Sweave`，明明意思是 `tabular.only`。