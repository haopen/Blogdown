---
title: 创建 SAS 宏变量的几类方法及举例 z
date: 2011-04-11
categories: ["4-SAS"]
tags: ["4-SAS", "4-Macro", "4-宏"]
slug: 2011-04-11-sas-macro-definition
---

**原文地址**：<http://saslist.net/archives/122>

SAS 里面除了变量，还有宏变量，其用途也非常广泛。创建宏变量的方法最早有 shiyiming 总结，翻了翻 Rick Aster的`Professional SAS Programming Shortcuts – Over 1,000 Ways To Improve Your SAS Programs`，发现里面并没有总结这个问题，有点失望。

这里转载并补充姚志勇的 SAS 书里面的内容，使得更加完整和充实，便于大家以后方便选择使用，一共有 4 类方法。

<!-- more -->

# 通过直接赋值或通过宏函数创建宏变量 - 最基本最常用

```sas
%let mv = 100;

%let dsid=%sysfunc(open(sashelp.class));

%let nvars=%sysfunc(attrn(&dsid,nvars));
%let nobs=%sysfunc(attrn(&dsid,nobs));
%let dsid=%sysfunc(close(&dsid));
%put &nvars.;
%put &nobs.;
```

# 通过 data 步接口子程序 call symputx 与 call symput - 有区别

## 创建单个宏变量

```sas
call symput('x', x);
run;
data _null_;
    set sashelp.class nobs=obs;
    call symputx('m1',obs);
    call symput('m2',obs);
    Stop;
run;
%put &m1.;
%put &m2.;
```

## 为某变量的每个值创建一个宏变量

```sas
data _null_;
    set sashelp.class;
    suffix=put(_n_,5.);
    call symput(cats(‘Name’,suffix), Name);
run;
```

## 为表的每个值创建一个宏变量

```sas
data _null_;
    set sashelp.class;
    suffix=put(_n_,5.);
    array xxx{*} _numeric_;
    do i =1 to dim(xxx);
        call symput(cats(vname(xxx),suffix),xxx);
    end;
    array yyy{*} $ _character_;
    do i =1 to dim(yyy);
        call symput(cats(vname(yyy),suffix),yyy);
    end;
run;
```

# proc sql 方法 - 灵活

## 通过 SQL 过程用变量值创建一个宏变量

```sas
proc sql noprint;
    select distinct sex
        into :list_a separated by ''
        from sashelp.class;
    quit;
%put &list_a.;
```

## 通过 SQL 过程创建多个宏变量

```sas
proc sql noprint;
select nvar,nobs
into:nvar , :nobs
from dictionary.tables
where libname = ‘SASHELP’ and memname = ‘CLASS’;
quit;
%put &nvar.;
%put &nobs.;
```

## 通过 contents 和 sql 过程用变量名创建宏变量

```sas
proc contents data=sashelp.class out=con_class;
run;
proc sql noprint;
    select name,put(count(name),5.-l)
        into :clist separated by ‘ ‘,:charct
        from con_class
        where type=2;
quit;
%put &clist.;
%put &charct.;
```

d.通过SQL过程用宏变量创建宏变量列表

```sas
proc sql noprint;
    select name
        into :clist1-:clist999
        from dictionary.columns
        where libname = ‘SASHELP’ and memname = ‘CLASS’;
quit;
%put &clist1.;
%put &clist2.;
```

e.通过SQL过程用变量值创建宏变量列表

```sas
proc sql noprint;
    select count(distinct sex)
        into :n
from sashelp.class;
    select distinct sex
        into :type1 – :type%left(&n)
        from sashelp.class;
quit;
%put &n.;
%put &type1.;
```

# 使用 call set - 处理对照表数据最强，灵活方便，性能最优

```sas
%macro doit;
    %let id=%sysfunc(open(sashelp.class));
    %let NObs=%sysfunc(attrn(&amp;id,NOBS));
    %syscall set(id);
    %do i=1 %to &amp;NObs;
        %let rc=%sysfunc(fetchobs(&amp;id,&amp;i));
        %put # # # Processing &amp;Height # # #;
    %end;
    %let id=sysfunc(close(&amp;id));
%mend;
```

# 参考

1. SAS 中文论坛. [几种给宏变量赋值的方法](http://www.mysas.net/forum/viewtopic.php?f=4&t=3536), shiyiming.
2. 姚志勇. SAS 编程与数据挖掘商业案例, 2010, p171-173.