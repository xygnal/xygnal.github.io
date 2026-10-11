---
title: "[ffmpeg][howto] camera(uvc / webcam) input, windows dshow"
date: 2025-05-08 07:17:00 +0000
math: false
---

[**Goal**] how to input the video of camera(uvc/webcam) to ffmpeg  
*[refer] [FFmpeg Devices Documentation](http://ffmpeg.org/ffmpeg-devices.html#dshow)*

## step 1. Name of a device

[cmd] *ffmpeg -f dshow -list\_devices true -i dummy*

```
c:\>ffmpeg -f dshow -list_devices true -i dummy -hide_banner
[dshow @ 00000224729cef80] "USB Camera" (video)
[dshow @ 00000224729cef80]   Alternative name "@device_pnp_\\?\usb#vid_0c45&pid_6366&mi_00#6&183af011&0&0000#{65e8773d-8f56-11d0-a3b9-00a0c9223196}\global"
[dshow @ 00000224729cef80] "Mic(USB 2.0 Camera)" (audio)
[dshow @ 00000224729cef80]   Alternative name "@device_cm_{33D9A762-90C8-11D0-BD43-00A0C911CE86}\wave_{87226CE3-C5B1-4D1F-BDC3-8161DF777F06}"
```

![dshow device](/assets/images/ffmpeghowto-camerauvc-webcam-input_8/00.png)

## step 2. listing options of device outputs

[cmd] *ffmpeg -f dshow -list\_options true -i video="USB Camera"*

```
c:\>ffmpeg -f dshow -list_options true -i video="USB Camera" -hide_banner
[dshow @ 000001b65322ef80] DirectShow video device options (from video devices)
[dshow @ 000001b65322ef80]  Pin "Capture" (alternative pin name "0")
[dshow @ 000001b65322ef80]   vcodec=mjpeg  min s=1920x1080 fps=30 max s=1920x1080 fps=30
[dshow @ 000001b65322ef80]   vcodec=mjpeg  min s=1920x1080 fps=30 max s=1920x1080 fps=30 (pc, bt470bg/bt709/unknown, center)
[dshow @ 000001b65322ef80]   vcodec=mjpeg  min s=1280x720 fps=30 max s=1280x720 fps=30
[dshow @ 000001b65322ef80]   vcodec=mjpeg  min s=1280x720 fps=30 max s=1280x720 fps=30 (pc, bt470bg/bt709/unknown, center)
[dshow @ 000001b65322ef80]   vcodec=mjpeg  min s=640x480 fps=30 max s=640x480 fps=30
[dshow @ 000001b65322ef80]   vcodec=mjpeg  min s=640x480 fps=30 max s=640x480 fps=30 (pc, bt470bg/bt709/unknown, center)
[dshow @ 000001b65322ef80]   vcodec=mjpeg  min s=320x240 fps=30 max s=320x240 fps=30
[dshow @ 000001b65322ef80]   vcodec=mjpeg  min s=320x240 fps=30 max s=320x240 fps=30 (pc, bt470bg/bt709/unknown, center)
[dshow @ 000001b65322ef80]   pixel_format=yuyv422  min s=640x480 fps=30 max s=640x480 fps=30
[dshow @ 000001b65322ef80]   pixel_format=yuyv422  min s=640x480 fps=30 max s=640x480 fps=30 (tv, bt470bg/bt709/unknown, topleft)
[dshow @ 000001b65322ef80]   pixel_format=yuyv422  min s=320x240 fps=30 max s=320x240 fps=30
[dshow @ 000001b65322ef80]   pixel_format=yuyv422  min s=320x240 fps=30 max s=320x240 fps=30 (tv, bt470bg/bt709/unknown, topleft)
[dshow @ 000001b65322ef80]  Pin "Capture" (alternative pin name "1")
[dshow @ 000001b65322ef80]   vcodec=h264  min s=1920x1080 fps=30 max s=1920x1080 fps=30
[dshow @ 000001b65322ef80]   vcodec=h264  min s=1920x1080 fps=30 max s=1920x1080 fps=30 (tv, bt470bg/bt709/unknown, topleft)
[dshow @ 000001b65322ef80]   vcodec=h264  min s=1280x720 fps=30 max s=1280x720 fps=30
[dshow @ 000001b65322ef80]   vcodec=h264  min s=1280x720 fps=30 max s=1280x720 fps=30 (tv, bt470bg/bt709/unknown, topleft)
[dshow @ 000001b65322ef80]   vcodec=h264  min s=640x480 fps=30 max s=640x480 fps=30
[dshow @ 000001b65322ef80]   vcodec=h264  min s=640x480 fps=30 max s=640x480 fps=30 (tv, bt470bg/bt709/unknown, topleft)
[dshow @ 000001b65322ef80]   vcodec=h264  min s=640x360 fps=30 max s=640x360 fps=30
[dshow @ 000001b65322ef80]   vcodec=h264  min s=640x360 fps=30 max s=640x360 fps=30 (tv, bt470bg/bt709/unknown, topleft)
```

In this example, pin "0" has mjpeg/ yuyv422 and pin "1" has h264.

![dshow pins and formats](/assets/images/ffmpeghowto-camerauvc-webcam-input_8/01.png)

## step 3. setting pin/ codec/ size/ fps

using ffplay instead of ffmpeg in order to check without more processing

[cmd]

: case pin 0, mjpeg   *ffplay -f dshow -video\_pin\_name 0 -vcodec mjpeg -i video="USB Camera"*

: case pin 0, yuyv     *ffplay -f dshow -video\_pin\_name 0 -pixel\_format yuyv422 -i video="USB Camera"*

: case pin 1, h264    *ffplay -f dshow -video\_pin\_name 1 -vcodec h264 -i video="USB Camera"*

: within the options above, more setting "*-video\_size ... -framerate ...*"

```
c:\>ffplay -f dshow -video_pin_name 0 -vcodec mjpeg -video_size 640x480 -framerate 30 -i video="USB Camera" -hide_banner
Input #0, dshow, from 'video=USB Camera':=    0KB sq=    0B f=0/0
  Duration: N/A, start: 101910.525146, bitrate: N/A
  Stream #0:0: Video: mjpeg (Baseline) (MJPG / 0x47504A4D), yuvj422p(pc, bt470bg/bt709/unknown), 640x480, 30 fps, 30 tbr, 10000k tbn
    Last message repeated 2 times
101912.40 M-V:  0.005 fd=   0 aq=    0KB vq=    0KB sq=    0B f=0/0
```

[NB] option "-video\_device\_number"

If more than 1 with the same camera name, this option points out the specific camera.

![dshow: a device with a pin and a format](/assets/images/ffmpeghowto-camerauvc-webcam-input_8/02.png)
