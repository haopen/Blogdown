---
title: Math version `bold' is not defined
date: 2013-04-26
categories: ["4-LaTeX"]
tags: ["4-Mathtime", "4-LaTeX"]
slug: math-version-bold-not-defined
---

使用 Y & Y Mathtime 字体，用 XeLaTeX 编译，提示：

    “Error: Math version `bold' is not defined.”

解决方法是在导言区添加：

	\DeclareMathVersion{bold}
