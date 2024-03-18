<script setup lang="ts">
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import http from '../http.js';
import {type User} from '../model'
import { ElMessage } from 'element-plus'

import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'
import SocialBar from '../components/SocialBar.vue'

// TODO 真实数据从接口取
const id = 'preview-only'
const title = ref("")
const text = ref("")
const userId = ref()
const status = ref('')
const token = ref('')
const scrollElement = document.documentElement;
// 获取url中的参数
const params = new URLSearchParams(new URL(window.location.href).search);
const articleId = params.get('articleId')
title.value = params.get('title')

// 获取文章
const getArticle = () => {
  http.get('/article/' + articleId + '?token=' + token.value).then(res => {
      // 请求完成后
      console.log(res);
      title.value = res.data.title
      text.value = res.data.content
      userId.value = res.data.userId
      status.value = res.data.status
    })
    .catch(err => {
      // 处理错误
      if(err.status == 10){
        status.value = 'NO_AUTH'
      }
      if(token.value){
        ElMessage.error(err.msg)
      }
    })
    .finally(() => {
      // 无论失败还是成功都需要执行的步骤
    });
}

getArticle()

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
      <el-container style="background-color: aliceblue; min-height: 800px;">
          <el-aside width="200px" v-if="status!='NO_AUTH'">
            <el-affix :offset="120">
                    <MdCatalog :editorId="id" :scrollElement="scrollElement" />
            </el-affix>
          </el-aside>
          <el-container v-if="status!='NO_AUTH'">
            <el-main>
              <el-row>
                <el-col :span="22">
                  <el-row justify="center" style="margin-bottom: 10px;">
                    <el-text style="font-size: larger;" size="large">{{title}}</el-text>
                  </el-row>
                  <MdPreview :editorId="id" :modelValue="text" style="min-height: 600px;"/>
                </el-col>
                <el-col :span="2">
                  <el-row justify="center">
                    <el-affix :offset="100">
                      <SocialBar v-if="userId && userInfo" :articleId="articleId" :isOwner="userId==userInfo.id"></SocialBar>
                    </el-affix>
                  </el-row>
                </el-col>
              </el-row>
            </el-main>
          </el-container>
          <div class="no-auth-container" v-if="status=='NO_AUTH'">
              <el-row justify="center" style="margin-bottom: 1%; margin-top: 5%;">
                <el-text style="font-size: larger;" size="large">{{title}}</el-text>
              </el-row>
              <el-row justify="center">
                <el-input class="token-item input" v-model="token" placeholder="请输入令牌" />
                <el-button class="token-item button" type="primary" @click="getArticle">提交</el-button>
              </el-row>
          </div>
      </el-container>
      <el-footer>
        <MyFooter></MyFooter>
      </el-footer>
    </el-container>
  </div>
</template>

<style>
.token-item {
  margin: 10px 10px;
  display: block;
}

.token-item.input {
  display: block;
  width: 15%;
}

.no-auth-container {
  width: 100%;
  text-align: center;
}
</style>