<template>
<div class="container">
    <!-- Statistics Cards -->
    <div class="row mb-4 align-items-center justify-content-end">
        <div class="col-md-4">
            <div class="card text-white bg-info">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h4 class="card-title">{{ buildingStore.totalBuildings }}</h4>
                            <p class="card-text">Tổng số tòa nhà</p>
                        </div>
                        <div class="align-self-center">
                            <i class="fas fa-building fa-2x"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card text-white bg-success">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h4 class="card-title">{{ getCurrentDate() }}</h4>
                            <p class="card-text">Ngày cập nhật</p>
                        </div>
                        <div class="align-self-center">
                            <i class="fas fa-calendar fa-2x"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Search Button -->
    <div class="row mb-4 justify-content-end">
      <div class="col-md-2">
          <button 
              class="btn btn-success w-100 align-right"
              @click="openAddModal"
          >
              <i class="fas fa-plus me-2"></i>
              Thêm tòa nhà mới
          </button>
      </div>
    </div>

    <BuildingDataTable
    :buildings="buildingStore.buildings"
    @edit="openEditModal"
    @delete="deleteBuilding"
    />
</div>

<BuildingAddModal
  :visible="buildingModalVisible"
  :currentBuilding="currentBuilding"
  :isEditing="isEditing"
  @close="closeModal"
/>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  // const { start, finish } = useLoadingIndicator();
  // Reactive data
  const alert = useAlert();
  const buildingStore = useBuildingStore();
  const currentBuilding = ref({
      id: null,
      name: '',
      address: '',
      representative: '',
      phone: '',
      cccd: '',
      cccdDate: ''
  });
  const isEditing = ref(false);
  const buildingToDelete = ref(null);

  // Modal instances
  let buildingModalVisible = ref(false);

  // Methods
  const openAddModal = () => {
    isEditing.value = false;
    buildingModalVisible.value = true;
  };

  const openEditModal = (building) => {
    currentBuilding.value = { ...building };
    isEditing.value = true;
    buildingModalVisible.value = true;
  };

  const deleteBuilding = async (building) => {
    const result = await alert.confirmDelete(building.name);
    if (result.isConfirmed) {
      try {
        await buildingStore.deleteBuilding(building.id);
        alert.showSuccessAlert(`Xóa tòa nhà ${building.name} thành công`)
      } catch (err) {
        const message = err.messag || "Có lỗi xảy ra khi xóa tòa nhà"
        alert.showErrorAlert(message);
      }
    }
  }
  
  const closeModal = () => {
    currentBuilding.value = {
      id: null,
      name: '',
      address: '',
      representative: '',
      phone: '',
      cccd: '',
      cccdDate: ''
    };
    buildingModalVisible.value = false;
  };

</script>

<style lang="scss" scoped>
  body {
    background-color: #f8f9fa;
  }
  
  .card {
    box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
    border: 1px solid rgba(0, 0, 0, 0.125);
  }
  
  .table {
    th {
      border-top: none;
      font-weight: 600;
    }
  }
  
  .btn-group .btn {
    margin-right: 2px;
  }
  
  .btn-group .btn:last-child {
    margin-right: 0;
  }

  .modal-header {
    border-bottom: 1px solid #dee2e6;
  }
  
  .modal-footer {
    border-top: 1px solid #dee2e6;
  }
  
  .form-label {
    font-weight: 500;
  }
  
  .text-danger {
    color: #dc3545 !important;
  }
  
  .navbar-brand {
    font-weight: 600;
  }
  
  .card-title {
    margin-bottom: 0;
  }
  
  .table-responsive {
    border-radius: 0.375rem;
  }
</style>