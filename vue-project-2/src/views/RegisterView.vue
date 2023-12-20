<script setup lang="ts">
    import { reactive } from 'vue'
    import { ref } from 'vue'
    import router from '../router'


    // do not use same name with ref
    const form = reactive({
        email: '',
        password: ''
    })

    const active = ref(0)
    const hasSendEmail = ref(false)
    const sendEmailLoding = ref(false)
    const submitLoding = ref(false)

    const onSubmit = () => {
        console.log('submit!')
        submitLoding.value=true
        setTimeout(()=>{
            // 请求完成后
            next()
            submitLoding.value=false
            router.push({ name: 'home' })
        }, 1000)
    }

    const onSendEmail = () => {
        console.log('send email!')
        sendEmailLoding.value=true
        // 模拟接口请求耗时
        setTimeout(()=>{
            // 请求完成后
            hasSendEmail.value=true
            sendEmailLoding.value=false
            active.value++
        }, 1000)
    }

    const next = () => {
        if (active.value++ > 3) active.value = 0
    }
</script>

<template>
  <el-container>
      <el-header>
        <el-row>
          <el-col :span="4">
            <div class="block">
              <el-avatar :size="40" src="../assets/银魂头像1.png"> user </el-avatar>
            </div>
          </el-col> 
        </el-row>
      </el-header>
      <div style="width: 100%; height: 0; border-top: 1px solid var(--el-border-color);"/>
      <el-main>
        <el-row class="row-bg" justify="center">
            
        </el-row>
        <el-row class="row-bg" justify="center">
            <el-col :span="5">
                <el-steps direction="vertical" :active="active" finish-status="success">
                <el-step title="填写邮箱和密码" />
                <el-step title="发送邮件接收验证码" />
                <el-step title="创建账号成功" />
            </el-steps>
            </el-col>
            <el-col :span="12">
            <el-form :model="form" label-width="120px">
                <el-form-item v-if="active>=0" id="email">
                    <el-input v-model="form.email" placeholder="邮箱" />
                </el-form-item>
                <el-form-item v-if="active>=0" id="password">
                    <el-input type="password" v-model="form.password" placeholder="密码"/>
                </el-form-item>
                <el-form-item id="send-email">
                    <el-button v-if="active==1&&!hasSendEmail" :loading="sendEmailLoding" type="primary" @click="onSendEmail">发送验证码</el-button>
                    <el-button v-if="active>=1&&hasSendEmail" type="success" disabled>已发送验证码</el-button>
                </el-form-item>
                <el-form-item id="submit">
                    <el-button v-if="active==2" type="primary" :loading="submitLoding" @click="onSubmit">提交</el-button>
                    <el-button v-if="active==3" type="success" @click="onSubmit" disabled>已提交，即将跳转...</el-button>
                    <el-button v-if="active<1" @click="next">下一步</el-button>
                </el-form-item>
            </el-form>
            </el-col>
        </el-row>
      </el-main>
    </el-container>
</template>
