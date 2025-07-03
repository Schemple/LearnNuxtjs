<script setup lang="ts">
import DataTable from 'datatables.net-vue3'
import DataTablesCore from 'datatables.net-dt'

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
        searchPlaceholder: "Nhập từ khóa...",
        emptyTable: "Không có dữ liệu",
        zeroRecords: "Không tìm thấy kết quả phù hợp",
        lengthMenu: "Hiển thị _MENU_ bản ghi",
        info: "Hiển thị _START_ đến _END_ của _TOTAL_ bản ghi",
        infoEmpty: "Hiển thị 0 đến 0 của 0 bản ghi",
        infoFiltered: "(lọc từ _MAX_ tổng số bản ghi)",
    },
    paging: false,
    info: false,
    // dom: '<"flex flex-col md:flex-row justify-between items-center mb-4"<"mb-2 md:mb-0"l><"relative"f>>rtip',
    initComplete: function() {
        // Customize search input
        const searchInput = document.querySelector('.dataTables_filter input');
        if (searchInput) {
            searchInput.className = 'px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm';
            searchInput.placeholder = 'Nhập từ khóa tìm kiếm...';
        }
        
        // Customize search label
        const searchLabel = document.querySelector('.dataTables_filter label');
        if (searchLabel) {
            searchLabel.className = 'flex items-center text-sm font-medium text-gray-700';
        }
    }
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
<div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
    <!-- Header -->
    <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h3 class="text-lg font-semibold text-gray-900">Danh sách tòa nhà</h3>
    </div>

    <!-- DataTable Container -->
    <div class="p-6">
        <DataTable
        :columns="columns"
        :data="props.buildings"
        class="custom-datatable w-full"
        :options="options"
        >
        <template #action="props">
            <div class="flex flex-col sm:flex-row gap-2 justify-center">
                <BuildingButton
                    :text="'Chỉnh sửa'"
                    :class="'inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded-md transition-colors duration-200'"
                    @click="handleEdit(props.rowData)"
                />
                <BuildingButton
                    :text="'Xóa'"
                    :class="'inline-flex items-center justify-center px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-1 rounded-md transition-colors duration-200'"
                    @click="handleDelete(props.rowData)"
                />
            </div>
        </template>
        </DataTable>
    </div>
</div>
</template>

<style scoped>
@import 'datatables.net-dt';
</style>