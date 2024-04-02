<script setup lang="ts">
import {
    Promotion
} from '@element-plus/icons-vue'
import { ref } from 'vue'
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';
import showMessage from './widget/message.js'
import initWidget from './widget/index.js'
import './widget/waifu.css'
import { WS_BASE_URL } from "../const";

const scrollElement = document.documentElement
const props = defineProps(['username', 'userId'])
const query = ref('')
const answer = ref('')
// 当前对话在对话记录数组中的索引
const index = ref(0)
const isThinking = ref(false)
const chatLogList = ref(
    [
        {
            "content": props.username + "你好！我是你的助手小六，你可以问我任何问题😄",
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
    let wsUrl = WS_BASE_URL + "/api/ws/chat/" + props.userId
    console.log("初始化ws:", wsUrl);
    socket.value = new WebSocket(wsUrl);

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
        if(event.data == "ON_COMPLETE" || event.data == "ON_ERROR"){
            console.log("完整的消息：", answer.value)
            thinkingOver()
        }else{
            answer.value = answer.value + event.data
            chatLogList.value[index.value].content = answer.value
            showMessage(answer.value, 10000, 10)
        }
    }
    console.log("注册事件函数完成");
}

const sendQeury = () => {
    // websocket对话
    if(query.value == ''){
        return;
    }
    
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

// 初始化
initWs()

// const live2d_path = "https://fastly.jsdelivr.net/gh/stevenjoezhang/live2d-widget@latest/";
// const live2d_path = "/Users/liuchanglei/Documents/工作/项目/my/my-blog-fe/vue-project-2/src/components/widget/";
// initWidget({
//     wsApiPath: "ws://localhost:9999/chat/" + props.userId,
//     waifuPath: live2d_path + "waifu-tips.json",
//     apiPath: "https://live2d.fghrsh.net/api/",
//     //   cdnPath: "https://fastly.jsdelivr.net/gh/fghrsh/live2d_api/",
//     tools: ["hitokoto", "asteroids", "switch-model", "switch-texture", "photo", "info", "quit"]
// });

console.log(`
く__,.ヘヽ.        /  ,ー､ 〉
        ＼ ', !-─‐-i  /  /´
        ／｀ｰ'       L/／｀ヽ､
        /   ／,   /|   ,   ,       ',
    ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
        ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
        !,/7 '0'     ´0iソ|    |
        |.从"    _     ,,,, / |./    |
        ﾚ'| i＞.､,,__  _,.イ /   .i   |
            ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
            | |/i 〈|/   i  ,.ﾍ |  i  |
            .|/ /  ｉ：    ﾍ!    ＼  |
            kヽ>､ﾊ    _,.ﾍ､    /､!
            !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
            ﾚ'ヽL__|___i,___,ンﾚ|ノ
                ﾄ-,/  |___./
                'ｰ'    !_,.:

    加载完毕！
`);


</script>
<template>
    <div>
        <el-main class="chat-container">
            <!-- 对话部分 -->
            <div v-for="(chatLog,idx) in chatLogList" :key="index">
                <el-row justify="start" class="chat-log" :gutter="10" v-if="chatLog.role != 'user'">
                    <el-col :span="2">
                        <el-avatar>小六</el-avatar>
                    </el-col>
                    <el-col :span="20">
                            <MdPreview v-show="chatLog.content" :editorId="chatLog.role + idx" :modelValue="chatLog.content" />
                            <el-icon class="is-loading"><MoreFilled v-show="isThinking && idx==index" /></el-icon>
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
        
            <!-- 输入部分 -->
            <el-row justify="center" :gutter="20">
                <el-col :span="16">
                    <el-input placeholder="ctrl+enter发送问题" v-model="query" type="textarea" autosize @keyup.ctrl.enter="sendQeury" />
                </el-col>
                <el-col :span="1">
                    <el-button id="chat-send-button" title="ctrl+enter" :icon="Promotion" :disabled="isThinking||query==''" circle @click = "sendQeury"/>
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