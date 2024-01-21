<script setup lang="ts">
  import Header from '../components/Header.vue'
  import Footer from '../components/Footer.vue'
  import { ref } from 'vue'
  import { MdEditor } from 'md-editor-v3';
  import 'md-editor-v3/lib/style.css';

  const text = ref('# Hello Editor');

  const onSave = (v: any, h: any) => {
    // TODO 保存v到数据库
    console.log(v);

    h.then((html: any) => {
        console.log(html);
    });
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
