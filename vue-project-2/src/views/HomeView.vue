<script setup lang="ts">
import NoLoginHeader from '../components/NoLoginHeader.vue'
import Footer from '../components/Footer.vue'

const books = [
  {
    id: 1,
    url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
  },
  {
    id: 2,
    url: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg', 
  },
  {
    id: 3,
    url: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', 
  },
  {
    id: 4,
    url: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg', 
  }
]
const genHref = (bookId: number) => {
  return "/article?articleId=" + bookId
}
</script>

<template>
  <div class="common-layout">
  <el-container>
      <el-header>
        <NoLoginHeader></NoLoginHeader>
      </el-header>
      <el-main>
        <el-row justify="center" class="card-item">
          <el-col :span="22">
            <el-card>
            <el-row justify="center">
              <h2>热点文章</h2>
            </el-row>
            <el-carousel :interval="4000" type="card" height="300px">
            <el-carousel-item v-for="book in books" :key="book.id">
              <!-- <h3 text="2xl" justify="center">{{ item }}</h3> -->
              <el-link :href="genHref(book.id)" target="blank" >
                <el-image :src="book.url" fit="fill" />
              </el-link>
            </el-carousel-item>
          </el-carousel>
        </el-card>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="22">
            <el-card>
            <el-row justify="center">
              <h2>达人榜</h2>
            </el-row>
            <el-row :gutter=20>
              <el-col :span="8">
                <el-card>
                  <span>小明</span>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card>
                  <span>小帅</span>
                </el-card>
              </el-col>
              <el-col :span="8">
                <el-card>
                  <span>小美</span>
                </el-card>
              </el-col>
            </el-row>
        </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 400px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.card-item {
  margin-bottom: 20px;
  margin-top: 20px;
}

.main-body {
  background-image: '/Users/liuchanglei/Documents/工作/项目/my/my-blog-fe/vue-project-2/src/assets/bg1.png';
}
</style>