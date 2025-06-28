<template>
  <!-- Buildings Table -->
  <div class="card">
    <div class="card-header">
        <h5 class="mb-0">
            <i class="fas fa-list me-2"></i>
            Danh sách tòa nhà
        </h5>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-striped table-hover">
                <thead class="table-dark">
                    <tr>
                        <th>STT</th>
                        <th>Tên tòa nhà</th>
                        <th>Địa chỉ</th>
                        <th>Người đại diện</th>
                        <th>Số điện thoại</th>
                        <th>CCCD</th>
                        <th>Ngày cấp CCCD</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="props.filteredBuildings.length === 0">
                        <td colspan="8" class="text-center text-muted py-4">
                            <i class="fas fa-inbox fa-3x mb-3 d-block"></i>
                            Không có dữ liệu tòa nhà
                        </td>
                    </tr>
                    <tr v-else v-for="(building, index) in props.filteredBuildings" :key="building.id">
                        <td>{{ index + 1 }}</td>
                        <td>
                            <strong>{{ building.name }}</strong>
                        </td>
                        <td>{{ building.address }}</td>
                        <td>{{ building.representative }}</td>
                        <td>
                            <a :href="'tel:' + building.phone" class="text-decoration-none">
                                {{ building.phone }}
                            </a>
                        </td>
                        <td>{{ building.cccd }}</td>
                        <td>{{ formatDate(building.cccdDate) }}</td>
                        <td>
                            <div class="btn-group" role="group">
                                <button 
                                    class="btn btn-sm btn-outline-primary"
                                    @click="emit('edit', building)"
                                    title="Chỉnh sửa"
                                >
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button 
                                    class="btn btn-sm btn-outline-danger"
                                    @click="emit('delete', building)"
                                    title="Xóa"
                                >
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  filteredBuildings: Array
})

const emit = defineEmits(['edit', 'delete'])
</script>