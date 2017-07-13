---
title: Matlab 统计学工具箱
date: 2012-12-04
categories: ["4-Matlab"]
tags: ["4-Matlab"]
slug: matlab-statistics-toolbox
---

<div>
<div id="leftDivPre" style="float:left; margin-right: 1em; padding-right: 1em; border-right: solid 3px #ddd;">
表1 概率密度函数

<pre>函数名          对应分布的概率密度函数
betapdf         贝塔分布的概率密度函数
binopdf         二项分布的概率密度函数
chi2pdf         卡方分布的概率密度函数
exppdf          指数分布的概率密度函数
fpdf            f分布的概率密度函数
gampdf          伽玛分布的概率密度函数
geopdf          几何分布的概率密度函数
hygepdf         超几何分布的概率密度函数
normpdf         正态（高斯）分布的概率密度函数
lognpdf         对数正态分布的概率密度函数
nbinpdf         负二项分布的概率密度函数
ncfpdf          非中心f分布的概率密度函数
nctpdf          非中心t分布的概率密度函数
ncx2pdf         非中心卡方分布的概率密度函数
poisspdf        泊松分布的概率密度函数
raylpdf         雷利分布的概率密度函数
tpdf            学生氏t分布的概率密度函数
unidpdf         离散均匀分布的概率密度函数
unifpdf         连续均匀分布的概率密度函数
weibpdf         威布尔分布的概率密度函数</pre>
<hr />
表2 累加分布函数

<pre>函数名          对应分布的累加函数
betacdf         贝塔分布的累加函数
binocdf         二项分布的累加函数
chi2cdf         卡方分布的累加函数
expcdf          指数分布的累加函数
fcdf            f分布的累加函数
gamcdf          伽玛分布的累加函数
geocdf          几何分布的累加函数
hygecdf         超几何分布的累加函数
logncdf         对数正态分布的累加函数
nbincdf         负二项分布的累加函数
ncfcdf          非中心f分布的累加函数
nctcdf          非中心t分布的累加函数
ncx2cdf         非中心卡方分布的累加函数
normcdf         正态（高斯）分布的累加函数
poisscdf        泊松分布的累加函数
raylcdf         雷利分布的累加函数
tcdf            学生氏t分布的累加函数
unidcdf         离散均匀分布的累加函数
unifcdf         连续均匀分布的累加函数
weibcdf         威布尔分布的累加函数</pre>

<hr />
表3 累加分布函数的逆函数

<pre>函数名          对应分布的累加分布函数逆函数
betainv         贝塔分布的累加分布函数逆函数
binoinv         二项分布的累加分布函数逆函数
chi2inv         卡方分布的累加分布函数逆函数
expinv          指数分布的累加分布函数逆函数
finv            f分布的累加分布函数逆函数
gaminv          伽玛分布的累加分布函数逆函数
geoinv          几何分布的累加分布函数逆函数
hygeinv         超几何分布的累加分布函数逆函数
logninv         对数正态分布的累加分布函数逆函数
nbininv         负二项分布的累加分布函数逆函数
ncfinv          非中心f分布的累加分布函数逆函数
nctinv          非中心t分布的累加分布函数逆函数
ncx2inv         非中心卡方分布的累加分布函数逆函数
icdf
norminv         正态（高斯）分布的累加分布函数逆函数
poissinv        泊松分布的累加分布函数逆函数
raylinv         雷利分布的累加分布函数逆函数
tinv            学生氏t分布的累加分布函数逆函数
unidinv         离散均匀分布的累加分布函数逆函数
unifinv         连续均匀分布的累加分布函数逆函数
weibinv         威布尔分布的累加分布函数逆函数</pre>

<hr />
表4 随机数生成器函数

<pre>函数名           对应分布的随机数生成器
betarnd         贝塔分布的随机数生成器
binornd         二项分布的随机数生成器
chi2rnd         卡方分布的随机数生成器
exprnd          指数分布的随机数生成器
frnd            f分布的随机数生成器
gamrnd          伽玛分布的随机数生成器
geornd          几何分布的随机数生成器
hygernd         超几何分布的随机数生成器
lognrnd         对数正态分布的随机数生成器
nbinrnd         负二项分布的随机数生成器
ncfrnd          非中心f分布的随机数生成器
nctrnd          非中心t分布的随机数生成器
ncx2rnd         非中心卡方分布的随机数生成器
normrnd         正态（高斯）分布的随机数生成器
poissrnd        泊松分布的随机数生成器
raylrnd         瑞利分布的随机数生成器
trnd            学生氏t分布的随机数生成器
unidrnd         离散均匀分布的随机数生成器
unifrnd         连续均匀分布的随机数生成器
weibrnd         威布尔分布的随机数生成器</pre>

<hr />
表5 分布函数的统计量函数

<pre>函数名          对应分布的统计量
betastat        贝塔分布函数的统计量
binostat        二项分布函数的统计量
chi2stat        卡方分布函数的统计量
expstat         指数分布函数的统计量
fstat           f分布函数的统计量
gamstat         伽玛分布函数的统计量
geostat         几何分布函数的统计量
hygestat        超几何分布函数的统计量
lognstat        对数正态分布函数的统计量
nbinstat        负二项分布函数的统计量
ncfstat         非中心f分布函数的统计量
nctstat         非中心t分布函数的统计量
ncx2stat        非中心卡方分布函数的统计量
normstat        正态（高斯）分布函数的统计量
poisstat        泊松分布函数的统计量
raylstat        瑞利分布函数的统计量
tstat           学生氏t分布函数的统计量
unidstat        离散均匀分布函数的统计量
unifstat        连续均匀分布函数的统计量
weibstat        威布尔分布函数的统计量</pre>

<hr />
表6 参数估计函数

<pre>函数名          对应分布的参数估计
betafit         贝塔分布的参数估计
betalike        贝塔对数似然函数的参数估计
binofit         二项分布的参数估计
expfit          指数分布的参数估计
gamfit          伽玛分布的参数估计
gamlike         伽玛似然函数的参数估计
mle             极大似然估计的参数估计
normlike        正态对数似然函数的参数估计
normfit         正态分布的参数估计
poissfit        泊松分布的参数估计
unifit          均匀分布的参数估计
weibfit         威布尔分布的参数估计
weiblike        威布尔对数似然函数的参数估计</pre>

<hr />
表7 统计量描述函数

<pre>函数名            描述
bootstrap       任何函数的自助统计量
corrcoef        相关系数
cov             协方差
crosstab        列联表
geomean         几何均值
grpstats        分组统计量
harmmean        调和均值
iqr             内四分极值
kurtosis        峰度
mad             中值绝对差
mean            均值
median          中值
moment          样本模量
nanmax          包含缺失值的样本的最大值
Nanmean         包含缺失值的样本的均值
nanmedian       包含缺失值的样本的中值
nanmin          包含缺失值的样本的最小值
nanstd          包含缺失值的样本的标准差
nansum          包含缺失值的样本的和
prctile         百分位数
range           极值
skewness        偏度
std             标准差
tabulate        频数表
trimmean        截尾均值
var             方差</pre>
</div>
<div id="leftDivPre1">

表8 统计图形函数

<pre>函数名            描述
boxplot         箱形图
cdfplot         指数累加分布函数图
errorbar        误差条图
fsurfht         函数的交互等值线图
gline           画线
gname           交互标注图中的点
gplotmatrix     散点图矩阵
gscatter        由第三个变量分组的两个变量的散点图
lsline          在散点图中添加最小二乘拟合线
normplot        正态概率图
pareto          帕累托图
qqplot          Q-Q图
rcoplot         残差个案次序图
refcurve        参考多项式曲线
refline         参考线
surfht          数据网格的交互等值线图
weibplot        威布尔图</pre>

<hr />
表9 统计过程控制函数

<pre>函数名            描述
capable         性能指标
capaplot        性能图
ewmaplot        指数加权移动平均图
histfit         添加正态曲线的直方图
normspec        在指定的区间上绘正态密度
schart          S图
xbarplot        x条图</pre>

<hr />
表10 聚类分析函数

<pre>函数名            描述
cluster         根据linkage函数的输出创建聚类
clusterdata     根据给定数据创建聚类
cophenet        Cophenet相关系数
dendrogram      创建冰柱图
inconsistent    聚类树的不连续值
linkage         系统聚类信息
pdist           观测量之间的配对距离
squareform      距离平方矩阵
zscore          Z分数</pre>

<hr />
表11 线性模型函数

<pre>函数名            描述
anova1          单因子方差分析
anova2          双因子方差分析
anovan          多因子方差分析
aoctool         协方差分析交互工具
dummyvar        拟变量编码
friedman        Friedman检验
glmfit          一般线性模型拟合
kruskalwallis   Kruskalwallis检验
leverage        中心化杠杆值
lscov           已知协方差矩阵的最小二乘估计
manova1         单因素多元方差分析
manovacluster   多元聚类并用冰柱图表示
multcompare     多元比较
                多项式评价及误差区间估计
polyfit         最小二乘多项式拟合
polyval         多项式函数的预测值
polyconf        残差个案次序图
regress         多元线性回归
regstats        回归统计量诊断
Ridge           岭回归
rstool          多佳节又重阳维响应面可视化
robustfit       稳健回归模型拟合
stepwise        逐步回归
x2fx            用于设计矩阵的因子设置矩阵</pre>

<hr />
表12 非线性回归函数

<pre>函数名            描述
nlinfit         非线性最小二乘数据拟合（牛顿法）
nlintool        非线性模型拟合的交互式图形工具
nlparci         参数的置信区间
nlpredci        预测值的置信区间
nnls            非负最小二乘</pre>

<hr />
表13 试验设计函数

<pre>函数名            描述
cordexch        D-优化设计（列交换算法）
daugment        递增D-优化设计
dcovary         固定协方差的D-优化设计
ff2n            二水平完全析因设计
fracfact        二水平部分析因设计
fullfact        混合水平的完全析因设计
hadamard        Hadamard矩阵（正交数组）
rowexch         D-优化设计（行交换算法）</pre>

<hr />
表14 主成分分析函数

<pre>函数名            描述
barttest        Barttest检验
pcacov          源于协方差矩阵的主成分
pcares          源于主成分的方差
princomp        根据原始数据进行主成分分析</pre>

<hr />
表15 多元统计函数

<pre>函数名            描述
classify        聚类分析
mahal           马氏距离
manova1         单因素多元方差分析
manovacluster   多元聚类分析</pre>

<hr />
表16 假设检验函数

<pre>函数名            描述
ranksum         秩和检验
signrank        符号秩检验
signtest        符号检验
ttest           单样本t检验
ttest2          双样本t检验
ztest           z检验</pre>

<hr />
表17 分布检验函数

<pre>函数名            描述
jbtest          正态性的Jarque-Bera检验
kstest          单样本Kolmogorov-Smirnov检验
kstest2         双样本Kolmogorov-Smirnov检验
lillietest      正态性的Lilliefors检验</pre>

<hr />
表18 非参数函数

<pre>函数名            描述
friedman        Friedman检验
kruskalwallis   Kruskalwallis检验
ranksum         秩和检验
signrank        符号秩检验
signtest        符号检验</pre>

<hr />
表19 文件输入输出函数

<pre>函数名            描述
caseread        读取个案名
casewrite       写个案名到文件
tblread         以表格形式读数据
tblwrite        以表格形式写数据到文件
tdfread         从表格间隔形式的文件中读取文本或数值数据</pre>

<hr />
表20 演示函数

<pre>函数名            描述
aoctool         协方差分析的交互式图形工具
disttool        探察概率分布函数的GUI工具
glmdemo         一般线性模型演示
randtool        随机数生成工具
polytool        多项式拟合工具
rsmdemo         响应拟合工具
robustdemo      稳健回归拟合工具</pre>
</div>
</div>
<div style="clear:both"></div>

<script language="javascript">
if (document.getElementById("content").offsetWidth == 700) {
	document.getElementById("leftDivPre").style.float = "none";
	document.getElementById("leftDivPre").style.borderRight = "none";
	document.getElementById("leftDivPre").style.marginRight = "0em";
	document.getElementById("leftDivPre").style.paddingRight = "0em";
}
</script>