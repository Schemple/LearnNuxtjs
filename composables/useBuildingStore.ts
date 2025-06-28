// composables/useBuildingStore.ts
let globalBuildingStore = null

export const useBuildingStore = () => {
  if (globalBuildingStore) {
    return globalBuildingStore
  }

  const buildings = ref([])
  const loading = ref(false)
  const error = ref(null)

  const initializeData = () => {
    if (process.client) {
      try {
        const saved = localStorage.getItem('buildings')
        if (saved) {
          buildings.value = JSON.parse(saved)
        } else {
          loadSampleData()
        }
      } catch (err) {
        console.error('Error loading buildings:', err)
        error.value = 'Không thể tải dữ liệu tòa nhà'
        loadSampleData()
      }
    }
  }

  const saveBuildings = () => {
    if (process.client) {
      try {
        localStorage.setItem('buildings', JSON.stringify(buildings.value))
      } catch (err) {
        console.error('Error saving buildings:', err)
        error.value = 'Không thể lưu dữ liệu'
      }
    }
  }

  const loadSampleData = () => {
    buildings.value = [
      {
        id: generateId(),
        name: 'Tòa nhà Lotte Center',
        address: '54 Liễu Giai, Ba Đình, Hà Nội',
        representative: 'Nguyễn Văn An',
        phone: '0987654321',
        cccd: '001234567890',
        cccdDate: '2020-01-15'
      },
      {
        id: generateId(),
        name: 'Keangnam Landmark 72',
        address: 'Phạm Hùng, Nam Từ Liêm, Hà Nội',
        representative: 'Trần Thị Bình',
        phone: '0912345678',
        cccd: '001234567891',
        cccdDate: '2019-05-20'
      },
      {
        id: generateId(),
        name: 'Vincom Metropolis',
        address: '29 Liễu Giai, Ba Đình, Hà Nội',
        representative: 'Lê Minh Cường',
        phone: '0945678912',
        cccd: '001234567892',
        cccdDate: '2021-03-10'
      },
    ]
    saveBuildings()
  }

  const addBuilding = async (buildingData) => {
    loading.value = true
    error.value = null
    
    try {
      const newBuilding = {
        ...buildingData,
        id: generateId()
      }
      
      buildings.value.push(newBuilding)
      saveBuildings()
      
      return { success: true, data: newBuilding }
    } catch (err) {
      error.value = 'Không thể thêm tòa nhà mới'
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const updateBuilding = async (updatedBuilding) => {
    loading.value = true
    error.value = null
    try {
      const index = buildings.value.findIndex(b => b.id === updatedBuilding.id)
      if (index === -1) {
        throw new Error('Không tìm thấy tòa nhà')
      }
      
      buildings.value[index] = { ...updatedBuilding }
      saveBuildings()
      
      return { success: true, data: updatedBuilding }
    } catch (err) {
      error.value = 'Không thể cập nhật thông tin tòa nhà'
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const deleteBuilding = async (buildingId) => {
    loading.value = true
    error.value = null
    
    try {
      const index = buildings.value.findIndex(b => b.id === buildingId)
      
      if (index === -1) {
        throw new Error('Không tìm thấy tòa nhà')
      }
      
      const deletedBuilding = buildings.value[index]
      buildings.value.splice(index, 1)
      saveBuildings()
      
      return { success: true, data: deletedBuilding }
    } catch (err) {
      error.value = 'Không thể xóa tòa nhà'
      return { success: false, error: err.message }
    } finally {
      loading.value = false
    }
  }

  const generateId = () => {
    return Date.now() + Math.random().toString(36).substr(2, 9)
  }

  const totalBuildings = computed(() => buildings.value.length)

  initializeData()

  globalBuildingStore = {
    buildings,
    loading: readonly(loading),
    error: readonly(error),
    
    // Computed
    totalBuildings,
    
    // Methods
    addBuilding,
    updateBuilding,
    deleteBuilding,
    loadSampleData,
    initializeData
  }

  return globalBuildingStore
}