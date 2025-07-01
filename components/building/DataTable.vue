<script setup lang="ts">
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-bs5'

DataTable.use(DataTablesCore);
const props = defineProps({
    buildings: {
        type: Array,
        required: true
    }
})
const emit = defineEmits(['edit', 'delete'])
const options = {
    searching: true,
    searchDelay: 500,
    language: {
        search: "Tìm kiếm:",
        searchPlaceholder: "Nhập từ khóa..."
    },
    paging: false,
    info: false,
}

const columns = [
    { title: 'ID', data: 'id' },
    { title: 'Tên tòa nhà', data: 'name' },
    { title: 'Địa chỉ', data: 'address' },
    { title: 'Đại diện', data: 'representative' },
    { title: 'Số điện thoại', data: 'phone' },
    { title: 'CCCD', data: 'cccd' },
    { title: 'Ngày cấp CCCD', data: 'cccdDate' },
    { data: null, render: '#action', title: 'Hành động' },
]

const handleEdit = async (building) => {
    emit('edit', building)
}

const handleDelete = async (building) => {
    emit('delete', building)
}
</script>

<template>
<DataTable 
    :columns="columns" 
    :data="props.buildings" 
    class="table table-striped table-hover"
    :options="options"
>
    <template #action="props">
      <BuildingButton
        :text="`Chỉnh sửa`"
        :class="'btn btn-primary me-2 w-100'"
        @click="handleEdit(props.rowData)"
      />
      <BuildingButton
        :text="`Xóa`"
        :class="'btn btn-danger w-100'"
        @click="handleDelete(props.rowData)"
      />
    </template>
</DataTable>
</template>

<style scoped>
@import 'datatables.net-bs5';
</style>