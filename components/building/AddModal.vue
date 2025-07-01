<!-- SCRIPT -->
<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { ref, onMounted } from 'vue'

const emit = defineEmits(['close']);
const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    },
    currentBuilding: {
        type: Object,
        required: true
    },
    isEditing: {
        type: Boolean,
        required: true
    }
})
const alert = useAlert();
const buildingStore = useBuildingStore();
let buildingModal = null;

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


const saveBuilding = handleSubmit(async (values) => {
    try {
        if (props.isEditing) {
            await buildingStore.updateBuilding({ ...values, id: props.currentBuilding.id })
            alert.showSuccessAlert("Chỉnh sửa thông tin tòa nhà thành công");
        } else {
            await buildingStore.createBuilding(values)
            alert.showSuccessAlert("Thêm mới tòa nhà thành công");
        }
    } catch (err) {
        console.log(err)
        alert.showErrorAlert("Có lỗi xảy ra khi lưu tòa nhà");
    } finally {
        emit('close');
    }
});

watch(() => props.visible, (newVisible) => {
    if (newVisible) {
        setValues({ ...props.currentBuilding })
        buildingModal.show();
    } else {
        buildingModal.hide();
        resetForm()
    }
})

onMounted(() => {
    if (process.client) {
        import('bootstrap').then((bootstrap) => {
            const modalElement = document.getElementById('buildingModal');
            buildingModal = new bootstrap.Modal(modalElement);
            
            modalElement.addEventListener('shown.bs.modal', () => {
                // Set focus to the first input or button inside the modal
                modalElement.querySelector('input, button').focus();
            });
        });
    }
    // document.getElementById('buildingModal').addEventListener('hidden.bs.modal', () => {
    //     resetForm()
    //     errors.value = {}; 
    //     emit('close');
    // });
})
</script>
<!-- HTML -->
<template>
<div class="modal fade" id="buildingModal" tabindex="-1">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">
                    <i class="fas" :class="props.isEditing ? 'fa-edit' : 'fa-plus'"></i>
                    {{ props.isEditing ? 'Chỉnh sửa' : 'Thêm mới' }} tòa nhà
                </h5>
                <button type="button" class="btn-close" @click="emit('close')"></button>
            </div>
            <div class="modal-body">
                <form @submit.prevent="saveBuilding">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fas fa-building me-1"></i>
                                    Tên tòa nhà <span class="text-danger">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    v-model="name"
                                    :class="{ 'is-invalid': errors.name }"
                                    placeholder="Nhập tên tòa nhà"
                                    required
                                >
                                <div class="invalid-feedback" v-if="errors.name">
                                    {{ errors.name }}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fas fa-map-marker-alt me-1"></i>
                                    Địa chỉ <span class="text-danger">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    v-model="address"
                                    :class="{ 'is-invalid': errors.address }"
                                    placeholder="Nhập địa chỉ tòa nhà"
                                    required
                                >
                                <div class="invalid-feedback" v-if="errors.address">
                                    {{ errors.address }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fas fa-user me-1"></i>
                                    Người đại diện <span class="text-danger">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    v-model="representative"
                                    :class="{ 'is-invalid': errors.representative }"
                                    placeholder="Nhập tên người đại diện"
                                    required
                                >
                                <div class="invalid-feedback" v-if="errors.representative">
                                    {{ errors.representative }}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fas fa-phone me-1"></i>
                                    Số điện thoại <span class="text-danger">*</span>
                                </label>
                                <input 
                                    type="tel" 
                                    class="form-control"
                                    v-model="phone"
                                    :class="{ 'is-invalid': errors.phone }"
                                    placeholder="Nhập số điện thoại"
                                    required
                                >
                                <div class="invalid-feedback" v-if="errors.phone">
                                    {{ errors.phone }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fas fa-id-card me-1"></i>
                                    Số CCCD <span class="text-danger">*</span>
                                </label>
                                <input 
                                    type="text" 
                                    class="form-control"
                                    v-model="cccd"
                                    :class="{ 'is-invalid': errors.cccd }"
                                    placeholder="Nhập số CCCD"
                                    maxlength="12"
                                    required
                                >
                                <div class="invalid-feedback" v-if="errors.cccd">
                                    {{ errors.cccd }}
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="mb-3">
                                <label class="form-label">
                                    <i class="fas fa-calendar me-1"></i>
                                    Ngày cấp CCCD <span class="text-danger">*</span>
                                </label>
                                <input 
                                    type="date" 
                                    class="form-control"
                                    v-model="cccdDate"
                                    :class="{ 'is-invalid': errors.cccdDate }"
                                    :max="getCurrentDateString()"
                                    required
                                >
                                <div class="invalid-feedback" v-if="errors.cccdDate">
                                    {{ errors.cccdDate }}
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="emit('close')">
                    <i class="fas fa-times me-1"></i>
                    Hủy
                </button>
                <button type="button" class="btn btn-primary" @click="saveBuilding">
                    <i class="fas fa-save me-1"></i>
                    {{ props.isEditing ? 'Cập nhật' : 'Thêm mới' }}
                </button>
            </div>
        </div>
    </div>
</div>
</template>


<style scoped>
.modal-header {
background-color: #f8f9fa;
border-bottom: 1px solid #dee2e6;
}

.modal-footer {
background-color: #f8f9fa;
border-top: 1px solid #dee2e6;
}
</style>