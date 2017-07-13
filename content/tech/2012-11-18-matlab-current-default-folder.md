---
title: 设置 MATLAB 中 Current Folder 的默认文件夹
date: 2012-11-18
categories: ["4-Matlab"]
tags: 
slug: matlab-current-default-folder
---

原文地址：<http://www.yueye.org/2011/set-matlab-current-default-folder.html>

在我们使用MATLAB的过程中，其`Current Folder`面板会给我们带来一定的便利性。但遗憾的是，MATLAB自身没有提供友好的设置界面，以供用户自如地设置Current Folder面板上的起始文件夹。这就给我们带来了一定的不便，毕竟每次启动MATLAB后都重新在Current Folder中设置到我们想要的文件夹地址会耗费一定的时间，也会影响我们的心情。

那么，我们应该如何在MATLAB中设置Current Folder面板上的**起始文件夹**位置呢？

在以前的MATLAB版本中，我们可以通过右击MATLAB安装目录下MATLAB快捷方式而在其弹出的对话框中通过设置快捷方式的起始位置而对Current Folder面板上的起始文件夹进行设置。但自从MATLAB进入R2010和R2011后，我们已经不能通过这样的设置来实现我们想要的效果。但MATLAB自身提供了另一种方式，虽然不太友好，但毕竟一次设置永久受益，还是让我们来一起设置一下吧。

首先，思考选择一个你要设置的文件夹路径，比如你可以保持一贯的传统，而设置为“MATLAB\R2011a\work\”文件夹；

接着，让我们进入MATLAB的安装目录下的`“MATLAB\R2011a\toolbox\local”`文件夹下，在local文件夹下新建一个名为`startup`的.m文件，在其中输入如下内容：

    cd D:\Program Files\MATLAB\R2011a\work

其中`cd`后面的内容为你要设置的起始文件夹路径。

需要注意的是，这里的路径不需要用引号引起来，也不需要做任何处理。编写好`startup.m`文件并保存后，再次启动MATLAB，可以看到，MATLAB的Current Folder面板上的起始文件夹已经变成了我们设置的路径。

这里还有一点需要特别说明的是，如果你要设置的**路径包含中文名**，比如`“D:\我的文档\MATLAB”`，则在编写好如下所示的`startup.m`文件内容：

    cd D:\我的文档\MATLAB

之后，还需要将该文件的编码修改为`Unicode`，MATLAB才能正常识别，从而你的设置才能正常发挥作用，MATLAB启动时，Current Folder面板上的起始文件夹初始地址才能变成设置的效果。
