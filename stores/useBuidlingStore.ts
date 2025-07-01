// composables/useBuildingStore.ts
import { defineStore } from 'pinia'
export const useBuildingStore = defineStore('building', () => {
  const buildings = ref([])

  const fetchData = async () => {
    const { data } = await useFetch('/api/buildings')
    buildings.value = data.value
  }

  const createBuilding = async (buildingData) => {
    try {
      const data = await $fetch('/api/buildings', {
        method: 'POST',
        body: buildingData
      }) 
      // fetchData()
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
      // fetchData()
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
      // fetchData()
      buildings.value = data
      return { success: true, message: 'Xóa tòa nhà thành công' }
    } catch (err) {
      throw Error('Có lỗi! Không thể xóa tòa nhà')
    }
  }

  const totalBuildings = computed(() => buildings.value.length)

  fetchData()

  return {
    buildings,
    
    // Computed
    totalBuildings,
    
    // Methods
    createBuilding,
    updateBuilding,
    deleteBuilding,
  }

})