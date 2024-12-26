<template>
  <div class="home-view">
    <LogOutHome v-if="!isLogin" />
    <div class="login-area" v-else>

    </div>
  </div>
</template>

<script setup lang="ts">
import useLogin from '@/hooks/useLogin'
import LogOutHome from './LogOutHome.vue'
let { isLogin } = useLogin()
</script>

<style scoped lang="less">
.home-view {
  font-size: 14px;
  color: #eee;
  height: calc(100vh - 65px);
}
</style>