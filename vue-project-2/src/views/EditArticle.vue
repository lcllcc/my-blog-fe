<script setup lang="ts">
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import { ref } from 'vue'
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import http from '../http.js'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router';
  import { type Article } from "../model";

  const router = useRouter();

  const article = ref<Article>({
    status: 'PUBLIC',
    title: '',
    content: '',
    token: ''
  })

  const params = new URLSearchParams(new URL(window.location.href).search);
  const articleId = params.get('articleId')

  if(articleId){
    http.get('/article/get/' + articleId).then(res => {
        article.value = res.data
    })
  }

  const onSubmit = (content: string) => {
    onSave(content, '')
    window.location.href = '/article/owned'
  }

  const onSave = (v: any, h: any) => {
    if(!article.value.title){
        ElMessage.error('请输入标题')
        return;
    }
    console.log('article', article.value)
    http.post('/article', {
        id: articleId,
        title: article.value.title,
        content: v,
        coverImage: '封面图片',
        token: article.value.token,
        status: article.value.status
    }).then(res => {
        ElMessage({
                message: '保存成功',
                type: 'success',
            })
    }).catch(err => {
        ElMessage.error(err.msg)
    })
  };


</script>


<template>
    <div>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>
                <div class="article-title">
                    <el-row style="margin-bottom: 10px;">
                        <el-col :span="12">
                            <el-input  v-model="article.title" placeholder="请输入标题" style="font-size: larger; font-weight: bolder;">
                            </el-input>
                        </el-col>
                        <el-col :span="4" :offset="1">
                            <el-input v-show="article.status=='PROTECT'" v-model="article.token" placeholder="设置令牌"></el-input>
                        </el-col>
                        <el-col :span="4" style="text-align: end;">
                            <el-radio-group v-model="article.status">
                                <el-radio-button label="PUBLIC"  value="PUBLIC" >公开</el-radio-button>
                                <el-radio-button label="PROTECT" value="PROTECT" >受保护</el-radio-button>
                                <el-radio-button label="PRIVATE" value="PRIVATE" >私密</el-radio-button>
                            </el-radio-group>
                        </el-col>
                        <el-col :span="3" style="text-align: end;">
                            <el-button type="primary" @click="onSubmit(article.content)">提交</el-button>
                            <el-button @click="router.back()" >取消</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="article-content">
                    <el-row justify="center">
                        <MdEditor style="min-height: 40em;" v-model="article.content" @onSave="onSave"  />
                    </el-row>
                </div>
            </el-main>
            <el-footer>
                <Footer></Footer>
            </el-footer>
        </el-container>
    </div>
</template>

<style scoped>
</style>