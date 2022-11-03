<template>
  <el-container>
    <el-header un-p="!x-0">
      <BaseHeader />
    </el-header>
    <el-container>
      <el-aside un-flex="~ col" un-w="!a">
        <BaseSide un-flex="grow shrink-0" />
      </el-aside>
      <el-container>
        <RouterView v-slot="{ Component, route }">
          <KeepAlive :include="[]">
            <component :is="Component" :key="route.fullPath" />
          </KeepAlive>
        </RouterView>
      </el-container>
    </el-container>
  </el-container>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
