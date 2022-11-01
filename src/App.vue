<template>
  <el-config-provider namespace="ep">
    <BaseHeader />
    <div style="display: flex">
      <BaseSide />
      <div>
        <img alt="Vue logo" class="element-plus-logo" src="./assets/logo.png" />
        <HelloWorld msg="Hello Vue 3.0 + Element Plus + Vite" />
      </div>
    </div>
  </el-config-provider>
</template>

<style>
#app {
  color: var(--ep-text-color-primary);
  text-align: center;
}

.element-plus-logo {
  width: 50%;
}
</style>
