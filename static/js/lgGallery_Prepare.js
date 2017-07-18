  function img_data_src() {
    var objlg_container = document.getElementById("images-container");
    var tags = document.getElementsByTagName("img"), i, tag;
	var imgSrc = "";
	var imgCount = tags.length
	for (i=1; i < imgCount; i++) {
	  tag = tags[i];
	  tag.setAttribute('onclick', 'javascript: lg_click(event, this);');
	  
	  var objlg_A = document.createElement("a");
	    objlg_A.href = tag.src;
	    objlg_A.id   = "lightGalleryA" + i.toString();
      objlg_container.appendChild(objlg_A);
	}
	// 不能在上面的循环中嵌套定义一个子节点放 img ，否则浏览器会崩溃
	// document.createElement 动态创建的元素后面才能真正获取得到
	for (i=1; i< imgCount; i++) {
	  var objlg_A = document.getElementById("lightGalleryA" + i.toString());
	  var objlg_Img = document.createElement("img");
	    objlg_Img.src   = tags[i].src;
		objlg_Img.className = "lightGalleryImg";
		objlg_Img.id    = "lightGalleryImg" + i.toString();
	  objlg_A.appendChild(objlg_Img);
	}
  }
  function lg_click(e, object) {
    // 不能打包到上面部分代码中作为匿名函数，否则访问不到；
    // 动态创建的属性无法在事后访问到，因此只好根据传过来的 src 一个一个对比
    e = e || window.event;
	if (e.preventDefault) {e.preventDefault();}
    if (e.stopPropagation) {e.stopPropagation();}
    e.cancelBubble = true;

	var lgImgs = document.getElementsByClassName("lightGalleryImg"), lgImg;
	var lgSrc = ""
	// 前面用 i=0 是要去 logo，这里 lgImgs 中已经没有 logo，因此从 0 开始
	for (i=0; i < lgImgs.length; i++) {
	  if (object.src == lgImgs[i].src)
	    lgImg = lgImgs[i];
	}
	lgImg.click();
  }
  img_data_src();

$(document).ready(function() {
  $("#images-container").lightGallery(); 

  var objNavLI = $(".nav-links > li"), i;
  var strHref = location.href;
  if (strHref.indexOf("github.io") > 0) {
    if (strHref.indexOf("github.io/cn") > 0) {
      for (i=0; i<objNavLI.length; i++) { objNavLI[i].firstChild.href = "#"; }
	} else {
	  if (!((strHref.indexOf("github.io/arts") > 0) || (strHref.indexOf("github.io/tech") > 0) || (strHref.indexOf("github.io/data") > 0) || (strHref.indexOf("github.io/prof") > 0))) {
	    for (i=0; i<2; i++) { objNavLI[i].firstChild.href = "#"; }
	  }
	}
  }
});
