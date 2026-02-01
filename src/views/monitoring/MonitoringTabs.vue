<template>
  <AdminLayout>
    <div class="container-fluid py-3">
      <!-- Header Section -->
      <div class="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h4 class="fw-bold mb-1">Live Monitoring</h4>
          <small class="text-muted">Real-time tracking and surveillance</small>
        </div>
        <div class="d-flex gap-2 align-items-center">
          <span class="badge bg-success">
            <i class="bi bi-circle-fill me-1" style="font-size: 0.5rem"></i>
            All System Active
          </span>
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
          </button>
        </li>
      </ul>

      <!-- Tab Content -->
      <div class="tab-content mt-4">
        <component 
          :is="currentTabComponent"
          @viewPersonnel="handleViewPersonnel"
          @viewCamera="handleViewCamera"
          @viewActivity="handleViewActivity"
        />
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AdminLayout from "../../layouts/AdminLayout.vue";

// Import child components
import GpsTrackingPage from "./GpsTrackingPage.vue";
import CctvFeedsPage from "./CctvFeedsPage.vue";
import ZoneActivityPage from "./ZoneActivityPage.vue";

// Reactive State
const currentTab = ref("gps");


// Tabs Configuration
const tabs = [
  { name: "gps", label: "GPS Tracking", icon: "bi bi-geo-alt" },
  { name: "cctv", label: "CCTV Feeds", icon: "bi bi-camera-video" },
  { name: "activity", label: "Zone Activity", icon: "bi bi-activity" },
];

// Dynamic Component Mapping
const componentMap: Record<string, any> = {
  gps: GpsTrackingPage,
  cctv: CctvFeedsPage,
  activity: ZoneActivityPage,
};

// Computed property for dynamic component
const currentTabComponent = computed(() => componentMap[currentTab.value]);

// Event Handlers
const handleViewPersonnel = (id: number) => {
  console.log("View personnel:", id);
  // TODO: Navigate to personnel details
};

const handleViewCamera = (id: number) => {
  console.log("View camera:", id);
  // TODO: Open camera fullscreen
};

const handleViewActivity = (id: number) => {
  console.log("View activity:", id);
  // TODO: Show activity details
};
</script>

<style scoped>
.nav-link,
.btn {
  transition: all 0.2s ease-in-out;
}

.badge {
  font-size: 0.75rem;
  padding: 0.5em 0.85em;
}
</style>