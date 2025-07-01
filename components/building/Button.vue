<script setup lang="ts">
const emit = defineEmits(['click'])
const props = defineProps({
    text: {
        type: String,
        default: 'Nút'
    },
    class: {
        type: String,
        default: ''
    }
})
</script>

<template>
    <button 
        @click="emit('click')"
        :class="class"
    >
        {{ text }}
    </button>
</template>