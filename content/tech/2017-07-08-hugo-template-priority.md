---
title: "Hugo 模板优先级解读"
author: "彭浩"
date: "2017-07-08T19:09:00-21:00"
categories: ["4-Hugo"]
tags: ["4-Hugo"]
slug: hugo-template-priority
show_toc: true
---

# 功能解读

- `\layouts\` 用于放置模板文件，并且文件在该目录中的名称、文件层次决定了模板应用的优先级。
- `\archetypes\` 是内容文件 `.md` 的模板；
- <https://gohugo.io/templates/functions/>：方法、函数列表；
- <https://gohugo.io/templates/variables/>：模板可操作的变量和对象列表；
- `$section` 是通过赋值得到的一个可使用的页面级变量，而 `.Section` 是一个 Hugo 自带的变量；

# 自定义功能实现

目前来说 `list.html` 可以遍历全部的 Section，但 Taxonomy Terms 只有一个 `tags` 目录和一个 `categories` 目录，并不能遍历全部的 Section。

<https://discourse.gohugo.io/t/create-section-taxonomies/343> 想为每个 Section 都创建 tags 和 categories 页面，但后续的讨论应该是没有成功，个人觉得如果能够返回某个 Section 下的所有 tags 对象和 categories 对象时，这个功能才有可能实现。

根据 <https://discourse.gohugo.io/t/create-page-with-type-or-layout-template-set-in-frontmatter/5265> 和 <https://github.com/gohugoio/hugo/issues/386>，虽然可以通过给单独文件定义 `type` 和 `layout` 来做一些事情，但由于无法返回指定 Section 下的 Taxonomy Terms 集合，因此为每个 Section 都创建 tags 和 categories 页面的想法仍然无法实现。

## 文章列表视图

根据 <https://gohugo.io/templates/views/>，除了 [single](https://gohugo.io/templates/content/) 类型的模板外，每个 Section 都可以利用 [list templates](https://gohugo.io/templates/list/) 生成各种不同的视图，<https://gohugo.io/templates/homepage/> 中给出了一个使用摘要视图的例子：

```django
{{ range first 10 .Data.Pages }}
    {{ .Render "summary"}}
{{ end }}
```

其中的 `summary` 还可以是 `li` 类型，相关的文件目录结构为：

```{.txt .dirTree}
▾ layouts/
  ▾ arts/
      li.html
      single.html
      summary.html
  ▾ tech/
      li.html
      single.html
      summary.html
```

其中 `li.html` 和 `summary.html` 实际上在 `\layouts\_default\list.html` 这样的 list templates 类模板文件中使用，起到循环的作用。`list.html` 以及这两种元视图文件的示例参考 <https://gohugo.io/templates/views/>。

## tags 页面

经试验，`\contents\tags\` 目录（及子目录）下使用 `_index.md` 不是使用 `terms.html` 相关的模板（比如 `terms.html` 或者 `taxonomy/tag.terms.html`），而是使用了 `list.html` 作为模板，换句话讲，要想让不同的 Section 有自己的标签云页面，在 `\contents\` 下创建如下目录结构的想法~~行不通~~：

```{.txt .dirTree}
└── content
    ├── tags
    |   ├── _index.md
    |   ├── tech
    |   |   └── _index.md
    |   └── arts
    └── tech
        ├── first.md
        └── second.md
```

# 模板部件

## 页面类型

[变量](https://gohugo.io/templates/variables/)一节中 Page variables 下的 `.Kind` 指出，页面的类型有：page, home, section, taxonomy, taxonomyTerm, RSS, sitemap, robotsTXT 以及 404，但是附带的说明还没有看懂^[but these will only available during rendering of that kind of page, and not available in any of the `Pages` collections.]。

## Home Page

根据 <https://gohugo.io/templates/homepage/>，Home page 的模板优先级如下：

```txt
/layouts/index.html
/layouts/_default/list.html
/layouts/_default/single.html
```

在 Home page 的模板中，可以访问全部 [`page variables`](https://gohugo.io/templates/variables/) 和 [`site variables`](https://gohugo.io/templates/variables/) 中的变量，除此之外，Home page 可以通过 `.Data.Pages` 访问全部页面对象，具体方法可以参考 [Lists Template](https://gohugo.io/templates/list/) 部分的介绍。

## single

根据 <https://gohugo.io/templates/content/>，每一篇 post，甚至全部的 `_index.md` 都可以视为一个单页（但是 list 和 terms.list 类的页面不是）的模板优先级如下：

```txt
/layouts/TYPE/LAYOUT.html
/layouts/SECTION/LAYOUT.html
/layouts/TYPE/single.html
/layouts/SECTION/single.html
/layouts/_default/single.html
```

其中的 `TYPE` 和 `LAYOUT` 可以在单个的 post 之中，以 `type` 和 `layout` 属性对的形式出现在 front-matter 之中；`SECTION` 则是依据 md 文件在 `\contents\` 中对应的文件夹而确定。