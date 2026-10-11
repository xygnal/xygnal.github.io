---
title: "[ffmpeg][hw] NVMPI (JETSON tegra HW codecs) support in JETPACK 5"
date: 2025-04-03 05:41:00 +0000
math: false
---

**[goal]** Let's custom-build ffmpeg to support HW codecs on JETSON tegra

**[idea]** Adopting the achievements of Jocover and Keylost

## Status

- ffmpeg arm64 package has "v4l2m2m, omx" codecs, which is not supported on JETSON.  
- Tegra in JETSON has HW codecs, so the proper plugin should be custom-patched.  
- That's ""  **NVMPI**  "".

## JETPACK 4

- Adopt the achievements  
  [GitHub - jocover/jetson-ffmpeg: ffmpeg support on jetson nano](https://github.com/jocover/jetson-ffmpeg) or  
  [GitHub - Keylost/jetson-ffmpeg: ffmpeg support on jetson nano](https://github.com/Keylost/jetson-ffmpeg)- use "" -c:v h264\_nvmpi ""

## JETPACK 5

*(NB: To avoid NvEnc\_NVVIDEO\_Error, use L4T 35.2.1/ JP 5.1 instead of L4T 35.4.1/ JP 5.1.2 )*

- **nvbuf\_utils.h** of JP4 is changed to "nvbufsurface.h" of JP5.

- So, there are many build errors related to " **LIB\_NVBUF** ".  
- Already patched. In the following, the procedure is summarized.

```
# need package when no /usr/src/jetson_multimedia_api/ by flashing only L4T using ./flash.sh
sudo apt install build-essential cmake nvidia-l4t-jetson-multimedia-api

# build NVMPI
git clone https://github.com/Keylost/jetson-ffmpeg.git
cd jetson-ffmpeg
vi ./CMakeLists.txt
## If JETPACK 5 (kernelV. 5.x), remark line 21... #find_library(LIB_NVBUF ...
mkdir build && cd build
cmake ..
make -j$(nproc)
sudo make install
sudo ldconfig
cd ../..

# patch and build ffmpeg
git clone git://source.ffmpeg.org/ffmpeg.git -b release/6.0 --depth=1  ## possible ver 4.2/4.4/6.0
cd ffmpeg
wget -O ffmpeg_nvmpi.patch https://github.com/Keylost/jetson-ffmpeg/raw/master/ffmpeg_patches/ffmpeg6.0_nvmpi.patch
git apply ffmpeg_nvmpi.patch
./configure --enable-nvmpi  ## more option possible
make -j$(nproc)
sudo make install  ## Please "apt remove ffmpeg" before if installed
sudo ldconfig
```
