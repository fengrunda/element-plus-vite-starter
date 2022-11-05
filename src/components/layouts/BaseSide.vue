<template>
  <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" default-active="2" @close="handleClose" @open="handleOpen">
    <el-sub-menu index="1">
      <template #title>
        <el-icon><location /></el-icon>
        <span>Navigator One</span>
      </template>
      <el-menu-item-group>
        <template #title><span>Group One</span></template>
        <el-menu-item index="1-1">item one</el-menu-item>
        <el-menu-item index="1-2">item two</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group title="Group Two">
        <el-menu-item index="1-3">item three</el-menu-item>
      </el-menu-item-group>
      <el-sub-menu index="1-4">
        <template #title><span>item four</span></template>
        <el-menu-item index="1-4-1">item one</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="2">
      <el-icon><icon-menu /></el-icon>
      <template #title>Navigator Two</template>
    </el-menu-item>
    <el-menu-item disabled index="3">
      <el-icon><document /></el-icon>
      <template #title>Navigator Three</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>Navigator Four</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { Location, Document, Menu as IconMenu, Setting } from '@element-plus/icons-vue'
import { BROWSER_VERSION } from '@/utils/util'

const isCollapse = ref(document.body.clientWidth < 800)
// const isCollapse = computed(() => BROWSER_VERSION.mobile)
addEventListener('resize', (e) => {
  // console.log('window.screen.availWidth :>> ', window.screen.availWidth)
  // console.log('window.screen.width :>> ', window.screen.width)
  // console.log('document.body.clientWidth  :>> ', document.body.clientWidth)
  isCollapse.value = document.body.clientWidth < 800
})
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>
