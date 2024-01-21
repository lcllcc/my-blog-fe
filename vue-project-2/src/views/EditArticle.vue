<script setup lang="ts">
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import { ref } from 'vue'
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';
  import http from '../http.js'
  import { ElMessage } from 'element-plus'


  const text = ref('# Hello Editor');
  const params = new URLSearchParams(new URL(window.location.href).search);
  const articleId = params.get('articleId')

  const onSave = (v: any, h: any) => {
    console.log(v);
    http.post('/article', {
        id: articleId,
        title: '标题',
        content: v,
        coverImage: '封面图片'
    }).then(res => {
        ElMessage({
                message: '保存成功',
                type: 'success',
            })
    }).catch(err => {
        ElMessage.error(error.msg)
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
                <div style="min-height: 600px;">
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
