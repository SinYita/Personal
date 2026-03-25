---
title: "Information Theory Basics: Entropy and Mutual Information"
date: "2024-03-10"
tags: ["Information Theory", "Mathematics", "Machine Learning"]
excerpt: "Starting from Shannon entropy, explore core concepts in information theory: entropy, joint entropy, conditional entropy, and mutual information, and their applications in machine learning."
---

# Information Theory Basics: Entropy and Mutual Information

Information theory, founded by Claude Shannon in 1948, is the theoretical cornerstone of modern communication, compression algorithms, and machine learning.

## 1. Shannon Entropy

For a discrete random variable $X$ with probability distribution $P(X = x_i) = p_i$, Shannon entropy is defined as:

$$H(X) = -\sum_{i} p_i \log_2 p_i$$

**Intuition**: Entropy measures the uncertainty of a random variable. The entropy is maximized when the distribution is uniform, and is 0 for a deterministic event.

**Example**: The binary entropy function for a binary random variable:

$$H_b(p) = -p \log_2 p - (1-p) \log_2(1-p), \quad p \in [0,1]$$

When $p = 0.5$, $H_b(0.5) = 1$ bit, the uncertainty is maximized.

## 2. Joint Entropy and Conditional Entropy

**Joint Entropy**:

$$H(X, Y) = -\sum_{x,y} p(x,y) \log p(x,y)$$

**Conditional Entropy**:

$$H(Y \mid X) = \sum_x p(x) H(Y \mid X=x) = -\sum_{x,y} p(x,y) \log p(y \mid x)$$

**Chain Rule**:

$$H(X, Y) = H(X) + H(Y \mid X) = H(Y) + H(X \mid Y)$$

## 3. Mutual Information

Mutual information measures the degree of dependency between two random variables:

$$I(X; Y) = H(X) - H(X \mid Y) = H(Y) - H(Y \mid X)$$

Equivalently:

$$I(X; Y) = \sum_{x,y} p(x,y) \log \frac{p(x,y)}{p(x)p(y)}$$

**Properties**:
- $I(X; Y) \geq 0$, with equality if and only if $X$ and $Y$ are independent.
- $I(X; Y) = I(Y; X)$ (Symmetry).
- $I(X; X) = H(X)$ (Self-information equals entropy).

## 4. KL Divergence

KL divergence (relative entropy) measures the difference between two distributions:

$$D_{KL}(P \| Q) = \sum_x p(x) \log \frac{p(x)}{q(x)}$$

**Properties**: $D_{KL}(P \| Q) \geq 0$, and $D_{KL}(P \| Q) = 0 \iff P = Q$.

Relationship between mutual information and KL divergence:

$$I(X; Y) = D_{KL}(p(x,y) \| p(x)p(y))$$

## 5. Applications in Machine Learning

### Cross-Entropy Loss

Cross-entropy is commonly used in classification tasks:

$$H(p, q) = -\sum_x p(x) \log q(x) = H(p) + D_{KL}(p \| q)$$

Minimizing cross-entropy is equivalent to minimizing KL divergence, i.e., making the model distribution $q$ approximate the true distribution $p$.

### Information Gain in Decision Trees

When selecting feature $A$, the information gain is:

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

## Summary

Information theory provides us with mathematical tools to quantify information:

| Concept | Formula | Meaning |
|---------|---------|---------|
| Entropy | $H(X)$ | Uncertainty |
| Conditional Entropy | $H(Y\|X)$ | Uncertainty of Y given X |
| Mutual Information | $I(X;Y)$ | Degree of correlation between X and Y |
| KL Divergence | $D_{KL}(P\|Q)$ | Distribution difference |
