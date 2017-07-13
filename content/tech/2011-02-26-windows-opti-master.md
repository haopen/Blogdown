---
title: 使用 Windows 优化大师导致 Win7 出现的两个问题
date: 2011-02-26
categories: ["4-计算机 - 软件应用"]
tags: 
slug: windows-opti-master
---

# “其他用户”

该问题是在使用Windows优化大师进行注册表清理的时候导致的问题。目前官方没有给出相应的解决方法。该问题的描述见如下地址：<http://social.answers.microsoft.com/Forums/en-US/w7security/thread/63cea659-f6a0-412d-a0b1-952a26c1df44>；该问题的解决方法见如下地址：<http://jonhoo.wordpress.com/2010/06/24/windows-7-login-screen-only-showing-last-logged-on-user-and-other-user/>。请在按操作进行这前根据解决方案的步骤备份好注册表。

> Ever since my initial install of Windows 7, there has been one thing nagging me. The Windows welcome screen only ever displayed the avatar for the last logged on user and a blank image with the label “Other users”. When the latter was clicked, two text fields would appear prompting for username and password.  
>
I have tried [numerous solutions](http://social.answers.microsoft.com/Forums/en-US/w7security/thread/63cea659-f6a0-412d-a0b1-952a26c1df44), but none have worked until very recently when a user with the nickname “SaySay” came up with the following [solution](http://social.answers.microsoft.com/Forums/en-US/w7security/thread/63cea659-f6a0-412d-a0b1-952a26c1df44#9c76b69e-02e2-4f9f-9c09-19edd0f9dea5):
>
> > **Legal disclaimer**: Modifying REGISTRY settings incorrectly can cause serious problems that may prevent your computer from booting properly. Neither I nor Microsoft can guarantee that any problems resulting from the configuring of REGISTRY settings can be solved. Modifications of these settings are at your own risk
>
>1. Open regedit：
    1. `Press Windows+R`
	2. `Type regedit + enter`
1. Navigate to [HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList]
1. You will probably want to right-click on “ProfileList” and click export to save the entire subtree in case something goes wrong.
1. You will find several subfolders or “keys” named something like “S-1-x-xx…”, open them one at the time
1. Each should contain at least the three value-sets, “Flags”, “ProfileImagePath” and “State”, some will contain more
    1. Look at the end of ProfileImagePath for the name of the user represented by the key
    1. You will usually have one for each user on the system, and one for each of the three system entries ‘systemprofile’, ‘LocalService’ and ’NetworkService’
1. Delete any key (i.e. the whole “S-1-x-xx” folder) that does not contain at least those three values
1. The welcome screen should now work as expected, showing the avatar for all registered users; enjoy!

# “Computer Management Snapin Launcher 已停止工作”

这个是在安装了最新版的 Windows 优化大师后产生的问题。Uninstall 该软件之后问题就解决。

说明：现在的 Windows 优化大师已经不如从前，可以选择的优化软件也比较多。个人不推荐随意用各种软件来修改系统的设置。其实不经济进行软件的各种安装与反安装的话，系统也不怎么需要进行优化。