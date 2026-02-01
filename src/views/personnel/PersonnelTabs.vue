<template>
  <AdminLayout>
    <div class="container-fluid py-3">
      <!-- Header Section -->
      <div class="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h4 class="fw-bold mb-1">Personnel Management</h4>
          <small class="text-muted">Monitor and manage all personnel in the compound</small>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-secondary btn-sm">
            <i class="bi bi-download me-1"></i>Export
          </button>
          <button class="btn btn-success btn-sm" @click="handleAddNew">
            <i class="bi bi-plus-lg me-1"></i>Add New
          </button>
        </div>
      </div>

      <!-- Tabs Navigation -->
      <ul class="nav nav-tabs">
        <li class="nav-item" v-for="tab in tabs" :key="tab.name">
          <button
            class="nav-link"
            :class="{ active: currentTab === tab.name }"
            @click="currentTab = tab.name"
          >
            <i :class="tab.icon" class="me-2"></i>
            {{ tab.label }}
            <span v-if="tab.badge" class="badge bg-primary ms-2">{{ tab.badge }}</span>
          </button>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="tab-content mt-4">
        <!-- Search Bar - Shared across all tabs -->
        <div class="row mb-3">
          <div class="col-md-6">
            <div class="input-group">
              <span class="input-group-text bg-white">
                <i class="bi bi-search"></i>
              </span>
              <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Search personnel..."
              />
            </div>
          </div>
          <div class="col-md-6 text-end">
            <button class="btn btn-outline-secondary btn-sm">
              <i class="bi bi-funnel me-1"></i>Filter
            </button>
          </div>
        </div>

        <!-- Dynamic Component Rendering based on active tab -->
        <component 
          :is="currentTabComponent" 
          :search-query="searchQuery"
          @edit="handleEdit"
          @view="handleView"
          @track="handleTrack"
        />
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AdminLayout from "../../layouts/AdminLayout.vue";

// Import child components
import ContractorsPage from "./ContractorsPage.vue";
import StaffPage from "./StaffPage.vue";
import VisitorsPage from "./VisitorsPage.vue";

// Reactive State
const currentTab = ref("contractors");
const searchQuery = ref("");

// Tabs Configuration
const tabs = [
  { name: "contractors", label: "Contractors", icon: "bi bi-person-badge", badge: "12" },
  { name: "staff", label: "Staff Members", icon: "bi bi-person-lines-fill" },
  { name: "visitors", label: "Visitors/Riders", icon: "bi bi-people", badge: "3" },
];

// Dynamic Component Mapping
const componentMap: Record<string, any> = {
  contractors: ContractorsPage,
  staff: StaffPage,
  visitors: VisitorsPage,
};

// Computed property untuk dynamic component
const currentTabComponent = computed(() => componentMap[currentTab.value]);

// Event Handlers - Pass to child components
const handleAddNew = () => {
  console.log("Add new clicked for:", currentTab.value);
  // TODO: Open modal or navigate to form
};

const handleEdit = (id: number) => {
  console.log("Edit clicked for ID:", id);
  // TODO: Open edit modal or navigate
};

const handleView = (id: number) => {
  console.log("View clicked for ID:", id);
  // TODO: Show details modal or navigate
};

const handleTrack = (id: number) => {
  console.log("Track location for ID:", id);
  // TODO: Open tracking map
};
</script>

<style scoped>
.nav-link,
.btn {
  transition: all 0.2s ease-in-out;
}

.badge {
  font-size: 0.75rem;
  padding: 0.35em 0.65em;
}
</style>