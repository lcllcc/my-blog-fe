<script setup lang="ts">
import {
    Promotion, Loading
} from '@element-plus/icons-vue'
import { ref, toRef } from 'vue'

const props = defineProps(['username'])
console.log('props:', props)
console.log('username:', props.username)
const query = ref('')
const isThinking = ref(false)
const chatLogList = ref(
    [
        {
            "id": 1,
            "content": props.username + "你好！我是你的助手小A，你可以问我任何问题😄",
            "isMe": false
        }
    ]
)

const sendQeury = () => {
    isThinking.value = true
    console.log("isThinking: " + isThinking.value)
    chatLogList.value.push(
            {
                "id": 1,
                "content": query.value,
                "isMe": true
            }
        )
    setTimeout(() => {
        chatLogList.value.push(
            {
                "id": 1,
                "content": "模拟接口返回的回答",
                "isMe": false
            }
        )
        isThinking.value = false
        query.value = ""
    }, 2000)
}

</script>
<template>
    <div>
        <el-main class="chat-container">
            <!-- 对话部分 -->
            <div v-for="chatLog in chatLogList">
                <el-row justify="start" class="chat-log" :gutter="10" v-if="!chatLog.isMe">
                    <el-col :span="2">
                        <el-avatar>小A</el-avatar>
                    </el-col>
                    <el-col :span="20">
                        <el-card class="chat-bot">
                            <span>{{chatLog.content}}</span>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row justify="end" class="chat-log" :gutter="10" v-else>
                    <el-col :span="20">
                        <el-card class="chat-user">
                            <span>{{chatLog.content}}</span>
                        </el-card>
                    </el-col>
                    <el-col :span="2">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                    </el-col>
                </el-row>
            </div>
            <!-- 思考部分 -->
            <div v-if = "isThinking">
                <el-row justify="start" class="chat-log" :gutter="10">
                    <el-col :span="2">
                        <el-avatar>小A</el-avatar>
                    </el-col>
                    <el-col :span="20">
                        <el-button link :loading-icon="Loading" loading></el-button>
                    </el-col>
                </el-row>
            </div>
            <!-- 输入部分 -->
            <el-affix position="bottom">
            <el-row justify="center" :gutter="20">
                <el-col :span="16">
                    <el-input placeholder="任何问题..." v-model="query" type="textarea" autosize />
                </el-col>
                <el-col :span="1">
                    <el-button :icon="Promotion" circle @click = "sendQeury"/>
                </el-col>
            </el-row>
            </el-affix>
        </el-main>
    </div>
</template>

<style scoped>
.chat-container {
    height: 1000px;
}

.chat-log {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>