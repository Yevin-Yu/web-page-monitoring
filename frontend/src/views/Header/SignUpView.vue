<template>
  <div>
    <el-dialog v-model="dialogVisible" width="350px" top="35vh" :show-close="false">
      <div class="sign-in-container">
        <el-form ref="ruleFormRef" :rules="rules" :model="user">
          <el-form-item prop="email">
            <el-input placeholder="请输入邮箱账号" :prefix-icon="UserName" v-model="user.email"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="请输入密码" :prefix-icon="Password" show-password v-model="user.password"></el-input>
          </el-form-item>
          <el-form-item prop="passwordConfirm">
            <el-input placeholder="请再次确认密码" :prefix-icon="Password" show-password
              v-model="user.passwordConfirm"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="sign-btn" @click="getSignUp(ruleFormRef)" v-loading="submitLoading"
            element-loading-background="rgba(0,8,22, 0.8)">注&nbsp;&nbsp;册</div>
          </el-form-item>
        </el-form>

      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, defineExpose } from "vue";
import UserName from "@/assets/images/UserName.vue";
import Password from "@/assets/images/Password.vue";
import type { UserInter } from '@/types/userInterface'
import type { FormInstance, FormRules } from 'element-plus'
import { register } from '@/api/login'
import { ElMessage } from 'element-plus'
const dialogVisible = ref(false);
const user = ref<UserInter>({
  email: "",
  password: "",
  passwordConfirm: '',
});
const ruleFormRef = ref<FormInstance>()
const validatePass = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('请再次输入密码'));
  } else if (value !== user.value.password) {
    callback(new Error('两次输入密码不一致!'));
  } else {
    callback();
  }
};
const validatePasswordStrength = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    return callback(new Error('请输入密码'));
  }
  const hasLowercase = /[a-z]/.test(value);
  const hasUppercase = /[A-Z]/.test(value);
  const hasNumbers = /\d/.test(value);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const conditionsMet = [hasLowercase, hasUppercase, hasNumbers, hasSpecialChars].filter(Boolean).length;
  if (conditionsMet < 3) {
    return callback(new Error('密码必须包含数字、字母大小写、特殊符号中的至少三种'));
  }
  callback();
};
const rules = reactive<FormRules<UserInter>>({
  email: [
    { required: true, message: '请输入邮箱账号', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] },
  ],
  password: [
    { validator: validatePasswordStrength, trigger: 'blur' },
    { min: 8, max: 20, message: '长度控制在8到20个字符之间', trigger: 'blur' },
  ],
  passwordConfirm: [
    { validator: validatePass, trigger: 'blur' }
  ],
})
const submitLoading = ref<boolean>(false)
const getSignUp = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      submitLoading.value = true
      register({email:user.value.email, password:user.value.password}).then(res=>{
        if(res.data.code){
          ElMessage.success(res.data.data)
        }else{
          ElMessage.error('注册失败')
        }
      }).catch(()=>{
        ElMessage.error('注册失败')
      }).finally(()=>{
        submitLoading.value = false
        dialogVisible.value = false
      })
    } else {
      ElMessage.error('请按照要求填写必填项')
    }
  })
}
defineExpose({ dialogVisible, user, ruleFormRef });
</script>

<style lang="less" scoped>
:deep(.el-dialog) {
  background: url(@/assets/images/signIn.png) no-repeat center;
  background-size: 100% 100%;

  .sign-in-container {
    width: 250px;
    margin: 20px auto;

    .el-form-item {
      margin-bottom: 30px;
    }

    .el-input__wrapper {
      background: url(@/assets/images/input.png) no-repeat center;
      background-size: 100% 100%;
      box-shadow: 0 0 0 0px var(--el-input-border-color, var(--el-border-color)) inset;

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
      margin: 40px auto;
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