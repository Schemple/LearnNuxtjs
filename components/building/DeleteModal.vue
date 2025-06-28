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
})

// Data
const buildingStore = useBuildingStore();
let deleteModal = null;

const errors = ref({});

const deleteBuilding = async () => {
    try {
        await buildingStore.deleteBuilding(props.currentBuilding.id);
        emit('close');
    } catch (error) {
        console.log("Có lỗi xảy ra khi xóa tòa nhà:", error);
    }
};

watch(() => props.visible, (newVisible) => {
    if (newVisible) {
        deleteModal.show();
    } else {
        deleteModal.hide();
    }
})

onMounted(() => {
    if (process.client) {
        import('bootstrap').then((bootstrap) => {
            const modalElement = document.getElementById('deleteModal');
            deleteModal = new bootstrap.Modal(modalElement);
            
            modalElement.addEventListener('shown.bs.modal', () => {
                // Set focus to the first input or button inside the modal
                modalElement.querySelector('input, button').focus();
            });
        });
    }
})
</script>
<!-- HTML -->
<template>
<div class="modal fade" id="deleteModal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title">
          <i class="fas fa-exclamation-triangle me-2"></i>
          Xác nhận xóa
        </h5>
        <button type="button" class="btn-close btn-close-white" @click="emit('close')"></button>
      </div>
      <div class="modal-body">
        <p>Bạn có chắc chắn muốn xóa tòa nhà <strong>{{ props.currentBuilding?.name }}</strong>?</p>
        <p class="text-muted">Hành động này không thể hoàn tác.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" @click="emit('close')">
            <i class="fas fa-times me-1"></i>
            Hủy
        </button>
        <button type="button" class="btn btn-danger" @click="deleteBuilding">
            <i class="fas fa-trash me-1"></i>
            Xóa
        </button>
      </div>
    </div>
  </div>
</div>
</template>
<!-- STYLE -->
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