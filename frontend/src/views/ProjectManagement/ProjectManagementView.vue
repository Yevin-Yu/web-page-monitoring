<template>
  <div class="project-manage">
    <div class="over-all-btn application-code" @click="applyCode">申请code</div>
    <el-table :data="tableData" style="width: 100%" class="code-table" :highlight-current-row="false"
      v-loading="tableLoading">
      <el-table-column prop="code" label="keyCode" align="center" />
      <el-table-column prop="name" label="项目名称" align="center" />
      <el-table-column prop="created_at" label="创建时间" align="center">
        <template #default="scope">
          {{ $formatDate(scope.row.created_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间" align="center">
        <template #default="scope">
          {{ $formatDate(scope.row.updated_at) }}
        </template>
      </el-table-column>
      <el-table-column prop="is_active" label="是否启用" align="center">
        <template #default="scope">
          <el-switch v-model="scope.row.is_active" class="ml-2"
            style="--el-switch-on-color: #19ECFF; --el-switch-off-color: #ccc" @change="changeActive(scope.row)" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" link @click="editCode(scope.row)">编辑</el-button>
          <el-button type="primary" link @click="deleteCode(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- <el-pagination v-model:current-page="currentPage" v-model:page-size="currentSize" :page-sizes="[10, 20, 50, 100]"
      :size="size" :background="background" layout="total, sizes, prev, pager, next" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" class="code-page" /> -->
  </div>
  <ApplyCodDialog ref="applyCodDialog" @refresh-list="getList" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
// import type { ComponentSize } from 'element-plus'
import ApplyCodDialog from './ApplyCodDialog.vue'
import { getKeyCode, deleteKeyCode, editKeyCode } from '@/api/keyCode'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { KeyCodeInter } from '@/types/keyCodeInterface'
// const currentPage = ref<number>(5)
// const currentSize = ref<number>(10)
// const size = ref<ComponentSize>('default')
// const background = ref<boolean>(false)
// const total = ref<number>(10000)
const tableData = ref<KeyCodeInter[]>()
const tableLoading = ref<boolean>(false)
const applyCodDialog = ref()
const applyCode = function () {
  applyCodDialog.value.open()
}
const getList = function () {
  tableLoading.value = true
  getKeyCode().then(res => {
    if (res.data.code) {
      tableData.value = res.data.data || []
    } else {
      tableData.value = []
    }
  }).catch(e => {
    ElMessage.error('获取项目code失败')
  }).finally(() => {
    tableLoading.value = false
  })
}
const editCode = function (data: KeyCodeInter) {
  applyCodDialog.value.open(data)
}
const changeActive = function (data: KeyCodeInter) {
  editKeyCode({ id: data.id, name: data.name, is_active: data.is_active }).then(res => {
    if (res.data.code) {
      ElMessage.success('修改成功')
    } else {
      ElMessage.success('修改失败')
    }
  }).catch(() => {
    ElMessage.error('修改失败')
  }).finally(() => {
    getList()
  })
}
const deleteCode = function (id: number) {
  ElMessageBox.confirm(
    '确认删除此条项目code？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteKeyCode({ id: id }).then(res => {
        if (res.data.code) {
          ElMessage.success('删除成功')
        } else {
          ElMessage.error('删除失败')
        }
      }).catch(e => {
        ElMessage.error('删除失败')
      }).finally(() => {
        getList()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}


getList()
// const handleSizeChange = (val: number) => {
//   console.log(`${val} items per page`)
// }
// const handleCurrentChange = (val: number) => {
//   console.log(`current page: ${val}`)
// }
</script>
<style lang="less" scoped>
.project-manage {
  height: 100%;

  .application-code {
    width: 150px;
    height: 30px;
    color: #fff;
    line-height: 30px;
  }

  .code-table {
    margin-top: 30px;
    height: calc(100% - 130px);
    overflow-y: auto;
  }

  .code-page {
    margin-top: 30px;
    float: right;
  }
}
</style>