---
title: 根据浏览器类型、屏幕分辨率调用不同的样式文件 z
date: 2016-09-23
categories: ["4-计算机 - 网页编程"]
tags: ["4-CSS", "4-Javascript"]
slug: js-css-webagent
---

**原文地址**：<http://blog.csdn.net/duchao123duchao/article/details/52638506>

# 根据分辨率提供不同的 CSS 样式

```css
@media screen and (min-width: 320px) and (max-width: 480px){
	在这里写小屏幕设备的样式
}

@media only screen and (min-width: 321px) and (max-width: 1024px){
	这里写宽度大于321px小于1024px的样式(一般是平板电脑)
}

@media only screen and (min-width: 1029px){
	这里写pc客户端的样式
}
```

<!-- more -->

# 用 js 根据客户端输出对应样式

```javascript
/* 事实上用 asp、php 后台判断更保险，js 在前端，有可能被用户禁止 */
function loadCSS() {
  if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|iOS|iPad|Android|wOSBrowser|BrowserNG|WebOS)/i))) {
         document.write('<link href="css/pad-phone.css" rel="stylesheet" type="text/css" media="screen" />');
     }
     else {
         document.write('<link href="css/pc.css" rel="stylesheet" type="text/css" media="screen" />');
     }
}
loadCSS();
```

# 既判断分辨率，也判断浏览器

应 E.Qiang 提议，重新完善代码，使之成为判断浏览器类型屏幕分辨率自动调用不同 CSS 的代码，代码如下：

```javascript
<SCRIPT LANGUAGE="JavaScript">
<!--
if (window.navigator.userAgent.indexOf("MSIE")>=1) {
	var IE1024="";
	var IE800="";
	var IE1152="";
	var IEother="";
	ScreenWidth(IE1024,IE800,IE1152,IEother)
} else {
	if (window.navigator.userAgent.indexOf("Firefox")>=1) {
		 // 如果浏览器为Firefox
		 var Firefox1024="";
		 var Firefox800="";
		 var Firefox1152="";
		 var Firefoxother="";
		 ScreenWidth(Firefox1024,Firefox800,Firefox1152,Firefoxother)
	} else {
		// 如果浏览器为其他
		var Other1024="";
		var Other800="";
		var Other1152="";
		var Otherother="";
		ScreenWidth(Other1024,Other800,Other1152,Otherother)
	}
}

function ScreenWidth(CSS1,CSS2,CSS3,CSS4)	{
	if ((screen.width == 1024) && (screen.height == 768)) {
		setActiveStyleSheet(CSS1);
	} else {
		if ((screen.width == 800) && (screen.height == 600)) {
			setActiveStyleSheet(CSS2);
		} else {
			if ((screen.width == 1152) && (screen.height == 864)) {
				setActiveStyleSheet(CSS3);
			} else {
				setActiveStyleSheet(CSS4);
			}
		}
	}
}
 
function setActiveStyleSheet(title){
	document.getElementsByTagName("link")[0].href="style/"+title;
}
//-->
</SCRIPT>
```

# 解释

```javascript
var IE1024="";
var IE800="";
var IE1152="";
var IEother="";
```

引号里面分别填写用户使用 IE 并且分辨率为`1024*768, 800*600, 1152*864`的时候要使用的 css 文件名。

```
var Firefox1024="";
var Firefox800="";
var Firefox1152="";
var Firefoxother="";
```
引号里面分别填写用户使用 FF 并且分辨率为`1024*768, 800*600, 1152*864`的时候要使用的 css 文件名。

```
var Other1024="";
var Other800="";
var Other1152="";
var Otherother="";
```
引号里面分别填写用户使用其他浏览器并且分辨率为`1024*768, 800*600, 1152*864`的时候要使用的 css 文件名。

# 例子

1. 不判断分辨率，只判断浏览器，实现根据浏览器类型自动调用不同CSS。

```
<SCRIPT LANGUAGE="JavaScript">
<!--
if (window.navigator.userAgent.indexOf("MSIE")>=1) {    
	// 如果浏览器为IE
	setActiveStyleSheet("default.css");
	} else {
		if (window.navigator.userAgent.indexOf("Firefox")>=1) {
			// 如果浏览器为Firefox
			setActiveStyleSheet("default2.css");
		} else {
			// 如果浏览器为其他
			setActiveStyleSheet("newsky.css");
		}
	}
	function setActiveStyleSheet(title){
	document.getElementsByTagName("link")[0].href="style/"+title;
}
//-->
</SCRIPT>
```

**解释**：

- 如果浏览器为 IE，则调用 default.css
- 如果浏览器为 Firefox，则调用 default2.css
- 如果浏览器为其他，则调用 newsky.css

**用法**：放在`</head>`前面即可。


2. 只要求判断根据屏幕宽度选择不同的 CSS 样式表。

```javascript
<script language=javascript>
<!--
if (screen.width == 800) {
	document.write('<link rel=stylesheet type="text/css" href="css800.css">')
}
else {
	document.write('<link rel=stylesheet type="text/css" href="css1024.css">')
}
//-->
</script>
```