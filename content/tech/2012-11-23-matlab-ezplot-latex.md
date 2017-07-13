---
title: Matlab 画二维图心得
date: 2012-11-23
categories: ["4-Matlab"]
tags: ["4-图形", "4-LaTeX"]
slug: matlab-ezplot-latex
---

1. `plot()`函数主要用于已有坐标对的连接（包括单个坐标，利用这一点再加上修改`MarkSize`可以画出指定大小的圆点等各种符号）；
1. `ezplot()`既可以画普通函数的图像，也可以画隐函数图像，换句话说，对于给定的函数，`ezplot()`可以实现`plot()`的结果；
1. 根据`ezplot()`作隐函数图像的原理，<http://www.ilovematlab.cn/thread-21438-1-1.html>给出了一种用`ezplot()`同时画两条曲线的巧妙方法，但要注意该方法无法将两条曲线区分开来，因此可能会导致利用`legend()`添加图例的意图无法达到。
1. 添加多条曲线时要利用好`hold on`这一语句；
1. `axis`的刻度在默认情况下会自动根据给出的最后一次`ezplot()`进行调整，如果不希望画出的图像为自适应大小，需要在图像绘制完成后，手工指定axis的x轴与y轴最大、最小刻度；
1. 添加箭头可以用annotation完成，要注意其坐标是相对大小，在`[0,1]`之间，我个人比较喜欢PSTricks的箭头风格，因此也会考虑在PSTricks中对已生成的图像进行深加工；
1. 可以将`ezplot()`和`legend()`的结果赋给某个变量，再通过`set()`函数对图像对象或者`legend`对象进行字体大小、颜色等的操作；
1. `latex()`函数可以用于将指定的符号表达式转换成LaTeX语法格式；
1. `sym()`函数可以用于将某个数值对象转换成符号表达式以供`latex()`函数使用；
1. `title`、`xlabel`、`ylabel`、`zlabel`、`textbox`和`text`等函数可以利用`'Interpreter'`,`'latex'`加载LaTeX格式；
1. 因为`Legend`没有`Interpreter`属性，所以如果要在其中使用LaTeX，必须获取对应的文字句柄，并对文字对象设置`String`和`Interpreter`属性，关于这一点可以参考：<http://www.mathworks.com/matlabcentral/newsreader/view_thread/254118>和<http://sites.google.com/site/sleepingwalking/matlab/latex-in-legend>，从下面的示例可以看到，`String`不一定必要；
1. 将图像插入LaTeX文档时，建议不要使用`pdf`格式，而是使用`eps`格式，否则得到的图像结果锯齿感会比较明显。

<!-- more -->

# 在Matlab中使用`latex()`函数的效果

```matlab
>> x = [1:5;6:10;11:15];
>> y = sym(x);
>> latex(y)
  ans =\left(\begin{array}{ccccc} 1 & 2 & 3 & 4 & 5\\ 6 & 7 & 8 & 9 & 10\\ 11 & 12 & 13 & 14 & 15 \end{array}\right)
>> syms a b;
>> x = sin(a) + b/a;
>> latex(x)
  ans =\sin\!\left(a\right) + \frac{b}{a}
```

# 下面的例程中用到了大部分上面的心得

```matlab
% 使用 ezplot 画多条曲线，不需要加 legend 时，可以考虑 f1*f2 型
% 实际上这是一种对 ezplot 隐函数原理画线的深刻理解
syms x y;
a = sin(x) + sinh(y);
b = sin(x);
f_a = ezplot(a);
hold on
f_b = ezplot(b);
set(f_a, 'LineWidth', 3);
xx = legend('$$\alpha^a_b (x)\frac{b}{a}$$','\alpha');
% 前一个为 LaTeX 格式，后一个为 LaTeX 语法；
set(xx,'Interpreter','latex')
% legend 中的 latex 解释器直接使用不起作用；text() 函数等可以直接用。
% legend 可以作为一个对象赋给某个变量以进一步修改设置
xlabel('$$\sin x$$','interpreter','latex')
title('');
text('Interpreter','latex',...
        'String','$$\int_0^x\!\int_y dF(u,v)$$',...
        'Position',[.5 .5],...
        'FontSize',16)
% latex(s) 转化符号表达式为 LaTeX 形式
% title、xlabel、ylabel、zlabel、textbox和legend、text 可以利用 'Interpreter','latex' 加载 LaTeX 格式
% sym() 函数可以将一个数值矩阵转换成为一个可以被 latex() 处理的符号类结果
```

# 一个利用PSTricks修改已有图像的简单例子

```tex
% !Mode:: "TeX:UTF-8"
\documentclass{ctexart}
\usepackage{amsmath,bm,galois}
\usepackage{pstricks}
\begin{document}
\pagestyle{empty}
\begin{pspicture}(-1,-1)(5,5)
\rput[bl](0,0){\includegraphics{fig1}}
%\psgrid[subgriddiv=0]
\rput(0,0){价值}
\rput(3.15,0){结果}
\rput(1.6,2.85){报价}\rput(0.4,1.5){$\bm{\beta}$}
\rput(3.5,1.5){$(\bm{\pi},\bm{\mu})$}
\rput(1.5,-0.32){$(\bm{\pi},\bm{\mu})\comp\bm{\beta}$}
\end{pspicture}
\end{document}
```