<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <el-container>
        <el-aside width="200px">
            <MdCatalog :editorId="id" :scrollElement="scrollElement" />
        </el-aside>
        <el-container>
          <el-main>
            <el-row justify="center">
                <h1 style="font-size: xx-large;">{{title}}</h1>
            </el-row>
            <el-row justify="end">
                <SocialBar></SocialBar>
            </el-row>
            <el-divider />
            <div style="min-height: 600px;">
                        <MdPreview :editorId="id" :modelValue="text" />
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
import axios from 'axios';

import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'
import SocialBar from '../components/SocialBar.vue'

// TODO 真实数据从接口取
const id = 'preview-only'
const title = ref("")
const text = ref("")
const scrollElement = document.documentElement;
// 获取url中的参数
const params = new URLSearchParams(new URL(window.location.href).search);
const articleId = params.get('articleId')
axios.get('/api/article/' + articleId)
    .then(response => {
      // 请求完成后
      console.log(response.data);
      title.value = response.data.data.title + articleId
      text.value = response.data.data.content
    })
    .catch(error => {
      // 处理错误
      console.error('Error posting data:', error);
    })
    .finally(() => {
      // 无论失败还是成功都需要执行的步骤
    });
</script>