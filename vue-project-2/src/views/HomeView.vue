<script setup lang="ts">
import NoLoginHeader from '../components/NoLoginHeader.vue'
import Footer from '../components/Footer.vue'
import http from '../http.js'
import { ref } from 'vue'
import {type Article} from '../model'
import { StarFilled } from '@element-plus/icons-vue'
import defaultArticle from "@/assets/defaultArticle.png"

const hotArticles = ref<Article[]>([
])

const newestArticles = ref<Article[]>([
])

const pageNumber = ref(1)
const pageSize = ref(5)
const pageCounts = ref(0)

// 查询热门书籍
const loadHotArticles = () => {http.get('/article/get/hot', {
    page: 0,
    size: 3,
    keyword: null
  }).then(res => {
    hotArticles.value = res.data.content
  }).catch(err => {
    
  }).finally(() => {
    
  })}

  const loadNewestArticles = (pageNumber, pageSize) => {
    http.get('/article/get/newest', {
      page: pageNumber-1,
      size: pageSize,
      keyword: null
  }).then(res => {
    pageCounts.value = res.data.totalPages
    newestArticles.value = res.data.content
  }).catch(err => {
    
  }).finally(() => {
    
  })}

const gotoArticle = (articleId?: number, title?: string) => {
        window.open("/article?articleId=" + articleId + "&title=" + title)
  }

loadHotArticles()
loadNewestArticles(pageNumber.value, pageSize.value)
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
                <el-carousel :interval="4000" type="card" height="300px" v-if="hotArticles.length > 0">
                  <el-carousel-item v-for="book in hotArticles" :key="book.id"  @click="gotoArticle(book.id, book.title)">
                    <div class="hot-article-container">
                      <el-row justify="end">
                        <el-col :span="2">
                          <el-text class="hot-article-text" type="info" style="vertical-align: 0.125em;margin-right: 0.2em;">{{ book.starNum }}</el-text>
                          <el-icon color="#eebe77"><StarFilled /></el-icon>
                        </el-col>
                        <el-col :span="2">
                          <el-text class="hot-article-text" type="info" style="vertical-align: 0.125em;margin-right: 0.2em;">{{ book.viewNum }}</el-text>
                          <el-icon color="#b1b3b8"><View /></el-icon>
                        </el-col>
                      </el-row>
                      <el-row justify="center">
                        <el-text class="hot-article-text"><h1>{{book.title}}</h1></el-text>
                      </el-row>
                      <!-- <el-row justify="center">
                        <el-text class="hot-article-text">{{book.description}}</el-text>
                      </el-row> -->
                    </div>
                  </el-carousel-item>
                </el-carousel>
                <el-empty v-else description="空空如也😳" />
              </div>
        </el-card>
          </el-col>
        </el-row>
        <el-row justify="center">
              <el-col :span="23">
                <el-card shadow="never">
                    <template #header>
                        <div class="card-header">
                            <span>最新文章</span>
                        </div>
                    </template>
                <div class="card-body" v-if="newestArticles.length > 0">
                      <div class="pagination-block">
                        <el-pagination layout="prev, pager, next" v-model:current-page="pageNumber" v-model:page-size="pageSize" :page-count="pageCounts" @current-change="loadNewestArticles(pageNumber, pageSize)" />
                      </div>
                      <el-card shadow="hover" class="box-card-item" v-for="article in newestArticles" :key="article.id" @click="gotoArticle(article.id, article.title)">
                                <el-row justify="center">
                                    <el-col :span="6">
                                        <el-image style="height: 150px; width: 220px; border-radius: 10px;" :src="defaultArticle" fit="cover" >
                                        </el-image>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-row justify="end">
                                          <el-col :span="1">
                                            <el-text type="info" style="vertical-align: 0.125em;margin-right: 0.2em;">{{ article.starNum }}</el-text>
                                            <el-icon color="#eebe77"><StarFilled /></el-icon>
                                          </el-col>
                                          <el-col :span="1">
                                            <el-text type="info" style="vertical-align: 0.125em;margin-right: 0.2em;">{{ article.viewNum }}</el-text>
                                            <el-icon color="#b1b3b8"><View /></el-icon>
                                          </el-col>
                                        </el-row>
                                        <el-row justify="center">
                                          <el-col :span="24" style="text-align: center;">
                                            <el-text class="new-article-text"><h1>{{article.title}}</h1></el-text>
                                          </el-col>
                                        </el-row>
                                        <el-row justify="center">
                                          <el-text class="new-article-text">{{article.username}}</el-text>
                                        </el-row>
                                        <el-row>
                                            <el-text class="new-article-text" type="info">{{article.description}}</el-text>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-card>
                  </div>
                  <el-empty v-else description="空空如也😳" />
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
.el-carousel__item{
  background-image: url('../../public/defaultHotArticle.png'); /* 替换 'your-image-url.jpg' 为你的图片路径 */
  background-size: cover; /* 背景图片尺寸调整为覆盖整个容器 */
  background-position: center; /* 背景图片居中显示 */
  background-repeat: no-repeat; /* 禁止背景图片重复显示 */
}

.hot-article-container {
  
}

.hot-article-text {
  color: white;
}

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

.box-card-item {
  margin-bottom: 20px;
  cursor: pointer;
}

.pagination-block {
  display: flex; /* 使用 Flexbox 布局 */
  justify-content: flex-end; /* 将子元素靠右对齐 */
}
</style>