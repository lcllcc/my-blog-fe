<script setup lang="ts">
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import http from '../http.js'
  import { ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import {type Article} from '../model'


  const number = ref(0)
  const size = ref(30)
  const totalElements = ref(0)

  const fullscreenLoading = ref(true)
  

  const gotoArticle = (articleId?: number) => {
        window.open("/article?articleId=" + articleId)
  }

  const deleteArticle = (articleId?: number) => {
        http.delete('/article/' + articleId).then((res) => {
          ElMessage({
                message: res.msg,
                type: 'success',
            })
          for (let i = 0; i < articles.value.length; i++) {
              if (articles.value[i].id === articleId) {
                articles.value.splice(i, 1);
                  break; // 找到并删除对象后，退出循环
              }
          }
        }).catch((err) => {
          ElMessage.error(err.msg)
        })
  }

  const articles = ref<Article[]>([
  ])

  // 获取收藏信息
  const load = () => {http.get('/article/stared', {
    page: number.value,
    size: size.value,
    keyword: null
  }).then(res => {
    console.log('res data:', res.data)
    articles.value = res.data.content
    number.value = res.data.number
    size.value = res.data.size
    totalElements.value = res.data.totalElements
  }).catch(err => {
    
  }).finally(() => {
    fullscreenLoading.value = false
  })}

  load()
</script>

<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
  <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container style="background-color: aliceblue;">
        <el-main>
        <el-row class="row-bg" justify="center">
            <el-col :span="22">
                <el-card shadow="never" class="box-card">
                    <template #header>
                        <div class="card-header">
                            <span>我的收藏</span>
                        </div>
                    </template>
                    <div class="card-body" v-if="articles.length > 0">
                      <el-card shadow="hover" class="box-card-item" v-for="article in articles" :key="article.id" @click="gotoArticle(article.id)">
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
                    <el-empty v-else description="空空如也😳" />
                </el-card>
            </el-col>
        </el-row>
        <el-footer>
        <Footer></Footer>
      </el-footer>
      </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.box-card {
    margin-top: 20px;
    border-radius: 10px;
    min-height: 600px;
}

.box-card-item {
  margin-top: 20px;
  cursor: pointer;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hover-effect:hover {
  /* 在悬停时更改图标样式 */
  color: red;
  /* 或者您也可以使用其他样式，比如改变大小等 */
}
</style>