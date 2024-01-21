<script setup lang="ts">
  import Header from '../components/Header.vue'
  import Chat from '../components/Chat.vue'
  import Footer from '../components/Footer.vue'
  import type { Lollipop, Star, User } from '@element-plus/icons-vue';
  import http from '../http.js'
  import { ref } from 'vue'

  const fullscreenLoading = ref(true)

  // 获取用户信息
  http.get('/user-info').then(res => {
    
  }).catch(err => {
    
  }).finally(() => {
    fullscreenLoading.value = false
  })
  
</script>

<template>
  <div v-loading.fullscreen.lock="fullscreenLoading">
  <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px" style="border-right: 1px solid var(--el-border-color)">
            <el-row justify="center" style="margin-top: 20px;">
                <el-avatar :size="40" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"> USER </el-avatar>
            </el-row>
            <el-row justify="left" style="margin-top: 20px; padding-left: 20px;">
                <el-col :span="8">
                  <el-link :underline="false">文章数<el-icon><Notebook /></el-icon></el-link>
                  <el-statistic :value="30" />
                </el-col>
            </el-row>
            <el-row justify="left" style="margin-top: 20px; padding-left: 20px;">
                <el-col :span="8">
                    <el-link :underline="false">粉丝数<el-icon><Lollipop /></el-icon></el-link>
                    <el-statistic :value="1234" />
                </el-col>
            </el-row>
            <el-row justify="left" style="margin-top: 20px; padding-left: 20px;">
                <el-col :span="8">
                  <el-link :underline="false">星星数<el-icon><Star /></el-icon></el-link>
                     <el-statistic :value="268500" />
                </el-col>
            </el-row>
        </el-aside>
        <el-main>
        <el-row class="row-bg" justify="center">
          <el-col :span="20">
            <Chat></Chat>
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
