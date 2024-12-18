<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      width="350px"
      top="35vh"
      :show-close="false"
    >
      <div class="sign-in-container">
        <el-form>
          <el-form-item>
            <el-input
              placeholder="请输入账号"
              :prefix-icon="UserName"
              v-model="user.userName"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              placeholder="请输入密码"
              :prefix-icon="Password"
              show-password
              v-model="user.password"
            ></el-input>
          </el-form-item>
        </el-form>
        <div class="remember-pwd">
          <div class="pwd-ckeckbox" @click="getRememberPwd">
            <img
              src="../../assets/images/checkbox.png"
              alt=""
              class="checkbox-rect"
            />
            <img
              src="../../assets/images/confirm.png"
              alt=""
              class="checkbox-confirm"
              v-if="rememberPwdStore.rememberPwd"
            />
          </div>
          <span>记住密码</span>
        </div>
        <div class="sign-btn" @click="getSignIn">登&nbsp;&nbsp;录</div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineExpose, onMounted } from "vue";
import UserName from "@/assets/images/UserName.vue";
import Password from "@/assets/images/Password.vue";
import { useRememberPwd } from "@/stores/counter.ts";
import type { UserInter} from '@/types/userInterface'
const rememberPwdStore = useRememberPwd();
const dialogVisible = ref(false);
const user = ref<UserInter>({
  userName: "",
  password: "",
});
const getRememberPwd = function () {
  rememberPwdStore.rememberPwd = !rememberPwdStore.rememberPwd;
  if (rememberPwdStore.rememberPwd) {
    rememberPwdStore.userInfo.userName = user.value.userName;
    rememberPwdStore.userInfo.password = user.value.password;
  } else {
    rememberPwdStore.userInfo.userName = "";
    rememberPwdStore.userInfo.password = "";
  }
};
const getSignIn = function () {
  console.log("登录");
  dialogVisible.value = false;
};
onMounted(() => {
  if (rememberPwdStore.rememberPwd) {
    user.value.userName = rememberPwdStore.userInfo.userName;
    user.value.password = rememberPwdStore.userInfo.password;
  }
});
defineExpose({ dialogVisible, user });
</script>

<style lang="less" scoped>
:deep(.el-dialog) {
  background: url(@/assets/images/signIn.png) no-repeat center;
  background-size: 100% 100%;
  .sign-in-container {
    width: 250px;
    margin: 20px auto;
    .el-input__wrapper {
      background: url(@/assets/images/input.png) no-repeat center;
      background-size: 100% 100%;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color))
        inset;
      .el-input__inner {
        color: #fff;
      }
    }
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
      background: url(@/assets/images/signbtn.png) no-repeat center;
      background-size: 100% 100%;
      text-align: center;
      line-height: 30px;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
    }
  }
}
</style>