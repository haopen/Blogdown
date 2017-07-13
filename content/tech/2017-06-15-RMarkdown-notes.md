---
title: RMarkdown 应用笔记
date: 2017-06-15
categories: ["4-R"]
tags: ["4-Pandoc", "4-RMarkdown", "4-Markdown", "4-html"]
slug: rmarkdown-notes
---

# 给 Chunk 添加新的 Class Name

<!-- more -->

## 普通代码高亮

根据<https://stackoverflow.com/questions/37944197/add-a-css-class-to-single-code-chunks-in-rmarkdown>的说明，Pandoc 的`fenced_code_attributes`默认在 RMarkdown 中已经打开，因此不需要再添加`md_extensions: +fenced_code_attributes`语句到 YAML 的`html_document`之下；又根据 [markdown-in-pandoc](/stylus/2016/10/26/markdown-in-pandoc/) 中 6.2.3 的说明可知，在`fenced_code_attributes`扩展启用的前提下，可以将下面的代码

~~~~html
```html
这是一个普通段落。

<table>
    <tr>
        <td>Foo</td>
    </tr>
</table>

这是另一个普通段落。
```
~~~~

修改成

~~~~html
```{.html .gray}
      ......
```
~~~~

这样就可以达到添加新 Class 名称的目的。

## R Chunk 中的代码高亮

### 推荐做法

根据<https://github.com/yihui/knitr-examples/>第 [116 号示例](https://github.com/yihui/knitr-examples/blob/master/116-html-class.Rmd)以及 [knitr 133 号问题](https://github.com/yihui/knitr/issues/1333)的讨论，可以给 R Chunk 一个`class.output`属性，如` ,class.output='myClass'`的方式添加一个输出样式类名称，如果需要多个，可以用` ,class.output=c("myclass1", "myclass2")`达到目的。

~~~~r
```{r df-drop-ok, class.source='bg-success', class.output='bg-success'}
mtcars[, "mpg", drop=FALSE]
```
~~~~

### 不推荐做法

可以参考<https://stackoverflow.com/questions/37944197/add-a-css-class-to-single-code-chunks-in-rmarkdown>，这种做法一是不如谢给出的官方做法适用，另一个原因是只能针对 R 起作用，换言之，想要高亮的代码是 html 时，需要将其中的钩子函数中的`.r`改成`.html`，一旦这样，又会只能对 html 代码起作用，所以不推荐。

# 属性解释

## 不理解

`class.source`和`class.output`同时出现在第 [116 号示例](https://github.com/yihui/knitr-examples/blob/master/116-html-class.Rmd)中，但目前不清楚其作用。