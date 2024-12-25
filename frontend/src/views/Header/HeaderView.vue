<template>
  <header>
    <span class="title">前端统计分析平台</span>
    <div class="login">
      <span class="sign-in" @click="signIn">登录</span>
      <span @click="signUp">注册</span>
    </div>
  </header>
  <SignInView ref="signInView" />
  <SignUpView ref="signUpView" />
</template>

<script setup lang="ts">
import SignInView from "./SignInView.vue";
import SignUpView from "./SignUpView.vue";
import { ref } from "vue";
import { useRememberPwd } from "@/stores/counter.ts";
const rememberPwdStore = useRememberPwd();

const signInView = ref();
const signUpView = ref();
const signIn = function () {
  signInView.value.dialogVisible = true;
  if (rememberPwdStore.rememberPwd) {
    signInView.value.user.userName = rememberPwdStore.userInfo.userName;
    signInView.value.user.password = rememberPwdStore.userInfo.password;
  } else {
    signInView.value.user.userName = "";
    signInView.value.user.password = "";
  }
};
const signUp = function () {
  signUpView.value.dialogVisible = true;
  if(signUpView.value.ruleFormRef) signUpView.value.ruleFormRef.resetFields()
}
</script>

<style lang="less" scoped>
header {
  width: 100%;
  min-height: 60px;
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
      border-right: 1px solid #19ecff;
    }

    span {
      cursor: pointer;
    }

    span:hover {
      color: #00b498;
    }
  }
}
</style>