<!-- SCRIPT -->
<script setup>
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

// Data
const buildingStore = useBuildingStore();
let buildingModal = null;
const currentBuilding = ref({
    id: null,
    name: '',
    address: '',
    representative: '',
    phone: '',
    cccd: '',
    cccdDate: ''
});

const errors = ref({});

const saveBuilding = () => {
    if (!validateForm()) return;
    
    if (props.isEditing) {
        buildingStore.updateBuilding(currentBuilding.value)
    } else {
        buildingStore.addBuilding(currentBuilding.value);
    }
    emit('close');
};

const validateForm = () => {
    errors.value = {};

    if (!currentBuilding.value.name.trim()) {
        errors.value.name = 'Tên tòa nhà không được để trống';
    }

    if (!currentBuilding.value.address.trim()) {
        errors.value.address = 'Địa chỉ không được để trống';
    }

    if (!currentBuilding.value.representative.trim()) {
        errors.value.representative = 'Tên người đại diện không được để trống';
    }

    if (!currentBuilding.value.phone.trim()) {
        errors.value.phone = 'Số điện thoại không được để trống';
    } else if (!/^(0[3|5|7|8|9])+([0-9]{8})$/.test(currentBuilding.value.phone)) {
        errors.value.phone = 'Số điện thoại không hợp lệ';
    }

    if (!currentBuilding.value.cccd.trim()) {
        errors.value.cccd = 'Số CCCD không được để trống';
    } else if (!/^\d{12}$/.test(currentBuilding.value.cccd)) {
        errors.value.cccd = 'Số CCCD phải có 12 chữ số';
    }

    if (!currentBuilding.value.cccdDate) {
        errors.value.cccdDate = 'Ngày cấp CCCD không được để trống';
    } else if (new Date(currentBuilding.value.cccdDate) > new Date()) {
        errors.value.cccdDate = 'Ngày cấp CCCD không được lớn hơn ngày hiện tại';
    }

    return Object.keys(errors.value).length === 0;
};


watch(() => props.visible, (newVisible) => {
    if (newVisible) {
        currentBuilding.value = {...props.currentBuilding};
        buildingModal.show();
    } else {
        buildingModal.hide();
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
    document.getElementById('buildingModal').addEventListener('hidden.bs.modal', () => {
        currentBuilding.value = {
            id: null,
            name: '',
            address: '',
            representative: '',
            phone: '',
            cccd: '',
            cccdDate: ''
        };
        errors.value = {}; 
        emit('close');
    });
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
                                    v-model="currentBuilding.name"
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
                                    v-model="currentBuilding.address"
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
                                    v-model="currentBuilding.representative"
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
                                    v-model="currentBuilding.phone"
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
                                    v-model="currentBuilding.cccd"
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
                                    v-model="currentBuilding.cccdDate"
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