<script setup lang="ts">
    import { Edit, Star, StarFilled } from '@element-plus/icons-vue'
    import { ref } from 'vue'
    import http from '../http.js'

    const hasStar = ref(false)
    const hasFavorite = ref(false)
    const props = defineProps(['articleId', 'isOwner'])
    console.log(props)
    const isOwner = props.isOwner
    const articleId = props.articleId

    const doComment = () => {
        console.log("写评论")
    }

    const getStar = () => {
        http.get('/article/star/' + articleId)
            .then(res => {
                    // 请求完成后
                    hasStar.value = res.data.hasStar
            }).catch(err => {
                // 处理错误
                console.error('Error posting data:', err);
            }).finally(() => {
                // 无论失败还是成功都需要执行的步骤
            });
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

    // 进入页面就请求
    getStar()
    
</script>
<template>
    <div>
        <el-row justify="center" :gutter="20">
            <el-row>
                <el-link v-show="isOwner"  @click="gotoArticle()">
                    <el-icon size="large"><Edit /></el-icon>
                </el-link>
            </el-row>
            <el-row>
                <el-link :underline="false" @click="doStar">
                    <el-icon size="large"  v-if="hasStar"><StarFilled /></el-icon>
                    <el-icon size="large"  v-else><Star /></el-icon>
                </el-link>
            </el-row>
            <el-row>
                <el-link @click="doComment">
                    <el-icon><ChatLineSquare /></el-icon>
                </el-link>
            </el-row>
        </el-row>
    </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
</style>