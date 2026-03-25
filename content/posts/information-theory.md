---
title: "信息论基础：熵与互信息"
date: "2024-03-10"
tags: ["信息论", "数学", "机器学习"]
excerpt: "从香农熵出发，探讨信息论中的核心概念：熵、联合熵、条件熵与互信息，以及它们在机器学习中的应用。"
---

# 信息论基础：熵与互信息

信息论由 Claude Shannon 于 1948 年奠基，是现代通信、压缩算法和机器学习的理论基石。

## 1. 香农熵（Shannon Entropy）

对于离散随机变量 $X$，其概率分布为 $P(X = x_i) = p_i$，香农熵定义为：

$$H(X) = -\sum_{i} p_i \log_2 p_i$$

**直观理解**：熵衡量随机变量的不确定性。均匀分布时熵最大，确定性事件熵为 0。

**例子**：二元随机变量的二进制熵函数：

$$H_b(p) = -p \log_2 p - (1-p) \log_2(1-p), \quad p \in [0,1]$$

当 $p = 0.5$ 时，$H_b(0.5) = 1$ bit，不确定性最大。

## 2. 联合熵与条件熵

**联合熵**：

$$H(X, Y) = -\sum_{x,y} p(x,y) \log p(x,y)$$

**条件熵**：

$$H(Y \mid X) = \sum_x p(x) H(Y \mid X=x) = -\sum_{x,y} p(x,y) \log p(y \mid x)$$

**链式法则**：

$$H(X, Y) = H(X) + H(Y \mid X) = H(Y) + H(X \mid Y)$$

## 3. 互信息（Mutual Information）

互信息衡量两个随机变量之间的依赖程度：

$$I(X; Y) = H(X) - H(X \mid Y) = H(Y) - H(Y \mid X)$$

等价地：

$$I(X; Y) = \sum_{x,y} p(x,y) \log \frac{p(x,y)}{p(x)p(y)}$$

**性质**：
- $I(X; Y) \geq 0$，等号成立当且仅当 $X, Y$ 独立
- $I(X; Y) = I(Y; X)$（对称性）
- $I(X; X) = H(X)$（自信息等于熵）

## 4. KL 散度

KL 散度（相对熵）衡量两个分布的差异：

$$D_{KL}(P \| Q) = \sum_x p(x) \log \frac{p(x)}{q(x)}$$

**性质**：$D_{KL}(P \| Q) \geq 0$，且 $D_{KL}(P \| Q) = 0 \iff P = Q$。

互信息与 KL 散度的关系：

$$I(X; Y) = D_{KL}(p(x,y) \| p(x)p(y))$$

## 5. 在机器学习中的应用

### 交叉熵损失

分类任务中常用交叉熵：

$$H(p, q) = -\sum_x p(x) \log q(x) = H(p) + D_{KL}(p \| q)$$

最小化交叉熵等价于最小化 KL 散度，即让模型分布 $q$ 逼近真实分布 $p$。

### 决策树的信息增益

选择特征 $A$ 时，信息增益为：

$$\text{Gain}(S, A) = H(S) - \sum_{v} \frac{|S_v|}{|S|} H(S_v) = I(S; A)$$

```python
import numpy as np

def entropy(labels):
    n = len(labels)
    counts = np.bincount(labels)
    probs = counts / n
    return -np.sum(p * np.log2(p + 1e-12) for p in probs if p > 0)

def information_gain(parent_labels, splits):
    parent_entropy = entropy(parent_labels)
    n = len(parent_labels)
    weighted = sum(len(s) / n * entropy(s) for s in splits)
    return parent_entropy - weighted
```

## 小结

信息论为我们提供了量化信息的数学工具：

| 概念 | 公式 | 含义 |
|------|------|------|
| 熵 | $H(X)$ | 不确定性 |
| 条件熵 | $H(Y\|X)$ | 已知 X 后 Y 的不确定性 |
| 互信息 | $I(X;Y)$ | X 与 Y 的相关程度 |
| KL 散度 | $D_{KL}(P\|Q)$ | 分布差异 |
