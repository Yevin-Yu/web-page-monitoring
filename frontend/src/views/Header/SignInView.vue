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
        <div class="remember-pwd">
          <div class="pwd-ckeckbox" @click="getRememberPwd">
            <img src="../../assets/images/checkbox.png" alt="" class="checkbox-rect" />
            <img src="../../assets/images/confirm.png" alt="" class="checkbox-confirm" v-if="isRememberPwd" />
          </div>
          <span>记住密码</span>
        </div>
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
import type { UserInter } from '@/types/userInterface'
import { login } from '@/api/login'
import { ElMessage } from 'element-plus'
import { setToken } from "@/utils/token";
import { useRouter } from 'vue-router';
const router = useRouter();
const userInfoStore = useUserInfo();
const dialogVisible = ref(false);
const user = ref<UserInter>({
  email: "",
  password: "",
});
const isRememberPwd = ref(false);
const getRememberPwd = function () {
  isRememberPwd.value = !isRememberPwd.value;
};
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
onMounted(() => {
  userInfoStore.getUserInfo()
  isRememberPwd.value = userInfoStore.rememberPwd
  if (userInfoStore.rememberPwd) {
    user.value.email = userInfoStore.userInfo.email;
    user.value.password = userInfoStore.userInfo.password;
  }
});
watch(isRememberPwd, (val) => {
  if (val) {
    userInfoStore.setUserInfo(user.value, true)
  } else {
    userInfoStore.setUserInfo({ email: '', password: '' }, false)
  }
})
defineExpose({ dialogVisible, user });
</script>

<style lang="less" scoped>
:deep(.el-dialog) {
  .sign-in-container {
    width: 250px;
    margin: 20px auto;
    .remember-pwd {
      display: flex;
      justify-content: end;
      align-items: center;

      .pwd-ckeckbox {
        position: relative;
        cursor: pointer;

        .checkbox-rect,
        .checkbox-confirm {
          position: absolute;
          width: 12px;
          top: -5px;
          left: -20px;
        }
      }

      span {
        font-size: 12px;
        color: #00fcff;
      }
    }

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