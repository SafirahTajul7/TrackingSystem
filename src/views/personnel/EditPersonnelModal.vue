<template>
  <!-- Bootstrap Modal -->
  <div
    class="modal fade"
    :class="{ show: isVisible }"
    :style="{ display: isVisible ? 'block' : 'none' }"
    tabindex="-1"
    @click.self="closeModal"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <!-- Modal Header -->
        <div class="modal-header border-0">
          <div>
            <h5 class="modal-title fw-bold">
              <i class="bi bi-pencil me-2"></i>Edit Personnel Details
            </h5>
            <small class="text-muted" v-if="personnel">{{ personnel.name }}</small>
          </div>
          <button type="button" class="btn-close" @click="closeModal"></button>
        </div>

        <!-- Modal Body -->
        <div class="modal-body" v-if="personnel">
          <form @submit.prevent="handleSubmit">
            <!-- Profile Picture -->
            <div class="text-center mb-4">
              <div class="position-relative d-inline-block">
                <div
                  class="rounded-circle text-white d-flex align-items-center justify-content-center mx-auto"
                  :class="getAvatarColor()"
                  style="width: 80px; height: 80px; font-size: 2rem; font-weight: 600"
                >
                  {{ formData.name.charAt(0) }}
                </div>
                <button
                  type="button"
                  class="btn btn-sm btn-light rounded-circle position-absolute bottom-0 end-0"
                  style="width: 32px; height: 32px; padding: 0"
                >
                  <i class="bi bi-camera"></i>
                </button>
              </div>
            </div>

            <!-- Personal Information -->
            <div class="mb-4">
              <h6 class="fw-semibold mb-3">
                <i class="bi bi-person me-2"></i>Personal Information
              </h6>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">
                    Full Name <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="formData.name"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">
                    Phone Number <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="formData.phone"
                    type="tel"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email Address</label>
                  <input
                    v-model="formData.email"
                    type="email"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">IC Number</label>
                  <input
                    v-model="formData.icNumber"
                    type="text"
                    class="form-control"
                    placeholder="920105-05-1234"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label">Address</label>
                  <textarea
                    v-model="formData.address"
                    class="form-control"
                    rows="2"
                  ></textarea>
                </div>
              </div>
            </div>

            <!-- Work Information - Contractors -->
            <div class="mb-4" v-if="personnelType === 'contractor'">
              <h6 class="fw-semibold mb-3">
                <i class="bi bi-briefcase me-2"></i>Work Information
              </h6>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">
                    Company <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="formData.company"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">
                    Task <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="formData.task"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">
                    Zone <span class="text-danger">*</span>
                  </label>
                  <select v-model="formData.zone" class="form-select" required>
                    <option value="">Select Zone</option>
                    <option value="Zone A">Zone A</option>
                    <option value="Zone B">Zone B</option>
                    <option value="Zone C">Zone C</option>
                    <option value="Zone D">Zone D</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Status</label>
                  <select v-model="formData.status" class="form-select">
                    <option value="active">Active</option>
                    <option value="idle">Idle</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Check-In Time</label>
                  <input
                    v-model="formData.checkIn"
                    type="time"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Expected Duration</label>
                  <input
                    v-model="formData.duration"
                    type="text"
                    class="form-control"
                    placeholder="e.g. 4 hours"
                  />
                </div>
              </div>
            </div>

            <!-- Work Information - Staff -->
            <div class="mb-4" v-if="personnelType === 'staff'">
              <h6 class="fw-semibold mb-3">
                <i class="bi bi-briefcase me-2"></i>Work Information
              </h6>
              <div class="row g-3">
                <div class="col-md-6">
                  <label class="form-label">
                    Role <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="formData.role"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">
                    Department <span class="text-danger">*</span>
                  </label>
                  <select v-model="formData.department" class="form-select" required>
                    <option value="">Select Department</option>
                    <option value="Security">Security</option>
                    <option value="Operations">Operations</option>
                    <option value="Administration">Administration</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">
                    Zone <span class="text-danger">*</span>
                  </label>
                  <input
                    v-model="formData.zone"
                    type="text"
                    class="form-control"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Shift</label>
                  <select v-model="formData.shift" class="form-select">
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Night">Night</option>
                  </select>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Status</label>
                  <select v-model="formData.status" class="form-select">
                    <option value="on-duty">On Duty</option>
                    <option value="break">Break</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Access Control -->
            <div class="mb-4">
              <h6 class="fw-semibold mb-3">
                <i class="bi bi-shield-lock me-2"></i>Access Control
              </h6>
              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label">Authorized Zones</label>
                  <div class="d-flex flex-wrap gap-2">
                    <div
                      v-for="zone in availableZones"
                      :key="zone"
                      class="form-check"
                    >
                      <input
                        v-model="formData.authorizedZones"
                        class="form-check-input"
                        type="checkbox"
                        :value="zone"
                        :id="`zone-${zone}`"
                      />
                      <label class="form-check-label" :for="`zone-${zone}`">
                        {{ zone }}
                      </label>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <label class="form-label">Access Start Date</label>
                  <input
                    v-model="formData.accessStart"
                    type="date"
                    class="form-control"
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Access End Date</label>
                  <input
                    v-model="formData.accessEnd"
                    type="date"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <!-- Additional Notes -->
            <div class="mb-4">
              <h6 class="fw-semibold mb-3">
                <i class="bi bi-card-text me-2"></i>Additional Notes
              </h6>
              <textarea
                v-model="formData.notes"
                class="form-control"
                rows="3"
                placeholder="Add any additional information..."
              ></textarea>
            </div>
          </form>
        </div>

        <!-- Modal Footer -->
        <div class="modal-footer border-0">
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Cancel
          </button>
          <button type="button" class="btn btn-primary" @click="handleSubmit">
            <i class="bi bi-check-lg me-1"></i>Save Changes
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
import { ref, watch } from "vue";

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
  save: [data: any];
}>();

// Local state
const isVisible = ref(false);
const availableZones = ["Zone A", "Zone B", "Zone C", "Zone D", "All Zones"];

// Form data
const formData = ref({
  name: "",
  phone: "",
  email: "",
  icNumber: "",
  address: "",
  company: "",
  task: "",
  role: "",
  department: "",
  zone: "",
  shift: "",
  status: "",
  checkIn: "",
  duration: "",
  authorizedZones: [] as string[],
  accessStart: "",
  accessEnd: "",
  notes: "",
});

// Watch for show prop changes
watch(
  () => props.show,
  (newVal) => {
    isVisible.value = newVal;
    if (newVal) {
      document.body.classList.add("modal-open");
      // Populate form with personnel data
      if (props.personnel) {
        formData.value = {
          name: props.personnel.name || "",
          phone: props.personnel.phone || "",
          email: props.personnel.email || "",
          icNumber: props.personnel.icNumber || "",
          address: props.personnel.address || "",
          company: props.personnel.company || "",
          task: props.personnel.task || "",
          role: props.personnel.role || "",
          department: props.personnel.department || "",
          zone: props.personnel.zone || "",
          shift: props.personnel.shift || "",
          status: props.personnel.status || "",
          checkIn: props.personnel.checkIn || "",
          duration: props.personnel.duration || "",
          authorizedZones: props.personnel.authorizedZones || [props.personnel.zone],
          accessStart: props.personnel.accessStart || "",
          accessEnd: props.personnel.accessEnd || "",
          notes: props.personnel.notes || "",
        };
      }
    } else {
      document.body.classList.remove("modal-open");
    }
  }
);

// Methods
const closeModal = () => {
  isVisible.value = false;
  emit("close");
};

const handleSubmit = () => {
  console.log("Saving personnel data:", formData.value);
  emit("save", {
    id: props.personnel?.id,
    ...formData.value,
  });
  closeModal();
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

.modal-lg {
  max-width: 800px;
}

.modal-content {
  border: none;
  border-radius: 0.75rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
}

.form-label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
}

.form-control,
.form-select {
  font-size: 0.875rem;
}

.form-control:focus,
.form-select:focus {
  border-color: #198754;
  box-shadow: 0 0 0 0.25rem rgba(25, 135, 84, 0.25);
}

.form-check-input:checked {
  background-color: #198754;
  border-color: #198754;
}
</style>