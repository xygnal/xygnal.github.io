---
title: "[ffmpeg][hw] how to build for mjpeg_mmal decoder on Raspberry pi"
date: 2025-05-08 06:34:00 +0000
math: false
---

**[goal]** Lets's custom-build ffmpeg to support MJPEG hw decoder on Raspberry pi  
**[idea]** Adopting the achievements of Lluís Batlle i Rossell

## Status

- hw codecs on Raspberry pi used by ffmpeg ~6.0 ( linux kernel ~6.0)  
  : \***\_omx**, not used ( only supported by early 32-bit linux)  
  : \***\_v4l2m2m**, default used ( hw codecs are accessed by v4l2 devices kernel ~6.0)  
  : \***\_mmal**, optionally used ( only 32-bit linux guarantees MMAL of Broadcom)  
- mjpeg hw decoder is not adopted in main ffmpeg, but Lluís had made 3 patches to mjpeg hw decoder using MMAL.  

## How to

Custom-build of ffmpeg will give a speed-up of a mjpeg decoder. It uses not only hardware mjpeg MMAL decoder but also zero-copy of frame memory. So, realtime transcoding from mjpeg to h264 requires a slight usage of CPU.  
The procedure of build is as followings:

```
##  """" MUST BE 32BIT OS """"
sudo apt update
sudo apt install -y autoconf automake build-essential cmake git
git clone git://source.ffmpeg.org/ffmpeg.git -b release/6.0 --depth=1
cd ffmpeg
##  To support MJPEG decoding by MMAL
##  apply 3 patches in https://patchwork.ffmpeg.org/project/ffmpeg/list/?series=3275

##  "--enable-mmal" Broadcom HW codecs via MMAL are supported
##  "--enable-omx"  DO NOT use (not supported in kernel 6.1 even with 32-bit OS)
##  "v4l2m2m"       HW codecs via v4l2 are supported by DEFAULT
##  "--arch=armhf" for RPi >2, "--arch=armel" for RPi 1 @32bit linux
./configure --arch=armhf --enable-mmal

make -j$(nproc)
sudo make install
sudo ldconfig
sudo raspi-config
## 4 Performance Options -> P2 GPU Memory -> "128" -> OK


## USAGE: MJPEG USB camera -> HW dec @mmal -> HW enc @v4l2m2m 
ffmpeg -f v4l2 -input_format mjpeg -video_size 1920x1080 -framerate 30 \
-c:v mjpeg_mmal -i /dev/video0 \
-c:v h264_v4l2m2m -b:v 2M -r:v 30 ...
```
