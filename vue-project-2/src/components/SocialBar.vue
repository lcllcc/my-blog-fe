<script setup lang="ts">
    import { Edit, Star, StarFilled } from '@element-plus/icons-vue'
    import { ref } from 'vue'
    const hasStar = ref(false)
    const hasFavorite = ref(false)
    const props = defineProps(['articleId', 'isOwner'])
    console.log(props)
    const isOwner = props.isOwner

    const doComment = () => {
        console.log("写评论")
    }

    const doStar = () => {
        console.log("do star")
        hasStar.value = !hasStar.value
    }

    const gotoArticle = () => {
        window.location.href="/edit?articleId=" + props.articleId
    }

    
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