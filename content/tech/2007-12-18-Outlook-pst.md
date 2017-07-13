---
title: Outlook 解决找不到 Outlook.pst z
date: 2007-12-18
categories: ["4-计算机 - 软件应用"]
tags: ["4-Office", "4-Outlook"]
slug: outlook-pst
---

找不到文件`C:\Documents and Settings\Administrator\Local Settings\Application Data\Microsoft\Outlook\Outlook.pst`，要求定位该文件： 

1. 开始 –> 运行 –> cmd（我建议用“附件”中的“命令提示行”，因为“cmd”下可能不支持长文件名和空格路径 
1. 在DOS下，用 `"cd xxx"` 切换到 Outlook.exe 可执行文件目录下（安装目录如：`C:\Program Files\Microsoft Office\OFFICE12`） 
1. 使用命令 `outlook /importprf .\.prf` 进行初始化 Outlook 数据文件。 
1. 初始化安装 Outlook 启动时，需要新建一电子邮件帐户界面[能到这里来的基本都不打算恢复邮件了吧？呵呵- -！] 

PS：该命令即：`outlook_/importprf_.\.prf` 其中`“_”`即空格键！ 

<hr />

我在安装 Outlook Connector 时，由于网络原因，下载新版本的 Connector（`OLC.msi`）失败，导致 Outlook 无法打开，使用上面的方法重新创建`outlook.pst`文件时，提示`msncon.dll`找不到，解决方法就是找到最新版的 Outlook Connector（如果你的Office不是正版，用迅雷搜 Outlook Connector试试）安装后就好。