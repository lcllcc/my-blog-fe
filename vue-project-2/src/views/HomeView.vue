<script setup lang="ts">
import NoLoginHeader from '../components/NoLoginHeader.vue'
import Footer from '../components/Footer.vue'
import http from '../http.js'
import { ref } from 'vue'
import {type Article} from '../model'

const books = ref<Article[]>([
])

const pageNumber = ref(0)
const pageSize = ref(5)

// 查询热门书籍
const loadHotArticles = (pageNumber, pageSize) => {http.get('/article/hot', {
    page: pageNumber,
    size: pageSize,
    keyword: null
  }).then(res => {
    books.value = res.data.content
  }).catch(err => {
    
  }).finally(() => {
    
  })}

const gotoArticle = (articleId?: number) => {
        window.open("/article?articleId=" + articleId)
  }

loadHotArticles(pageNumber.value, pageSize.value)
</script>

<template>
  <div class="common-layout">
  <el-container>
      <el-header>
        <NoLoginHeader></NoLoginHeader>
      </el-header>
      <el-container style="background-color: aliceblue;">
      <el-main>
        <el-row justify="center" class="card-item">
          <el-col :span="23">
            <el-card shadow="never">
              <template #header>
                  <div class="card-header">
                      <span>热点文章</span>
                  </div>
              </template>
              <div class="card-body">
                <el-carousel :interval="4000" type="card" height="300px">
                  <el-carousel-item v-for="book in books" :key="book.id"  @click="gotoArticle(book.id)">
                    <el-image :src="book.coverImage" fit="fill" />
                      <span>{{book.title}}</span>
                  </el-carousel-item>
                </el-carousel>
              </div>
        </el-card>
          </el-col>
        </el-row>
        <el-row justify="center">
          <el-col :span="23">
            <el-card shadow="never">
              <template #header>
                  <div class="card-header">
                      <span>为你推荐</span>
                  </div>
              </template>
              <div class="card-body" v-if="books.length > 0">
                <el-card shadow="hover" class="box-card-item" v-for="article in books" :key="article.id" @click="gotoArticle(article.id)">
                                <el-row justify="center">
                                    <el-col :span="6">
                                        <el-image style="height: 150px; width: 220px; border-radius: 10px;" :src="article.coverImage" fit="cover" >
                                        </el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-row justify="center">
                                          <el-col :span="24" style="text-align: center;">
                                            <el-text class="mx-1"><h3>{{article.title}}</h3></el-text>
                                          </el-col>
                                        </el-row>
                                        <el-row justify="center">
                                          <el-text class="mx-1">{{article.username}}</el-text>
                                        </el-row>
                                        <el-row>
                                            <el-text class="mx-1" type="info">{{article.description}}</el-text>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-card>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
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

.box-card-item {
  margin-bottom: 20px;
  cursor: pointer;
  background-color: #F0F2F5;
}
</style>