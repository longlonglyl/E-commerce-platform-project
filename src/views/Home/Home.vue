<template>
  <!-- 商品分类列表组件 -->
  <List></List>

  <!-- 轮播图 + 快报 -->
  <Carousel></Carousel>

  <!-- 今日推荐 -->
  <Recommend></Recommend>

  <!-- 商品排行
  <GoodsRank></GoodsRank> -->

  <!-- 猜你喜欢 -->
  <Phone></Phone>

  <!-- 商品分类推荐 -->
  <GoodsClass></GoodsClass>

  <!-- 商标 -->
  <Brand></Brand>
</template>

<script>
import Carousel from '@/components/List/Carousel.vue'
import Recommend from '@/components/Home/Recommend.vue'
// import GoodsRank from '@/components/Home/GoodsRank.vue'
import Phone from '@/components/Home/Phone.vue'
import GoodsClass from '@/components/Home/GoodsClass.vue'
import Brand from '@/components/Home/Brand.vue'
export default {
  components:{ Carousel, Recommend, 
  // GoodsRank, 
  Phone, GoodsClass, Brand },
  setup() {
    return {

    }
  }
}
</script>

<style lang="less">
</style>