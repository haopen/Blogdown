---
title: NumPy、SciPy 和 Pandas z
date: 2015-05-05
categories: ["4-Python"]
tags: ["4-Python", "4-NumPy", "4-SciPy", "4-Pandas"]
slug: numpy-scipy-pandas
---

# NumPy、SciPy 和 Pandas

**原文地址**：<http://blog.csdn.net/u012654283/article/details/45510803>

NumPy 和 SciPy 都是开源的函数库，由于 Python 中是没有数组这个数据类型的，所以涉及到数学计算时会变的非常吃力。Numpy 和 Scipy 正好帮我们解决了这个难题。 

- Numpy 是 Python 基于 Python 语言的一个数据处理的基础函数库，里面主要是一些矩阵的运算等，重在数值计算；
- Scipy 则是基于 Numpy，提供了一个在 Python 中做科学计算的工具集，也就是说它是更上一个层次的库，主要包含一下模块：

```txt
statistics
optimization
numerical integration
linear algebra
Fourier transforms
signal processing
image processing
ODE solvers
special functions
```

Pandas 是基于 NumPy 的一种工具，该工具是为了解决数据分析任务而创建的。Pandas 纳入了大量库和一些标准的数据模型，提供了高效地操作大型数据集所需的工具。Pandas 提供了大量能使我们快速便捷地处理数据的函数和方法。 

类似于 Numpy 的核心是 ndarray，Pandas 也是围绕着 `Series` 和 `DataFrame` 两个核心数据结构展开的 。`Series`和 `DataFrame` 分别对应于一维的序列和二维的表结构。Pandas 约定俗成的导入方法如下：

```python
from pandas import series, DataFrame
import pandas as pd
```

## 参考
1. [Numpy 和 Scipy 的关系](http://www.oschina.net/question/87626_51014)
2. [Numpy 和 Scipy 的前世今生](http://blog.sina.com.cn/s/blog_4e2fe36f0100lrby.html)
3. [Pandas 简介](http://baike.baidu.com/link?url=D2mYJM8WRhYFJjqsIgr-ZxxY_04ng2MGE_HRgUYWBmoP6_8uzFYTsGCptSoK9iWlyj4iczTytejTdTmrHdU2kq)

# 知乎

**原文地址**：<https://www.zhihu.com/question/38353562>

## Coldwings

- Numpy 是以矩阵为基础的数学计算模块，纯数学。
- Scipy 基于 Numpy，科学计算库，有一些高阶抽象和物理模型。比方说做个傅立叶变换，这是纯数学的，用 Numpy；做个滤波器，这属于信号处理模型了，在 Scipy 里找。
- Pandas 提供了一套名为 DataFrame 的数据结构，比较契合统计分析中的表结构，并且提供了计算接口，可用 Numpy 或其它方式进行计算。

## 李粤强

- NumPy：N 维数组容器
- SciPy：科学计算函数库
- Pandas：表格容器