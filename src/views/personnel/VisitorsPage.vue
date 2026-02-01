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

    <!-- Visitors Table -->
    <div class="card border-0 shadow-sm">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table table-hover mb-0">
            <thead class="table-light">
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Purpose</th>
                <th>Entry Time</th>
                <th>Valid Until</th>
                <th>Status</th>
                <th class="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="visitor in filteredVisitors" :key="visitor.id">
                <td>
                  <div class="d-flex align-items-center">
                    <div
                      class="rounded-circle bg-info text-white d-flex align-items-center justify-content-center me-2"
                      style="width: 40px; height: 40px; font-weight: 600"
                    >
                      {{ visitor.name.charAt(0) }}
                    </div>
                    <div>
                      <div class="fw-semibold">{{ visitor.name }}</div>
                      <small class="text-muted">{{ visitor.phone }}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="badge bg-purple-subtle text-purple">
                    {{ visitor.type }}
                  </span>
                </td>
                <td>{{ visitor.purpose }}</td>
                <td>{{ visitor.entry }}</td>
                <td>{{ visitor.validUntil }}</td>
                <td>
                  <span class="badge" :class="getStatusBadgeClass(visitor.status)">
                    {{ visitor.status === 'in-compound' ? '● In Compound' : '○ Checked Out' }}
                  </span>
                </td>
                <td>
                  <div class="d-flex gap-2 justify-content-center">
                    <button
                      class="btn btn-sm btn-outline-primary"
                      title="Track Location"
                      @click="handleTrack(visitor.id)"
                    >
                      <i class="bi bi-geo-alt"></i>
                    </button>
                    <button
                      class="btn btn-sm btn-outline-secondary"
                      title="View Details"
                      @click="handleViewDetails(visitor)"
                    >
                      <i class="bi bi-eye"></i>
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
      :personnel="selectedVisitor"
      personnel-type="visitor"
      @close="handleCloseModal"
      @track="handleModalTrack"
    />

    <!-- Track Location Modal -->
    <TrackLocationModal
      :show="showTrackModal"
      :personnel="selectedVisitor"
      personnel-type="visitor"
      @close="handleCloseTrackModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import PersonnelDetailModal from "./PersonnelDetailModal.vue";
import TrackLocationModal from "./TrackLocationModal.vue";

// Props
interface Props {
  searchQuery: string;
}

const props = defineProps<Props>();

// Types
interface Visitor {
  id: number;
  name: string;
  phone: string;
  type: string;
  purpose: string;
  zone: string;
  status: string;
  entry: string;
  validUntil: string;
}

// Stats Data
const stats = [
  { label: "Today's Visitors", value: 15, icon: "bi-people", iconColor: "primary" },
  { label: "In Compound", value: 3, icon: "bi-check-circle", iconColor: "success", color: "#198754" },
  { label: "Checked Out", value: 12, icon: "bi-x-circle", iconColor: "secondary", color: "#6c757d" },
  { label: "Avg Duration", value: "25m", icon: "bi-clock-history", iconColor: "info" },
];

// Mock Data
const visitors: Visitor[] = [
  {
    id: 1,
    name: "Ali Foodpanda",
    type: "Foodpanda",
    purpose: "Food Delivery",
    zone: "Main Gate",
    status: "in-compound",
    phone: "011-2233445",
    entry: "12:30 PM",
    validUntil: "01:00 PM",
  },
  {
    id: 2,
    name: "Kumar Grab",
    type: "Grab",
    purpose: "Package Delivery",
    zone: "Gate B",
    status: "in-compound",
    phone: "012-3344556",
    entry: "12:45 PM",
    validUntil: "01:15 PM",
  },
  {
    id: 3,
    name: "Wong Shopee",
    type: "Shopee",
    purpose: "Parcel Delivery",
    zone: "Main Gate",
    status: "checked-out",
    phone: "013-4455667",
    entry: "11:30 AM",
    validUntil: "12:00 PM",
  },
];

// Modal States
const showDetailModal = ref(false);
const showTrackModal = ref(false);
const selectedVisitor = ref<Visitor | null>(null);

// Computed - Filtered Data
const filteredVisitors = computed(() => {
  if (!props.searchQuery) return visitors;
  
  const query = props.searchQuery.toLowerCase();
  return visitors.filter(
    (v) =>
      v.name.toLowerCase().includes(query) ||
      v.phone.includes(query) ||
      v.type.toLowerCase().includes(query)
  );
});

// Helper Function
const getStatusBadgeClass = (status: string): string => {
  return status === "in-compound" 
    ? "bg-success-subtle text-success" 
    : "bg-secondary-subtle text-secondary";
};

// Event Handlers
const handleViewDetails = (visitor: Visitor) => {
  selectedVisitor.value = visitor;
  showDetailModal.value = true;
};

const handleCloseModal = () => {
  showDetailModal.value = false;
  selectedVisitor.value = null;
};

const handleTrack = (id: number) => {
  const visitor = visitors.find(v => v.id === id);
  if (visitor) {
    selectedVisitor.value = visitor;
    showTrackModal.value = true;
  }
};

const handleModalTrack = (id: number) => {
  showDetailModal.value = false;
  handleTrack(id);
};

const handleCloseTrackModal = () => {
  showTrackModal.value = false;
  selectedVisitor.value = null;
};
</script>

<style scoped>
/* Custom Bootstrap color utilities for purple */
.bg-purple-subtle {
  background-color: #e7d4ff;
}

.text-purple {
  color: #7c3aed;
}

.table-hover tbody tr:hover {
  background-color: #f8f9fa;
}

.card {
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}
</style>