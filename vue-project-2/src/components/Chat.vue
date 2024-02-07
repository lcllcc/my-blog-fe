<script setup lang="ts">
import {
    Promotion
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

const scrollElement = document.documentElement
const props = defineProps(['username', 'userId'])
const query = ref('')
const answer = ref('')
const index = ref(0)
const isThinking = ref(false)
const chatLogList = ref(
    [
        {
            "content": props.username + "你好！我是你的助手小A，你可以问我任何问题😄",
            "role": "system"
        }
    ]
)

const thinkingOver = () => {
    isThinking.value = false
    query.value = ""
    answer.value = ""
}

const socket = ref<WebSocket>()
const initWs = () => {
    console.log("初始化ws");
    socket.value = new WebSocket("ws://localhost:9999/chat/" + props.userId);

    socket.value.onopen = (event) => {
        console.log("onopen", event);
    }

    socket.value.onerror = (event) => {
        console.log("onerror", event)
    }

    socket.value.onclose = (event) => {
        console.log("onclose", event);
    }

    socket.value.onmessage = (event) => {
        console.log("onmessage", event);
        if(event.data == "ON_COMPLETE" || event.data == "ON_ERROR"){
            console.log("完整的消息：", answer.value)
            thinkingOver()
        }else{
            answer.value = answer.value + event.data
            chatLogList.value[index.value].content = answer.value
        }
    }
    console.log("注册事件函数完成");
}
initWs()


const sendQeury = () => {
    // websocket对话
    console.log("发送消息")
    isThinking.value = true
    chatLogList.value.push(
        {
            "role": "user",
            "content": query.value
        }
    )
    if(socket.value && socket.value.readyState == socket.value.OPEN){
        chatLogList.value.push(
            {
                "role": "system",
                "content": answer.value
            }
        )
        index.value = index.value + 2
        socket.value.send(JSON.stringify(chatLogList.value.slice(-5, -1)));
        console.log("发送完毕")
    }else{
        chatLogList.value.push(
            {
                "role": "system",
                "content": '!!! error\n服务器异常，请刷新页面后重试\n!!!'
            }
        )
        thinkingOver()
    }
}

</script>
<template>
    <div>
        <el-main class="chat-container">
            <!-- 对话部分 -->
            <div v-for="(chatLog,idx) in chatLogList" :key="index">
                <el-row justify="start" class="chat-log" :gutter="10" v-if="chatLog.role != 'user'">
                    <el-col :span="2">
                        <el-avatar>小A</el-avatar>
                    </el-col>
                    <el-col :span="20">
                            <MdPreview v-show="chatLog.content" :editorId="chatLog.role + idx" :modelValue="chatLog.content" />
                            <el-icon class="is-loading"><MoreFilled v-show="isThinking && idx==index" /></el-icon>
                        <!-- <el-card class="chat-bot">
                            <span>{{chatLog.content}}</span>
                            <el-icon class="is-loading"><MoreFilled v-show="isThinking && idx==index" /></el-icon>
                        </el-card> -->
                    </el-col>
                </el-row>
                <el-row justify="end" class="chat-log" :gutter="10" v-else>
                    <el-col :span="20">
                        <MdPreview :editorId="chatLog.role + idx" :modelValue="chatLog.content" />
                    </el-col>
                    <el-col :span="2">
                        <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                    </el-col>
                </el-row>
            </div>
            <!-- 思考部分 -->
            <!-- <div v-if = "isThinking">
                <el-row justify="start" class="chat-log" :gutter="10">
                    <el-col :span="2">
                        <el-avatar>小A</el-avatar>
                    </el-col>
                    <el-col :span="20">
                        <el-button link :loading-icon="Loading" loading></el-button>
                    </el-col>
                </el-row>
            </div> -->
            <!-- 输入部分 -->
            <el-row justify="center" :gutter="20">
                <el-col :span="16">
                    <el-input placeholder="任何问题..." v-model="query" type="textarea" autosize />
                </el-col>
                <el-col :span="1">
                    <el-button :icon="Promotion" :disable="!isThinking" circle @click = "sendQeury"/>
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<style scoped>
.chat-container {
    min-height: 600px;
}

.chat-log {
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>