<template>
  <div>
    <div class="not-login" v-if="!isLogin">
      <span class="title">前端统计分析平台</span>
      <div class="login">
        <span class="sign-in" @click="signIn">登录</span>
        <span @click="signUp">注册</span>
      </div>
    </div>
    <div class="is-login" v-else>
      <span class="title">前端统计分析平台</span>
      <el-dropdown placement="bottom">
        <div class="user-info">{{ userName }}</div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="logOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
  <SignInView ref="signInView" @refresh-header="refreshHeader" />
  <SignUpView ref="signUpView" />
</template>

<script setup lang="ts">
import SignInView from "./SignInView.vue";
import SignUpView from "./SignUpView.vue";
import { nextTick, ref, onMounted } from "vue";
import { useUserInfo } from "@/stores/counter.ts";
import useLogin from '@/hooks/useLogin'
import { removeToken } from "@/utils/token";
import { useRouter } from 'vue-router';
import type { UserInter } from '@/types/userInterface'
const router = useRouter();
let { isLogin } = useLogin()
const rememberPwdStore = useUserInfo();
const userName = ref<string>('')
const signInView = ref();
const signUpView = ref();
onMounted(() => {
  userName.value = rememberPwdStore.userInfo.email ? rememberPwdStore.userInfo.email[0] : ''
})
const signIn = function () {
  signInView.value.dialogVisible = true;
  if (rememberPwdStore.rememberPwd) {
    signInView.value.user.email = rememberPwdStore.userInfo.email;
    signInView.value.user.password = rememberPwdStore.userInfo.password;
  } else {
    signInView.value.user.email = "";
    signInView.value.user.password = "";
  }
};
const signUp = function () {
  signUpView.value.dialogVisible = true;
  if (signUpView.value.ruleFormRef) signUpView.value.ruleFormRef.resetFields()
}
const refreshHeader = function (user: UserInter) {
  nextTick(() => {
    userName.value = user.email[0]
  })
}
const logOut = function () {
  rememberPwdStore.isLogin = false
  rememberPwdStore.token = ''
  removeToken()
  router.push('/guest');
  location.reload();
}
</script>

<style lang="less" scoped>
.not-login {
  width: 100%;
  height: 60px;
  background: url(@/assets/images/title.png) no-repeat center;
  background-size: 100% 100%;
  color: #19ecff;
  font-size: 40px;
  text-align: center;
  position: relative;

  .login {
    position: absolute;
    font-size: 16px;
    top: 45px;
    right: 30px;
    color: #fff;

    .sign-in {
      padding-right: 20px;
      margin-right: 20px;
      border-right: 1px solid #19ecffb5;
    }

    span {
      cursor: pointer;
    }

    span:hover {
      color: #00b498;
    }
  }
}

.is-login {
  width: 100%;
  height: 60px;
  background-color: var(--vt-dark-light-bg);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title {
    color: #fff;
    font-size: 1.5rem;
    padding-left: 30px;
  }

  .user-info {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 60px;
    text-align: center;
    line-height: 30px;
    color: #00325c;
    cursor: pointer;
  }
}
</style>