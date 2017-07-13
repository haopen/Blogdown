---
title: 用 pgfpages 生成 slides 的 4 in 1 版式效果
date: 2011-11-12
categories: ["4-LaTeX"]
tags: ["4-LaTeX", "4-pgfpages", "4-slides", "4-pdf", "4-Beamer"]
slug: pgfpages-slides-4-in-1-changing-margins
---

Getting a 4 in 1 pdf Slides document and “Changing PDF Margins With The pdfpages Package”

```tex
\documentclass[a4paper, landscape]{article}
\usepackage[final]{pdfpages}
\begin{document}
\includepdf[nup=2x2,pages=-, delta=15 15, offset=20 0, frame, scale=0.92,%
    turn=false]{slides.pdf}
\end{document}
% offset=20 0 为偏移横向的内容，给左边留一定的空白用于装订；
% 不使用 offset 的纵向偏移，否则虽然下方有空白，但天头没有；
% 解决纵向留空使用了 scale 选项，直接缩小页面的尺寸，产生自动纵向留白。
```

用 Beamer 做的 Slides，最刚开始用 Acrobat 打印机生成幻灯片的四合一效果，但发现 Acrobat 打印过程中会对图片的质量造成一定的损伤。

后来发现`psnup`工具可以实现**4 in 1**的效果，但试验之后感觉速度和方便程度都很欠缺，需要先将 pdf 文件转换 ps 文件，光是这个过程就太漫长，受不了；另外就是该工具提供的选项看起来不是很舒服。

最后回想起其实 LaTeX 自带的`pgfpages`宏包可以完成这个任务，又回头查了了下 Beam User Guide，发现 Beamer 中也尝试过使用该宏包。但是 Beamer 中的`\pgfpagesuselayout{2 on 1}[a4paper,border shrink=5mm]`类命令我不能直接在 Beamer 之外用，而`pgfpages`中的`delta`与`offset`组合工作还存在问题(见上面的代码注释)，最后发现`\includepdf`的`scale`选项配合`delta`与`offset`就可以完美的达到想要的效果，问题搞定！

PS：事实上`pgfpages`宏包的手册中没有对`scale`选项进行专门的说明，这个选项其实源于`graphicsx`宏包的`\includegraphic`命令，解决上面问题的思路来自下面的资料：

* <http://magic.aladdin.cs.cmu.edu/2007/11/13/changing-pdf-margins-with-the-pdfpages-package/>
* <http://www.tardis.ed.ac.uk/~ajcd/psutils/psnup.html>
* <http://apps.hi.baidu.com/share/detail/21414399>
