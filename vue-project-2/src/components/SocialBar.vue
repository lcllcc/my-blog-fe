<script setup lang="ts">
    import { Edit, Star, StarFilled } from '@element-plus/icons-vue'
    import { ref } from 'vue'
    import http from '../http.js'

    
    const props = defineProps(['articleId', 'isOwner', 'hasStar'])
    const isOwner = props.isOwner
    const hasStar = ref(false)
    hasStar.value = props.hasStar
    
    const articleId = props.articleId

    const doComment = () => {
        console.log("写评论")
    }

    const doStar = () => {
        http.post('/article/star/' + articleId)
            .then(res => {
                    // 请求完成后
                    hasStar.value = !hasStar.value
            }).catch(err => {
                // 处理错误
                console.error('Error posting data:', err);
            }).finally(() => {
                // 无论失败还是成功都需要执行的步骤
            });
    }

    const gotoArticle = () => {
        window.location.href="/edit?articleId=" + props.articleId
    }
    
</script>
<template>
    <div>
        <el-row>
            <el-link v-show="isOwner" :underline="false" @click="gotoArticle()">
                <el-icon size="large"><Edit /></el-icon>
            </el-link>
        </el-row>
        <el-row>
            <el-link :underline="false" @click="doStar">
                <el-icon size="large" color="#eebe77" v-if="hasStar"><StarFilled /></el-icon>
                <el-icon size="large"   v-else><Star /></el-icon>
            </el-link>
        </el-row>
        <el-row>
            <el-link :underline="false" @click="doComment">
                <el-icon size="large"><ChatLineSquare /></el-icon>
            </el-link>
        </el-row>
    </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>