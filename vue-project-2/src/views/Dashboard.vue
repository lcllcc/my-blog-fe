<script setup lang="ts">
  import Header from '../components/Header.vue'
  import Chat from '../components/Chat.vue'
  import Footer from '../components/Footer.vue'
  import type { Lollipop, Star } from '@element-plus/icons-vue';
  import http from '../http.js'
  import { ref } from 'vue'
  import {type User} from '../model'

  const fullscreenLoading = ref(true)
 

  const userInfo = ref<User>({})
  // 获取用户信息
  http.get('/user').then(res => {
    console.log('res data:', res.data)
    userInfo.value = res.data
  }).catch(err => {
    
  }).finally(() => {
    fullscreenLoading.value = false
  })
  
</script>

<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
  <el-container key="1">
      <el-header>
        <Header></Header>
      </el-header>
      <el-container style="background-color: aliceblue;" key="2">
        <el-aside width="200px" style="border-right: 1px solid var(--el-border-color)">
            <el-row justify="center">
              <el-col :span="16">
              <el-row justify="center" style="margin-top: 20px;">
                <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"> USER </el-avatar>
            </el-row>
            <el-row justify="center" style="margin-top: 20px;">
              <el-text size="large">{{userInfo.username}}</el-text>
            </el-row>
            <el-divider></el-divider>
            <el-row justify="start" style="margin-top: 20px;">
              <el-icon><Notebook /></el-icon>
              <el-link :underline="false" href="/article/owned">
                <el-statistic title="文章数" :value="userInfo.articleNum" />
              </el-link>
            </el-row>
            <el-row justify="start" style="margin-top: 20px;">
              <el-icon><Star /></el-icon>
              <el-link :underline="false" >
                <el-statistic title="星星数" :value="userInfo.starNum" />
              </el-link>
            </el-row>
            <el-row justify="start" style="margin-top: 20px;">
              <el-icon><Lollipop /></el-icon>
              <el-link :underline="false" >
                <el-statistic title="粉丝数" :value="userInfo.followerNum" />
              </el-link>
            </el-row>
            </el-col>
            </el-row>
        </el-aside>
        <el-main>
          <el-row class="row-bg" justify="center">
            <el-col :span="20">
              <!-- 父子组件是异步渲染，需要保证数据到了后再渲染子组件 -->
              <div v-if="userInfo.username">
                <Chat :username="userInfo.username" :userId="userInfo.id"/>
              </div>
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
