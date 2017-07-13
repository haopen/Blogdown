---
title: R的应用领域包介绍 z
date: 2013-06-09
categories: ["4-R"]
tags: ["4-R", "4-宏包", "4-package"]
slug: r-packages-introduction
---

# Analysis of Pharmacokinetic Data 药物(代谢)动力学数据分析

- **网址**：<http://cran.r-project.org/web/views/Pharmacokinetics.html>
- **维护人员**：Suzette Blanchard
- **版本**：2008-02-15
- **翻译**：R-fox, 2008-04-12

<!-- more -->

药物(代谢)动力学数据分析的主要目的是用非线性浓度时间曲线(concentration time curve)或相关的总结(如曲线下面积)确定给药方案(dosing regimen)和身体对药物反应间的关系。R基本包里的`nls()`函数用非线性最小二乘估计法估计非线性模型的参数，返回nls类的对象，有`coef(), formula(), resid(), print(), summary(), AIC(), fitted(), vcov()`等方法。

在主要目的实现后，兴趣就转移到研究属性(如：年龄、体重、伴随用药、肾功能)不同的人群是否需要改变药物剂量。在药物(代谢)动力学领域，分析多个个体的组合数据估计人群参数被称作群体药动学(population PK)。非线性混合模型为分析群体药动学数据提供了自然的工具，包括概率或贝叶斯估计方法。

- `nlme包`用Lindstrom和Bates提出的概率方法拟合非线性混合效应模型(1990, Biometrics 46, 673-87)，允许nested随机效应(nested random effects)，组内误差允许相关的或不等的方差。返回一个nlme类的对象表示拟合结果，结果可用`print(), plot()`和`summary()`方法输出。nlme对象给出了细节的结果信息和提取方法。
- `nlmeODE`包组合odesolve包和nlme包做混合效应建模，包括多个药动学/药效学(PK/PD)模型。
- **面版数据(panel data)的贝叶斯估计方法**在CRAN的Bayesian Inference任务列表里有所描述(<http://cran.r-project.org/web/views/Bayesian.html>)。
- `PKtools`包为`nlme, NONMEM`和`WinBUGS`包提供单剂量群体药动学数据的接口，分别返回`"PKNLME"，"NONMEM"`和`"WinBUGS"`类的对象；促进了混合似然和贝叶斯方法的使用。PKtools包的其它函数有：`AICcomp()`函数从NONMEM和nlme计算模型的AIC, AICc (small sample AIC)和对数似然值。`paramEst()`和`indEst()`分别返回群体和个体参数，对NONMEM类使用最大似然法，对nlme类使用广义最小二乘法，对WinBUGS类使用MCMC贝叶斯估计法。`HTMLtools()`和`tex()`函数分别输出群体和个体参数的HTML和LaTeX报道文件，和诊断图(diagnostic plot)便于用户选择估计方法。还能分别产生HTMLtools和tex文件里的诊断图。
- 其它的分析药物(代谢)动力学数据的包还有：
  - `PK, PKfit`和`drc`。`VR`包束的`MASS`包包括一些基本的方法，如：计算Logit或Probit模型的半数致死计量LD50。
  - 分析药物(代谢)动力学数据的图形展示也非常重要，`lattice`包的trellis图用来可视化面板数据。

<hr />
# 计算计量经济学(Computational Econometrics)

- **网址**：<http://cran.r-project.org/web/views/Econometrics.html>
- **维护人员**：Achim Zeileis
- **版本**：2008-04-02
- **翻译**：R-fox, 2008-04-15

R的很多基本函数都可用于计量经济学，尤其是`stats`包。CRAN的许多包也有可以分析计量经济学，下面做个简要的综述。这里介绍的工具可能与CRAN的**计量金融(empirical finance)任务列表**(<http://cran.r-project.org/web/views/Finance.html>)有许多的重合。此外，从邮件列表finance SIG(<https://www.stat.math.ethz.ch/mailman/listinfo/R-SIG-Finance/>)可获得计量经济和计量金融相关的帮助和讨论问题。CRAN的Social Sciences任务列表(<http://cran.r-project.org/web/views/SocialSciences.html>)覆盖了许多社会科学的工具，因此也与这里的工具有所重合，如：政治科学。这里综述的包大致可分为如下的几个话题：

1. 线形回归模型(Linear regression models)
线形模型可由lm()函数拟合，也有各种检验方法用来比较模型，如：`summary()` 和`anova()`。类似的函数也支持。类似的功能也适合于渐近检验(如：z检验而不是t检验，卡方检验而不是F检验)，此外还有`lmtest`包里的`coeftest()`和`waldtest()`函数。`car`包里的`linear.hypothesis()`可检验更广义的线形假设。HC和HAC协方差矩阵的这些功能可在`sandwich`包里实现。`car`和`lmtest`包还提供了许多线形回归模型的诊断方法。

1. 微观计量经济学(Microeconometrics)：
许多微观计量经济学模型属于广义线形模型，可由`stats`包的`glm()`函数拟合。包括用于**选择类数据**(choice data)的Logit和probit模型，用于**计数类数据**(count data)的poisson模型。**负二项广义线形模型**可由`MASS`包的`glm.nb()`实现。**边缘(zero—inflated)**和**hurdle计数模型**可由`pscl`包提供，`zicounts`包里也实现了**边缘模型**。**双变量Poisson回归模型**可在`bivpois`包里实现。**基本的删失回归模型**(censored regression model)，如：tobit模型，可由`survival`包里的`survreg()`函数拟合。`micEcon`包里提供了微观计量经济学的更好的工具。`bayesm`包执行微观计量济学和营销学(marketing)中的贝叶斯方法。`reldist`包提供了**相对分布(relative distributions)**相关的方法。

1. 其它的回归模型(Further regression models)：
R和CRNA包里有各种延伸的线形回归模型和其它模型拟合方法。**非线性最小二乘回归**建模可用stats包里的`nls()`实现。相关的包还有：`quantreg`(分位数回归Quantile Regression)，`crq`(截取分位点回归censored quantile regression)，`plm`(面板数据的线形回归)，`sem`(线性结构方程模型，包括二阶段最小平方)，`systemfit`(联立方程估计)，`np`(非参核方法)，`betareg`(beta回归)，`nlme`(非线性混合效应模型)，`VR`(nnet 包的多项Logit模型)，`MNP`(贝叶斯多项Probit模型)。`Design`和`Hmisc`包提供广义线形回归模型的工具。

1. 基本的时间序列架构(Basic time series infrastructure)：
stats包的"ts" 类是R的规则间隔时间序列的标准类。`Zoo`包提供了规则和不规则间隔时间序列的架构。建立在"POSIXt"时间-日期类上的`its`, `tseries`和`fCalendar`包也提供不规则间隔时间序列的架构，特别用于金融分析。

1. 时间序列建模(Time series modelling)：
`stats`包里有经典的时间序列建模工具，`arima()`函数做ARIMA建模和Box-Jenkins-type分析。`stats`包还提供`StructTS()`函数拟合结构时间序列，`decompose()`过滤时间序列，`HoltWinters()`分解时间序列。`forecasting`包束提供了一些延伸的方法，尤其是预测和模型选择。多种时间序列的过滤器可在`mFilter`包里找到。为了估计VAR模型，`stats`包的`ar()`拟合简单的模型，`vars`包、`dse`包的`estVARXls()`提供了更精巧的模型，`MSBVAR`包提供了贝叶斯方法。`Dynlm`包提供了经由OLS过滤动态回归模型的方便接口；`dyn`包里则提供了不同的方法。更高级的动态系统方程可由`dse`包拟合。高斯线形状态空间模型可由`dlm`包拟合(用最大斯然，`kalman`滤波/平滑，和贝叶斯方法)。Unit root(单位根)和cointegration technique(协整技术)可在`urca`，`uroot`和`tseries`包里找到。`tsfa`包可做时间序列因子分析。`sde`包提供随机微分方程的模拟和推论。

1. 矩阵处理(Matrix manipulations)：
作为一个向量和矩阵语言，R有许多基本函数处理矩阵，与`Matrix`和`SparseM`包互补。

1. 放回再抽样(Bootstrap)：
除了推荐的`boot`包，`bootstrap`或`simpleboot`包里有一些其它的常规bootstrapping技术；还有些函数专门为时间序列数据而设计，如：`meboot`包里的最大熵bootstrap，`tseries`包里的`tsbootstrap()`函数。

1. 不平等(Inequality)：
为了测量不平等(inequality)，集中(concentration)和贫穷(poverty)，`ineq`包提供了一些基本的工具，如：劳伦茨曲线(Lorenz curves)，Pen's parade，基尼系数(Gini coefficient)。

1. 结构变化(Structural change)：
R有很强的处理参数模型的结构变化和变化点的能力，可参考`strucchange`和`segmented`包。

1. 数据集(Data sets)：
这里介绍的许多包里都有来自计量经济学文献里的数据集，`Ecdat`包包括许多来自计量经济学教科书和杂志(应用计量经济学，商业/经济统计)的数据集。`FinTS`包针对书'Analysis of Financial Time Series' (2nd ed., 2005, Wiley)，包括数据集，函数，列子的脚本文件。`CDNmoney`包提供加拿大货币流通额，`pwt`包提供佩恩世界表(Penn World Table)。

<hr />
# R空间分析

很高兴看到R在生态学里的众多应用，我是生态学的外行，但也想来凑下热闹。希望越来越多的人喜欢R(<http://www.r-project.org/>)，喜欢R语言中文论坛(<http://rbbs.biosino.org/Rbbs/forums/list.page>)。下面根据CRAN的介绍资料综述一下R分析空间数据的功能(<http://cran.r-project.org/web/views/Spatial.html>；<http://r-spatial.sourceforge.net/>；<http://sal.uiuc.edu/csiss/Rgeo/>)，仅仅是翻译总结资料，有不对的地方请批评指正。

R分析空间数据(Spatial Data)的包主要包括两部分：

1. 导入导出空间数据
1. 分析空间数据

功能及函数包：

1. 分类空间数据(Classes for spatial data)：
包`sp`(<http://cran.r-project.org/web/packages/sp/index.html>)为不同类型的空间数据设计了不同的类，如：点(points)，栅格(grids)，线(lines)，环(rings)，多边形(polygons)。另外sp提供总结数据，获取坐标等功能；提供画图函数，并且允许在图上添加空间元素(spatial elements)和参考元素(reference elements)，如：比例尺(scale bar)，指北针(north arrows)等。现在很多包都利用了sp包中的类，如：`rgdal, maptools`。

1. 处理空间数据(Handling spatial data)：
`spsurvey`包提供做概率抽样的函数(<http://cran.r-project.org/web/packages/spsurvey/index.html>)；`trip`包扩展`sp`包的类，针对动物跟踪数据(<http://cran.r-project.org/web/packages/trip/index.html>)；`hdeco`包用等级分解熵比较类型地图(categorical map)(<http://cran.r-project.org/web/packages/hdeco/index.html>)；`GeoXp`包允许交互式的分析空间数据(<http://cran.r-project.org/web/packages/GeoXp/index.html>)。

3. 读写空间数据(Reading and writing spatial data)：
图像有向量式绘图和光栅式两种。`Rgdal`可以读入和导出GDAL支持的光栅式格式(<http://www.gdal.org/>)和OGR(<http://www.gdal.org/ogr/>)支持的向量格式(<http://cran.r-project.org/web/packages/rgdal/index.html>)。`ncdf`包用来处理NetCDF文件(<http://cran.r-project.org/web/packages/ncdf/index.html>)；`maps`包可连接一些地理学数据库并展示地理图(<http://cran.r-project.org/web/packages/maps/index.html>)；`RArcInfo`包可读取ArcInfo v.7二进制文件和*.e00文件(<project.org/web/packages/RArcInfo/index.html>)；`maptools`包管理和读入地理数据，也为`PBSmapping`包、`spatsta`包和`sp`类提供接口函数(<http://cran.r-project.org/web/packages/maptools/index.html>)，还可以通到GSHHS数据库；`classInt`包为专题地图制图选择单变量的类间距(<http://cran.r-project.org/web/packages/classInt/index.html>)；`gmt`包提供R和GMT绘图软件的接口(<http://cran.r-project.org/web/packages/gmt/index.html>)。

4. 点格局分析(Point pattern analysis)：
`spatstat`包做空间点分布型态(Spatial Point Patterns)分析，长处在于模型拟合和仿真(<http://cran.r-project.org/web/packages/spatstat/index.html>)；`spatgraphs`包提供点格局的可视化图形(<http://cran.r-project.org/web/packages/spatgraphs/index.html>)；`splancs`包允许分析多边形区域，包括很多种方法，如：2维核密度(<http://cran.r-project.org/web/packages/splancs/index.html>)；`ecespa`包提供书《Introduccion al Analisis Espacial de Datos en Ecologia y Ciencias Ambientales: Metodos y Aplicaciones》里用的点格局分析函数和数据(<http://cran.r-project.org/web/packages/ecespa/index.html>)；`aspace`包计算空间中心统计(centrographic satistics)和最小凸多边形(<http://cran.r-project.org/web/packages/aspace/index.html>)；`spatialkernel`包做多元数据的非参核密度估计和核回归估计(<http://cran.r-project.org/web/packages/spatialkernel/index.html>)。

5. 地质统计学(Geostatistics) ：
`gstat`包做单变量和多变量地质统计，适合于大的数据集(<http://cran.r-project.org/web/packages/gstat/index.html>)；`geoR`包(用贝叶斯模型，<http://cran.r-project.org/web/packages/geoR/index.html>)和`geoRglm`包(用线性模型，<http://cran.r-project.org/web/packages/geoRglm/index.html>)做基于模型的地质统计；`fields`包也提供许多类似的函数(<http://cran.r-project.org/web/packages/fields/index.html>)；`spBayes`包用蒙特卡洛一马尔科夫链方法(MCMC)做单变量和多变量的高斯模型(<http://cran.r-project.org/web/packages/spBayes/index.html>)。
`RandomFields`包模拟和分析随机场(<http://cran.r-project.org/web/packages/RandomFields/index.html>)；`tripack`包用于不规则数据的三角测量法(<http://cran.r-project.org/web/packages/tripack/index.html>)；`akima`包用于不规则数据的线性或三次样条插值(<http://cran.r-project.org/web/packages/akima/index.html>)；`spatialCovariance`包计算矩形数据的空间协方差矩阵(<http://cran.r-project.org/web/packages/spatialCovariance/index.html>)……。

6. 疾病制图和地区数据分析(Disease mapping and areal data analysis)：
`DCluster`包用计数数据探测疾病的空间聚类，计算空间权重，测试空间自相关，建立空间回归模型等(<http://cran.r-project.org/web/packages/DCluster/index.html>)；`spgwr`包做地理加权回归模型，检测平稳性(<http://cran.r-project.org/web/packages/spgwr/index.html>)；`spatclus`包(<http://cran.r-project.org/web/packages/spatclus/index.html>)。`spatclus`包探测2维或3维空间点分布的任意形状的聚类(<http://cran.r-project.org/web/packages/spatclus/index.html>)。

7. 生态学分析(Ecological analysis)：
R有很多分析生态和环境数据的包。如：`grasp`包用GAM模型(灰色代数曲线型模型)做环境预报(<http://cran.r-project.org/web/packages/grasp/index.html>)；`ade4`包用做环境科学里的探索和欧几里德方法(<http://cran.r-project.org/web/packages/ade4/index.html>)；`adehabitat`包分析动物的栖息地选择(<http://cran.r-project.org/web/packages/adehabitat/index.html>)；`pastecs`包做时空序列的分解和分析(<http://cran.r-project.org/web/packages/pastecs/index.html>)；`vegan`包做群落和植被生态学中的排序方法(<http://cran.r-project.org/web/packages/vegan/index.html>)；`WeedMap`包做空间预测(<http://cran.r-project.org/web/packages/WeedMap/index.html>)；`clustTool`包做聚类分析(<http://cran.r-project.org/web/packages/clustTool/index.html>)。更多资料见：<http://cran.r-project.org/web/views/Environmetrics.html>。

<hr />
# Multivariate Statistics (多元统计)

- **网址**：<http://cran.r-project.org/web/views/Multivariate.html>
- **维护人员**：Paul Hewson
- **版本**：2008-02-08
- **翻译**：R-fox, 2008-04-04

基本的R包已经实现了传统多元统计的很多功能，然而CRNA的许多其它包提供了更深入的多元统计方法，下面做个简要的综述。多元统计的特殊应用在CRNA的其它任务列表(task view)里也会提及，如：**排序**(ordination)会在Environmetrics(<http://cran.r-project.org/web/views/Environmetrics.html>)里说到；**有监督的分类方法**能在Machine Learning(<http://cran.r-project.org/web/views/MachineLearning.html>)里找到；**无监督的分类**在Cluster(<http://cran.r-project.org/web/views/Cluster.html>)里。
这里要综述的包主要分为以下几个部分：

1. 多元数据可视化(Visualising multivariate data)：
  - 绘图方法：
基本画图函数(如：`pairs()`、`coplot()`)和`lattice`包里的画图函数(`xyplot(), splom()`)可以画成对列表的二维散点图，3维密度图。`car`包里的`scatterplot.matrix()`函数提供更强大的二维散点图的画法。`cwhmisc`包集合里的`cwhplot`包的`pltSplomT()`函数类似`pair()`画散点图矩阵，而且可以在对角位置画柱状图或密度估计图。除此之外，`scatterplot3d`包可画3维的散点图，`aplpack`包里`bagplot()`可画二变量的boxplot，`spin3R()`可画可旋转的三维点图。`misc3d`包有可视化密度的函数。`YaleToolkit`包提供许多多元数据可视化技术，`agsemisc`也是这样。更特殊的多元图包括：`aplpack`包里的`faces()`可画Chernoff’s face；`MASS`包里的`parcoord()`可画平行坐标图(矩阵的每一行画一条线，横轴表示矩阵的每列)；`graphics`包里的`stars()`可画多元数据的星状图(矩阵的每一行用一个星状图表示)。`ade4`包里的`mstree()`和`vegan`包里的`spantree()`可画最小生成树。`calibrate`包支持双变量图和散点图，`chplot`包可画convex hull图。`geometry`包提供了和`qhull`库的接口，由`convexhulln()`可给出相应点的索引。`ellipse`包可画椭圆，也可以用`plotcorr()`可视化相关矩阵。`denpro`包为多元可视化提供水平集树形结构(level set trees)。graphics包里的`mosaicplot()`和`vcd`包里的`mosaic()`函数画马赛克图(mosaic plot)。`gclus`包提供了针对聚类的散点图和平行坐标图。`rggobi`包和`DescribeDisplay`包是**GGobi**的接口，`DescribeDisplay`的图可达到出版质量的要求；`xgobi`包是**XGobi**和**XGvis**的接口，可实现动态交互的图。最后，`iplots`包提供强大的动态交互图，尤其是平行坐标图和马赛克图。`seriation`包提供`seriation`方法，能重新排列矩阵和系统树。
  - 数据预处理：
`AIS`包提供多元数据的初步描述函数。`Hmisc`包里的`summarize()`和`summary.formula()`辅助描述数据，`varclus()`函数可做聚类，而`dataRep()`和`find.matches()`找给定数据集的典型数据和匹配数据。`KnnFinder`包里的`nn()`函数用kd-tree找相似变量的个数。`dprep`包为分类提供数据预处理和可视化函数，如：检查变量冗余性、标准化。`base`包里的`dist()`和`cluster`包里的`daisy()`函数提供距离计算函数；`proxy`包提供更多的距离测度，包括矩阵间的距离。`simba`包处理已有数据和缺失数据，包括相似性矩阵和重整形。

1. 假设检验(Hypothesis testing)：
`ICSNP`包提供霍特林(Hotellings)T2检验和许多非参检验方法，包括基于marginal ranks的位置检验(location test)，计算空间中值和符号，形状估计。`cramer`包做两样本的非参检验，`SpatialNP`可做空间符号和秩检验。

1. 多元分布(Multivariate distributions)：
  - 描述统计(Descriptive measures)：
`stats`包里的`cov()`和`cor()`分别估计协方差和相关系数。`ICSNP`包提供几种数据描述方法，如：`spatial.median()`估计空间中值，其它的函数估计scatter。`MASS`包里的`cov.rob()`提供更健壮的方差/协方差矩阵估计。`covRobust`包用最近邻方差估计法估计协方差。`robustbase`包的`covMCD()`估计协方差和`covOGK()`做Orthogonalized Gnanadesikan-Kettenring。`rrcov`包提供可扩展和稳健的估计函数`covMcd(), covMest()`。`corpcor`包可计算大规模的协方差和偏相关矩阵。
  - 密度估计和模拟(Densities (estimation and simulation))：
`MASS`包的`mvrnorm()`产生多元正态分布的随机数。`Mvtnorm`包有多元t分布和多元正态分布的概率和分位数函数，还可计算多元正态分布的密度函数。`mvtnormpcs`包提供基于`Dunnett`的函数。`mnormt`包提供元t分布和多元正态分布的密度和分布函数，并可产生随机数。`sn`包提供多元偏t分布和偏正态分布的密度、分布、随机数函数。`delt`包提供了许多估计多元密度的函数方法，如：CART和贪婪方法。CRAN的**Cluster**任务列表(<http://cran.r-project.org/web/views/Cluster.html>)有更全面的信息，`ks`包里的`rmvnorm.mixt()`和`dmvnorm.mixt()`函数产生随机数和估计密度，`bayesm`包里有多种拟合方法。很多地方都提供了模拟Wishart分布的函数，如：`bayesm`包里的`rwishart()`，`MCMCpack`包里的`rwish()`，而且`MCMCpack`包还有密度函数`dwish()`。`KernSmooth`包里的`bkde2D()`和`MASS`包的`kde2d()`做分箱(binned)或不分箱二维核密度估计。`ks`包也像`ash`和`GenKern`包样可做核平滑(kernel smoothing)。`prim`包用法找高维多元数据的高密度区域，`feature`包可计算多元数据的显著特征。
  - 正态检验(Assessing normality)：
`mvnormtest`包提供Shapiro-Wilks检验的多元数据延伸方法，`mvoutlier`包检测多元离群点(outlier)，`ICS`包可检验多元正态分布。`energy`包里的`mvnorm.etest()`基于E统计量做正态检验，`k.sample()`检验多个数据是否来自同一分布。`dprep`包里的`mardia()`用Mardia检验正态性。`stats`包里的`mauchly.test()`可检验Wishart分布的协方差矩阵。
  - 连接函数(Copulas)：
`copula`包提供常规的`copula`函数的程序，包括：`normal, t, Clayton, Frank, Gumbel`。`fgac`包提供generalised archimedian copula，`mlCopulaSelection`包可做二变量的copula。

1. 线形模型(Linear models)：
`stats`包里的`lm()`可做多元线形模型，`anova.mlm()`比较多个多元线形模型，`manova()`做多元方差分析(MANOVA)。`sn`包的`msn.mle()`和`mst.mle()`可拟合多元偏正态和偏t分布模型。`pls`包提供偏最小二乘回归(PLSR)和主成分回归；`ppls`包可做惩罚偏最小二乘回归；`dr`包提供降维回归方法，如片逆回归法(Sliced Inverse Regression)、片平均方差估计(sliced average variance estimation)。`plsgenomics`包做基于偏最小二乘回归的基因组分析。`relaimpo`包可评估回归参数的相对重要性。

1. 投影方法(Projection methods)：
  - 主成分(Principal components)：
`stats`包的`prcomp()`(基于svd())和`princomp()`(基于eigen())能计算主成分。`sca`包做单分量分析。`nFactors`可评价碎石图(Scree plot)，`paran`包可评估主成分分析得到的主成分和因子分析得到的因子。`pcurve`包做主曲线(Principal Curve)分析和可视化。`gmodels`包提供适合大矩阵的`fast.prcomp()`和`fast.svd()`。`kernlab`包里的`kpca()`用核方法做非线性的主成分分析。`pcaPP`包用投影寻踪(projection pursuit)法计算稳健/鲁棒(robust)主成分。`amap`包的`acpgen()`和`acprob()`函数分别针对广义(generalized)和稳健(robust)主成分分析。主成分在很多方面也有相应的应用，如：涉及生态的`ade4`包，感官的`SensoMinR`包。`psy`包里有用于心理学的各种程序，与主成分相关的有：`sphpca()`用球形直观表示相关矩阵，类似于3D的PCA；`fpca()`图形展示主成分分析的结果，而且允许某些变量间有相关性；`scree.plot()`图形展示相关或协方差矩阵的特征值。`PTAk`包做主张量分析(Principal Tensor Analysis)。`smatr`包提供关于异速生长(allometry)的函数。
  - 典型相关(Canonical Correlation)：
`stats`包里的`cancor()`是做典型相关的函数。`kernlab`包提供更稳健的核方法`kcca()`。`concor`包提供了许多concordance methods。
  - 冗余度分析(Redundancy Analysis)：
`calibrate`包里的`rda()`函数可做冗余度分析和典型相关。`fso`包提供了模糊集排序(Ordination)方法。
  - 独立成分(Independent Components)：
`fastICA`包用fastICA算法做独立成分分析(ICA)和投影寻踪分析(Projection Pursuit)，`mlica`包提供独立成分分析的最大似然拟合，`PearsonICA`包用基于互信息的打分函数分离独立信号。`ICS`包能执行不变坐标系(invariant coordinate system)和独立成分分析(independent components)。`JADE`包提供就JADE算法的接口，而且可做一些ICA。
  - 普鲁克分析(Procrustes analysis)：
`vegan`包里的`procrustes()`可做普鲁克分析，也提供排序(ordination)函数。更一般的普鲁克分析可由`FactoMineR`包里的`GPA()`实现。

1. 主坐标/尺度方法(Principal coordinates / scaling methods)：
stats包的cmdscale()函数执行传统的多维尺度分析(multidimensional scaling，MDS)(主坐标分析Principal Coordinates Analysis)，MASS包的sammon()和isoMDS()函数分别执行Sammon和Kruskal非度量多维尺度分析。vegan包提供非度量多维尺度分析的包装(wrappers)和后处理程序。

1. 无监督分类(Unsupervised classification)：
  - 聚类分析：
CRAN的**Cluster**任务列表全面的综述了R实现的聚类方法。stats里提供等级聚类`hclust()`和k-均值聚类`kmeans()`。`cluster`包里有大量的聚类和可视化技术，`clv`包里则有一些聚类确认程序，`e1071`包的`classAgreement()`可计算Rand index比较两种分类结果。Trimmed k-means聚类分析可由`trimcluster`包实现，聚类融合方法(Cluster Ensembles)由`clue`包实现，`clusterSim`包能帮助选择最佳的聚类，`hybridHclust`包提供一些混合聚类方法。`energy`包里有基于E统计量的距离测度函数`edist()`和等级聚类方法`hclust.energy()`。`LLAhclust`包提供基于似然(likelihood linkage)方法的聚类，也有评定聚类结果的指标。`fpc`包里有基于Mahalanobis距离的聚类。`clustvarsel`包有多种基于模型的聚类。模糊聚类(fuzzy clustering)可在`cluster`包和`hopach`包里实现。`Kohonen`包提供用于高维谱(spectra)或模式(pattern)的有监督和无监督的SOM算法。`clusterGeneration`包帮助模拟聚类。CRAN的**Environmetrics**任务列表里也有相关的聚类算法的综述。`mclust`包实现了基于模型的聚类，`MFDA`包实现了功能数据的基于模型的聚类。
  - 树方法：
CRAN的**MachineLearning**任务列表有对树方法的细节描述。分类树也常常是重要的多元方法，`rpart`包正是这样的包，`rpart.permutation`包还可以做`rpart()`模型的置换(permutation)检验。`TWIX`包的树可以外部剪枝。`hier.part`包分割多元数据集的方差。`mvpart`包可做多元回归树，`party`包实现了递归分割(recursive partitioning)，`rrp`包实现了随机递归分割。`caret`包可做分类和回归训练，进而`caretLSF`包实现了并行处理。`kknn`包的k-近邻法可用于回归，也可用于分类。

1. 有监督分类和判别分析(Supervised classification and discriminant analysis)：
`MASS`包里的`lda()`和`qda()`分别针对线性和二次判别分析。`mda`包的`mda(), fda()`允许混合和更灵活的判别分析，`mars()`做多元自适应样条回归(multivariate adaptive regression splines)，`bruto()`做自适应样条后退拟合(adaptive spline backfitting)。`earth`包里也有多元自适应样条回归的函数。`rda`包可用质心收缩法(shrunken centroids regularized discriminant analysis)实现高维数据的分类。`VR`的`class`包的`knn()`函数执行k-最近邻算法，`knncat`包里有针对分类变量的k-最近邻算法。`SensoMineR`包的`FDA()`用于因子判别分析。许多包结合了降维(dimension reduction)和分类。`klaR`包可以做变量选择，可处理多重共线性，还有可视化函数。`superpc`包利用主成分做有监督的分类，`classPP`包则可为其做投影寻踪(projection pursuit)，`gpls`包用广义偏最小二乘做分类。`hddplot`包用交叉验证的线性判别分析决定最优的特征个数。`supclust`包可以根据芯片数据做基因的监督聚类。`ROCR`提供许多评估分类执行效果的方法。`predbayescor`包可做朴素贝叶斯(na&iuml;ve Bayes)分类。关于监督分类的更多信息可以看**MachineLearning**任务列表。

1. 对应分析(Correspondence analysis)：
`MASS`包的`corresp()`和`mca()`可以做简单和多重对应分析。`ca`包提供单一、多重和联合(joint)对应分析。`ade4`包的`ca()`和`mca()`分别做一般的和多重对应分析。`vegan`包里也有类似的函数。`cocorresp`可实现两个矩阵间的co-correspondence分析。`FactoMineR`包的`CA()`和`MCA()`函数也能做类似的简单和多重对应分析，还有画图函数。`homals`执行同质分析(homogeneity)。

1. 前向查找(Forward search)：
`Rfwdmv`包执行多元数据的前向查找。

1. 缺失数据(Missing data)：
`mitools`包里有缺失数据的多重估算(multiple imputation)的函数, `mice`包用chained equations实现了多重估算，`mvnmle`包可以为多元正态数据的缺失值做最大似然估计(ML Estimation)，`norm`包提供了适合多元正态数据的估计缺失值的期望最大化算法(EM algorithm)，`cat`包允许分类数据的缺失值的多重估算，`mix`包适用于分类和连续数据的混合数据。`pan`包可为面版数据(panel data)的缺失值做多重估算。`VIM`包做缺失数据的可视化和估算。`Hmisc`包的`aregImpute()`和`transcan()`提供了其它的估算缺失值方法。`EMV`包提供了`knn`方法估计缺失数据。`monomvn`包估计单调多元正态数据的缺失值。

1. 隐变量方法(Latent variable approaches)：
`stats`包的`factanal()`执行最大似然因子分析，`MCMCpack`包可做贝叶斯因子分析。`GPArotation`包提供投影梯度(Gradient Projection)旋转因子法。`FAiR`包用遗传算法作因子分析。`ifa`包可用于非正态的变量。`sem`包拟合线形结构方程模型。`ltm`包可做隐含式语义分析 (Latent semantic analysis)，`eRm`包则可拟合Rasch模型(Rasch models)。`FactoMineR`包里有很多因子分析的方法，包括：`MFA()`多元因子分析，`HMFA()`等级多元因子分析，`ADFM()`定量和定性数据的多元因子分析。`tsfa`包执行时间序列的因子分析。`poLCA`包针对多分类变量(polytomous variable)做潜类别分析(Latent Class Analysis)。

1. 非高斯数据建模(Modelling non-Gaussian data)：
`bivpois`包建模Poisson分布的二变量。`mprobit`包提供了适合二元和顺序响应变量的多元概率模型。`MNP`包实现了Bayesian多元概率模型。`polycor`包可计算多组相关(olychoric correlation)和四分相关(tetrachoric correlation)矩阵。`bayesm`包里有多种模型，如：**表面非相关回归**(Seemingly unrelated Regression)，**多元logit/probit模型**, **工具变量法**(Instrumental Variables)。`VGAM`包里有：广义线形和可加模型(Vector Generalised Linear and Additive Models)，减秩回归(Reduced Rank regression)。

1. 矩阵处理(Matrix manipulations)：
R作为一种基于向量和矩阵的语言，有许多处理矩阵的强有力的工具，由包`Matrix`和`SparseM`实现。`matrixcalc`包增加了矩阵微积分的功能。`spam`包提供了更深入的针对稀疏矩阵的方法。

1. 其它(Miscellaneous utitlies)：
`DEA`包执行数据包络分析(data envelopment analysis,DEA)。`abind`包组合多维array。`Hmisc`包的`mApply()`扩充了`apply()`的功能。除了前面描述的功能，`sn`包还未偏正态和偏t分布提供边缘化(marginalisation)、仿射变换(affine transformations)等。`SharedHT2`包执行芯片数据的Hotelling's T2检验。`panel`包里有面版数据(panel data)的建模方法。`mAr`包可做向量自回归模型(vector auto-regression)，`MSBVAR`包里有贝叶斯向量自回归模型。`Hmisc`包的`rm.boot()`函数bootstrap重复测量试验(Repeated Measures Models)。`compositions`包提供复合数据分析(compositional data analysis)。`cramer`包为两样本数据做多元非参Cramer检验。`psy`里有许多心理学的常用方法。`cwhmisc`包集合的`cwhmath`包里有许多有趣的功能，如各种旋转函数。`desirability`包提供了基于密度函数的多变量最优化方法。`geozoo`包可以画`geozoo`包里定义的几何对象。

<hr />
# Machine Learning & Statistical Learning (机器学习 & 统计学习)
- **网址**：<http://cran.r-project.org/web/views/MachineLearning.html>
- **维护人员**：Torsten Hothorn
- **版本**：2008-02-18 18:19:21
- **翻译**：R-fox, 2008-03-18

机器学习是计算机科学和统计学的边缘交叉领域，R关于机器学习的包主要包括以下几个方面：

1. 神经网络(Neural Networks)：
`nnet`包执行单隐层前馈神经网络，nnet是`VR`包的一部分(<http://cran.r-project.org/web/packages/VR/index.html>)。

1. 递归拆分(Recursive Partitioning)：
递归拆分利用树形结构模型，来做回归、分类和生存分析，主要在`rpart`包(<http://cran.r-project.org/web/packages/rpart/index.html>)和`tree`包(<http://cran.r-project.org/web/packages/tree/index.html>)里执行，尤其推荐`rpart`包。`Weka`里也有这样的递归拆分法，如：J4.8, C4.5, M5，包`Rweka`提供了R与`Weka`的函数的接口(<http://cran.r-project.org/web/packages/RWeka/index.html>)。
`party`包提供两类递归拆分算法，能做到无偏的变量选择和停止标准：函数`ctree()`用非参条件推断法检测自变量和因变量的关系；而函数`mob()`能用来建立参数模型(<http://cran.r-project.org/web/packages/party/index.html>)。另外，`party`包里也提供二分支树和节点分布的可视化展示。`mvpart`包是`rpart`的改进包，处理多元因变量的问题(<http://cran.r-project.org/web/packages/mvpart/index.html>)。`rpart.permutation`包用置换法(permutation)评估树的有效性(<http://cran.r-project.org/web/packages/rpart.permutation/index.html>)。`knnTree`包建立一个分类树，每个叶子节点是一个knn分类器(<http://cran.r-project.org/web/packages/knnTree/index.html>)。`LogicReg`包做逻辑回归分析，针对大多数自变量是二元变量的情况(<http://cran.r-project.org/web/packages/LogicReg/index.html>)。`maptree`包(<http://cran.r-project.org/web/packages/maptree/index.html>)和`pinktoe`包(<http://cran.r-project.org/web/packages/pinktoe/index.html>)提供树结构的可视化函数。

1. 随机森林(Random Forests)：`randomForest`包提供了用随机森林做回归和分类的函数(<http://cran.r-project.org/web/packages/randomForest/index.html>)。`ipred`包用bagging的思想做回归，分类和生存分析，组合多个模型(<http://cran.r-project.org/web/packages/ipred/index.html>)。`party`包也提供了基于条件推断树的随机森林法(<http://cran.r-project.org/web/packages/party/index.html>)。`varSelRF`包用随机森林法做变量选择(<http://cran.r-project.org/web/packages/varSelRF/index.html>)。

1. Regularized and Shrinkage Methods：`lasso2`包(<http://cran.r-project.org/web/packages/lasso2/index.html>)和`lars`包(<http://cran.r-project.org/web/packages/lars/index.html>)可以执行参数受到某些限制的回归模型。`elasticnet`包可计算所有的收缩参数(<http://cran.r-project.org/web/packages/elasticnet/index.html>)。`glmpath`包可以得到广义线性模型和COX模型的L1 regularization path(<http://cran.r-project.org/web/packages/glmpath/index.html>)。`penalized`包执行lasso (L1)和ridge (L2)惩罚回归模型(penalized regression models)(<http://cran.r-project.org/web/packages/penalized/index.html>)。`pamr`包执行缩小重心分类法(shrunken centroids classifier)(<http://cran.r-project.org/web/packages/pamr/index.html>)。`earth`包可做多元自适应样条回归(multivariate adaptive regression splines)(<http://cran.r-project.org/web/packages/earth/index.html>)。

1. Boosting :
`gbm`包(<http://cran.r-project.org/web/packages/gbm/index.html>)和`boost`包(<http://cran.r-project.org/web/packages/boost/index.html>)执行多种多样的梯度boosting算法，`gbm`包做基于树的梯度下降boosting，`boost`包包括LogitBoost和L2Boost。`GAMMoost`包提供基于boosting的广义相加模型(generalized additive models)的程序(<http://cran.r-project.org/web/packages/GAMMoost/index.html>)。`mboost`包做基于模型的boosting(<http://cran.r-project.org/web/packages/mboost/index.html>)。

1. 支持向量机(Support Vector Machines)：`e1071`包的`svm()`函数提供R和LIBSVM的接口 (<http://cran.r-project.org/web/packages/e1071/index.html>)。`kernlab`包为基于核函数的学习方法提供了一个灵活的框架，包括SVM、RVM……(<http://cran.r-project.org/web/packages/kernlab/index.html>) 。`klaR`包提供了R和SVMlight的接口(<http://cran.r-project.org/web/packages/klaR/index.html>)。

1. 贝叶斯方法(Bayesian Methods)：
`BayesTree`包执行Bayesian Additive Regression Trees (BART)算法(<http://cran.r-project.org/web/packages/BayesTree/index.html>，<http://www-stat.wharton.upenn.edu/~edgeorge/Research_papers/BART%206--06.pdf>)。`tgp`包做Bayesian半参数非线性回归(Bayesian nonstationary, semiparametric nonlinear regression)(<http://cran.r-project.org/web/packages/tgp/index.html>)。

1. 基于遗传算法的最优化(Optimization using Genetic Algorithms)：`gafit`包(<http://cran.r-project.org/web/packages/gafit/index.html>)和`rgenoud`包(<http://cran.r-project.org/web/packages/rgenoud/index.html>)提供基于遗传算法的最优化程序。

1. 关联规则(Association Rules)：`arules`包提供了有效处理稀疏二元数据的数据结构，而且提供函数执Apriori和Eclat算法挖掘频繁项集、最大频繁项集、闭频繁项集和关联规则(<http://cran.r-project.org/web/packages/arules/index.html>)。

1. 模型选择和确认(Model selection and validation)：`e1071`包的`tune()`函数在指定的范围内选取合适的参数(<http://cran.r-project.org/web/packages/e1071/index.html>)。`ipred`包的`errorest()`函数用重抽样的方法(交叉验证，bootstrap)估计分类错误率(<http://cran.r-project.org/web/packages/ipred/index.html>)。`svmpath`包里的函数可用来选取支持向量机的cost参数C(<http://cran.r-project.org/web/packages/svmpath/index.html>)。`ROCR`包提供了可视化分类器执行效果的函数，如画ROC曲线(<http://cran.r-project.org/web/packages/ROCR/index.html>)。`caret`包供了各种建立预测模型的函数，包括参数选择和重要性量度(<http://cran.r-project.org/web/packages/caret/index.html>)。`caretLSF`包(<http://cran.r-project.org/web/packages/caretLSF/index.html>)和`caretNWS`(<http://cran.r-project.org/web/packages/caretNWS/index.html>)包提供了与`caret`包类似的功能。

1. 统计学习基础(Elements of Statistical Learning)：书《The Elements of Statistical Learning: Data Mining, Inference, and Prediction》(<http://www-stat.stanford.edu/~tibs/ElemStatLearn/>)里的数据集、函数、例子都被打包放在`ElemStatLearn`包里(<http://cran.r-project.org/web/packages/ElemStatLearn/index.html>)。

<hr />
# 背景介绍：

1. **Weka**：Weka有两种意思：一种不会飞的鸟的名字，一个机器学习开源项目的简称(Waikato Environment for Knowledge Analysis，<http://www.cs.waikato.ac.nz/~ml/weka/>)。我们这里当然要介绍的是第二种意思啦，Weka项目从1992年开始，由新西兰政府支持，现在已在机器学习领域大名鼎鼎。Weka里有非常全面的机器学习算法，包括数据预处理、分类、回归、聚类、关联规则等。Weka的图形界面对不会写程序的人来说非常方便，而且提供“KnowledgeFlow”功能，允许将多个步骤组成一个工作流。另外，Weka也允许在命令行执行命令。

1. R：R就不用我废话了吧，呵呵，越来越受欢迎的统计软件(<http://www.r-project.org/>)。

1. R与Weka：R里有很多机器学习的函数和包，不过Weka里提供的函数更全面更集中，所以我有时候需要用到Weka。以前我是这样用R和Weka的：

- 在R中准备好训练的数据(如：提取数据特征……)；
- 整理成Weka需要的格式(*.arff)；
- 在Weka里做机器学习(如：特征选择、分类……)；
- 从Weka的预测结果计算需要的统计量(如：sensitivity, specificity, MCC……)。

来回捣腾两个软件还是挺麻烦的；为了偷懒，我没学`Weka`的命令行，只会用图形界面的，在数据量大的时候非常受罪，有时候还会内存不够。现在发现R竟然提供了和`Weka`的接口函数包`RWeka`，以后方便多了哦，下面介绍一下`RWeka`的功能：

RWeka (<http://cran.r-project.org/web/packages/RWeka/index.html>)：

1. **数据输入和输出**
  - `WOW()`：查看Weka函数的参数。
  - `Weka_control()`：设置Weka函数的参数。
  - `read.arff()`：读Weka Attribute-Relation File Format (ARFF)格式的数据。
  - `write.arff`：将数据写入Weka Attribute-Relation File Format (ARFF)格式的文件。

1. **数据预处理**
  - `Normalize()`：无监督的标准化连续性数据。
  - `Discretize()`：用MDL(Minimum Description Length)方法，有监督的离散化连续性数值数据。

1. **分类和回归**
  - `IBk()`：k最近邻分类
  - `LBR()`：naive Bayes法分类
  - `J48()`：C4.5决策树算法(决策树在分析各个属性时，是完全独立的)。
  - `LMT()`：组合树结构和Logistic回归模型，每个叶子节点是一个Logistic回归模型，准确性比单独的决策树和Logistic回归方法要好。
  - `M5P()`：M5 模型数算法，组合了树结构和线性回归模型，每个叶子节点是一个线性回归模型，因而可用于连续数据的回归。
  - `DecisionStump()`：单层决策树算法，常被作为boosting的基本学习器。
  - `SMO()`：支持向量机分类
  - `AdaBoostM1()`：Adaboost M1方法。-W参数指定弱学习器的算法。
  - `Bagging()`：通过从原始数据取样(用替换方法)，创建多个模型。
  - `LogitBoost()`：弱学习器采用了对数回归方法,学习到的是实数值
  - `MultiBoostAB()`：AdaBoost 方法的改进，可看作AdaBoost和“wagging”的组合。
  - `Stacking()`：用于不同的基本分类器集成的算法。
  - `LinearRegression()`：建立合适的线性回归模型。
  - `Logistic()`：建立logistic回归模型。
  - `JRip()`：一种规则学习方法。
  - `M5Rules()`：用M5方法产生回归问题的决策规则。
  - `OneR()`：简单的1-R分类法。
  - `PART()`：产生PART决策规则。

1. **聚类**
  - `Cobweb()`：这是种基于模型方法，它假设每个聚类的模型并发现适合相应模型的数据。不适合对大数据库进行聚类处理。
  - `FarthestFirst()`：快速的近似的k均值聚类算法
  - `SimpleKMeans()`：k均值聚类算法
  - `XMeans()`：改进的k均值法，能自动决定类别数
  - `DBScan()`：基于密度的聚类方法，它根据对象周围的密度不断增长聚类。它能从含有噪声的空间数据库中发现任意形状的聚类。此方法将一个聚类定义为一组“密度连接”的点集。

1. **关联规则** 
  - `Apriori()`：Apriori是关联规则领域里最具影响力的基础算法，是一种广度优先算法，通过多次扫描数据库来获取支持度大于最小支持度的频繁项集。它的理论基础是频繁项集的两个单调性原则：频繁项集的任一子集一定是频繁的；非频繁项集的任一超集一定是非频繁的。在海量数据的情况下，Apriori 算法的时间和空间成本非常高。

  - `Tertius()`：Tertius算法。

1. **预测和评估**
  - `predict()`：根据分类或聚类结果预测新数据的类别
  - `table()`：比较两个因子对象
  - `evaluate_Weka_classifier()`：评估模型的执行，如：TP Rate，FP Rate，Precision，Recall，F-Measure