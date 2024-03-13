<template>
  <div class="header-container">
    <el-affix>
      <el-row :gutter=10 align="middle" style="padding-bottom: 20px;">
      <el-col :span="4" :offset="1">
        <el-link href="/" :underline="false">
            <el-avatar :size="40" src="../assets/myLogo.png"> LOGO </el-avatar>
        </el-link>
      </el-col> 
      <el-col :span="2" :offset="15" justify="end">
        <el-link v-if="!hasLogin" :underline="false" href="/login">
            登录
        </el-link>
        <el-link  v-else :underline="false" href="/dashboard">
            进入主页
        </el-link>
      </el-col>
      <el-col :span="1">
        <el-link :underline="false" href="/register">
            注册
          </el-link>
      </el-col>
      </el-row>
      <div style="width: 100%; height: 0; border-top: 1px solid var(--el-border-color);"/>
    </el-affix>
  </div>
 </template>

<script setup lang="ts">
import { ref } from 'vue'

// 判断用户是否已登录
const hasLogin = ref(false)
  if(sessionStorage.getItem('isLoggedIn') === 'true'){
    console.log('已登录!')
    hasLogin.value = true
  }
</script>

<style>
  .header-container {
    background-color: #FAFCFF;
  }
</style>