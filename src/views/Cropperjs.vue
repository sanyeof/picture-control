<template>
  <div class="con">
    <!-- 操作界面 -->
    <div class="cropperjs-con">
      <img id="image" :src="imgUrl + imgName">
    </div>
    <!-- 操作栏 -->
    <div class="oper">
      <!-- 操作新图片 -->
      <div :class="{ 'oper-item': true }">
        <i @click="replace()" class="el-icon-plus" title="操作新图片"></i>
      </div>
      <!-- 预览 -->
      <div :class="{ 'oper-item': true, 'oper-item-active': showPreview }">
        <i @click="showPreview = !showPreview" class="el-icon-view" title="预览"></i>
      </div>
      <!-- 重置 -->
      <div :class="{ 'oper-item': true }">
        <i @click="reset()" class="el-icon-refresh" title="重置"></i>
      </div>
      <!-- 裁剪 -->
      <div :class="{ 'oper-item': true }">
        <i @click="crop()" class="el-icon-scissors" title="裁剪"></i>
      </div>
      <!-- 放大 -->
      <div :class="{ 'oper-item': true }">
        <i @click="zoom(0.2)" class="el-icon-zoom-in" title="放大"></i>
      </div>
      <!-- 缩小 -->
      <div :class="{ 'oper-item': true }">
        <i @click="zoom(-0.2)" class="el-icon-zoom-out" title="放大"></i>
      </div>
      <!-- 向右旋转 -->
      <div :class="{ 'oper-item': true }">
        <i @click="rotate(15)" class="el-icon-top-right" title="向右旋转"></i>
      </div>
      <!-- 向左旋转 -->
      <div :class="{ 'oper-item': true }">
        <i @click="rotate(-15)" class="el-icon-top-left" title="向左旋转"></i>
      </div>
      <!-- 获取数据 -->
      <div :class="{ 'oper-item': true }">
        <i @click="getData()" class="el-icon-shopping-cart-full" title="获取数据"></i>
      </div>
      <!-- 下载图片 -->
      <div :class="{ 'oper-item': true }">
        <i @click="download()" class="el-icon-download" title="下载图片"></i>
      </div>
    </div>
    <!-- 预览 -->
    <div id="preview" :class="{ 'show-preview': showPreview }"></div>
    <!-- 移动底图 -->
    <div class="move-img" title="移动底图">
      <div><i @click="move(0, -50)" class="el-icon-top"></i></div>
      <div>
        <i @click="move(-50, 0)" class="el-icon-back"></i>
        <i @click="move(50, 0)" class="el-icon-right"></i>
      </div>
      <div><i @click="move(0, 50)" class="el-icon-bottom"></i></div>
      <div><i class="el-icon-caret-bottom"></i></div>
    </div>

    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      width="500px">
      <div class="upload-con">
        <el-upload
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :on-change="uploadFile">
          <span v-if="imgName" class="oper-primary">{{ fileName }}</span>
          <el-button v-else size="small" icon="el-icon-upload2" type="primary">上传</el-button>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
export default {
  data () {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      imgUrl: process.env.VUE_APP_IMG_URL,
      imgName: 'picture.jpg',
      fileName: 'picture.jpg',
      // 容器对象
      cropper: null,
      // 是否可以准备好可以操作了
      canOper: false,
      // 是否显示预览
      showPreview: false,
      // 裁剪框数据，发送给后台可以下载切割的图片
      data: null,
      // 上传新图片相关
      dialogVisible: false
     }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      // 初始化容器
      const image = document.getElementById('image')
      this.cropper = new Cropper(image, {
        viewMode: 0, // 0 1 2 3
        dragMode: 'crop', // crop move none
        // initialAspectRatio: 1,
        // aspectRatio: 1,
        // data: {},
        preview: document.getElementById('preview'),
        responsive: true, // true false
        restore: true, // true false
        checkCrossOrigin: false, // true false
        checkOrientation: true, // true false
        modal: true, // true false
        guides: true, // true false
        center: true, // true false
        highlight: true, // true false
        background: true, // true false
        autoCrop: false, // true false
        autoCropArea: 0.8, // 0 ~ 1
        movable: true, // true false
        rotatable: true, // true false
        scalable: true, // true false
        zoomable: true, // true false
        zoomOnTouch: true, // true false
        zoomOnWheel: true, // true false
        wheelZoomRatio: 0.1, // 数值
        cropBoxMovable: true, // true false
        cropBoxResizable: true, // true false
        toggleDragModeOnDblclick: true, // true false
        minContainerWidth: 300,
        minContainerHeight: 300,
        minCanvasWidth: 0,
        minCanvasHeight: 0,
        minCropBoxWidth: 0,
        minCropBoxHeight: 0,
        ready: () => {
          console.log('ready')
          this.canOper = true
        },
        cropstart () {
          console.log('cropstart-----------')
        },
        cropmove () {
          console.log('cropmove')
        },
        cropend () {
          console.log('cropend------------')
        },
        crop () {
          console.log('crop')
        },
        zoom () {
          console.log('zoom')
        },
      })
    },
    // 替换新图片
    replace () {
      this.dialogVisible = true
    },
    // 上传
    uploadFile (file) {
      const formData = new FormData()
      formData.append('file', file.raw)
      this.$axios.upload(formData).then(res => {
        if (res.success) {
          this.$message({ showClose: true, message: '上传成功', type: 'success' })
          this.imgName = res.content
          this.fileName = file.name
          if (this.canOper) {
            this.cropper.replace(this.imgUrl + res.content)
          } else {
            this.$message.error('Cropper 还没有准备就绪')
          }
        } else {
          this.$message({ showClose: true, message: res.msg, type: 'error' })
        }
      })
    },
    // 裁剪
    crop () {
      if (this.canOper) {
        this.data = null
        this.cropper.clear()
        this.cropper.crop()

        // setTimeout(() => {
        //   this.cropper.disable()
        // }, 3000)
        // setTimeout(() => {
        //   this.cropper.enable()
        // }, 6000)
        
        // setTimeout(() => {
        //   this.cropper.destroy()
        // }, 3000)
      } else {
        this.$message.error('Cropper 还没有准备就绪')
      }
    },
    // 重置
    reset () {
      if (this.canOper) {
        this.cropper.clear()
        this.cropper.reset()
      } else {
        this.$message.error('Cropper 还没有准备就绪')
      }
    },
    // 移动底图
    move (x, y) {
      if (this.canOper) {
        this.cropper.move(x, y)
      } else {
        this.$message.error('Cropper 还没有准备就绪')
      }
    },
    // 缩放（放大缩小）
    zoom (ratio) {
      if (this.canOper) {
        this.cropper.zoom(ratio)
        // const containerData = this.cropper.getContainerData();
        // this.cropper.zoomTo(ratio, {
        //   x: containerData.width / 2,
        //   y: containerData.height / 2,
        // })
      } else {
        this.$message.error('Cropper 还没有准备就绪')
      }
    },
    // 旋转
    rotate (degree) {
      if (this.canOper) {
        this.cropper.rotate(degree)
      } else {
        this.$message.error('Cropper 还没有准备就绪')
      }
    },
    // 获取各种数据
    getData () {
      if (this.canOper) {
        const data1 =  this.cropper.getData(true)
        const data2 =  this.cropper.getContainerData()
        const data3 =  this.cropper.getImageData()
        const data4 =  this.cropper.getCanvasData()
        const data5 =  this.cropper.getCropBoxData()

        console.log('--------- 输出最终裁剪区域的位置和大小数据(基于原始图像的自然大小) ---------')
        console.log(data1)
        console.log('--------- 输出容器大小数据 ---------')
        console.log(data2)
        console.log('--------- 输出图像的位置、大小和其他相关数据 ---------')
        console.log(data3)
        console.log('--------- 输出画布(图像包装器)的位置和大小数据 ---------')
        console.log(data4)
        console.log('--------- 输出裁切框的位置和大小数据 ---------')
        console.log(data5)

        alert('数据已经输出在控制台了，请按F12查看')
      } else {
        this.$message.error('Cropper 还没有准备就绪')
      }
    },
    // 下载
    download () {
      if (this.canOper) {
        this.data = this.cropper.getData(true)
        if (this.data.height === 0 &&
            this.data.rotate === 0 &&
            this.data.scaleX === 1 &&
            this.data.scaleY === 1 &&
            this.data.width === 0 &&
            this.data.x === 0 &&
            this.data.y === 0 ) {
          this.$message.error('还没裁剪')
          return
        }
        this.$axios.download(this.imgName, this.data).then(res => {
          if (res.success) {
            window.open(this.apiUrl + '/images/download/' + res.content)
          } else {
            this.$message.error('生成图片失败')
          }
        })
      } else {
        this.$message.error('Cropper 还没有准备就绪')
      }
    }
  }
}
</script>

<style scoped>
.con {
  height: 100vh;
  width: 100vw;
  display: flex;
  position: relative;
}
.cropperjs-con {
  height: 100vh;
  width: calc(100vw - 50px);
  overflow: hidden;
}
.oper {
  height: calc(100vh - 30px);
  width: 50px;
  text-align: center;
  padding: 15px 0;
}
@keyframes animation-1 {
  from { top: -310px; left: -310px; }
  top { top: 20px; left: 20px; }
}
@keyframes animation-2 {
  from { top: 20px; left: 20px; }
  top { top: -310px; left: -310px; }
}
#preview {
  height: 300px;
  width: 300px;
  position: absolute;
  top: -310px;
  left: -310px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 0 15px #dadada;
  animation: animation-2 0.5s;
}
#preview.show-preview {
  top: 20px;
  left: 20px;
  animation: animation-1 0.5s;
}
.oper-item {
  cursor: pointer;
  margin: 10px 0;
  font-size: 20px;
}
.oper-item:hover, .oper-item-active {
  color: #2196f3;
}

@keyframes animation-3 {
  from { top: 0 }
  top { top: -74px }
}
@keyframes animation-4 {
  from { top: -74px }
  top { top: 0 }
}
.move-img {
  position: absolute;
  top: -74px;
  right: 80px;
  background-color: #fff;
  padding: 5px;
  padding-bottom: 2px;
  text-align: center;
  border-radius: 0 0 5px 5px;
  animation: animation-3 0.5s;
}
.move-img:hover {
  top: 0;
  right: 80px;
  animation: animation-4 0.5s;
}
.move-img>div>i {
  cursor: pointer;
}
.move-img>div>i:hover {
  color: #2196f3;
}
.move-img>div:nth-child(2)>i {
  width: 40px;
}
.move-img>div:nth-child(3) {
  padding-bottom: 5px;
}
.move-img>div:nth-child(4) {
  border-top: 1px solid #eee;
}
.upload-con {
  text-align: center;
}
.oper-primary {
  color: #2196f3;
}
</style>
