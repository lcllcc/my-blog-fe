import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import 'element-plus/theme-chalk/dark/css-vars.css'
// import './assets/main.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios';


const app = createApp(App)

// 注册element-plus-icon
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(ElementPlus)

app.mount('#app')


// 封装网络请求函数
const instance = axios.create({
  // 配置 axios 实例
  baseURL: 'http://localhost',
  timeout: 5000,
});

export const httpGet = async (url: string, params: object) => {
  try {
    const response = await instance.get(url, { params });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const httpPost = async (url: string, params?: object, header?: object, resolve: object, reject: object) => {
  try {
    const response = await instance.post(url, { params }).then().catch().finally;
    return response.data;
  } catch (error) {
    throw error;
  }
};