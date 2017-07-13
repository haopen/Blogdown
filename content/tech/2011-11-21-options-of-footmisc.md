---
title: footmisc 宏包选项的简短说明
date: 2011-11-21
categories: ["4-LaTeX"]
tags: ["4-LaTeX", "4-footnote", "4-footmisc", "4-脚注"]
slug: options-of-footmisc
---

原文地址：<http://hi.baidu.com/albertleemon/blog/item/a7f4d2e715772926b93820a3.html>

该宏包提供了许多选项，可使脚注命令`\footnote{注释}`生成多种样式的脚注。其中：

- perpage：为每页脚注单独编号；
- stable：可避免章节标题中的脚注随同章节标题出现在目录或页眉之中；
- side：将脚注改为边注；
- multiple：给正文中两个以上的并排脚注标号之间加上分隔逗号；
- para：将本页的所有脚注合为一个段落；
- symbol：将脚注的数字序号改为`*`号等不同的符号；
- ragged：不采用断词等方法使脚注文本右端对齐；
- marginal：使脚注首行不缩格；
- flushmargin：类似`marginal`选项，只是脚注序号更靠近脚注；
- hang：使脚注文本向右缩进一段距离；
- norule：取消正文与脚注之间的一条短横线。

PS：在使用 footmisc 宏包后，如果脚注的编号不对或者编号所在的位置有问题时，再编译一次即可解决。