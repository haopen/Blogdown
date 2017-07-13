---
title: Matlab 中的 eval 与 feval 函数
date: 2012-12-07
categories: ["4-Matlab"]
tags: ["4-Matlab", "4-eval"]
slug: matlab-eval-feval
---

# eval函数用法简介

原文地址：<http://www.ilovematlab.cn/thread-53554-1-1.html>

`eval(expression)`用于执行其参数中包含的 `expression`。例如，把 `August1.mat` 到 `August3.mat` 加载到 `MATLAB workspace`：

```matlab
for d=1:3
   s = ['load August' int2str(d) '.mat']
   eval(s)
end
```

上面的部分代码也可以写成 `s = ['load August', int2str(d), '.mat']`，也就是中间用逗号隔开，这样才能把三部分合成一个字符串，以下是被执行的 `s` 语句：

```matlab
s =
   load August1.mat
s =
   load August2.mat
s =
   load August3.mat
```

<!-- more -->

# feval函数用法简介

原文地址：<http://www.madio.net/thread-170200-1-1.html>

`[y1,..,yn] = FEVAL(F,x1,...,xn)`，`F` 是需要使用函数的函数名，或者句柄(见下面程序注释)；`xi` 是函数的参数，`yi` 是函数的返回值。

举例，假设需要调用的函数 `foo` 定义如下：

```matlab
function x=foo(a,b)
x=a*b;
```

若在 `main` 函数中用 `feval` 调用 `foo`，可以有以下几种方式：

> 1. `result=feval('foo',3,15);`
> 2. `result=feval(@foo,3,16); % 这里@foo是函数foo的句柄`
> 3. 若调用的函数要作为`main`的参数，则

```matlab
function result=main(f)
result=feval(f,3,10);
```

然后调用 `main` 时将 `'foo'` 传入即可：

```matlab
>>main('foo');
```

# feval和eval的区别

原文地址：<http://powerelite.blog.163.com/blog/static/42965891201272725641245/>

`feval` 和 `eval` 运行区别之一：`feval` 的 `FN` 不能是表达式，其 `FN` **只接受函数名**。函数 `eval` 给 MATLAB 提供 **宏** 的能力，该函数提供了将用户创建的函数名传给其它函数能力，以便求值。函数 `feval` 与 `eval` 类似，但在用法上有更多的限制。`feval('fun',x)` 求由字符串 `'fun'` 给定的函数值，其输入参量是变量 `x`，即 `feval_r('fun',x)` 等价于求 `fun(x)` 值，注意下面代码中的运行错误解决方法见上面 `feval` 函数的三种使用方法。

```matlab
format short
x=pi/4;
Ve=eval('1+sin(x)') 
Ve =
    1.7071 
Vf=feval('1+sin(x)',x) 
??? Error using ==> feval
Invalid function name '1+sin(x)'.
```

# 关于带参数的积分问题

原文地址：<http://forum.chinavib.com/thread-42369-1-1.html>

有不少人常问带参数的积分问题该如何处理,现举一个例子，希望能起到抛砖引玉的作用。

```matlab
%%%--------------------------------------------%%%
例如以下问题:
函数为 y=sin(k.*x).*x.^2，对x积分，
积分区域为【1，5】，目的是要画 k 和 y 的图形.
%%%============================================%%%
%%% 作k的一个循环, k作为 inline函数的参数即可.
clear all
k=linspace(0,5);
for i=1:length(k)
    kk=k(i);
    fun=strcat('sin(',num2str(kk),'*x).*x.^2');
    y(i)=quadl(inline(fun),1,5);
end
plot(k,y)
%%%============================================%%%
```

**注意**：这个程序的特别意义在于，对于任何复杂的、无显式积分表达式的带参数积分问题具有通用性，我主要是针对此而写的。

# Matlab中函数调用及`feval`函数，带参数积分问题

原文地址：<http://www.ilovematlab.cn/thread-36666-1-1.html>

```matlab
function InlineSubAnonymousNestedDemo
% 带参数的积分问题
% 例如
% 函数为 y=sin(k.*x).*x.^2，对x积分，
% 积分区域为【1，5】，目的是要画 k 和 y 的图形.
% 例子意义在于,对于一些复杂的、无显式积分表达式的带参数积分问题具有通用性
% 问题来源于振动论坛原xjzuo版主发的一个帖子；
% 原帖地址：http://www.chinavib.com/forum/thread-42369-1-2.html%% 用inline解决
tic;
k=linspace(0,5);
y1 = zeros(size(k));
for i=1:length(k)
    kk=k(i);
    fun=inline(['sin(',num2str(kk),'*x).*x.^2']);
    y1(i)=quadl(fun,0,5);
end
time = toc;
disp(['用inline方法的时间是：',num2str(time),'秒!'])%% 用anonymous function 解决
tic;
f=@(k) quadl(@(x)  sin(k.*x).*x.^2,0,5);
kk=linspace(0,5);
y2=zeros(size(kk));
for ii=1:length(kk)
y2(ii)=f(kk(ii));
end
time = toc;
disp(['用anonymous function方法的时间是：',num2str(time),'秒!'])%% 用nested function解决
function y = ParaInteg(k)
y=quadl(@(x) sin(k.*x).*x.^2 ,0,5);
end
tic;
kk=linspace(0,5);
y3=zeros(size(kk));
for ii=1:length(kk)
y3(ii)=ParaInteg(kk(ii));
end
time = toc;
disp(['用nested function方法的时间是：',num2str(time),'秒!'])%% 用 arrayfun + anonymous function 解决
tic;y4 = arrayfun(@(k) quadl(@(x)  sin(k.*x).*x.^2,0,5),linspace(0,5));time = toc;
disp(['用arrayfun + anonymous function方法的时间是：',num2str(time),'秒!'])
plot(kk,y2);
end
```