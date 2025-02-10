<template>
  <div>
    <el-dialog v-model="dialogVisible" width="350px" top="35vh" :show-close="false">
      <div class="sign-in-container">
        <el-form>
          <el-form-item>
            <el-input placeholder="请输入账号" :prefix-icon="UserName" v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入密码" :prefix-icon="Password" show-password v-model="user.password"></el-input>
          </el-form-item>
        </el-form>
        <div class="sign-btn over-all-btn" @click="getSignIn" v-loading="loginLoading"
          element-loading-background="rgba(0,8,22, 0.8)">登&nbsp;&nbsp;录</div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, onMounted, watch } from "vue";
import UserName from "@/assets/images/UserName.vue";
import Password from "@/assets/images/Password.vue";
import { useUserInfo } from "@/stores/counter.ts";
import { login } from '@/api/login'
import { ElMessage } from 'element-plus'
import { setToken } from "@/utils/token";
import { useRouter } from 'vue-router';
const router = useRouter();
const userInfoStore = useUserInfo();
const dialogVisible = ref(false);
const user = ref({
  email: "",
  password: "",
});
const loginLoading = ref<boolean>(false)
const getSignIn = function () {
  loginLoading.value = true
  login({
    email: user.value.email,
    password: user.value.password,
  }).then(res => {
    if (res.data.code) {
      setToken(res.data.data.token)
      userInfoStore.token = res.data.data.token
      userInfoStore.isLogin = true
      ElMessage.success('登录成功')
      userInfoStore.setUserInfo(user.value.email)
      emit('refresh-header', user.value)
      router.push('/workbench');
    } else {
      userInfoStore.isLogin = false
      ElMessage.error('登录失败')
    }
  }).catch(() => {
    ElMessage.error('登录失败')
  }).finally(() => {
    loginLoading.value = false
    dialogVisible.value = false
  })
};
const emit = defineEmits(['refresh-header'])
onMounted(() => {
  userInfoStore.getUserInfo()
});
defineExpose({ dialogVisible, user });
</script>

<style lang="less" scoped>
:deep(.el-dialog) {
  .sign-in-container {
    width: 250px;
    margin: 20px auto;

    .sign-btn {
      width: 180px;
      height: 30px;
      margin: 20px auto 40px;
      line-height: 30px;
      font-size: 16px;
    }
  }
}
</style>