<script setup lang="ts">
import L from 'leaflet'

const emit = defineEmits(['add'])
const map = ref(null)

const props = defineProps<{
  buildings: Array<{
    id: number;
    name: string;
    address: string;
    representative: string;
    phone: string;
    cccd: string;
    cccdDate: string;
    latitude: number;
    longtitude: number;
  }>;
}>();

const marker = ref<L.Marker | null>(null)
const onMapClick = (e: L.LeafletMouseEvent) => {
  const { lat, lng } = e.latlng

  // Nếu đã có marker, di chuyển nó
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
    emit('add', {
        name: '',
        address: '',
        representative: '',
        phone: '',
        cccd: '',
        cccdDate: '',
        latitude: marker.value.getLatLng().lat,
        longtitude: marker.value.getLatLng().lng
    })
    marker.value = null
  }
}

</script>
<template>
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
                v-for="building in props.buildings"
                :key="building.id"
                :lat-lng="[building.latitude, building.longtitude]"
                >
                <LPopup>
                    <div class="popup-content">
                    <h4><strong>{{ building.name }}</strong></h4>
                    <p>{{ building.address }}</p>
                    <p>Kinh độ: {{ formatDMS(building.longtitude) }}</p>
                    <p>Vĩ độ: {{ formatDMS(building.latitude) }}</p>
                    </div>
                </LPopup>
            </LMarker>
        </LMap>
    </ClientOnly>
</template>