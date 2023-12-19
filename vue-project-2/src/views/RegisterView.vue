<script setup lang="ts">
    import { reactive } from 'vue'

    // do not use same name with ref
    const form = reactive({
        email: '',
        password: ''
    })

    const onSubmit = () => {
    console.log('submit!')
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
            <el-form :model="form" label-width="120px">
                <el-form-item label="邮箱">
                    <el-input v-model="form.email" />
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                    <RouterLink to="/" style="">
                        <el-button>
                            取消
                        </el-button>
                    </RouterLink>
                </el-form-item>
            </el-form>
        </el-row>
      </el-main>
    </el-container>
</template>
