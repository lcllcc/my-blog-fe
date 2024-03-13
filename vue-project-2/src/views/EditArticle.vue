<script setup lang="ts">
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import { ref } from 'vue'
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import http from '../http.js'
  import { ElMessage } from 'element-plus'
  import { useRouter } from 'vue-router';

  const router = useRouter();

  const text = ref('');
  const title = ref('');
  const params = new URLSearchParams(new URL(window.location.href).search);
  const articleId = params.get('articleId')

  if(articleId){
    http.get('/article/' + articleId).then(res => {
        text.value = res.data.content
        title.value = res.data.title
    })
  }

  const onSave = (v: any, h: any) => {
    if(!title.value){
        ElMessage.error('请输入标题')
        return;
    }
    http.post('/article', {
        id: articleId,
        title: title.value,
        content: v,
        coverImage: '封面图片'
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
                        <el-col :span="21">
                            <el-input  v-model="title" placeholder="请输入标题" style="font-size: larger; font-weight: bolder;">
                            </el-input>
                        </el-col>
                        <el-col :span="3" style="text-align: end;">
                            <el-button type="primary" @click="onSave(text, '')">提交</el-button>
                            <el-button @click="router.back()" >取消</el-button>
                        </el-col>
                    </el-row>
                </div>
                <div class="article-content" style="min-height: 800px;">
                    <el-row justify="center">
                        <MdEditor v-model="text" @onSave="onSave"  />
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