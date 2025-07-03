// composables/useBuildingStore.ts
import { defineStore } from 'pinia'

export const useBuildingStore = defineStore('building', () => {
  const buildings = ref([])

  const fetchBuilding = async (search = null) => {
    try {
      const { data } = await useFetch('/api/buildings', {
        method: 'GET',
      })
      buildings.value = data.value
    } catch (err) {
      buildings.value = []
      throw Error('Có lỗi xảy ra khi lấy dữ liệu')
    }
  }

  const createBuilding = async (buildingData) => {
    try {
      const data = await $fetch('/api/buildings', {
        method: 'POST',
        body: buildingData
      }) 
      buildings.value = data
      return { success: true, message: 'Thêm tòa nhà thành công' }
    } catch (err) {
      throw Error('Có lỗi! Không thể thêm tòa nhà')
    }
  }

  const updateBuilding = async (updatedBuilding) => {
    try {
      const data = await $fetch(`/api/buildings/${updatedBuilding.id}`, {
        method: 'PUT',
        body: updatedBuilding
      })
      buildings.value = data
      return { success: true, message: 'Cập nhật thông tin tòa nhà thành công' }
    } catch (err) {
      // throw Error('Có lỗi! Không thể cập nhật thông tin tòa nhà')
      throw err
    }
  }

  const deleteBuilding = async (buildingId) => {
    try {
      const data = await $fetch(`/api/buildings/${buildingId}`, {
        method: 'DELETE',
      })
      buildings.value = data
      return { success: true, message: 'Xóa tòa nhà thành công' }
    } catch (err) {
      throw Error('Có lỗi! Không thể xóa tòa nhà')
    }
  }

  const totalBuildings = computed(() => buildings.value.length)

  // fetchBuilding()

  return {
    buildings,
    
    // Computed
    totalBuildings,
    
    // Methods
    fetchBuilding,
    createBuilding,
    updateBuilding,
    deleteBuilding,
  }

})