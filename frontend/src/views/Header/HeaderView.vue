<template>
  <header>
    <span class="title">数据可视化</span>
    <div class="login">
      <span class="sign-in" @click="signIn">登录</span>
      <span>注册</span>
    </div>
  </header>
  <SignInView ref="signInView" />
</template>

<script setup lang="ts">
import SignInView from "./SignInView.vue";
import { ref } from "vue";
const signInView = ref();
const signIn = function () {
  signInView.value.dialogVisible = true;
};
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