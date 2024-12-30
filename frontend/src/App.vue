<template>
  <el-container id="all-page">
    <el-header>
      <HeaderView />
    </el-header>
    <el-container class="main-area">
      <el-aside class="side-bar" v-if="isLogin">
        <MenuView />
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import HeaderView from "@/views/Header/HeaderView.vue";
import MenuView from "@/views/Aside/MenuView.vue";
import { RouterView } from "vue-router";
import useLogin from '@/hooks/useLogin'
let { isLogin } = useLogin()
</script>

<style lang="less" scoped>
#all-page{
  height: 100vh;
}
.el-header {
  padding: 0;
  height: 60px;
}
.main-area{
  height: calc(100vh - 60px);
}
.side-bar {
  width: 250px;
  height: 100%;
  overflow-y: auto;
}
</style>