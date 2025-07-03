<template>
<div class="container flex flex-col mx-auto px-4">
  <!-- Statistics Cards -->
  <div class="flex flex-col md:flex-row gap-4 mb-6 md:justify-end">
    <!-- Total Buildings Card -->
    <div class="md:w-1/3 lg:w-1/4">
      <div class="bg-blue-500 text-white rounded-lg shadow-md">
        <div class="p-6">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="text-2xl font-bold mb-1">{{ buildingCount }}</h4>
              <p class="text-blue-100 text-sm">Tổng số tòa nhà</p>
            </div>
            <div class="flex items-center">
              <i class="fas fa-building text-3xl text-blue-200"></i>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Current Date Card -->
    <div class="md:w-1/3 lg:w-1/4">
      <div class="bg-green-500 text-white rounded-lg shadow-md">
        <div class="p-6">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="text-2xl font-bold mb-1">{{ getCurrentDate() }}</h4>
              <p class="text-green-100 text-sm">Ngày cập nhật</p>
            </div>
            <div class="flex items-center">
              <i class="fas fa-calendar text-3xl text-green-200"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Add Button -->
  <div class="flex justify-between mb-6">
    <div class="w-full md:w-auto">
      <InputGroup>
        <InputText v-model="search" placeholder="Tìm kiếm tòa nhà theo id, tên tòa nhà, người đại diện..." />
        <Button label="Tìm kiếm" @click="handleSearch"/>
      </InputGroup>
    </div>
    <div class="w-full md:w-auto">
      <Button label="Thêm tòa nhà mới" @click="openAddModal"/>
      <Dialog 
          v-model:visible="overlayVisible" 
          maximizable
          modal
          :header="title"
          :style="{ width: '50rem' }"
      >
          <span class="text-gray-500 dark:text-gray-400 block mb-8">
              Nhập thông tin tòa nhà
          </span>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Tên tòa nhà <span class="text-red-500">*</span>
                  </label>
                  <InputText 
                      v-model="name" 
                      :invalid="errors.name? true : false" 
                      class="flex-auto" 
                      autocomplete="off" 
                      :style="{ width: '100%' }"
                  />
                  <Message v-if="errors.name" severity="error" size="small" variant="simple">{{ errors?.name }}</Message>
              </div>
              <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Địa chỉ <span class="text-red-500">*</span>
                  </label>
                  <InputText 
                      v-model="address" 
                      :invalid="errors.address? true : false" 
                      class="flex-auto" 
                      autocomplete="off" 
                      :style="{ width: '100%' }" 
                  />
                  <Message v-if="errors.address" severity="error" size="small" variant="simple">{{ errors?.address }}</Message>
              </div>
              <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Đại diện <span class="text-red-500">*</span>
                  </label>
                  <InputText 
                      v-model="representative" 
                      :invalid="errors.representative? true : false" 
                      class="flex-auto" 
                      autocomplete="off" 
                      :style="{ width: '100%' }" 
                  />
                  <Message v-if="errors.representative" severity="error" size="small" variant="simple">{{ errors?.representative }}</Message>
              </div>
              <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Số điện thoại <span class="text-red-500">*</span>
                  </label>
                  <InputText 
                      v-model="phone" 
                      :invalid="errors.phone? true : false" 
                      class="flex-auto" 
                      autocomplete="off" 
                      :style="{ width: '100%' }" 
                  />
                  <Message v-if="errors.phone" severity="error" size="small" variant="simple">{{ errors?.phone }}</Message>
              </div>
              <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Số căn cước công dân <span class="text-red-500">*</span>
                  </label>
                  <InputText 
                      v-model="cccd" 
                      :invalid="errors.cccd? true : false" 
                      class="flex-auto" 
                      autocomplete="off"
                      :style="{ width: '100%' }"  
                  />
                  <Message v-if="errors.cccd" severity="error" size="small" variant="simple">{{ errors?.cccd }}</Message>
              </div>
              <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Ngày cấp <span class="text-red-500">*</span>
                  </label>
                  <DatePicker v-model="cccdDate" :style="{ width: '100%' }" showIcon fluid dateFormat="dd/mm/yy"/>
                  <Message v-if="errors.cccdDate" severity="error" size="small" variant="simple">{{ errors?.cccdDate }}</Message>
              </div>
              <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Kinh độ <span class="text-red-500">*</span>
                  </label>
                  <InputText 
                      v-model="longtitude" 
                      :invalid="errors.longtitude? true : false" 
                      class="flex-auto" 
                      autocomplete="off" 
                      :style="{ width: '100%' }" 
                  />
                  <Message v-if="errors.longtitude" severity="error" size="small" variant="simple">{{ errors?.longtitude }}</Message>
              </div>
              <div class="mb-6">
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                      Vĩ độ <span class="text-red-500">*</span>
                  </label>
                  <InputText 
                      v-model="latitude" 
                      :invalid="errors.latitude? true : false" 
                      class="flex-auto" 
                      autocomplete="off" 
                      :style="{ width: '100%' }" 
                  />
                  <Message v-if="errors.latitude" severity="error" size="small" variant="simple">{{ errors?.latitude }}</Message>
              </div>
          </div>
          <template #footer>
              <div class="flex justify-end gap-2">
                  <Button type="button" label="Hủy bỏ" severity="secondary" @click.prevent="overlayVisible=false"></Button>
                  <Button type="button" :label="buttonTitle" @click.prevent="saveBuilding"></Button>
              </div>
          </template>
      </Dialog>
    </div>
  </div>

  <!-- Data Table -->
  <!-- <BuildingDataTable
    :buildings="buildingStore.buildings"
    @edit="openEditModal"
    @delete="deleteBuilding"
  /> -->

  <DataTable :rows="4" :value="buildings" tableStyle="min-width: 50rem" paginator removableSort>
    <Column field="id" header="ID" sortable></Column>
    <Column field="name" header="Tên tòa nhà" sortable></Column>
    <Column field="address" header="Địa chỉ"></Column>
    <Column field="representative" header="Đại diện" sortable></Column>
    <Column field="phone" header="Số điện thoại"></Column>
    <Column field="cccd" header="Số căn cước"></Column>
    <Column header="Ngày cấp">
      <template #body="slotProps">
        {{ formatDate(slotProps.data.cccdDate) }}
      </template>
    </Column>
    <Column header="Action">
      <template #body="slotProps">
        <div class="flex flex-wrap gap-2 justify-center items-center">
          <Button 
            label="Chỉnh sửa" 
            severity="info" 
            @click.prevent="openEditModal(slotProps.data)"
          />
          <Button 
            label="Xóa" 
            severity="danger" 
            @click.prevent="deleteBuilding(slotProps.data)"
          />
        </div>
      </template>
    </Column>
  </DataTable>

  <div class="flex w-4/5 h-100 items-center mx-auto my-6">
    <LMap
      :zoom="6"
      :max-zoom="18"
      :center="[21.0285, 105.8542]"
      :use-global-leaflet="false"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker
        v-for="building in buildings"
        :key="building.id"
        :lat-lng="[building.latitude, building.longtitude]"
      >
        <LPopup>
          <div class="popup-content">
            <h4>{{ building.name }}</h4>
            <p>{{ building.address }}</p>
            <Button 
              label="Xem chi tiết" 
              size="small" 
              @click="openInfoModal(building)"
            />
          </div>
        </LPopup>
      </LMarker>
    </LMap>
  </div>
  <Dialog
    v-model:visible="infoDialogVisible"
    modal
    header="Thông tin tòa nhà"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Tên tòa nhà
        </label>
        <InputText 
            v-model="name" 
            class="flex-auto" 
            autocomplete="off" 
            :style="{ width: '100%' }"
            disabled
        />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Địa chỉ
        </label>
        <InputText 
            v-model="address" 
            class="flex-auto" 
            autocomplete="off" 
            :style="{ width: '100%' }"
            disabled
        />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Kinh độ
        </label>
        <InputText 
            v-model="longtitude" 
            class="flex-auto" 
            autocomplete="off" 
            :style="{ width: '100%' }"
            disabled
        />
      </div>
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
            Vĩ độ
        </label>
        <InputText 
            v-model="latitude" 
            class="flex-auto" 
            autocomplete="off" 
            :style="{ width: '100%' }"
            disabled
        />
      </div>
    </div>
  </Dialog>   
</div>
</template>

<script setup lang="ts">
  interface Building {
    id: number;
    name: string;
    address: string;
    representative: string;
    phone: string;
    cccd: string;
    cccdDate: Date;
    longtitude: number;
    latitude: number;
  }
  
  import { ref, computed, onMounted } from 'vue';
  import { useForm, useField } from 'vee-validate'
  import * as yup from 'yup'

  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase ;
  const buildings = ref<Building[]>([]);
  const buildingCount = ref(null);
  const alert = useAlert();
  const search = ref("");

  const map = ref(null)
  
  const overlayVisible = ref(false);
  const infoDialogVisible = ref(false)

  const isEditing = ref(false);
  const buttonTitle = ref("Thêm mới")
  const title = ref('Thêm mới tòa nhà')
  
  const schema = yup.object({
    name: yup.string().required('Tên tòa nhà không được để trống'),
    address: yup.string().required('Địa chỉ không được để trống'),
    representative: yup.string().required('Tên người đại diện không được để trống'),
    phone: yup
      .string()
      .required('Số điện thoại không được để trống')
      .matches(/^(0[3|5|7|8|9])+([0-9]{8})$/, 'Số điện thoại không hợp lệ'),
    cccd: yup
      .string()
      .required('Số CCCD không được để trống')
      .matches(/^\d{12}$/, 'Số CCCD phải có 12 chữ số'),
    cccdDate: yup
      .date()
      .typeError('Ngày cấp CCCD không hợp lệ')
      .required('Ngày cấp CCCD không được để trống')
      .max(new Date(), 'Ngày cấp CCCD không được lớn hơn ngày hiện tại'),
    longtitude: yup
      .string()
      .required('Kinh độ không được để trống')
      .matches(/^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/, 'Kinh độ không hợp lệ'),
    latitude: yup
      .string()
      .required('Vĩ độ không được để trống')
      .matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/, 'Vĩ độ không hợp lệ'),
  });

  const { handleSubmit, errors, resetForm, setValues } = useForm({
    validationSchema: schema,
  });

  const { value: id } = useField('id');
  const { value: name } = useField('name');
  const { value: address } = useField('address');
  const { value: representative } = useField('representative');
  const { value: phone } = useField('phone');
  const { value: cccd } = useField('cccd');
  const { value: cccdDate } = useField('cccdDate');
  const { value: longtitude } = useField('longtitude')
  const { value: latitude } = useField('latitude')

  // Methods
  const openAddModal = () => {
    resetForm();
    isEditing.value = false;
    buttonTitle.value = 'Thêm mới'
    title.value = 'Thêm mới tòa nhà'
    overlayVisible.value = true;
  };

  const openEditModal = (building: { [x: string]: any; }) => {
    setValues({...building})
    cccdDate.value = new Date(building.cccdDate);
    isEditing.value = true;
    buttonTitle.value = 'Cập nhật'
    title.value = 'Chỉnh sửa thông tin tòa nhà'
    overlayVisible.value = true;
  };

  const deleteBuilding = async (building: Building) => {
    const result = await alert.confirmDelete(building.name);
    if (result.isConfirmed) {
      try {
        const data = await $fetch(apiBase + `building/${building.id}`, {
          method: 'DELETE',
        })
        if (!data) {
          throw new Error("Không tìm thấy tòa nhà để xóa");
        }
        buildings.value = buildings.value.filter(b => b.id !== building.id);
        alert.showSuccessAlert(`Xóa tòa nhà ${building.name} thành công`)
      } catch (err) {
        let message = "Có lỗi xảy ra khi xóa tòa nhà"
        if (err && typeof err === "object" && "message" in err) {
          message = (err as { message: string }).message;
        }
        alert.showErrorAlert(message);
      }
    }
  }

  const saveBuilding = handleSubmit(async (values) => {
    try {
      if (isEditing.value) {
        const data = await $fetch(apiBase + `building/${id.value}`, {
          method: 'PUT',
          body: values
        })
        if (!data) {
          throw new Error("Không tìm thấy tòa nhà để cập nhật");
        }
        buildings.value = buildings.value.map(b => b.id === id.value ? data : b);
        alert.showSuccessAlert("Chỉnh sửa thông tin tòa nhà thành công");
      } else {
        const data = await $fetch(apiBase + 'building', {
          method: 'POST',
          body: values
        })
        buildings.value.push(data)
        alert.showSuccessAlert("Thêm mới tòa nhà thành công");
      }
    } catch (err) {
      alert.showErrorAlert("Có lỗi xảy ra khi lưu tòa nhà");
    } finally {
      resetForm()
      if (isEditing.value) isEditing.value = false;
      overlayVisible.value = false;
    }
  });

  const openInfoModal = (building: Building) => {
    name.value = building.name || ''
    address.value = building.address || ''
    longtitude.value = building.longtitude || ''
    latitude.value = building.latitude || ''
    infoDialogVisible.value = !infoDialogVisible.value;
  }

  const handleSearch = async () => {
    buildings.value = await fetchBuilding();
    if (!search.value) {
      return;
    }
    buildings.value = buildings.value.filter(building => {
      return (
        building.id.toString().includes(search.value) ||
        building.name.toLowerCase().includes(search.value.toLowerCase()) ||
        building.representative.toLowerCase().includes(search.value.toLowerCase()) ||
        building.address.toLowerCase().includes(search.value.toLowerCase()) ||
        building.phone.includes(search.value) ||
        building.cccd.includes(search.value) ||
        building.longtitude.toString().includes(search.value) ||
        building.latitude.toString().includes(search.value)
      );
    });
  }

  function formatDate(timestamp) {
      const date = new Date(timestamp);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${month}-${day}-${year}`;
  }

  function getCurrentDateString() {
    return new Date().toISOString().split('T')[0];
  };

  function getCurrentDate() {
    return new Date().toLocaleDateString('vi-VN');
  };

  const fetchBuilding = async () => {
    try {
      const data = await $fetch(apiBase + 'building');
      return data;
    } catch (err) {
      alert.showErrorAlert("Có lỗi xảy ra khi tải dữ liệu tòa nhà");
      return [];
    }
  }
  onMounted(async () => {
    try {
      const data = await fetchBuilding()
      buildings.value = data || [];
      console.log(data);
      buildingCount.value = buildings.value.length;
    } catch (err) {
      console.error(err);
      alert.showErrorAlert("Có lỗi xảy ra khi tải dữ liệu tòa nhà");
    }
  });
</script>

<style lang="scss" scoped>
</style>