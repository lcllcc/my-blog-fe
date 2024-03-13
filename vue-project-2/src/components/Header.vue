<script setup lang="ts">
import { Menu, SwitchButton, Coin, User, HomeFilled, Star, CirclePlusFilled } from '@element-plus/icons-vue'
import { ref } from 'vue'
import http from '../http.js';
import { ElMessage } from 'element-plus'

const handleClose = (done: () => void) => {
    done()
}

function cancelClick() {
  drawer.value = false
}

const drawer = ref(false)
const fullscreenLoading = ref(false)

// 点击退出
const logout = () => {
    console.log("退出登录")
    fullscreenLoading.value = true
    http.post('/logout').then(data => {
        console.log("logout succeed")
        sessionStorage.removeItem('isLoggedIn')
        window.location.href="/"
    }).catch(err => {
        ElMessage.error(err.msg)
    }).finally(() => {
        fullscreenLoading.value = false
    })
}

const myProfile = () => {
    window.location.href='/profile'
}

const finance = () => {
    window.location.href='/finance'
}

const myStar = () => {
    window.location.href='/article/stared'
}
</script>
<template>
    <div class="header-container">
        <el-affix>
            <el-row align="middle" style="margin-bottom: 20px;">
            <el-col :span="4" :offset="1">
            <div class="block">
                <el-link :underline="false" href="/">
                    <el-avatar :size="40" src="../assets/myLogo.png"> LOGO </el-avatar>
                </el-link>
            </div>
            </el-col> 
                <el-col :span="1" :offset="15">
                    <el-link class="header-navi" :underline="false" href="/edit" target="_blank" :icon="CirclePlusFilled">
                    </el-link>
                </el-col>
                <el-col :span="1">
                    <el-link class="header-navi" :underline="false" href="/dashboard" :icon="HomeFilled">
                    </el-link>
                </el-col>
                <el-col :span="1">
                    <el-link class="header-navi" :underline="false" :icon="Menu" @click="drawer = true"></el-link>
                </el-col>
            </el-row>
            <div style="width: 100%; height: 0; border-top: 1px solid var(--el-border-color);"/>
            <el-drawer
            v-model="drawer"
            title="菜单"
            direction="rtl"
            size="15%"
            :before-close="handleClose"
            >
                <el-row class="operate-item">
                    <el-button :icon="User" link @click="myProfile()"> 我的信息 </el-button>
                </el-row>
                <el-row class="operate-item">
                    <el-button :icon="Coin" link @click="finance()"> 兑换余额 </el-button>
                </el-row>
                <el-row class="operate-item">
                    <el-button :icon="Star" link @click="myStar()"> 我的收藏 </el-button>
                </el-row>
                <el-row >
                    <el-button type="danger" :icon="SwitchButton" link @click="logout" v-loading.fullscreen.lock="fullscreenLoading"> 退出登录 </el-button>
                </el-row>
            </el-drawer>
        </el-affix>
    </div>
</template>

<style scoped>
.operate-item {
    margin-bottom: 20px;
}
.header-container {
    background-color: #FAFCFF;
}
.header-navi {
    font-size: large;
}
</style>