<template>
  <div>
    <!-- Stats Cards -->
    <div class="row g-3 mb-4">
      <div v-for="stat in stats" :key="stat.label" class="col-md-3">
        <div class="card border-0 shadow-sm">
          <div class="card-body">
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <p class="text-muted mb-1 small">{{ stat.label }}</p>
                <h4 class="mb-0 fw-bold" :style="{ color: stat.color || '#000' }">
                  {{ stat.value }}
                </h4>
              </div>
              <div class="rounded p-3" :class="`bg-${stat.iconColor}-subtle`">
                <i :class="`bi ${stat.icon} fs-4 text-${stat.iconColor}`"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Staff Table -->
    <div class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Zone</th>
                <th>Shift</th>
                <th>Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in filteredStaff" :key="member.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div
                      class="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-2"
                      style="width: 40px; height: 40px; font-weight: 600"
                    >
                      {{ member.name.split(' ')[1]?.charAt(0) || member.name.charAt(0) }}
                    </div>
                    <div>
                      <div class="fw-semibold">{{ member.name }}</div>
                      <small class="text-muted">{{ member.phone }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ member.role }}</td>
                <td>{{ member.department }}</td>
                <td>
                  <span class="badge bg-primary-subtle text-primary">
                    {{ member.zone }}
                  </span>
                </td>
                <td>{{ member.shift }}</td>
                <td>
                  <span class="badge" :class="getStatusBadgeClass(member.status)">
                    {{ member.status === 'on-duty' ? '● On Duty' : '○ Break' }}
                  </span>
                </td>
                <td>
                  <div class="d-flex gap-2 justify-content-center">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      title="Track Location"
                      @click="handleTrack(member.id)"
                    >
                      <i class="bi bi-geo-alt"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary"
                      title="View Details"
                      @click="handleViewDetails(member)"
                    >
                      <i class="bi bi-eye"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary"
                      title="Edit"
                      @click="handleEdit(member.id)"
                    >
                      <i class="bi bi-pencil"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Personnel Detail Modal -->
    <PersonnelDetailModal
      :show="showDetailModal"
      :personnel="selectedStaff"
      personnel-type="staff"
      @close="handleCloseModal"
      @edit="handleModalEdit"
      @track="handleModalTrack"
    />

    <!-- Edit Personnel Modal -->
    <EditPersonnelModal
      :show="showEditModal"
      :personnel="selectedStaff"
      personnel-type="staff"
      @close="handleCloseEditModal"
      @save="handleSaveEdit"
    />

    <!-- Track Location Modal -->
    <TrackLocationModal
      :show="showTrackModal"
      :personnel="selectedStaff"
      personnel-type="staff"
      @close="handleCloseTrackModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import PersonnelDetailModal from "./PersonnelDetailModal.vue";
import EditPersonnelModal from "./EditPersonnelModal.vue";
import TrackLocationModal from "./TrackLocationModal.vue";

// Props
interface Props {
  searchQuery: string;
}

const props = defineProps<Props>();

// Types
interface StaffMember {
  id: number;
  name: string;
  phone: string;
  role: string;
  department: string;
  zone: string;
  status: string;
  shift: string;
}

// Stats Data
const stats = [
  { label: "Total Staff", value: 24, icon: "bi-people", iconColor: "primary" },
  { label: "On Duty", value: 18, icon: "bi-check-circle", iconColor: "success", color: "#198754" },
  { label: "On Break", value: 6, icon: "bi-clock", iconColor: "warning", color: "#ffc107" },
  { label: "Departments", value: 5, icon: "bi-diagram-3", iconColor: "info" },
];

// Mock Data
const staff: StaffMember[] = [
  {
    id: 1,
    name: "Captain Razak",
    role: "Security Chief",
    department: "Security",
    zone: "All Zones",
    status: "on-duty",
    phone: "019-1234567",
    shift: "Morning",
  },
  {
    id: 2,
    name: "Lt. Sarah Ahmad",
    role: "Operations Officer",
    department: "Operations",
    zone: "Zone A-B",
    status: "on-duty",
    phone: "019-2345678",
    shift: "Morning",
  },
  {
    id: 3,
    name: "Sgt. Rahman",
    role: "Gate Officer",
    department: "Security",
    zone: "Main Gate",
    status: "on-duty",
    phone: "019-3456789",
    shift: "Morning",
  },
  {
    id: 4,
    name: "Cpl. Lim",
    role: "Patrol Officer",
    department: "Security",
    zone: "All Zones",
    status: "break",
    phone: "019-4567890",
    shift: "Morning",
  },
];

// Modal States
const showDetailModal = ref(false);
const showEditModal = ref(false);
const showTrackModal = ref(false);
const selectedStaff = ref<StaffMember | null>(null);

// Computed - Filtered Data
const filteredStaff = computed(() => {
  if (!props.searchQuery) return staff;
  
  const query = props.searchQuery.toLowerCase();
  return staff.filter(
    (s) =>
      s.name.toLowerCase().includes(query) ||
      s.phone.includes(query) ||
      s.role.toLowerCase().includes(query)
  );
});

// Helper Function
const getStatusBadgeClass = (status: string): string => {
  return status === "on-duty" 
    ? "bg-success-subtle text-success" 
    : "bg-warning-subtle text-warning";
};

// Event Handlers
const handleViewDetails = (member: StaffMember) => {
  selectedStaff.value = member;
  showDetailModal.value = true;
};

const handleCloseModal = () => {
  showDetailModal.value = false;
  selectedStaff.value = null;
};

const handleEdit = (id: number) => {
  const member = staff.find(s => s.id === id);
  if (member) {
    selectedStaff.value = member;
    showEditModal.value = true;
  }
};

const handleTrack = (id: number) => {
  const member = staff.find(s => s.id === id);
  if (member) {
    selectedStaff.value = member;
    showTrackModal.value = true;
  }
};

const handleModalEdit = (id: number) => {
  showDetailModal.value = false;
  handleEdit(id);
};

const handleModalTrack = (id: number) => {
  showDetailModal.value = false;
  handleTrack(id);
};

const handleCloseEditModal = () => {
  showEditModal.value = false;
  selectedStaff.value = null;
};

const handleCloseTrackModal = () => {
  showTrackModal.value = false;
  selectedStaff.value = null;
};

const handleSaveEdit = (data: any) => {
  console.log("Saving staff data:", data);
  showEditModal.value = false;
  selectedStaff.value = null;
};
</script>

<style scoped>
.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}

.card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
</style>