---
id: data-viz
title: Data Viz Dashboard
description: A visualization dashboard with flexible chart primitives and import workflows for exploratory analysis.
techStack: [React, D3.js, TypeScript, Python, Pandas]
tags: [Data Visualization, Dashboard, D3]
featured: false
date: 2023-05
---

## Overview

This dashboard focuses on fast data exploration. The goal was to make it easy to load a dataset, switch visual encodings, and compare trends without rewriting chart code.

## Key Features

- Support for line, bar, pie, and heatmap visualizations.
- CSV and JSON import with lightweight preprocessing.
- Dynamic chart updates based on selected dimensions and metrics.

## Engineering Decisions

- Used D3 for low-level control while keeping React in charge of state and composition.
- Added consistent color and axis conventions to reduce cognitive load across chart types.
