<template>
  <div>
    <el-dialog v-model="dialogVisible" width="400px" top="35vh" center :show-close="false" title="申请code">
      <el-form class="apply-item">
        <el-form-item label="项目名称：">
          <el-input v-model="itemName"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <div class="over-all-btn application-code" @click="dialogVisible = false">取&nbsp;&nbsp;消</div>
          <div class="over-all-btn application-code" @click="confirm">确&nbsp;&nbsp;认</div>
        </div>
      </template>
    </el-dialog>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { applyKeyCode, editKeyCode } from '@/api/keyCode'
import { ElMessage } from 'element-plus'
import type { KeyCodeInter } from '@/types/keyCodeInterface'
const dialogVisible = ref<boolean>(false)
const itemName = ref<string>('')
const confirmType = ref<string>('')
const id = ref<number>()
const is_active = ref<boolean>()
const open = function (data?: KeyCodeInter) {
  if (data?.id) {
    itemName.value = data.name
    id.value = data.id
    is_active.value = data.is_active
    confirmType.value = 'edit'
  } else {
    itemName.value = ''
    confirmType.value = 'add'
  }
  dialogVisible.value = true
}
const confirm = function () {
  if (confirmType.value == 'add') {
    applyKeyCode({
      name: itemName.value,
    }).then(res => {
      if (res.data.code) {
        ElMessage.success('创建成功')
      } else {
        ElMessage.success('创建失败')
      }
    }).catch(() => {
      ElMessage.error('创建失败')
    }).finally(() => {
      dialogVisible.value = false
      emit('refresh-list')
    })
  } else if (confirmType.value == 'edit') {
    editKeyCode({ id: id.value, name: itemName.value, is_active: is_active.value }).then(res => {
      if (res.data.code) {
        ElMessage.success('修改成功')
      } else {
        ElMessage.success('修改失败')
      }
    }).catch(() => {
      ElMessage.error('修改失败')
    }).finally(() => {
      dialogVisible.value = false
      emit('refresh-list')
    })
  }
}
const emit = defineEmits(['refresh-list'])
defineExpose({ dialogVisible, open });
</script>
<style lang="less" scoped>
.apply-item {
  margin: 30px;
}

.dialog-footer {
  margin: 0 0 30px 0;
  display: flex;
  justify-content: space-evenly;

  .application-code {
    width: 150px;
    height: 30px;
    color: #fff;
    line-height: 30px;
  }
}
</style>
