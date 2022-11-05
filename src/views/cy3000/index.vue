<template>
  <el-main flex="!~ col">
    <div un-dark:text="white opacity-80" un-text="black opacity-80">cy3000</div>
    <DynamicForm ref="dynamicForm" v-model:form-items="formItems" label-width="120px">
      <template #buttonBarRight>
        <el-button :loading="loading" native-type="submit" type="primary" @click="handleSubmitForm">查询</el-button>
        <el-button @click="handleResetForm">重置</el-button>
      </template>
    </DynamicForm>
    <div un-flex="grow shrink">
      <el-table :data="list" height="100%" un-pos="absolute top-0 right-0 bottom-0 left-0">
        <el-table-column label="ID" prop="id" />
        <el-table-column label="source" prop="source" />
        <el-table-column label="status" prop="status" />
        <el-table-column label="count" prop="count" />
        <el-table-column fixed="right" label="操作" width="120px">
          <template #default="scope">
            <!-- <el-button type="text" @click="handleBindProduct(scope.row.id)">查看人月</el-button> -->
            <el-button size="small" @click="handleChangeStatus(scope.row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, markRaw, watch, computed, defineComponent } from 'vue'
import * as API_BASE from '@/api/modules/base'
import DynamicForm from '@/components/DynamicForm.vue'
import { FORM_ITEMS, initFormItem } from '@/components/DynamicForm'
import { ElInput, ElOption, ElSelect, ElMessage, ElMessageBox, ElButton, ElMain } from 'element-plus'
import { normalListRepositoriess } from '@/utils/repositories'
import { cloneDeep } from 'lodash'
const dynamicForm = ref<InstanceType<typeof DynamicForm> | null>(null)
const formItems = reactive<FORM_ITEMS>({
  source: initFormItem({
    componentMain: markRaw(defineComponent(ElSelect)),
    componentChild: markRaw(defineComponent(ElOption)),
    attrsFormItem: { label: 'source' },
    attrsCol: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
    attrs: { clearable: true, placeholder: '请选择', loading: true, filterable: true, class: 'w-full' } as InstanceType<typeof ElSelect> | any
  }),
  status: initFormItem({
    componentMain: markRaw(defineComponent(ElInput)),
    attrsFormItem: { label: 'status' },
    attrsCol: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
    attrs: { clearable: true, placeholder: '请输入' } as InstanceType<typeof ElInput>
  }),
  id: initFormItem({
    componentMain: markRaw(defineComponent(ElInput)),
    attrsFormItem: { label: '身份证号' },
    attrsCol: { xs: 24, sm: 12, md: 8, lg: 6, xl: 4 },
    attrs: { clearable: true, placeholder: '请输入' } as InstanceType<typeof ElInput>
  })
})
const queryParams = reactive(Object.keys(formItems).reduce((params, key) => Object.assign(params, { [key]: formItems[key]?.value }), {})) as {
  [key: string]: any
}
onMounted(() => {
  API_BASE.getSourceList().then(({ data }) => {
    formItems.source.optionMap = markRaw(
      (data || []).reduce((map, item) => {
        map[item.source] = item.source
        return map
      }, {} as { [key: string]: string })
    )
    formItems.source.value = data[0]?.source
    formItems.source.defaultValue = data[0]?.source
    handleSubmitForm()
    if (formItems.source.attrs) {
      formItems.source.attrs.loading = false
    }
  })
})
const { getList, init, handleRefresh, list, errorHint, errorVisible, loading, loadingRefresh } = normalListRepositoriess({
  apiFunction: API_BASE.getReport,
  apiParams: computed(() => ({
    source: queryParams.source,
    status: queryParams.status,
    id: queryParams.id
  }))
})

function handleResetForm() {
  dynamicForm.value?.form?.resetFields()
  Object.keys(formItems).forEach((key) => {
    formItems[key].value = cloneDeep(formItems[key].defaultValue)
    queryParams[key] = cloneDeep(formItems[key].defaultValue)
  })
}
function handleSubmitForm() {
  // console.log('handleSubmitForm :>> ', e)
  Object.keys(formItems).forEach((key) => {
    queryParams[key] = formItems[key]?.value
  })
  // queryParams = Object.keys(formItems).reduce((params, key) => Object.assign(params, { [key]: formItems[key]?.value }), {})
}
async function handleChangeStatus(row: any) {
  try {
    const { value } = await ElMessageBox.prompt(`修改ID:${row?.id}的status为`, '编辑', {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      inputPattern: /^[0-9]*$/,
      inputErrorMessage: '请输入数字',
      inputValue: row.status
    })
    const res = await API_BASE.changeIDStatus({
      params: {
        id: row?.id,
        status: value
      }
    })
    ElMessage({
      type: 'success',
      message: `${res.data.message}`
    })
    getList()
  } catch (error) {}
}
</script>
<style lang="scss" scoped></style>
