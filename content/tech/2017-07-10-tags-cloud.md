---
title: "添加标签云页面到 Hugo"
author: "彭浩"
date: "2017-07-10T19:22:44-23:00"
categories: ["4-Hugo"]
tags: ["4-Hugo", "4-标签云"]
slug: tags-cloud
---

Yihui 修改过的主题并不提供分类、标签云这样的分类功能，因此需要自己想办法解决。

由于标签和分类在 Hugo 都属于 Taxonomies 的一种实现，因此两种类别的内容的 Render 都由 `list.html` 来实现，要使用标签云就需要再单独定义与标签云匹配的模板文件（分为主站模板与 Section 下的模板）；

1. 整个站点的标签云由 `/layouts/taxonomy/tag.terms.html` 负责，按这种目录和文件名结构，Huxo 就能**自动**根据该文件中的信息生成 `tags/index.html`；
2. 调整 `/js/tags.js` 中的 `begin` 和 `end`，用于设定最小字体、最大字体以及每种标签对应的显示颜色；
3. 然而仅仅这样做还不够，因为还还需要生成每个 Section 下的标签云页面：在 `/contents/` 创建 `section-arts.md` 文件，并在其中指定 `type` 和 `layout` 信息，并且 `slug` 将文件映射到指定的路径，之后在 `/layouts/customterms/tagslist.html` 中指定文件的渲染模板，注意这里的 `customterms` 与前面在 `/contents/` 中的 `tags-*.md` 对应；
4. 由于 Hugo 目前无法获取指定 Section 下的 Categories 和 Tags，因此只好用了一些 Hack 的手法，给全部 Post 的 tags 和 categories 信息添加了一个特定的前缀编号（如 `4-tagName`），之后模板文件利用这些信息再配合 `config.yaml` 中的信息筛选出当前 Section 下的全部 tags；
5. 一些特殊的代码用于保证在标题中显示的 Section 信息以及 tag 的名称信息是正确的；
6. Categories 列表的处理这标签基本类似，只是站点下的分类页面使用了默认的 `list.html` 文件，而 Section 下的分类页面使用了 `/layouts/customterms/categorieslist.html` 文件；