<script setup lang="ts">
import { ref } from 'vue';
import http from '../http.js';

import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'
import { ElMessage } from 'element-plus'

// 兑换码
const code = ref("")

// 兑换
const redeem = (code) => {
  http.post('/redeem-code/redeem', {
    code: code
  }).then((res) => {
    ElMessage.success(res.msg)
  }).catch((err) => {
    ElMessage.error(err.msg)
  })
}

</script>

<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <el-container style="background-color: aliceblue;">
          <el-main>
            <el-row justify="center">
                <div class="container" v-show="true">
                  <el-input class="redeem-item" v-model="code" style="width: 240px" placeholder="请输入兑换码" />
                  <el-button class="redeem-item" type="primary" @click="redeem(code)">兑换</el-button>
                  <el-row justify="center">
                    <el-text class="mx-1" type="info">获取兑换码请微信联系：</el-text><el-text class="mx-1" type="primary">helloliuchanglei</el-text>
                  </el-row>
                </div>
            </el-row>
          </el-main>
          <el-footer>
            <MyFooter></MyFooter>
          </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.container {
    min-height: 600px;
}

.redeem-item {
  margin: 20px 10px;
}
</style>