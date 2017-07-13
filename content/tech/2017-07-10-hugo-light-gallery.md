---
title: "添加 lightGallery 功能到 Hugo"
author: "彭浩"
date: "2017-07-10T23:49:00-23:59"
categories: ["4-Hugo"]
tags: ["4-Hugo"]
slug: hugo-light-gallery
---

Hexo 中用的 jQuery FancyBox 本来效果也不错，但是在移植这部分功能的时候并不顺利，又在搜索解决方案的时候看到了 lightGallery，配置和使用感觉都非常好，因此决定将 lightGallery 的图片浏览功能移植过来。

1. 下载相关文件并复制到恰当的目录；
2. 在模板文件中的适当位置，主要是 `header` 相关部分添加样式文件，在 `footer` 相关部分添加 js 相关的文件；
3. 一个比较麻烦的地方是，这个插件要求全部图片按比较规范的格式放到一个有 `id` 的 html 标记容器之中，思考尝试再三，最后通过 [`lgGallery_Prepare.js`](/js/lgGallery_Prepare.js) 文件大致达到了相应的目的；
4. 主要思路是先通过 js 遍历页面中的全部 `img` 元素，提取 `src` 属性并在一个隐藏的 `div` 中按 lightGallery 要求的[格式](http://sachinchoolur.github.io/lightGallery/demos/html-markup.html)再动态生成一遍。之后再通过 js 给原有的每张图片添加一个 `onclick` 属性，用于监听点击事件并通过 js 模拟点击隐藏 `div` 中对应的图片文件，最后由 lightGallery 监听到隐藏 `div` 中的点击事件并最终达到浏览图片的目的；
    - 不管是用 `setAttribute` 还是用 `createAttributes` 创建属性，最后除了 `onclick` 属性被传递出去外，其它的自定义名称的属性都不成功；
	- 要想在后面的代码中通过 `document.getElementById()` 的方式获取，就不能用 `innerHTML` 的方式，而要用 `createElement` 的方式；
	- 没有通过 `addEventListener` 给对象添加匿名函数的方式来处理，因为这时还没有完成 `div` 中内容的生成，这会导致后续的监听处理程序找不到动态生成的对象；
	- 对 `onclick` 属性，同时传递自身与事件的代码为 `javascript: lg_click(event, this);`，注意这里的 `event` 和 `this` 的顺序不能反，否则后面 `lg_click()` 中引用时会找不到对象，因此基本可以认为是固定用法。当然，只传递 `event` 或者 `this` 在语法上也是可行的；
	- 在 `lg_click()` 中要记得禁止点击事件向上冒泡；

最后，完整的配置文档可以从[这里](http://sachinchoolur.github.io/lightGallery/docs/api.html)找到。根据这个示例[配置文件](http://www.16css.com/jdt/1304.html)以及[官方示例文件](http://sachinchoolur.github.io/lightGallery/demos/dynamic.html)的说明，其实可以用 js 生成一个指定格式的数据对象，最后交由 lightGallery 来使用，但由于监听事件是与某个具体 `id` 的容器联系的，因此这种动态的方法与本站需要的点击某张图片打开浏览窗口的需求并不一致。