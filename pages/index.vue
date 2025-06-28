<template>
<div class="container">
    <!-- Search and Add Button -->
    <div class="row mb-4">
        <div class="col-md-8">
            <div class="input-group">
                <span class="input-group-text">
                    <i class="fas fa-search"></i>
                </span>
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Tìm kiếm theo tên tòa nhà, địa chỉ hoặc người đại diện..."
                    v-model="searchQuery"
                    @input="handleSearch"
                >
            </div>
        </div>
        <div class="col-md-4">
            <button 
                class="btn btn-success w-100"
                @click="openAddModal"
            >
                <i class="fas fa-plus me-2"></i>
                Thêm tòa nhà mới
            </button>
        </div>
    </div>

    <!-- Statistics Cards -->
    <div class="row mb-4">
        <div class="col-md-4">
            <div class="card text-white bg-info">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h4 class="card-title">{{ buildings.length }}</h4>
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
            <div class="card text-white bg-warning">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <div>
                            <h4 class="card-title">{{ filteredBuildings.length }}</h4>
                            <p class="card-text">Kết quả tìm kiếm</p>
                        </div>
                        <div class="align-self-center">
                            <i class="fas fa-search fa-2x"></i>
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

    <BuildingTable 
    :filteredBuildings="filteredBuildings" 
    @edit="openEditModal"
    @delete="openDeleteModal"
    />
</div>

<BuildingAddModal
  :visible="buildingModalVisible"
  :currentBuilding="currentBuilding"
  :isEditing="isEditing"
  @close="closeModal"
/>

<BuildingDeleteModal
  :visible="deleteModalVisible"
  :currentBuilding="currentBuilding"
  @close="closeModal"
/>
</template>

<script setup lang="ts">
  // Reactive data
  const buildingStore = useBuildingStore();
  const buildings = buildingStore.buildings; // Bỏ computed() vì buildings đã là reactive
  const searchQuery = ref('');
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
  let deleteModalVisible = ref(false);

  // Computed
  const filteredBuildings = computed(() => {
      if (!searchQuery.value) return buildings.value;
      
      const query = searchQuery.value.toLowerCase();
      return buildings.value.filter(building => 
          building.name.toLowerCase().includes(query) ||
          building.address.toLowerCase().includes(query) ||
          building.representative.toLowerCase().includes(query) ||
          building.phone.includes(query) ||
          building.cccd.includes(query)
      );
  });

  // Methods
  const openAddModal = () => {
    // currentBuilding.value = {
    //   id: null,
    //   name: '',
    //   address: '',
    //   representative: '',
    //   phone: '',
    //   cccd: '',
    //   cccdDate: ''
    // };
    isEditing.value = false;
    buildingModalVisible.value = true;
  };

  const openEditModal = (building) => {
    currentBuilding.value = { ...building };
    isEditing.value = true;
    buildingModalVisible.value = true;
  };

  const openDeleteModal = (building) => {
    currentBuilding.value = { ...building };
    deleteModalVisible.value = true;
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
    deleteModalVisible.value = false;
    buildingModalVisible.value = false;
  };

  const handleSearch = () => {
    //
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
  
  .table  {
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