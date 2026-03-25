---
title: "使用 LaTeX 推导反向传播算法"
date: "2024-01-15"
tags: ["机器学习", "深度学习", "数学"]
excerpt: "深入探讨神经网络反向传播的数学原理，从链式法则出发，用 LaTeX 推导完整的梯度计算过程。"
---

# 使用 LaTeX 推导反向传播算法

反向传播（Backpropagation）是训练神经网络的核心算法。本文通过严格的数学推导，帮助读者理解其本质。

## 1. 基本符号定义

设神经网络共有 $L$ 层，第 $l$ 层的权重矩阵为 $W^{(l)}$，偏置向量为 $b^{(l)}$，激活函数为 $\sigma$。

第 $l$ 层的带权输入（pre-activation）：

$$z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$$

激活输出：

$$a^{(l)} = \sigma(z^{(l)})$$

## 2. 损失函数

对于均方误差损失：

$$\mathcal{L} = \frac{1}{2} \| a^{(L)} - y \|^2$$

## 3. 链式法则与梯度计算

定义误差信号（error signal）：

$$\delta^{(l)} = \frac{\partial \mathcal{L}}{\partial z^{(l)}}$$

**输出层误差：**

$$\delta^{(L)} = (a^{(L)} - y) \odot \sigma'(z^{(L)})$$

其中 $\odot$ 表示逐元素乘法（Hadamard product）。

**隐藏层误差（向后递推）：**

$$\delta^{(l)} = \left( W^{(l+1)\top} \delta^{(l+1)} \right) \odot \sigma'(z^{(l)})$$

## 4. 参数梯度

$$\frac{\partial \mathcal{L}}{\partial W^{(l)}} = \delta^{(l)} \left( a^{(l-1)} \right)^\top$$

$$\frac{\partial \mathcal{L}}{\partial b^{(l)}} = \delta^{(l)}$$

## 5. 梯度下降更新

$$W^{(l)} \leftarrow W^{(l)} - \eta \frac{\partial \mathcal{L}}{\partial W^{(l)}}$$

$$b^{(l)} \leftarrow b^{(l)} - \eta \frac{\partial \mathcal{L}}{\partial b^{(l)}}$$

其中 $\eta$ 为学习率。

## 6. 完整算法流程

1. **前向传播**：逐层计算 $z^{(l)}$ 和 $a^{(l)}$
2. **计算损失**：$\mathcal{L}(a^{(L)}, y)$
3. **反向传播**：从 $l = L$ 到 $l = 1$，计算 $\delta^{(l)}$
4. **更新参数**：用计算出的梯度更新 $W^{(l)}$, $b^{(l)}$

## 7. 代码实现

```python
import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def sigmoid_prime(z):
    s = sigmoid(z)
    return s * (1 - s)

def backprop(X, y, weights, biases, lr=0.01):
    L = len(weights)
    # 前向传播
    activations = [X]
    zs = []
    a = X
    for W, b in zip(weights, biases):
        z = W @ a + b
        zs.append(z)
        a = sigmoid(z)
        activations.append(a)

    # 反向传播
    delta = (activations[-1] - y) * sigmoid_prime(zs[-1])
    grad_W = [delta @ activations[-2].T]
    grad_b = [delta]

    for l in range(L - 2, -1, -1):
        delta = (weights[l + 1].T @ delta) * sigmoid_prime(zs[l])
        grad_W.insert(0, delta @ activations[l].T)
        grad_b.insert(0, delta)

    # 更新参数
    for i in range(L):
        weights[i] -= lr * grad_W[i]
        biases[i] -= lr * grad_b[i]

    return weights, biases
```

## 小结

反向传播本质上是链式法则的高效实现。理解其数学基础，有助于我们更好地调试网络、选择激活函数以及设计优化策略。

> 下一篇将介绍 **Adam 优化器** 的数学原理与实现。
