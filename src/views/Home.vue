<template>
  <div class="home">
    <div v-for="(item, index) in list" :key="index" class="list" @click="goToTest(item)">
      <div>{{ item.name }}</div>
      <div><i class="el-icon-right"></i></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      list: [
        { name: 'Cropper.js', path: '/Cropperjs' },
        { name: 'Grade.js', path: '/Gradejs' },
        { name: '持续更新中...', path: '' },
      ]
    }
  },
  methods: {
    goToTest (item) {
      this.$router.push(item.path)
    }
  }
}
</script>

<style scoped>
.home {
  height: calc(100vh - 40px);
  width: calc(100vw - 40px);
  padding: 20px;
}
@keyframes animation1 {
  from { box-shadow: 0 0 5px #eee; }
  to { box-shadow: 0 0 15px #ccc; }
}
@keyframes animation2 {
  from { box-shadow: 0 0 15px #ccc; }
  to { box-shadow: 0 0 5px #eee; }
}
.list {
  height: 30px;
  line-height: 30px;
  width: 500px;
  margin: 5px auto;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 0 5px #eee;
  border-radius: 3px;
  cursor: pointer;
  animation: animation2 0.5s;
}
.list:hover {
  box-shadow: 0 0 15px #ccc;
  animation: animation1 0.5s;
}
</style>
