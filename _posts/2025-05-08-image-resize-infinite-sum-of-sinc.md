---
title: "[image resize] Infinite sum of sinc() sampled periodically with arbitrary offsets"
date: 2025-05-08 07:39:00 +0000
math: true
---

[**Goal**] Let's formulate the convolution of sinc() and a sampling function  
[**Idea**] Easy in the fourier domain with multiflication and finite calculation

## Infinite sum of sinc() in space and frequency domains

The sinc() is a representative function of lowpass or interpolating filter. In the digital signal processing, sampling sinc() values are used as coefficients of a filter, and the sum of all the coefficients is needed to normalize the filtered values. So, it is needed to formulate the convolution of sinc() and a sampling function.

The infinite sum of sinc() sampled periodically at arbitrary offset is given such as $$ f(x) = \sum\_{k=-\infty}^{\infty} sinc\left( \frac{x-k}{D} \right) = sinc( \frac{x}{D}) \* \sum\_{k=-\infty}^{\infty} \delta (x-k) $$ where and afterwards $ sinc(x)= \frac{sin(\pi x)}{\pi x} $ and D is positive.

The fourier transform of $f(x)$, $\mathscr{F}(\xi)$, is derived by applying   $\mathscr{F}(sinc(\frac{x}{D})) = D\> rect(D \xi)$,   $\mathscr{F}(\sum\_k \delta (x-k)) = \sum\_n \delta (\xi-n)$, and   $\mathscr{F}( f() \* g() ) = \mathscr{F}() \mathscr{G}() $. $$ \mathscr{F}(\xi) = D\> rect( D\xi ) \sum\_{n=-\infty}^{\infty} \delta (\xi-n) $$

## Case 1. D > 1/2

![upsampling](/assets/images/image-resize-infinite-sum-of-sinc/00.png)

If D > 1/2, one and only delta function at DC survives with non-zero gain. Simply, the fourier transform has only DC delta function and therefore f(x) is constant at all the arbitrary offset. $$ \mathscr{F}(\xi) = D\> rect( D\> \xi ) \sum\_{n=-\infty}^{\infty} \delta (\xi-n) = D\> \delta (\xi) $$ $$ f(x) = \mathscr{F}^{-1} ( \mathscr{F}(\xi) ) = D $$

## case 2. D = 1/2N

![dyadic](/assets/images/image-resize-infinite-sum-of-sinc/01.png)

If D = 1/2N (N is natural number), the delta functions at 0, ±1, ..., ±(N-1) survive with a gain D; and $ \delta(\xi±N)$ half-survive with a gain D/2. The inverse fourier transform has DC, some cosine terms, and a half-surviving cosine. $$ \mathscr{F}(\xi) = D\> rect( D\xi ) \sum\_{n=-\infty}^{\infty} \delta (\xi-n) = D\> \sum\_{n=-(N-1)}^{N-1} \delta (\xi-n) + \frac{D}{2} (\delta (\xi+N) + \delta (\xi-N)) $$ $$ f(x) = \mathscr{F}^{-1} ( \mathscr{F}(\xi) ) = D\> \left( 1 + 2 \sum\_{n=1}^{N-1} cos(2\pi n x) + cos(2\pi N x) \right) $$

## case 3. D < 1/2

![downsampling](/assets/images/image-resize-infinite-sum-of-sinc/02.png)

If D< 1/2 and D != 1/2N, the half-surviving cosine of [case 2] does not happen; but DC and some integer-frequency cosine terms within the bandwidth survive.  $$ \mathscr{F}(\xi) = D\> rect( D\xi ) \sum\_{n=-\infty}^{\infty} \delta (\xi-n) = D\> \sum\_{n=-\lfloor\frac{1}{2D}\rfloor}^{\lfloor\frac{1}{2D}\rfloor} \delta (\xi-n) $$ $$ f(x) = \mathscr{F}^{-1} ( \mathscr{F}(\xi) ) = D\> \left( 1 + 2 \sum\_{n=1}^{\lfloor\frac{1}{2D}\rfloor} cos(2\pi n x) \right) $$

### Addendum

In [case 2], there is a multiplication of dirac and rect at a discontinuous point, ±0.5;, and easily rect(±0.5) is substituted with 0.5. It is not well-explained but can be tried to explain because rect() is not continuous but has both left-sided limit and right-sided limit. If we divide the dirac into a non-negative half $\delta\_{p}$ and a negative half $\delta\_{n} $ and replace two half ones with $\frac{\delta()}{2}$, we can approximate the half-surviving cosine as in [case 2]. ( In fact, each $\delta\_{p}()$ and $\delta\_{n}()$ cannot be approximated with $\frac{\delta()}{2}$, but is used because the operation accompanying integral gives the same result) $$ rect(\frac{\xi}{2N}) \delta(\xi-N) = \lim\_{\xi\to N^-} rect(\frac{\xi}{2N}) \delta\_n(\xi-N) + \lim\_{\xi\to N^+} rect(\frac{\xi}{2N}) \delta\_p(\xi-N) = D\> \delta\_n(\xi-N) = \frac{D}{2}\> \delta(\xi-N) $$
