---
title: SAS 中 IF 与 WHERE 的辨析
date: 2017-06-18
categories: ["4-SAS"]
tags: ["4-SAS"]
slug: sas-if-where
---

**参考资料**：《SAS 编程演义》, by 谷鸿秋, p90

在新数据集里，我们可能只要部分观测，比如：只要女生。如何挑出女生的观测呢？通常可以从这三个阶段入手：

- 打开数据集时，直接读取只需要的观测；
- PDV 里筛选过滤观测；
- 只写入所需观测进入数据集。

具体执行时，可以借助 `IF` 或 `WHERE` 语句选项。

<!-- more -->

```sas
*===第一阶段：通过 WHERE 选项限定读入数据集;
data tmp;
	set sashlep.class(where=(sex="F"));
run;

*===第二阶段：通过 IF 或者 WHERE 语句;
*===通过 where 语句;
data tmp;
	set sashlep.class;
	where sex="F";
run;

*===通过求子集 IF 语句;
data tmp;
	set sashlep.class;
	if sex="F";
run;

*===第三阶段：通过 WHERE 选项限定输出数据集;
data tmp(where=(sex="F"));
	set sashlep.class;
run;
```

- 在数据集选项里，我们只能用 `WHERE`，而不能用 `IF`；
- 从效率上讲，`WHERE` 更高效。因为 `WHERE` 语句在读入 PDV 之前就先行判断，而求子集 `IF` 语句先读入观测进入 PDV，而后再判断；
- 从使用范围上讲，`WHERE` 更广泛。`WHREE` 语句不仅可以用在 `DATA` 步，还可以用在 `PROC` 步中。此外，`WHERE` 还可以作为数据集选项使用，而 `IF` 只能作为 `DATA` 步语句使用；
- `IF` 语句对 `INPUT` 语句创建的观测有效，但是 `WHERE` 语句只能筛选数据集里的观测；
- 有 `BY` 语句时，求子集 `IF` 语句与 `WHERE` 语句的结果可能会不同，因为 SAS 创建 `BY` 组在 `WHERE` 之后，求子集 `IF` 语句之前；
- 求子集 `IF` 语句可以用在条件 `IF` 语句中，但 `WHERE` 语句不行；
- 当读入多个数据集时，求子集 `IF` 语句无法针对每个数据集单独筛选，但是 `WHERE` 选项却可以。

大多数情况下，作者喜欢用数据集选项来筛选观测。因此，在筛选观测时，代码大致如下：

```sas
*=== WHERE 选项筛选观测;
data want(where=(not missing(id)));
	set raw1(where=(age between  20 and 30))  raw2(where=(sex="F"));
run;
```