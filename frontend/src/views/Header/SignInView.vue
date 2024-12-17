<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      width="400"
      top="40vh"
      :show-close="false"
    >
      <div class="sign-in-container">
        <el-form>
          <el-form-item>
            <el-input
              placeholder="请输入账号"
              :prefix-icon="UserName"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入密码"
              :prefix-icon="Password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="sign-btn">

        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from "vue";
import UserName from "@/assets/images/UserName.vue";
import Password from "@/assets/images/Password.vue";
const dialogVisible = ref(false);
defineExpose({ dialogVisible });
</script>

<style lang="less" scoped>
:deep(.el-dialog) {
  background: url(@/assets/images/signIn.webp) no-repeat center;
  background-size: 100% 100%;
  .sign-in-container {
    width: 250px;
    margin: 0 auto;
    .el-input__wrapper {
      background: url(@/assets/images/input.png) no-repeat center;
      background-size: 100% 100%;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
        inset;
    }
    .sign-btn{
      width: 200px;
      height: 30px;
      margin: 0 auto;
      background: url(@/assets/images/signbtn.png) no-repeat center;
      background-size:100% 100%;
    }
  }
}
</style>