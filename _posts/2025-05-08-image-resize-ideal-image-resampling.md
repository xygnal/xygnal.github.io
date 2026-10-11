---
title: "[image resize] ideal image resampling (resizing)"
date: 2025-05-08 07:23:00 +0000
math: true
---

[**Goal**] Let's formulate the image resampling with arbitrary ratio  
[**Idea**] The incoincident sampling points can be treated with continuous-signal stopover by sampling theory.

## 1. By Nyquist-Shannon sampling theory

**[1]** Discrete would be interpolated into continuous with the **same** information by **sinc**().

![sampling theory](/assets/images/image-resize-ideal-image-resampling/00.png)**[2]** Continous signal should be **anti-alias filter**ed before sampling in order to prevent the annoying alias at the expense of minimal-removed high frequency.

![anti-alias filter](/assets/images/image-resize-ideal-image-resampling/01.png)

#### 

## 2. image resampling

Ideal image resampling can be done by [1] lowpass for interpolation/ [2] lowpass for anti-alias/ [3] sampling. The frequency response of merged two lowpass is ('1' is the bandwith of interpolation and 'r' is the relative BW of anti-alias filter)  $$ LPF(\xi) = rect(r \xi) rect(\xi) = rect(min(1, r) \xi) $$

![merged LPF](/assets/images/image-resize-ideal-image-resampling/02.png)  

## 3. image up-sampling

When a image is up-sampled (r>1, detailed with more samples), the lowpass filter is $ sinc(x)$ or $rect(\xi)$. So, $$s(x) = \sum\_{n=-\infty}^{\infty} s(n)\delta(x-n) \* sinc(x) = \sum\_{n=-\infty}^{\infty} s(n)sinc(x-n)$$ $$t(m) = s(x\_m) = \sum\_{n=-\infty}^{\infty} s(n)sinc(x\_m-n)$$ where $\sum\_{n=-\infty}^{\infty} sinc(x\_m-n) = 1$ for any $x\_m$, that is explained in [my previous article](https://xygnal.blogspot.com/2025/05/image-resize-infinite-sum-of-sinc.html) with D=1.

In other words, a target sample is calculated by the weighted sum of source samples with sinc(distance) weights, and the sum of all weights is always ONE. And the target sampling point, $x\_m$, would be discussed in the other article.

![upsampling](/assets/images/image-resize-ideal-image-resampling/03.png)

## 4. image down-sampling

When a image is down-sampled (r<1, lowpass filtered with less samples), the lowpass filter is $ r⋅sinc(rx)$ or $rect(\xi /r)$. On the contrary (when up-sampling, interpolation function is fixed with sinc(x) ), the lobe of sinc is widen inverse-proportional to r, and the bandwidth of the filter is reduced proportional to r. So, $$s(x) = r \sum\_{n=-\infty}^{\infty} s(n)\delta(x-n) \* sinc(rx) = r \sum\_{n=-\infty}^{\infty} s(n)sinc(r(x-n))$$ $$t(m) = s(x\_m) = r \sum\_{n=-\infty}^{\infty} s(n)sinc(r(x\_m-n))$$ where $\sum\_{n=-\infty}^{\infty} sinc(r(x\_m-n)) = 1/r$ for any $x\_m$, that is explained in [my previous article](https://eznspd.blogspot.com/2023/11/imgresz-sinc-infsum.html) with D=1/r.

In other words, a target sample is calculated by the weighted sum of source samples with sinc(distance) weights, and the sum of all weights is always "**1/r**" (which is normalized with the pre-multiplied gain of sinc, 'r').  A wider mainlobe gives strong weights to more samples, so the sum of weight is larger than ONE (However, with given 'r', the sum of weight is constant). And the target sampling point, $x\_m$, would be discussed in the other article.

![downsampling](/assets/images/image-resize-ideal-image-resampling/04.png)
