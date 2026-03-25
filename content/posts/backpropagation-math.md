---
title: "Deriving Backpropagation with LaTeX"
date: "2024-01-15"
tags: ["Machine Learning", "Deep Learning", "Mathematics"]
excerpt: "An in-depth exploration of the mathematical principles behind backpropagation in neural networks, deriving the complete gradient calculation process using the chain rule and LaTeX."
---

# Deriving Backpropagation with LaTeX

Backpropagation is the core algorithm for training neural networks. This article provides a rigorous mathematical derivation to help you understand its essence.

## 1. Basic Symbol Definitions

Assume a neural network has $L$ layers. The weight matrix for layer $l$ is $W^{(l)}$, the bias vector is $b^{(l)}$, and the activation function is $\sigma$.

The pre-activation for layer $l$:

$$z^{(l)} = W^{(l)} a^{(l-1)} + b^{(l)}$$

Activation output:

$$a^{(l)} = \sigma(z^{(l)})$$

## 2. Loss Function

For Mean Squared Error (MSE) loss:

$$\mathcal{L} = \frac{1}{2} \| a^{(L)} - y \|^2$$

## 3. Chain Rule and Gradient Calculation

Define the error signal:

$$\delta^{(l)} = \frac{\partial \mathcal{L}}{\partial z^{(l)}}$$

**Output layer error:**

$$\delta^{(L)} = (a^{(L)} - y) \odot \sigma'(z^{(L)})$$

Where $\odot$ denotes the Hadamard product (element-wise multiplication).

**Hidden layer error (backward propagation):**

$$\delta^{(l)} = \left( W^{(l+1)\top} \delta^{(l+1)} \right) \odot \sigma'(z^{(l)})$$

## 4. Parameter Gradients

$$\frac{\partial \mathcal{L}}{\partial W^{(l)}} = \delta^{(l)} \left( a^{(l-1)} \right)^\top$$

$$\frac{\partial \mathcal{L}}{\partial b^{(l)}} = \delta^{(l)}$$

## 5. Gradient Descent Update

$$W^{(l)} \leftarrow W^{(l)} - \eta \frac{\partial \mathcal{L}}{\partial W^{(l)}}$$

$$b^{(l)} \leftarrow b^{(l)} - \eta \frac{\partial \mathcal{L}}{\partial b^{(l)}}$$

Where $\eta$ is the learning rate.

## 6. Complete Algorithm Flow

1. **Forward Propagation**: Compute $z^{(l)}$ and $a^{(l)}$ for each layer.
2. **Compute Loss**: $\mathcal{L}(a^{(L)}, y)$
3. **Backpropagation**: Compute $\delta^{(l)}$ from $l = L$ down to $l = 1$.
4. **Update Parameters**: Use the computed gradients to update $W^{(l)}$ and $b^{(l)}$.

## 7. Code Implementation

```python
import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def sigmoid_prime(z):
    s = sigmoid(z)
    return s * (1 - s)

def backprop(X, y, weights, biases, lr=0.01):
    L = len(weights)
    # Forward propagation
    activations = [X]
    zs = []
    a = X
    for W, b in zip(weights, biases):
        z = W @ a + b
        zs.append(z)
        a = sigmoid(z)
        activations.append(a)

    # Backpropagation
    delta = (activations[-1] - y) * sigmoid_prime(zs[-1])
    grad_W = [delta @ activations[-2].T]
    grad_b = [delta]

    for l in range(L - 2, -1, -1):
        delta = (weights[l + 1].T @ delta) * sigmoid_prime(zs[l])
        grad_W.insert(0, delta @ activations[l].T)
        grad_b.insert(0, delta)

    # Update parameters
    for i in range(L):
        weights[i] -= lr * grad_W[i]
        biases[i] -= lr * grad_b[i]

    return weights, biases
```

## Summary

Backpropagation is essentially an efficient implementation of the chain rule. Understanding its mathematical foundation helps us better debug networks, choose activation functions, and design optimization strategies.

> The next article will introduce the mathematical principles and implementation of the **Adam Optimizer**.
