<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <el-container style="background-color: aliceblue;">
        <el-aside width="200px">
            <el-row justify="center" style="padding-top: 40px;">
                <el-col :span="20">
                  <MdCatalog :editorId="id" :scrollElement="scrollElement" />
                </el-col>
            </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <el-row justify="end">
                <SocialBar v-if="userId && userInfo" :articleId="articleId" :isOwner="userId==userInfo.id"></SocialBar>
            </el-row>
            <div>
                <MdPreview :editorId="id" :modelValue="text" style="min-height: 600px;"/>
            </div>
          </el-main>
          <el-footer>
            <MyFooter></MyFooter>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
  
<script setup lang="ts">
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import http from '../http.js';

import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'
import SocialBar from '../components/SocialBar.vue'

// TODO 真实数据从接口取
const id = 'preview-only'
const title = ref("")
const text = ref("")
const userId = ref()
const scrollElement = document.documentElement;
// 获取url中的参数
const params = new URLSearchParams(new URL(window.location.href).search);
const articleId = params.get('articleId')
http.get('/article/' + articleId)
    .then(res => {
      // 请求完成后
      console.log(res);
      title.value = res.data.title + articleId
      text.value = res.data.content
      userId.value = res.data.userId
    })
    .catch(err => {
      // 处理错误
      console.error('Error posting data:', err);
    })
    .finally(() => {
      // 无论失败还是成功都需要执行的步骤
    });

interface User {
  username?: string
  id?: number
  email?: string
  articleNum?: number
  followerNum?: number
  starNum?: number
}

const userInfo = ref<User>()
// 获取用户信息
http.get('/user').then(res => {
  console.log('res data:', res.data)
  userInfo.value = res.data
}).catch(err => {
  
}).finally(() => {

})
</script>