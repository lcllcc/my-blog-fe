<script setup lang="ts">
    import { reactive } from 'vue'
    import { ref } from 'vue'
    import type { FormInstance, FormRules } from 'element-plus'
    import NoLoginHeader from '@/components/NoLoginHeader.vue'
    import { ElMessage } from 'element-plus'
    import http from '../http.js';
    import Footer from '@/components/Footer.vue'

    // 状态
    const active = ref(0)
    const hasSendEmail = ref(false)
    const sendEmailLoding = ref(false)
    const submitLoding = ref(false)

    const onSendEmail = () => {
        console.log('send email!')
        sendEmailLoding.value=true
        // 模拟接口请求耗时
        // 例子：发送GET请求
        // 例子：发送POST请求
      http.post('/register/send/code', { 
        email: ruleForm.email
      })
      .then(response => {
          // 请求完成后
          console.log(response);
          hasSendEmail.value=true
            ElMessage({
                message: '验证码发送成功',
                type: 'success',
            })
            if(active.value < 2){
                active.value++
            }
        })
        .catch(error => {
          // 处理错误
          console.error('Error posting data:', error);
          ElMessage.error(error.msg)
        })
        .finally(() => {
          // 无论失败还是成功都需要执行的步骤
          sendEmailLoding.value=false
        });
    }


// 表单校验
interface RuleForm {
  email: string
  password: string
  checkPass: string
  code: string
}
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  email: '',
  password: '',
  checkPass: '',
  code: ''
})

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== ruleForm.password) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}

const validateCode = (rule: any, value: any, callback: any) => {
  if (active.value < 2){
    callback()
  } else if (value.length != 6) {
    callback(new Error("请输入6位验证码"))
  } else {
    callback()
  }
}

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
  checkPass: [
    {
        required: true, 
        message: '请输入密码',
        trigger: 'change',
    },
    {
        min: 8,
        max: 32,
        message: '密码长度必须为8～32个字符',
    },
    {
        validator: validatePass2,
        message: "两次密码不一致",
        trigger: 'change'
    }
  ],
  code: [
    {
        validator: validateCode,
        message: '请输入6位验证码',
        trigger: 'blur'
    }
  ]
})

const register = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        submitLoding.value = true
        // TODO 调用接口注册
        http.post('/register/regist', {
          email: ruleForm.email,
          password: ruleForm.password,
          code: ruleForm.code
        }).then(res => {
          console.log(res);
          active.value++
          setTimeout(() => {
                window.location.href = '/login'
            }, 2000)
        }).catch(err => {
          ElMessage.error(err.msg)
        })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const next = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
        if (active.value++ > 3) active.value = 0
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<template>
  <el-container>
    <el-header>
        <NoLoginHeader></NoLoginHeader>
      </el-header>
      <el-main >
        <div class="register-container">
        <el-row justify="center">
            <el-col :span="5">
                <el-steps direction="vertical" :active="active" finish-status="success">
                <el-step title="填写邮箱和密码" />
                <el-step title="发送邮件接收验证码" />
                <el-step title="填写验证码创建账号" />
            </el-steps>
            </el-col>
            <el-col :span="12">
            <el-form :model="ruleForm" label-width="120px" :rules="rules" ref="ruleFormRef" size="large">
                <el-form-item v-if="active>=0" id="email" prop="email" >
                    <el-input v-model="ruleForm.email" placeholder="邮箱" />
                </el-form-item>
                <el-form-item v-if="active>=0" id="password" prop="password">
                    <el-input type="password" v-model="ruleForm.password" placeholder="密码" show-password maxlength="32" show-word-limit />
                </el-form-item>
                <el-form-item prop="checkPass">
                    <el-input
                        v-model="ruleForm.checkPass"
                        type="password"
                        autocomplete="off"
                        placeholder="再次输入密码"
                    />
                </el-form-item>
                <el-form-item id="send-email" prop="code">
                    <el-input style="width: 60%; margin-right: 10%;" v-if="active>=1&&hasSendEmail"
                        v-model="ruleForm.code"
                        autocomplete="off"
                        placeholder="验证码"
                    />
                    <el-button v-if="active==1&&!hasSendEmail" :loading="sendEmailLoding" type="primary" @click="onSendEmail">发送验证码</el-button>
                    <el-button v-if="active>=1&&hasSendEmail" :loading="sendEmailLoding" type="primary" @click="onSendEmail">再次发送</el-button>
                </el-form-item>
                <el-form-item id="submit">
                    <el-button v-if="active==2" type="primary" :loading="submitLoding" @click="register(ruleFormRef)">提交</el-button>
                    <el-result
                      v-show="active==3"
                      icon="success"
                      title="注册成功"
                      sub-title="即将跳转去登录..."
                    ></el-result>
                    <el-button v-if="active<1" @click="next(ruleFormRef)">下一步</el-button>
                </el-form-item>
            </el-form>
            </el-col>
        </el-row>
      </div>
      </el-main>
      <el-footer>
        <Footer></Footer>
      </el-footer>
    </el-container>
</template>

<style>
.register-container {
  min-height: 38em;
}
</style>