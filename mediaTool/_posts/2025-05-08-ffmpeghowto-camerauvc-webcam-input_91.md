---
title: "[ffmpeg][howto] camera(uvc / webcam) input, linux v4l2"
date: 2025-05-08 07:20:00 +0000
math: false
---

[**Goal**] how to input the video of camera(uvc/webcam) to ffmpeg  
*[refer] [Capture/Webcam – FFmpeg](https://trac.ffmpeg.org/wiki/Capture/Webcam#Linux)*

## step 1. Name of a device file ( /dev/video\*)

[cmd] *v4l2-ctl --list-devices*

```
prompt/# v4l2-ctl --list-devices
USB 2.0 Camera: USB Camera (usb-0000:00:14.0-5):
        /dev/video0
        /dev/video1
        /dev/video2
        /dev/video3
        /dev/media0
```

![v4l2 devices](/assets/images/ffmpeghowto-camerauvc-webcam-input_91/00.png)

## step 2. listing options of each device file

[cmd] *ffmpeg -f v4l2 -list\_formats all -i /dev/videoN*

*or  v4l2-ctl --list-formats-ext -d N*

```
test/# ffmpeg -f v4l2 -list_formats all -i /dev/video0 -hide_banner
[video4linux2,v4l2 @ 0x564e7f7bf680] Compressed:       mjpeg :          Motion-JPEG : 1920x1080 1280x720 640x480 320x240
[video4linux2,v4l2 @ 0x564e7f7bf680] Raw       :     yuyv422 :           YUYV 4:2:2 : 640x480 320x240

test/# ffmpeg -f v4l2 -list_formats all -i /dev/video1 -hide_banner
[video4linux2,v4l2 @ 0x55efb68f5680] ioctl(VIDIOC_G_INPUT): Inappropriate ioctl for device

test/# ffmpeg -f v4l2 -list_formats all -i /dev/video2 -hide_banner
[video4linux2,v4l2 @ 0x55c4b8fe4680] Compressed:        h264 :                H.264 : 1920x1080 1280x720 640x480 640x360

test/# ffmpeg -f v4l2 -list_formats all -i /dev/video3 -hide_banner
[video4linux2,v4l2 @ 0x5654a39ef680] ioctl(VIDIOC_G_INPUT): Inappropriate ioctl for device
```

In this example,

/dev/video0 has 2 output-formats, mjpeg/yuyv422.

/dev/video2 has 1 output-format, h264.

/dev/video1 and /dev/video3 are not video-data, but io-control device files.

![v4l2 formats](/assets/images/ffmpeghowto-camerauvc-webcam-input_91/01.png)

## step 3. setting dev file/ input format(codec)/ size/ fps

using ffplay instead of ffmpeg in order to check without more processing

[cmd]

: case. /dev/video0, mjpeg   *ffplay -f v4l2 -input\_format mjpeg -i /dev/video0*

: case. /dev/video0, yuyv     *ffplay**-f v4l2 -input\_format yuyv422 -i /dev/video0*

: case. /dev/video2, h264    *ffplay**-f v4l2 -input\_format h264 -i /dev/video2*

: within the options above, more setting "*-video\_size ... -framerate ...*"

```
test/# ffplay -f v4l2 -input_format mjpeg -video_size 640x480 -framerate 30 -i /dev/video0 -hide_banner
Input #0, video4linux2,v4l2, from '/dev/video0':B sq=    0B f=0/0
  Duration: N/A, start: 17894.969311, bitrate: N/A
  Stream #0:0: Video: mjpeg (Baseline), yuvj422p(pc, bt470bg/unknown/unknown), 640x480, 30 fps, 30 tbr, 1000k tbn, 1000k tbc
[swscaler @ 0x7f84000aa840] deprecated pixel format used, make sure you did set range correctly
17896.00 M-V:  0.000 fd=   0 aq=    0KB vq=  143KB sq=    0B f=0/0
```

![v4l2: a device with a format](/assets/images/ffmpeghowto-camerauvc-webcam-input_91/02.png)
