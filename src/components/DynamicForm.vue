<template>
  <el-form ref="form" flex="grow-0 shrink-0" v-bind="$attrs" :model="formItems" relative @submit.prevent>
    <div flex>
      <el-row flex="grow shrink ~ wrap" :gutter="20">
        <template v-for="(item, key) in formItems">
          <el-col v-if="item.visible" :key="key" v-bind="item.attrsCol">
            <el-form-item :prop="`${key}.value`" v-bind="item.attrsFormItem">
              <component :is="item.componentMain" :key="key" v-model="item.value" :name="key" v-bind="item.attrs" v-on="item.listeners">
                <template v-if="!item.componentChild && item.content">{{ item.content }}</template>
                <component
                  :is="item.componentChild"
                  v-for="(label, value, index) in item.optionMap"
                  :key="`${key}-${value}-${index}`"
                  :label="/radio|checkbox/.test(((item.componentChild || {}).name || '').toLowerCase()) ? value : label"
                  :value="value"
                >
                  <span v-if="/radio|checkbox/.test(((item.componentChild || {}).name || '').toLowerCase())">{{ label }}</span>
                </component>
              </component>
              <div v-if="item.remark">
                {{ item.remark }}
              </div>
            </el-form-item>
          </el-col>
        </template>
        <div v-if="!!$slots.buttonBarRight" un-align="items-center" un-flex="~ grow shrink-0" un-justify="end" un-mb="3" un-p="x-2">
          <slot name="buttonBarRight" />
        </div>
      </el-row>
    </div>
    <slot name="buttonBar" />
  </el-form>
</template>
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { FORM_ITEMS } from './DynamicForm'
import { ElForm } from 'element-plus'
const props = defineProps<{
  formItems: FORM_ITEMS
}>()
const emits = defineEmits<{
  (e: 'update', value: FORM_ITEMS): void
}>()

// const formData = computed({
//   get: () => {
//     console.log('computed get:>> ', props.formItems)
//     return props.formItems
//   },
//   set: (val) => {
//     console.log('formData computed set:>> ', val)
//     emits('update', val)
//   }
// })
// watch(
//   () => props.formItems,
//   (val, oldVal) => {
//     console.log('watch', val)
//   },
//   { deep: true }
// )
const form = ref<InstanceType<typeof ElForm> | null>(null)
defineExpose({
  form
})
</script>
<style lang="scss" scoped>
// ::v-deep {
//   // a
//   .asdf {
//     color: #000;
//   }
// }
</style>
