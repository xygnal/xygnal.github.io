---
title: "[ffmpeg][howto] camera(uvc / webcam) input, macOS avfoundation"
date: 2025-05-08 07:13:00 +0000
math: false
---

[**goal**] how to input the video of camera(uvc/webcam) to ffmpeg

*[refer] [Capture/Webcam – FFmpeg](https://trac.ffmpeg.org/wiki/Capture/Webcam#AVFoundation)*

  

## step 1. Name or matching number of a device

[cmd] *ffmpeg -f avfoundation -list\_devices true -i ""*

```
prompt/$ ffmpeg -f avfoundation -list_devices true -i "" -hide_banner
[AVFoundation indev @ 0x7fa92a404800] AVFoundation video devices:
[AVFoundation indev @ 0x7fa92a404800] [0] USB 2.0 Camera
[AVFoundation indev @ 0x7fa92a404800] [1] Capture screen 0
[AVFoundation indev @ 0x7fa92a404800] AVFoundation audio devices:
[AVFoundation indev @ 0x7fa92a404800] [0] Built-in Input
```

In avfoundation, there is only one raw video output per a device.

( There is no output of mjpeg / h264.)

![avf devices](/assets/images/ffmpeghowto-camerauvc-webcam-input/00.png)  

## step 2. setting size/ fps/ pixel format

using ffplay instead of ffmpeg in order to check without more processing

[cmd] *ffplay -f avfoundation -video\_size ... -framerate ... -pixel\_format ... -i "0"*

```
prompt/$ ffplay -f avfoundation -video_size 640x480 -framerate 30 -pixel_format uyvy422 -i "0" -hide_banner
Input #0, avfoundation, from '0':  0KB vq=    0KB sq=    0B f=0/0   
  Duration: N/A, start: 5167862.913600, bitrate: N/A
  Stream #0:0: Video: rawvideo (UYVY / 0x59565955), uyvy422, 640x480, 30 fps, 30 tbr, 1000k tbn
5167864.37 M-V:  0.000 fd=   0 aq=    0KB vq= 3600KB sq=    0B f=0/0
```
