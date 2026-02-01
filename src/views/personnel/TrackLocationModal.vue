<template>
  <!-- Bootstrap Modal -->
  <div
    class="modal fade"
    :class="{ show: isVisible }"
    :style="{ display: isVisible ? 'block' : 'none' }"
    tabindex="-1"
    @click.self="closeModal"
  >
    <div class="modal-dialog modal-dialog-centered modal-xl">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header border-0">
          <div>
            <h5 class="modal-title fw-bold">
              <i class="bi bi-geo-alt me-2"></i>Track Location
            </h5>
            <small class="text-muted" v-if="personnel">{{ personnel.name }}</small>
          </div>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body p-0" v-if="personnel">
          <div class="row g-0">
            <!-- Map Section -->
            <div class="col-lg-8">
              <div class="map-container bg-light position-relative">
                <!-- Map Placeholder -->
                <div class="d-flex align-items-center justify-content-center h-100">
                  <div class="text-center">
                    <i class="bi bi-map fs-1 text-muted"></i>
                    <p class="text-muted mt-2">
                      Map Integration - Google Maps / Leaflet
                    </p>
                    <div class="position-relative d-inline-block">
                      <!-- Demo: Personnel Location Marker -->
                      <div class="location-marker pulsing">
                        <div
                          class="rounded-circle text-white d-flex align-items-center justify-content-center"
                          :class="getAvatarColor()"
                          style="width: 50px; height: 50px; font-size: 1.25rem; font-weight: 600"
                        >
                          {{ personnel.name.charAt(0) }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Map Controls -->
                <div class="position-absolute top-0 end-0 m-3">
                  <div class="btn-group-vertical shadow-sm">
                    <button class="btn btn-light btn-sm">
                      <i class="bi bi-plus"></i>
                    </button>
                    <button class="btn btn-light btn-sm">
                      <i class="bi bi-dash"></i>
                    </button>
                    <button class="btn btn-light btn-sm">
                      <i class="bi bi-crosshair"></i>
                    </button>
                  </div>
                </div>

                <!-- Current Location Badge -->
                <div class="position-absolute bottom-0 start-0 m-3 bg-white rounded p-2 shadow-sm">
                  <div class="d-flex align-items-center gap-2">
                    <div class="status-indicator bg-success"></div>
                    <small class="fw-semibold">Live Location</small>
                    <small class="text-muted">Updated: {{ locationData.lastUpdate }}</small>
                  </div>
                </div>
              </div>
            </div>

            <!-- Info Panel -->
            <div class="col-lg-4 bg-light">
              <div class="p-4">
                <!-- Personnel Info -->
                <div class="d-flex align-items-center mb-4">
                  <div
                    class="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
                    :class="getAvatarColor()"
                    style="width: 50px; height: 50px; font-size: 1.25rem; font-weight: 600"
                  >
                    {{ personnel.name.charAt(0) }}
                  </div>
                  <div>
                    <h6 class="mb-0 fw-semibold">{{ personnel.name }}</h6>
                    <small class="text-muted">{{ personnel.company || personnel.role || personnel.type }}</small>
                  </div>
                </div>

                <!-- Location Details -->
                <div class="mb-4">
                  <h6 class="fw-semibold mb-3">
                    <i class="bi bi-info-circle me-2"></i>Location Details
                  </h6>
                  <div class="bg-white rounded p-3 mb-3">
                    <div class="row g-2">
                      <div class="col-12">
                        <small class="text-muted d-block">Current Zone</small>
                        <span class="badge bg-info-subtle text-info">
                          {{ personnel.zone }}
                        </span>
                      </div>
                      <div class="col-6">
                        <small class="text-muted d-block">Latitude</small>
                        <strong class="small">{{ locationData.latitude }}</strong>
                      </div>
                      <div class="col-6">
                        <small class="text-muted d-block">Longitude</small>
                        <strong class="small">{{ locationData.longitude }}</strong>
                      </div>
                      <div class="col-6">
                        <small class="text-muted d-block">Accuracy</small>
                        <strong class="small">{{ locationData.accuracy }}</strong>
                      </div>
                      <div class="col-6">
                        <small class="text-muted d-block">Speed</small>
                        <strong class="small">{{ locationData.speed }}</strong>
                      </div>
                    </div>
                  </div>

                  <div class="bg-white rounded p-3">
                    <small class="text-muted d-block mb-1">Address</small>
                    <p class="mb-0 small">{{ locationData.address }}</p>
                  </div>
                </div>

                <!-- Movement History -->
                <div class="mb-4">
                  <h6 class="fw-semibold mb-3">
                    <i class="bi bi-clock-history me-2"></i>Recent Movement
                  </h6>
                  <div class="movement-timeline">
                    <div
                      v-for="(movement, index) in movementHistory"
                      :key="index"
                      class="movement-item"
                    >
                      <div class="movement-marker">
                        <div class="marker-dot bg-primary"></div>
                      </div>
                      <div class="movement-content">
                        <small class="fw-semibold d-block">{{ movement.zone }}</small>
                        <small class="text-muted">{{ movement.time }}</small>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Actions -->
                <div class="d-grid gap-2">
                  <button class="btn btn-primary" @click="refreshLocation">
                    <i class="bi bi-arrow-clockwise me-1"></i>Refresh Location
                  </button>
                  <button class="btn btn-outline-secondary" @click="exportRoute">
                    <i class="bi bi-download me-1"></i>Export Route
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Backdrop -->
  <div
    class="modal-backdrop fade"
    :class="{ show: isVisible }"
    v-if="isVisible"
  ></div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

// Props
interface Props {
  show: boolean;
  personnel: any | null;
  personnelType: "contractor" | "staff" | "visitor";
}

const props = defineProps<Props>();

// Emits
const emit = defineEmits<{
  close: [];
}>();

// Local state
const isVisible = ref(false);

// Watch for show prop changes
watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }
);

// Mock location data
const locationData = ref({
  latitude: "3.1390° N",
  longitude: "101.6869° E",
  accuracy: "±5m",
  speed: "0 km/h",
  address: "Jalan Ampang, Kuala Lumpur, Malaysia",
  lastUpdate: "Just now",
});

// Mock movement history
const movementHistory = ref([
  { zone: "Zone A", time: "2 mins ago" },
  { zone: "Main Gate", time: "15 mins ago" },
  { zone: "Parking", time: "30 mins ago" },
  { zone: "Zone B", time: "1 hour ago" },
]);

// Methods
const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const refreshLocation = () => {
  console.log("Refreshing location...");
  locationData.value.lastUpdate = "Just now";
  // TODO: Fetch real-time location from API
};

const exportRoute = () => {
  console.log("Exporting route...");
  // TODO: Export route data as PDF/CSV
};

const getAvatarColor = () => {
  switch (props.personnelType) {
    case "contractor":
      return "bg-primary";
    case "staff":
      return "bg-success";
    case "visitor":
      return "bg-info";
    default:
      return "bg-secondary";
  }
};
</script>

<style scoped>
.map-container {
  height: 500px;
  width: 100%;
}

.location-marker {
  position: relative;
}

.location-marker.pulsing::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70px;
  height: 70px;
  background: rgba(13, 110, 253, 0.3);
  border-radius: 50%;
  animation: pulse-ring 2s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    transform: translate(-50%, -50%) scale(0.8);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) scale(1.5);
    opacity: 0;
  }
}

.status-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

/* Movement Timeline */
.movement-timeline {
  position: relative;
}

.movement-item {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 1rem;
  position: relative;
}

.movement-item:last-child {
  margin-bottom: 0;
}

.movement-marker {
  position: relative;
  width: 20px;
  display: flex;
  justify-content: center;
}

.movement-marker::before {
  content: "";
  position: absolute;
  top: 10px;
  bottom: -20px;
  left: 50%;
  width: 2px;
  background: #dee2e6;
  transform: translateX(-50%);
}

.movement-item:last-child .movement-marker::before {
  display: none;
}

.marker-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
}

.movement-content {
  flex: 1;
  padding-top: 2px;
}

.modal {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: block;
}

.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-backdrop.show {
  opacity: 0.5;
}

.modal-xl {
  max-width: 1200px;
}

.modal-content {
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.btn-group-vertical .btn {
  border-radius: 0;
}

.btn-group-vertical .btn:first-child {
  border-top-left-radius: 0.375rem;
  border-top-right-radius: 0.375rem;
}

.btn-group-vertical .btn:last-child {
  border-bottom-left-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}
</style>