---
title: "[ffmpeg][hw] solutions for issues with h264_v4l2m2m encoder"
date: 2025-05-08 07:09:00 +0000
math: false
---

**[goal]** Let's apply a patch to ffmpeg to avoid issues with h264\_v4l2m2m encoder

**[idea]** adopting [avcodec/v4l2\_m2m\_enc: add creation of extradata & trim hw setting · eznspd/FFmpeg@129fb83 (github.com)](https://github.com/eznspd/FFmpeg/commit/129fb83aa0a8b4eefcfa45200e192fa2f474684a)

## Cause & solution

There are some issues with **v4l2\_m2m\_enc** (especially with raspberry pi). When using ffmpeg -i ... -c:v **h264\_v4l2m2m** ... , there are many warnings and some unexpected exits (on raspberry pi). **The above commit** will make you avoid them.

```
warning (frequent), "Non-monotonous DTS in output stream"
warning (sparse), "All capture buffers returned to userspace"
```

Because formatters treat a header and a key-frame as 2 separate frames with MPEG\_VIDEO(HEADER\_MODE\_SEPARATE). So, "joined header mode" is preferable.

```
error, "Could not find codec parameters for stream 0"
error, "non-existing PPS 0 referenced"
```

Because extradata (e.g. SPS/PPS) is not created at init with AV\_CODEC\_FLAG\_GLOBAL\_HEADER. Encoding dummy frame at init avoids this issue. But there need more cleanups with flushing buffer and timing (**Experts about v4l2 buffers** are needed for help)
