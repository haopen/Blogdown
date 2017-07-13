---
title: "添加本地搜索功能到 Hugo"
author: "彭浩"
date: "2017-07-10T23:13:00-23:23"
categories: ["4-Hugo"]
tags: ["4-Hugo", "4-本地搜索", "4-xml"]
slug: hugo-local-search
---

Yihui [修改过的主题]( https://github.com/yihui/yihui.name)并不提供本地搜索功能，但 [Hexo](https://hexo.io/) 的 [NexT](http://theme-next.iissnan.com/) 主题却有一个插件（[JS](https://github.com/iissnan/hexo-theme-next/blob/master/layout/_third-party/search/localsearch.swig)、[html](https://github.com/iissnan/hexo-theme-next/blob/master/layout/_partials/search/localsearch.swig)、[css](https://github.com/iissnan/hexo-theme-next/blob/master/source/css/_common/components/third-party/localsearch.styl)）可以实现该功能，可以考虑将这个功能移植过来。

# 模板文件

1. 按 Hugo 的规模将 js, html, css 文件复制到对应的目录，并在模板文件中添加对应的引用；
2. 修改 css 的定义，实现与现有主题的风格搭配；
3. js 文件中找到关键的三处配置，一是 `.xml` 数据文件的路径，二是每条 Post 中匹配关键词的文本片断的数量，三是搜索的触发方式是 onkeypress 还是 enter 式，对应于 `auto` 和 `manual` 两个选择；
4. `$('.popup').detach().appendTo('...')` 这里的 `appendTo` 实际上是随意指定的，要更换成本主题的某个 html 标记容器，这个地方的错误查了将近 7 个小时；
5. 搜索引擎 js 文件可以异步加载，但是 `jQuery.min.js` 文件却最好直接加载，以避免引起不必要的麻烦；

# 数据文件

xml 数据文件在 Hugo 中的生成有些特殊，可按下面的步骤进行：

1. 添加如下代码到 `\contents\search-index.md` 文件：
```yaml
---
date: "2017-03-05T21:10:52+01:00"
type: "search"
url: "search.xml"
---
```

2. 添加模板文件到 `/layouts/search/single.html`。这个文件中的 `search` 路径由第 1 点中的 `type` 取舍指定，而 `single.html` 是 Hugo 的模板优先级规则确定的；

**说明**：根据模板文件生成 xml 文件在 Hugo 中并不方便，原因是 Hugo 会将模板文件中的 `<` 强制转换成 `&lt;`，而 <https://github.com/gohugoio/hugo/issues/1740> 提供的 hack 手段比较好的解决了这个问题，具体的实现当然还需要根据实际情况做相应调整，可以参见这个模板文件的内容：

```xml
{{ `<?xml` | safeHTML }} version="1.0" encoding="utf-8" ?>
<!-- Hugo 在转换模板时，< 这个符号总是被强制转换为 &lt; -->
<!-- 根据 https://github.com/gohugoio/hugo/issues/1740 使用如下的 Hack 可以解决 -->
<!-- part1 和 part2 的内容在 "/cn/" 这样的情形中，前者是 cn，后者是 /cn/ -->
<!-- 第一个 if：是不是只有一级路径 /cn/ -->
<!-- 第二个 if：是不是特殊的二级路径 -->
<!-- 第三个 if：是不是特殊的一级路径 -->
<!-- 第四个 if：search.xml 和 主页 -->

<search>
    {{ range $index, $page := .Site.Pages }}
    {{ $.Scratch.Set "Part1" (replaceRE "^/([^/]+)/.*" "$1" $page.RelPermalink) }}
	{{ $.Scratch.Set "Part2" (replaceRE "^/([^/]+)/([^/]+)/.*" "$2" $page.RelPermalink) }}
    {{ $.Scratch.Set "Part2" (replace Part2 "/" "" ) }}
	<!-- 上面两行在真实代码中被合并成了一行 -->
    {{ if not (eq ($.Scratch.Get "Part1") ($.Scratch.Get "Part2")) }}
    {{ if not (in (split "tags,categories,vitae,about" ",") ($.Scratch.Get "Part2")) }}
    {{ if not (in (split "tags,categories" ",") ($.Scratch.Get "Part1")) }}
    {{ if not (or (eq $page.Title "") (eq $page.RelPermalink "/")) }}
    <entry>
    	{{ `<title><!` | safeHTML }}[CDATA[{{ $page.Title }}]]></title>
    	<url>{{ $page.RelPermalink }}</url>
		{{ `<content type="text"><!` |safeHTML }}[CDATA[{{ $page.PlainWords }}]]></content>
    </entry>
	{{ end }}{{ end }}{{ end }}{{ end }}{{ end }}
</search>
```