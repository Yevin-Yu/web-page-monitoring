<template>
  <el-menu active-text-color="#19ECFF" background-color="#00325C" class="el-menu-vertical-demo"
    :default-active="activeIndex" text-color="#fff">
    <template v-for="item in menuList" :key="item.menuId">
      <!-- 如果有子菜单 -->
      <el-sub-menu v-if="item.children && item.children.length > 0" :index="item.menuId">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.menuName }}</span>
        </template>
        <el-menu-item v-for="child in item.children" :index="child.menuId" @click="goRouter(child)">
          <template #title>
            <el-icon>
              <component :is="child.icon"></component>
            </el-icon>
            <span>{{ child.menuName }}</span>
          </template>
        </el-menu-item>
      </el-sub-menu>
      <!-- 没有子菜单 -->
      <el-menu-item v-else :index="item.path" @click="goRouter(item)">
        <template #title>
          <el-icon>
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.menuName }}</span>
        </template>
      </el-menu-item>
    </template>
  </el-menu>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import type { MenuInter } from '@/types/menuInterface'
import { useRouter } from 'vue-router';
const router = useRouter();
const menuList: MenuInter[] = [
  {
    menuId: '1',
    menuName: '工作台',
    path: '/workbench',
    icon: 'Setting'
  },
  {
    menuId: '2',
    menuName: '项目管理',
    path: '/project-managementView',
    icon: 'Document',
  }
];
const activeIndex = ref<string>('1')
const goRouter = (item: MenuInter) => {
  router.push(item.path)
}
</script>
<style lang="less" scoped>
.el-menu {
  width: 250px;
  height: 100%;
  border-right: none;
}
</style>