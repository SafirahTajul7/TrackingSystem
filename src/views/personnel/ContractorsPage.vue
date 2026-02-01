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

    <!-- Contractors Table -->
    <div class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Task</th>
                <th>Zone</th>
                <th>Check-In</th>
                <th>Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="contractor in filteredContractors" :key="contractor.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div
                      class="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-2"
                      style="width: 40px; height: 40px; font-weight: 600"
                    >
                      {{ contractor.name.charAt(0) }}
                    </div>
                    <div>
                      <div class="fw-semibold">{{ contractor.name }}</div>
                      <small class="text-muted">{{ contractor.phone }}</small>
                    </div>
                  </div>
                </td>
                <td>{{ contractor.company }}</td>
                <td>{{ contractor.task }}</td>
                <td>
                  <span class="badge bg-info-subtle text-info">
                    {{ contractor.zone }}
                  </span>
                </td>
                <td>{{ contractor.checkIn }}</td>
                <td>
                  <span class="badge" :class="getStatusBadgeClass(contractor.status)">
                    {{ contractor.status === 'active' ? '● Active' : '○ Idle' }}
                  </span>
                </td>
                <td>
                  <div class="d-flex gap-2 justify-content-center">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      title="Track Location"
                      @click="handleTrack(contractor.id)"
                    >
                      <i class="bi bi-geo-alt"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary"
                      title="View Details"
                      @click="handleViewDetails(contractor)"
                    >
                      <i class="bi bi-eye"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary"
                      title="Edit"
                      @click="handleEdit(contractor.id)"
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
      :personnel="selectedContractor"
      personnel-type="contractor"
      @close="handleCloseModal"
      @edit="handleModalEdit"
      @track="handleModalTrack"
    />

    <!-- Edit Personnel Modal -->
    <EditPersonnelModal
      :show="showEditModal"
      :personnel="selectedContractor"
      personnel-type="contractor"
      @close="handleCloseEditModal"
      @save="handleSaveEdit"
    />

    <!-- Track Location Modal -->
    <TrackLocationModal
      :show="showTrackModal"
      :personnel="selectedContractor"
      personnel-type="contractor"
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
interface Contractor {
  id: number;
  name: string;
  phone: string;
  company: string;
  zone: string;
  status: string;
  task: string;
  checkIn: string;
}

// Stats Data
const stats = [
  { label: "Total Contractors", value: 12, icon: "bi-person-badge", iconColor: "primary" },
  { label: "Active Now", value: 9, icon: "bi-check-circle", iconColor: "success", color: "#198754" },
  { label: "Idle", value: 3, icon: "bi-clock", iconColor: "warning", color: "#ffc107" },
  { label: "Companies", value: 8, icon: "bi-building", iconColor: "info" },
];

// Mock Data
const contractors: Contractor[] = [
  {
    id: 1,
    name: "Ahmad bin Ali",
    company: "ABC Construction",
    zone: "Zone A",
    status: "active",
    phone: "012-3456789",
    task: "Maintenance Work",
    checkIn: "08:30 AM",
  },
  {
    id: 2,
    name: "Kumar Subramaniam",
    company: "Tech Solutions",
    zone: "Zone B",
    status: "active",
    phone: "013-9876543",
    task: "IT Installation",
    checkIn: "09:00 AM",
  },
  {
    id: 3,
    name: "Lee Wei Ming",
    company: "Security Plus",
    zone: "Zone C",
    status: "idle",
    phone: "014-2345678",
    task: "Security Audit",
    checkIn: "07:45 AM",
  },
  {
    id: 4,
    name: "Siti Nurhaliza",
    company: "Clean Corp",
    zone: "Zone A",
    status: "active",
    phone: "015-8765432",
    task: "Cleaning Service",
    checkIn: "08:00 AM",
  },
  {
    id: 5,
    name: "David Tan",
    company: "ElectriCo",
    zone: "Zone D",
    status: "active",
    phone: "016-5432109",
    task: "Electrical Work",
    checkIn: "09:30 AM",
  },
];

// Modal States
const showDetailModal = ref(false);
const showEditModal = ref(false);
const showTrackModal = ref(false);
const selectedContractor = ref<Contractor | null>(null);

// Computed - Filtered Data
const filteredContractors = computed(() => {
  if (!props.searchQuery) return contractors;
  
  const query = props.searchQuery.toLowerCase();
  return contractors.filter(
    (c) =>
      c.name.toLowerCase().includes(query) ||
      c.phone.includes(query) ||
      c.company.toLowerCase().includes(query)
  );
});

// Helper Function
const getStatusBadgeClass = (status: string): string => {
  return status === "active" 
    ? "bg-success-subtle text-success" 
    : "bg-warning-subtle text-warning";
};

// Event Handlers
const handleViewDetails = (contractor: Contractor) => {
  selectedContractor.value = contractor;
  showDetailModal.value = true;
};

const handleCloseModal = () => {
  showDetailModal.value = false;
  selectedContractor.value = null;
};

const handleEdit = (id: number) => {
  const contractor = contractors.find(c => c.id === id);
  if (contractor) {
    selectedContractor.value = contractor;
    showEditModal.value = true;
  }
};

const handleTrack = (id: number) => {
  const contractor = contractors.find(c => c.id === id);
  if (contractor) {
    selectedContractor.value = contractor;
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
  selectedContractor.value = null;
};

const handleCloseTrackModal = () => {
  showTrackModal.value = false;
  selectedContractor.value = null;
};

const handleSaveEdit = (data: any) => {
  console.log("Saving contractor data:", data);
  showEditModal.value = false;
  selectedContractor.value = null;
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