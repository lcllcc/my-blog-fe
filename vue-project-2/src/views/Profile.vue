<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <el-container style="background-color: aliceblue;">
          <el-main>
            <el-row justify="center">
                <div class="container" v-show="false">
                    <el-card>
                        <el-form
                        label-width="auto"
                        :model="userInfo"
                        style="max-width: 460px; min-width: 300px;"
                    >
                        <el-form-item label="昵称">
                        <el-input v-model="userInfo.username" />
                        </el-form-item>
                        <el-form-item label="邮箱">
                        <el-input v-model="userInfo.email" disabled />
                        </el-form-item>
                        <el-form-item>
                            
                        </el-form-item>
                        </el-form>
                    </el-card>
                </div>
                <div class="container">
                    <el-descriptions
                        style="width: 600px;"
                        v-show="!editing"
                        title="我的信息"
                        :column="2"
                        size="large"
                        border
                    >
                        <el-descriptions-item label="用户名">{{userInfo.username}}</el-descriptions-item>
                        <el-descriptions-item label="邮箱">{{userInfo.email}}</el-descriptions-item>
                        <el-descriptions-item label="头像" :span="2"> </el-descriptions-item>
                        <el-descriptions-item label="心情">
                        <el-tag size="small">{{mood}}</el-tag>
                        </el-descriptions-item>
                        <template #extra>
                            <el-button v-show="!editing" @click="editing = !editing">
                                编辑
                            </el-button>
                        </template>
                    </el-descriptions>

                    <el-descriptions
                        style="width: 600px;"
                        v-show="editing"
                        title="我的信息"
                        :column="2"
                        size="large"
                        border
                    >
                        <el-descriptions-item label="用户名"><el-input v-model="userInfo.username"></el-input></el-descriptions-item>
                        <el-descriptions-item label="邮箱">{{userInfo.email}}</el-descriptions-item>
                        <el-descriptions-item label="头像" :span="2"><el-input></el-input> </el-descriptions-item>
                        <el-descriptions-item label="心情">
                            <el-input v-model="mood"></el-input>
                        </el-descriptions-item>
                        <template #extra>
                            <el-button v-show="!editing" @click="editing = !editing">
                                编辑
                            </el-button>
                            <el-button v-show="editing" type="primary" @click="submit()">
                                提交
                            </el-button>
                            <el-button v-show="editing" @click="editing = !editing">
                                取消
                            </el-button>
                        </template>
                    </el-descriptions>
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

const editing = ref(false)
const mood = ref("开心")

interface User {
    username?: string
    id?: number
    email?: string
    articleNum?: number
    followerNum?: number
    starNum?: number
  }
const userInfo = ref<User>({})
http.get('/user')
    .then(res => {
      // 请求完成后
      console.log(res.data);
      userInfo.value = res.data
    })
    .catch(err => {
      // 处理错误
      console.error('Error posting data:', err);
    })
    .finally(() => {
      // 无论失败还是成功都需要执行的步骤
    });

const submit = () => {
    console.log("userInfo", userInfo)
    http.post('/user', {
        "id": userInfo.value.id,
        "username": userInfo.value.username
    }).then(res => {
        ElMessage({
                message: res.msg,
                type: 'success',
            })
        editing.value = false
    }).catch(err => {
        ElMessage.error(err.msg)
    })
}
</script>

<style>
.container {
    min-height: 600px;
}
</style>