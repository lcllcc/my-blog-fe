<script setup lang="ts">
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
          <el-col :span="6" :offset="14">
            <RouterLink to="/Login" style="">
              <el-button type="primary">
                登陆
              </el-button>
            </RouterLink>
            <RouterLink to="/Register" style="">
              <el-button>
                注册
              </el-button>
            </RouterLink>
          </el-col>
        </el-row>
      </el-header>
      <div style="width: 100%; height: 0; border-top: 1px solid var(--el-border-color);"/>
      <el-main>
        <el-row class="row-bg" justify="center">
          <el-col :span="12">
            <el-text class="mx-1" type="info">
              欢迎来到我的博客！更多功能正在开发中，敬请期待～😄
            </el-text>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
</template>
