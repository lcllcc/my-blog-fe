<template>
    <div class="common-layout">
    <el-container>
      <el-header>
        <NoLoginHeader></NoLoginHeader>
      </el-header>
      <el-main style="min-height: 550px;">
        <el-row justify="center">
            <el-row :span="12" style="margin-top: 60px;">
                <el-card>
                <el-form :model="ruleForm"
                         ref="ruleFormRef"
                         :rules="rules"
                         style="width: 500px" 
                         size="large"
                         status-icon>
                    <h3>登录</h3>
                    <el-form-item prop="email">
                        <el-input v-model="ruleForm.email" placeholder="邮箱"/>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="ruleForm.password" type = "password" placeholder="密码" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" style="width: 100%;" :loading="logining" @click="login(ruleFormRef)">登录</el-button>
                    </el-form-item>
                    <el-alert v-show="errMsg" :title="errMsg" type="error" :closable="false" />
                </el-form>
            </el-card>
            </el-row>
        </el-row>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
  </div>
  </template>
  
  <style>
  
  </style>

<script setup lang="ts">
import NoLoginHeader from '../components/NoLoginHeader.vue'
import Footer from '../components/Footer.vue'
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import http from '../http.js';

const errMsg = ref('')
const logining = ref(false)
// 表单校验
interface RuleForm {
  email: string
  password: string
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  email: '',
  password: ''
})
const rules = reactive<FormRules<RuleForm>>({
  email: [
    { required: true, pattern:'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', message: '请输入正确的邮箱', trigger: 'blur' },
  ],
  password: [
    {
      required: true, 
      message: '请输入密码',
      trigger: 'change',
    },
    {
      min: 8,
      max: 32,
      message: '密码长度必须为8～32个字符',
    }
  ],
})
const login = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        console.log("login!!!")
        logining.value = true
        // TODO 调用接口登录
        http.post('/login', { 
          email: ruleForm.email,
          password: ruleForm.password
        })
        .then(data => {
          // 请求完成后
          console.log("success response:", data);
          errMsg.value = ''
          localStorage.setItem('isLoggedIn', 'true');
          window.location.href = '/Dashboard'
        })
        .catch(error => {
          // 处理错误
          errMsg.value = error.msg
        })
        .finally(() => {
          // 无论失败还是成功都需要执行的步骤
          logining.value = false
        });
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
  