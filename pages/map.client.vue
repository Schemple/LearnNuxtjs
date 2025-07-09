<template>
<div class="card">
    <div class="h-160 w-full">
        <ClientOnly>
            <LMap
                ref="map"
                :zoom="6"
                :max-zoom="18"
                :center="[21.0285, 105.8542]"
                :use-global-leaflet="false"
                @click="onMapClick"
            >
                <LTileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&amp;copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors"
                layer-type="base"
                name="OpenStreetMap"
                />
                <LMarker
                    v-if="marker"
                    :lat-lng="marker.getLatLng()"
                    draggable
                    @dragend="onMarkerDragEnd"
                >
                    <LPopup>
                        <div class="popup-content">
                            <h4><strong>Vị trí đã chọn</strong></h4>
                            <p>Kinh độ: {{ formatDMS(marker.getLatLng().lng) }}</p>
                            <p>Vĩ độ: {{ formatDMS(marker.getLatLng().lat) }}</p>
                            <Button
                                label="Xóa đánh dấu"
                                class="p-button-secondary mb-2"
                                @click="marker = null"
                                :pt="{ 
                                    root: { class: 'w-full' }
                                }"
                            />
                            <Button
                                label="Thêm tòa nhà"
                                class="p-button-primary"
                                @click="onMapAdd"
                                :pt="{ 
                                    root: { class: 'w-full' }  
                                }"
                            />
                        </div>
                    </LPopup>
                </LMarker>
                <LMarker
                    v-for="building in buildings"
                    :key="building.id"
                    :lat-lng="[building.latitude, building.longtitude]"
                    >
                    <LPopup>
                        <div class="popup-content">
                            <h4><strong>{{ building.name }}</strong></h4>
                            <p>{{ building.address }}</p>
                            <p>Kinh độ: {{ formatDMS(building.longtitude) }}</p>
                            <p>Vĩ độ: {{ formatDMS(building.latitude) }}</p>
                            <Button 
                                label="Xóa tòa nhà" 
                                class="p-button-danger"
                                @click="deleteBuilding(building)"
                                :pt="{ 
                                    root: { class: 'w-full' }
                                }"
                            />
                        </div>
                    </LPopup>
                </LMarker>
            </LMap>
        </ClientOnly>
    </div>
</div>

<Dialog 
    v-model:visible="overlayVisible" 
    maximizable
    modal
    header="Thêm tòa nhà"
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
            <Button type="button" label="Thêm tòa nhà" @click.prevent="saveBuilding"></Button>
        </div>
    </template>
</Dialog>
</template>

<script setup lang="ts"> 
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import L from 'leaflet';

interface Building {
  id: number;
  name: string;
  address: string;
  representative: string;
  phone: string;
  cccd: string;
  cccdDate: string;
  longtitude: number;
  latitude: number;
}

const config = useRuntimeConfig();
const apiBase = config.public.apiBase ;
const alert = useAlert();

const map = ref(null)

const marker = ref<L.Marker | null>(null)
const onMapClick = (e: L.LeafletMouseEvent) => {
  const { lat, lng } = e.latlng

  if (marker.value) {
    marker.value.setLatLng([lat, lng])
  } else {
    marker.value = L.marker([lat, lng])
  }
}

const onMarkerDragEnd = (e: L.DragEndEvent) => {
  const { lat, lng } = e.target.getLatLng()
  marker.value?.setLatLng([lat, lng])
}

const onMapAdd = () => {
  if (marker.value) {
    setValues({
        name: '',
        address: '',
        representative: '',
        phone: '',
        cccd: '',
        cccdDate: '',
        latitude: marker.value.getLatLng().lat,
        longtitude: marker.value.getLatLng().lng
    });
    overlayVisible.value = true
    marker.value = null
  }
}

const overlayVisible = ref(false);

const { data: buildings } = await useFetch<Building[]>(apiBase + 'building', {
    default: () => [],
});

const schema = yup.object({
  name: yup.string().required('Tên tòa nhà không được để trống').max(100, 'Tên tòa nhà không được vượt quá 100 ký tự'),
  address: yup.string().required('Địa chỉ không được để trống').max(255, 'Địa chỉ không được vượt quá 255 ký tự'),
  representative: yup.string().required('Tên người đại diện không được để trống').max(100, 'Tên người đại diện không được vượt quá 100 ký tự'),
  phone: yup
    .string()
    .required('Số điện thoại không được để trống')
    .matches(/^(0|\+84)(3|5|7|8|9)+([0-9]{8})$/, 'Số điện thoại không hợp lệ').max(12, 'Số điện thoại không được vượt quá 12 ký tự'),
  cccd: yup
    .string()
    .required('Số CCCD không được để trống')
    .matches(/^\d{9}$|^\d{12}$/, 'Số CCCD phải có 9 hoặc 12 chữ số'),
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

const { value: name } = useField('name');
const { value: address } = useField('address');
const { value: representative } = useField('representative');
const { value: phone } = useField('phone');
const { value: cccd } = useField('cccd');
const { value: cccdDate } = useField('cccdDate');
const { value: longtitude } = useField('longtitude')
const { value: latitude } = useField('latitude')

const saveBuilding = handleSubmit(async (values) => {
    try {
        const response = await $fetch(apiBase + 'building', {
            method: 'POST',
            body: values,
        });

        buildings.value.push(response);
        resetForm();
        alert.showSuccessAlert('Thêm tòa nhà thành công');
        overlayVisible.value = false;
    } catch (error) {
        alert.showErrorAlert('Lỗi khi thêm tòa nhà');
    }
});

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
</script>