<template>
  <section>
    <div class="block">
      <el-carousel height="450px">
        <el-carousel-item v-for="img in imgs" :key="img.url">
          <img class="car-img" :src="img.url" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- <div class="block">
      <span class="demonstration">Switch when indicator is clicked</span>
      <el-carousel trigger="click" height="150px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="small">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>-->
  </section>
</template>

<script>
export default {
  name: "carousel",
  props: ["imgs"],
  created() {
    console.log(this.imgs);
  },
};
</script>

<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.el-carousel__container {
  position: relative;
}

.el-carousel--horizontal {
    overflow-x: hidden;
}
.car-img {
    width: 100%;
    height: 450px;
}
</style>