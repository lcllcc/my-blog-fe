<script setup lang="ts">
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import http from '../http.js';
import {type User} from '../model'

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
      title.value = res.data.title
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

const userInfo = ref<User>()
// 获取用户信息
http.get('/user').then(res => {
  console.log('res data:', res.data)
  userInfo.value = res.data
}).catch(err => {
  
}).finally(() => {

})
</script>
<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <el-container style="background-color: aliceblue;">
        <el-aside width="200px">
            <!-- <el-row class="catalog" justify="center" style="padding-top: 40px;">
                <el-col :span="20">
                  <el-affix target=".catalog">
                    <MdCatalog :editorId="id" :scrollElement="scrollElement" />
                  </el-affix>
                </el-col>
            </el-row> -->
            <el-affix :offset="120">
                    <MdCatalog :editorId="id" :scrollElement="scrollElement" />
            </el-affix>
        </el-aside>
        <el-container>
          <el-main>
              <el-row justify="end">
                <el-affix :offset="100">
                  <SocialBar v-if="userId && userInfo" :articleId="articleId" :isOwner="userId==userInfo.id"></SocialBar>
                </el-affix>
              </el-row>
            <el-col :span="23">
              <el-row justify="center" style="margin-bottom: 10px;">
                <el-text style="font-size: larger;" size="large">{{title}}</el-text>
              </el-row>
              <MdPreview :editorId="id" :modelValue="text" style="min-height: 600px;"/>
            </el-col>
          </el-main>
          <el-footer>
            <MyFooter></MyFooter>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>