---
title: SAS 使用 proc report 实现同比、环比、占比、sql 的窗口函数 z
date: 2017-02-09
categories: ["4-SAS"]
tags: ["4-SAS"]
slug: proc-report
---

**原文地址**：<http://www.cnblogs.com/SSSR/p/6904636.html>

使用 SAS 实现同比、环比、占比，其中环比和占比是使用`proc report`实现的，环比使用`data`步实现，但是其中每年的总计是使用`proc report`来实现的。

`proc report`可以实现`proc print`, `proc tabluate`, `proc sort`, `proc means`以及`data`步的一些功能，所以有中想法，把`proc report`当做是进行复杂统计的实现方法之一，比如 sql 中的开窗函数就可以用`proc report`实现。

以下是具体的代码和数据。代码参考自：Using PROC REPORT To Produce Tables With Cumulative Totals and Row Differences

> **总结**：`report`的`compute`步中是先一列一列的计算，新增列的时候可以用前面列的数据，跟在`data`步中新建列感觉区别不大，可以使用`data`步中的函数。

<!-- more -->

最后的`BREAK AFTER year / SUMMARIZE SKIP OL UL ;`这里只能是`summarize`求和，不能是其他的。

想着测试一下`data`步中的`lag`函数在`report`的`compute`中是否可以使用，没想到呀！居然可以直接求出来同比，大赞，记录下。

```sas
DATA quarter;
DO year=97 TO 99;
DO j=1 TO 12;
IF j=1 THEN xx='1dec1997'd;
QUARTER=QTR( intnx('month',xx,J) );
DO n=1 to 100;
sales=int(normal(123)*(20)+quarter*7);
IF QUARTER=3 THEN SALES=SALES-15;
OUTPUT;
END;
END;
END;
RUN;
PROC FORMAT ;
VALUE PCTA
.='(na)'
OTHER=[PERCENT8.0];
VALUE DOLLARA
.='(na)'
OTHER=[DOLLAR8.0];
RUN;


ods html file='c:/myhtml.htm';

PROC REPORT DATA=QUARTER NOWD OUT=Six
SPLIT="*" CENTER HEADSKIP HEADLINE;
COLUMN
( year quarter )
( sales=salessum pct)
(diff diff_pct pct_tongbi) ;
DEFINE year / GROUP;
DEFINE quarter / GROUP FORMAT=8. CENTER;

DEFINE salessum / ANALYSIS sum FORMAT=DOLLAR8. SUM ;
DEFINE pct / computed FORMAT=PERCENT8.0 ;
DEFINE diff / COMPUTED FORMAT= DOLLAR8.0 ;
DEFINE diff_pct / COMPUTED FORMAT=percent9.0;
define pct_tongbi/computed format=percent9.0;
COMPUTE BEFORE year ;*modify;
r=0;
last=0;
total=salessum;
ENDCOMP;

COMPUTE pct;/*实现了sql的窗口函数*/
pct=salessum/total;
ENDCOMP;
COMPUTE diff ;
r+1;
IF r=1 THEN diff=. ;
else DO;
if _BREAK_ EQ " " THEN
diff=salessum-last ;
else diff = . ;
end;
last = salessum;
ENDCOMP;


COMPUTE diff_pct ;
diff_pct= (diff/(last-diff) );
ENDCOMP;

COMPUTE pct_tongbi;/*计算同比，可以直接使用lag函数，so data步中的很多函数估计就都可以在report中使用了！*/
pct_tongbi=salessum/lag6(salessum)-1;
ENDCOMP;

BREAK AFTER year / SUMMARIZE SKIP OL UL ;

RUN;

ods html close;
```

以下代码比较复杂，计算同比使用了`data`步。

```sas
DATA quarter;
DO year=97 TO 99;
DO j=1 TO 12;
IF j=1 THEN xx='1dec1997'd;
QUARTER=QTR( intnx('month',xx,J) );
DO n=1 to 100;
sales=int(normal(123)*(20)+quarter*7);
IF QUARTER=3 THEN SALES=SALES-15;
OUTPUT;
END;
END;
END;
RUN;
PROC FORMAT ;
VALUE PCTA
.='(na)'
OTHER=[PERCENT8.0];
VALUE DOLLARA
.='(na)'
OTHER=[DOLLAR8.0];
RUN;

/*这个是实现占比和环比的，生成了一个数据集，all也在这里生成了*/
ods html file='c:/myhtml.htm';

PROC REPORT DATA=QUARTER NOWD OUT=Six
SPLIT="*" CENTER HEADSKIP HEADLINE;
COLUMN
( year quarter )
( sales=salessum pct)
(diff diff_pct) ;
DEFINE year / GROUP;
DEFINE quarter / GROUP FORMAT=8. CENTER;

DEFINE salessum / ANALYSIS sum FORMAT=DOLLAR8. SUM ;
DEFINE pct / computed FORMAT=PERCENT8.0 ;
DEFINE diff / COMPUTED FORMAT= DOLLAR8.0 ;
DEFINE diff_pct / COMPUTED FORMAT=percent9.0;

COMPUTE BEFORE year ;*modify;
r=0;
last=0;
total=salessum;
ENDCOMP;

COMPUTE pct;
pct=salessum/total;
ENDCOMP;
COMPUTE diff ;
r+1;
IF r=1 THEN diff=. ;
else DO;
if _BREAK_ EQ " " THEN
diff=salessum-last ;
else diff = . ;
end;
last = salessum;
ENDCOMP;


COMPUTE diff_pct ;
diff_pct= (diff/(last-diff) );
ENDCOMP;


*BREAK AFTER year / SUMMARIZE SKIP OL UL ;

RUN;

ods html close;

 

/*对report中生成的数据集进行进一步的加工*/
DATA sixout(keep=year quarterx salessum pct diff_pct);
retain year quarterx salessum pct diff_pct ;
set six;
if quarter=. then quarterx='ALL';
else quarterx=quarter;
if not missing(_break_) then pct=1;
RUN;

/*排序，为下一步求同比做准备*/

proc sort data=sixout out=sixout;
by year quarterx;
run;

/*求同比直接用lag5函数即可，这个大家都知道，*/

/* 但是有时候我们会遇到今年和去年的分类数据不同，必去去年一季度有数据，但是今年为0，就不现实了，
   所以这个时候我们还需要先将所有的分类（季度）数据和年份进行全匹配，缺失的填充为0，然后再进行处理 */

data sixx_result;
set sixout;
*lag5=lag5(salessum);
tongbi=salessum/lag5(salessum)-1;
format tongbi PERCENT8.2 ;
format pct PERCENT8.2 ;
format diff_pct PERCENT8.2 ;
run;
```