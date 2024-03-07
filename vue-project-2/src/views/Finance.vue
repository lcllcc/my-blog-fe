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
                    <el-form-item label="邮箱">
                        <el-input v-model="code" disabled />
                    </el-form-item>
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
  
<script setup lang="ts">
import { ref } from 'vue';
import http from '../http.js';

import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'
import { ElMessage } from 'element-plus'

const code = ref("")

</script>

<style>
.container {
    min-height: 600px;
}
</style>