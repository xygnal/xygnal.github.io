---
title: "Style check: math and code"
date: 2025-05-08 12:00:00 +0900
math: true
---

Delete this post after visual check.

Inline math $sinc(x) = \frac{\sin(\pi x)}{\pi x}$ and display math:

$$
f(x) = \sum_{k=-\infty}^{\infty} sinc\left(\frac{x-k}{D}\right)
$$

```bash
ffmpeg -f v4l2 -list_formats all -i /dev/video0 -hide_banner
```

```python
import math

def sinc(x: float) -> float:
    return 1.0 if x == 0 else math.sin(math.pi * x) / (math.pi * x)
```
