<template>
  <div class="browsing-history">
    <el-form inline>
      <el-form-item label="选择项目：" size="default">
        <el-select v-model="keyCode" placeholder="请选择查询项目" style="width: 250px;">
          <el-option v-for="item in keyCodeList" :label="item.name" :value="item.code" :key="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="float: right;">
        <el-button @click="resetQuery">重置</el-button>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%;margin-top: 30px;" class="code-table" :highlight-current-row="false"
      v-loading="tableLoading">
      <el-table-column label="浏览目录" prop="title" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="浏览路径" prop="url" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="地区" prop="region" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column label="ip地址" prop="ip" show-overflow-tooltip align="center"></el-table-column>
      <el-table-column prop="visit_time" label="访问时间" align="center">
        <template #default="scope">
          {{ $formatDate(scope.row.visit_time) }}
        </template>
      </el-table-column>
      <el-table-column prop="close_time" label="离开时间" align="center">
        <template #default="scope">
          {{ $formatDate(scope.row.close_time) }}
        </template>
      </el-table-column>
      <el-table-column label="持续时间" prop="visit_duration" show-overflow-tooltip align="center"
        width="100"></el-table-column>
      <el-table-column prop="user_agent" label="客户端" align="center">
        <template #default="scope">
          {{ parseUserAgent(scope.row.user_agent).name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template #default="scope">
          <el-button type="primary" link @click="deleteHistoryItem(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-model:current-page="currentPage" v-model:page-size="currentSize" :page-sizes="[15, 20, 50, 100]"
      :size="size" :background="background" layout="total, sizes, prev, pager, next" :total="total"
      @size-change="handleSizeChange" @current-change="handleCurrentChange" class="code-page"
      style="float: right;margin-top: 40px;" />
  </div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { getKeyCode, getHistory, deleteHistory } from '@/api/keyCode'
import type { KeyCodeInter, HistoryInter } from '@/types/keyCodeInterface'
import type { ComponentSize } from 'element-plus'
import { ElMessage, ElMessageBox } from 'element-plus'
const currentPage = ref<number>(1)
const currentSize = ref<number>(15)
const size = ref<ComponentSize>('default')
const background = ref<boolean>(false)
const total = ref<number>(0)
const tableLoading = ref<boolean>(false)
const keyCode = ref<string>('')
const keyCodeList = ref<KeyCodeInter[]>()
const tableData = ref<HistoryInter[]>()
const getKeyCodeList = function () {
  getKeyCode().then(res => {
    if (res.data.code) {
      keyCodeList.value = res.data.data || []
      keyCode.value = keyCodeList.value && keyCodeList.value.length ? keyCodeList.value[0].code : ''
    } else {
      keyCodeList.value = []
    }
  }).catch(e => {
    console.error('获取项目code失败')
  })
}
getKeyCodeList()
const getHistoryList = function () {
  tableLoading.value = true
  getHistory({
    code: keyCode.value,
    page_index: currentPage.value,
    page_size: currentSize.value
  }).then(res => {
    if (res.data.code) {
      tableData.value = res.data.data.list || []
      total.value = Number(res.data.data.total)
    }
  }).finally(() => {
    tableLoading.value = false
  })
}
watchEffect(() => {
  if (keyCode.value) {
    getHistoryList()
  }
})
const parseUserAgent = function (userAgent: string): { name?: string, version?: string, os?: string } {
  const ua = userAgent.toLowerCase();
  const browserInfo: { name?: string, version?: string, os?: string } = {};

  // 浏览器检测
  interface BrowserInfo {
    regex: RegExp;
    name: string;
  }

  const browsers: BrowserInfo[] = [
    { regex: /(edg)\/([\w.]+)/, name: 'Edge' },
    { regex: /(crios)\/([\w.]+)/, name: 'Chrome iOS' },
    { regex: /(chrome)\/([\w.]+)/, name: 'Chrome' },
    { regex: /(safari)\/([\w.]+)/, name: 'Safari' },
    { regex: /(firefox)\/([\w.]+)/, name: 'Firefox' },
    { regex: /(opera)(?:.*version|)[ \/]([\w.]+)/, name: 'Opera' }
  ];

  for (const { regex, name } of browsers) {
    const match = ua.match(regex);
    if (match) {
      browserInfo.name = name;
      browserInfo.version = match[2];
      break;
    }
  }

  // 操作系统检测
  interface OsInfo {
    regex: RegExp;
    os: string;
  }

  const oses: OsInfo[] = [
    { regex: /macintosh|mac os x/, os: 'Mac OS X' },
    { regex: /windows|win32/, os: 'Windows' },
    { regex: /android/, os: 'Android' },
    { regex: /iphone|ipad|ipod/, os: 'iOS' }
  ];

  for (const { regex, os } of oses) {
    if (ua.match(regex)) {
      browserInfo.os = os;
      break;
    }
  }

  return browserInfo;
}
const deleteHistoryItem = function (data: HistoryInter) {
  ElMessageBox.confirm(
    '确认删除此条浏览记录？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      deleteHistory({ code: keyCode.value, visitor_id: data.visitor_id }).then(res => {
        if (res.data.code) {
          ElMessage.success('删除成功')
        } else {
          ElMessage.error('删除失败')
        }
      }).catch(e => {
        ElMessage.error('删除失败')
      }).finally(() => {
        getHistoryList()
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消删除',
      })
    })
}
const handleSizeChange = (val: number) => {
  currentSize.value = val
  currentPage.value = 1
  getHistoryList()
}
const handleCurrentChange = (val: number) => {
  currentPage.value = val
  getHistoryList()
}
const resetQuery = function () {
  keyCode.value = keyCodeList.value && keyCodeList.value.length ? keyCodeList.value[0].code : ''
  currentPage.value = 1
  currentSize.value = 15
  getHistoryList()
}
</script>
<style lang="less" scoped>
.browsing-history {
  padding-top: 20px;
}
</style>