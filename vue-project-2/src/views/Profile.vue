<script setup lang="ts">
import { ref } from 'vue';
import http from '../http.js';

import MyHeader from '../components/Header.vue'
import MyFooter from '../components/Footer.vue'
import { ElMessage } from 'element-plus'
import {type User} from '../model'
import { Plus } from '@element-plus/icons-vue'
import type { UploadProps } from 'element-plus'

const imageUrl = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')

// 上传头像成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

// 上传头像之前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    console.log('rawFile', rawFile);
    
  if (rawFile.type !== 'image/jpeg' &&rawFile.type !== 'image/png') {
    ElMessage.error('Avatar picture must be JPG format!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('Avatar picture size can not exceed 2MB!')
    return false
  }
  return true
}

const editing = ref(false)
const mood = ref("开心")
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
    http.post('/user/save', {
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

<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <MyHeader></MyHeader>
      </el-header>
      <el-container style="background-color: aliceblue;">
          <el-main>
            <el-row justify="center">
                <div class="container">
                    <el-descriptions
                        style="width: 600px;"
                        v-show="!editing"
                        title="我的信息"
                        :column="3"
                        size="large"
                        border
                        v-if="userInfo.accountCoin"
                    >
                        <el-descriptions-item label="用户名" :span="2">{{userInfo.username}}</el-descriptions-item>
                        <el-descriptions-item label="头像" > <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/> </el-descriptions-item>
                        <el-descriptions-item label="邮箱" :span="3">{{userInfo.email}}</el-descriptions-item>
                        <el-descriptions-item label="总额度">{{userInfo.accountCoin.totalCoin }} </el-descriptions-item>
                        <el-descriptions-item label="剩余额度" >{{userInfo.accountCoin.amountCoin }} </el-descriptions-item>
                        <el-descriptions-item label="已使用额度" >{{userInfo.accountCoin.usedCoin }} </el-descriptions-item>
                        <!-- <el-descriptions-item label="心情">
                        <el-tag size="small">{{mood}}</el-tag>
                        </el-descriptions-item> -->
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
                        :column="3"
                        size="large"
                        border
                        v-if="userInfo.accountCoin"
                    >
                        <el-descriptions-item label="用户名" :span="2"><el-input v-model="userInfo.username"></el-input></el-descriptions-item>
                        <el-descriptions-item label="头像" >
                            <el-upload
                                class="avatar-uploader"
                                action="/api/file/upload"
                                :show-file-list="true"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload"
                            >
                                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                                <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                            </el-upload>
                        </el-descriptions-item>
                        <el-descriptions-item label="邮箱" :span="3">{{userInfo.email}}</el-descriptions-item>
                        <el-descriptions-item label="总额度" >{{userInfo.accountCoin.totalCoin }} </el-descriptions-item>
                        <el-descriptions-item label="剩余额度" >{{userInfo.accountCoin.amountCoin }} </el-descriptions-item>
                        <el-descriptions-item label="已使用额度" >{{userInfo.accountCoin.usedCoin }} </el-descriptions-item>
                        <!-- <el-descriptions-item label="心情">
                            <el-input v-model="mood"></el-input>
                        </el-descriptions-item> -->
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

<style>
.container {
    min-height: 600px;
}
.avatar-uploader.avatar {
    width: 5px;
    height: 5px;
}
</style>