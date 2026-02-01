<template>
  <!-- Bootstrap Modal -->
  <div
    class="modal fade"
    :class="{ show: isVisible }"
    :style="{ display: isVisible ? 'block' : 'none' }"
    tabindex="-1"
    @click.self="closeModal"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header border-0">
          <h5 class="modal-title fw-bold">Personnel Details</h5>
          <button
            type="button"
            class="btn-close"
            @click="closeModal"
          ></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body" v-if="personnel">
          <!-- Profile Section -->
          <div class="d-flex align-items-center mb-4">
            <div
              class="rounded-circle text-white d-flex align-items-center justify-content-center me-3"
              :class="getAvatarColor()"
              style="width: 60px; height: 60px; font-size: 1.5rem; font-weight: 600"
            >
              {{ personnel.name.charAt(0) }}
            </div>
            <div>
              <h5 class="mb-1 fw-semibold">{{ personnel.name }}</h5>
              <p class="text-muted mb-0 small">
                {{ personnel.company || personnel.role || personnel.type }}
              </p>
              <span
                class="badge mt-1"
                :class="getStatusBadgeClass(personnel.status)"
              >
                {{ formatStatus(personnel.status) }}
              </span>
            </div>
          </div>

          <!-- Contact Information -->
          <div class="mb-4">
            <h6 class="fw-semibold mb-3">
              <i class="bi bi-telephone me-2"></i>Contact Information
            </h6>
            <div class="bg-light rounded p-3">
              <div class="row">
                <div class="col-md-6 mb-2">
                  <small class="text-muted d-block">Phone Number</small>
                  <strong>{{ personnel.phone }}</strong>
                </div>
                <div class="col-md-6 mb-2">
                  <small class="text-muted d-block">Email Address</small>
                  <strong>{{ personnel.email || 'N/A' }}</strong>
                </div>
                <div class="col-md-6" v-if="personnel.icNumber">
                  <small class="text-muted d-block">IC Number</small>
                  <strong>{{ personnel.icNumber }}</strong>
                </div>
                <div class="col-md-6" v-if="personnel.address">
                  <small class="text-muted d-block">Address</small>
                  <strong>{{ personnel.address }}</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- Work Information -->
          <div class="mb-4">
            <h6 class="fw-semibold mb-3">
              <i class="bi bi-briefcase me-2"></i>Work Information
            </h6>
            <div class="bg-light rounded p-3">
              <div class="row">
                <div class="col-md-6 mb-2">
                  <small class="text-muted d-block">Current Zone</small>
                  <span class="badge bg-info-subtle text-info">
                    {{ personnel.zone }}
                  </span>
                </div>
                <div class="col-md-6 mb-2" v-if="personnel.task">
                  <small class="text-muted d-block">Current Task</small>
                  <strong>{{ personnel.task }}</strong>
                </div>
                <div class="col-md-6 mb-2" v-if="personnel.purpose">
                  <small class="text-muted d-block">Purpose</small>
                  <strong>{{ personnel.purpose }}</strong>
                </div>
                <div class="col-md-6 mb-2" v-if="personnel.checkIn">
                  <small class="text-muted d-block">Check-In Time</small>
                  <strong>{{ personnel.checkIn }}</strong>
                </div>
                <div class="col-md-6 mb-2" v-if="personnel.entry">
                  <small class="text-muted d-block">Entry Time</small>
                  <strong>{{ personnel.entry }}</strong>
                </div>
                <div class="col-md-6 mb-2" v-if="personnel.duration">
                  <small class="text-muted d-block">Duration</small>
                  <strong>{{ personnel.duration }}</strong>
                </div>
                <div class="col-md-6 mb-2" v-if="personnel.validUntil">
                  <small class="text-muted d-block">Valid Until</small>
                  <strong>{{ personnel.validUntil }}</strong>
                </div>
                <div class="col-md-6 mb-2" v-if="personnel.shift">
                  <small class="text-muted d-block">Shift</small>
                  <strong>{{ personnel.shift }}</strong>
                </div>
                <div class="col-md-6 mb-2" v-if="personnel.department">
                  <small class="text-muted d-block">Department</small>
                  <strong>{{ personnel.department }}</strong>
                </div>
                <div class="col-md-6" v-if="personnel.vehicle">
                  <small class="text-muted d-block">Vehicle</small>
                  <strong>{{ personnel.vehicle }}</strong>
                </div>
              </div>
            </div>
          </div>

          <!-- GPS Location (if available) -->
          <div class="mb-4" v-if="personnel.gps">
            <h6 class="fw-semibold mb-3">
              <i class="bi bi-geo-alt me-2"></i>GPS Location
            </h6>
            <div class="bg-light rounded p-3">
              <div class="row">
                <div class="col-md-4 mb-2">
                  <small class="text-muted d-block">Latitude</small>
                  <strong>{{ personnel.gps.latitude }}</strong>
                </div>
                <div class="col-md-4 mb-2">
                  <small class="text-muted d-block">Longitude</small>
                  <strong>{{ personnel.gps.longitude }}</strong>
                </div>
                <div class="col-md-4 mb-2">
                  <small class="text-muted d-block">Last Update</small>
                  <strong>{{ personnel.gps.lastUpdate }}</strong>
                </div>
              </div>
              <button class="btn btn-primary btn-sm w-100 mt-2">
                <i class="bi bi-map me-1"></i>Track On Map
              </button>
            </div>
          </div>

          <!-- Recent Activity -->
          <div>
            <h6 class="fw-semibold mb-3">
              <i class="bi bi-clock-history me-2"></i>Recent Activity
            </h6>
            <div class="bg-light rounded p-3">
              <div
                v-for="(activity, index) in recentActivities"
                :key="index"
                class="d-flex align-items-start mb-2"
                :class="{ 'mb-0': index === recentActivities.length - 1 }"
              >
                <div
                  class="bg-white rounded-circle d-flex align-items-center justify-content-center me-2"
                  style="width: 6px; height: 6px; margin-top: 6px"
                >
                  <div class="bg-success rounded-circle" style="width: 6px; height: 6px"></div>
                </div>
                <div class="flex-grow-1">
                  <strong class="d-block">{{ activity.title }}</strong>
                  <small class="text-muted">{{ activity.description }}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="handleTrackLocation">
            <i class="bi bi-geo-alt me-1"></i>Track Location
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="handleEdit"
            v-if="personnelType !== 'visitor'"
          >
            <i class="bi bi-pencil me-1"></i>Edit Details
          </button>
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
// @ts-expect-error - Components used conditionally in nested modals
import TrackLocationModal from "./TrackLocationModal.vue";
// @ts-expect-error - Components used conditionally in nested modals
import EditPersonnelModal from "./EditPersonnelModal.vue";

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
  edit: [id: number];
  track: [id: number];
}>();

// Local state for modal visibility
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

// Computed - Recent Activities based on personnel type
const recentActivities = computed(() => {
  if (!props.personnel) return [];

  switch (props.personnelType) {
    case "contractor":
      return [
        {
          title: `Check-in Restored`,
          description: `${props.personnel.checkIn} - ${props.personnel.zone}`,
        },
        {
          title: `Entered ${props.personnel.zone}`,
          description: `2 minutes after check-in`,
        },
        {
          title: `Task Started: ${props.personnel.task}`,
          description: `Status: ${props.personnel.status}`,
        },
      ];
    case "staff":
      return [
        {
          title: `Check-in Restored`,
          description: `${props.personnel.checkIn || "06:00 AM"} - Main Gate`,
        },
        {
          title: `Entered All Zones`,
          description: `2 minutes after check-in`,
        },
        {
          title: `Task Started`,
          description: `Status: ${props.personnel.status}`,
        },
      ];
    case "visitor":
      return [
        {
          title: `Check-in Restored`,
          description: `${props.personnel.entry} - Main Gate`,
        },
        {
          title: `Entered Main Gate`,
          description: `2 minutes after check-in`,
        },
        {
          title: `Task Started: ${props.personnel.purpose}`,
          description: `Status: ${props.personnel.status}`,
        },
      ];
    default:
      return [];
  }
});

// Methods
const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const handleEdit = () => {
  if (props.personnel) {
    emit("edit", props.personnel.id);
  }
};

const handleTrackLocation = () => {
  if (props.personnel) {
    emit("track", props.personnel.id);
  }
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

const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case "active":
    case "on-duty":
    case "in-compound":
      return "bg-success-subtle text-success";
    case "idle":
    case "break":
      return "bg-warning-subtle text-warning";
    case "checked-out":
      return "bg-secondary-subtle text-secondary";
    default:
      return "bg-secondary-subtle text-secondary";
  }
};

const formatStatus = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    active: "● Active",
    idle: "○ Idle",
    "on-duty": "● On Duty",
    break: "○ Break",
    "in-compound": "● In Compound",
    "checked-out": "○ Checked Out",
  };
  return statusMap[status] || status;
};
</script>

<style scoped>
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

.modal-dialog {
  max-width: 700px;
}

.modal-content {
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.bg-light {
  background-color: #f8f9fa !important;
}

/* Smooth transitions */
.modal,
.modal-backdrop {
  transition: opacity 0.15s linear;
}
</style>