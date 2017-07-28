---
title: 输出 TeX 族命令名称 z
date: 2011-07-22
categories: ["4-LaTeX"]
tags: ["4-LaTeX"]
slug: typesetting-latex-cmd
---

**参考**：[Macro or package for typesetting “LaTeX” (the name)?](https://tex.stackexchange.com/questions/23772/macro-or-package-for-typesetting-latex-the-name)

[lshort][1] 或者类似的教程中都会提及如何在 LaTeX 中输出 TeX 风格的 TeX 族命令名称本身的方法，这里给出的可能更加完整一些：

  - `\LaTeX` 输出 LaTeX 标志；
  - `\LaTeXe` 输出 LaTeX2e 标志；
  - `\TeX` 输出原始的 TeX 字样，可以用来生成其它以 TeX 字样为基础的标志；
  - `\AmSTeX`, `\BibTeX`, `\SliTeX` 以及 `\PlainTeX` 各种名称对应的标志，它们具体定义在 [`doc`][2] 宏包中；
  - `\XeTeX`, `\XeLaTeX`, `\LuaTeX` 以及 `\LuaLaTeX` 可以在 [`metalogo`][3] 宏我中找到；
  - e-TeX 及其它一些标志可以在 [`hologo`][4] 宏包中找到；
  - 最后，在 [`mflogo`][5] 宏包中可以找到 METAFONT logo；

`metalogo` 宏包还允许自定义 `\TeX`, `\LaTeX`, `\LaTeXe`, `\XeTeX`, `\XeLaTeX`, `\LuaTeX` 以及 `\LuaLaTeX` 等标志，这在使用非 Computer Modern 族字体时会比较有用。

可进一步参考 [http://www.tex.ac.uk/cgi-bin/texfaq2html?label=logos][6]。

  [1]: http://ctan.org/pkg/lshort
  [2]: http://ctan.org/pkg/doc
  [3]: http://ctan.org/pkg/metalogo
  [4]: http://ctan.org/pkg/hologo
  [5]: http://ctan.org/pkg/mflogo
  [6]: http://www.tex.ac.uk/cgi-bin/texfaq2html?label=logos