<template>
  <el-main>
    <div un-dark:text="white opacity-80" un-text="black opacity-80">cy3000</div>
    <DynamicForm ref="dynamicForm" v-model:form-items="formItems" label-width="120px">
      <template #buttonBarRight> </template>
    </DynamicForm>
  </el-main>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, defineAsyncComponent, markRaw, watch, shallowReactive, computed } from 'vue'
import * as API_BASE from '@/api/modules/base'
import DynamicForm from '@/components/DynamicForm.vue'
import { FORM_ITEMS, initFormItem } from '@/components/DynamicForm'
import { ElInput, ElOption, ElSelect } from 'element-plus'
import { normalListRepositoriess } from '@/utils/repositories'

const dynamicForm = ref<InstanceType<typeof DynamicForm> | null>(null)
const formItems = reactive<FORM_ITEMS>({
  source: initFormItem({
    componentMain: markRaw(defineAsyncComponent(() => Promise.resolve(ElSelect))),
    componentChild: markRaw(defineAsyncComponent(() => Promise.resolve(ElOption))),
    attrsFormItem: { label: 'source' },
    attrsCol: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
    attrs: { clearable: true, placeholder: '请选择', loading: true, filterable: true, class: 'w-full' } as InstanceType<typeof ElSelect> | any
  }),
  status: initFormItem({
    componentMain: markRaw(defineAsyncComponent(() => Promise.resolve(ElInput))),
    attrsFormItem: { label: 'status' },
    attrsCol: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
    attrs: { clearable: true, placeholder: '请输入' } as InstanceType<typeof ElSelect>
  })
})
// const queryParams = reactive({})
// console.log('dynamicForm?.value?.initFormItem() :>> ', dynamicForm?.value?.initFormItem())
// function handleDynamicFormMounted(e: any) {
//   console.log('handleDynamicFormMounted :>> ', e)
//   console.log('dynamicForm?.value?.initFormItem() :>> ', dynamicForm?.value?.initFormItem())
// }

API_BASE.getSourceList().then(({ data }) => {
  formItems.source.optionMap = (data || []).reduce((map, item) => {
    map[item.source] = item.source
    return map
  }, {} as { [key: string]: string })
  if (formItems.source.attrs) {
    formItems.source.attrs.loading = false
  }
})
const { getList, init, handleRefresh, list, errorHint, errorVisible, loading, loadingRefresh } = normalListRepositoriess({
  apiFunction: API_BASE.getReport,
  apiParams: computed(() => ({
    source: formItems.source.value
  }))
})
</script>
<style lang="scss" scoped></style>
