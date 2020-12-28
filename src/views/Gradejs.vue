<template>
  <div class="gradejs">
    <div class="content">
      <div class="grade-image" v-for="(src, index) in imgList" :key="index">
        <img :src="src" width="400px" crossorigin="anonymous" @load="init()">
      </div>
      <div class="upload">
        <el-upload
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :on-change="uploadFile">
          <i class="el-icon-plus uploader-icon"></i>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import Grade from 'grade-js'
export default {
  data () {
    return {
      imgUrl: process.env.VUE_APP_IMG_URL,
      imgList: []
    }
  },
  mounted () {
    this.imgList.push(this.imgUrl + 'picture.jpg')
  },
  methods: {
    init () { 
      Grade(document.querySelectorAll('.grade-image'))
    },
    // 上传
    uploadFile (file) {
      const formData = new FormData()
      formData.append('file', file.raw)
      this.$axios.upload(formData).then(res => {
        if (res.success) {
          this.$message({ showClose: true, message: '上传成功', type: 'success' })
          this.imgList.push(this.imgUrl + res.content)
        } else {
          this.$message({ showClose: true, message: res.msg, type: 'error' })
        }
      })
    },
  }
}
</script>

<style scoped>
.gradejs {
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
}
.content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 50px;
}
.grade-image {
  width: 400px;
  padding: 50px;
  margin: 15px;
  border-radius: 5px;
  box-shadow: 0 0 15px rgb(158 158 158 / 77%);
}
.upload {
  display: flex;
  justify-content: center;
}
.upload >>> .el-upload {
  display: inline-block;
  margin-top: 50px;
  margin-bottom: 50px;
  padding-left: 200px;
}
.uploader-icon {
  width: 250px;
  height: calc(250px - 125px);
  border: 1px dashed #eee;
  border-radius: 5px;
  box-shadow: 0 0 15px rgb(158 158 158 / 77%);
  padding-top: 70px;
  font-size: 50px;
  color: #eee;
}
</style>
