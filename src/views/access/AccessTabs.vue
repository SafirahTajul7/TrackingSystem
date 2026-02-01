<template>
  <AdminLayout>
    <div class="container-fluid py-3">
      <!-- Page Header -->
      <h4 class="fw-bold mb-1">Access Control</h4>

      <!-- Navigation Tabs -->
      <ul class="nav nav-tabs mt-4">
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
        <component :is="currentTabComponent" />
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AdminLayout from "../../layouts/AdminLayout.vue";

// Import tab views
import AccessLogsView from "./AccessLogsView.vue";
import AccessRecordsView from "./AccessRecordsView.vue";
import QRManagementView from "./QRManagementView.vue"; // ✅ Integrated QR Management page

// Tabs configuration
const tabs = [
  { name: "logs", label: "Access Logs", icon: "bi bi-journal-text" },
  { name: "records", label: "Entry/Exit Records", icon: "bi bi-box-arrow-in-right" },
  { name: "qr", label: "QR Management", icon: "bi bi-qr-code" },
];

// Default active tab
const currentTab = ref("logs");

// Dynamically load the correct view component
const currentTabComponent = computed(() => {
  const components: Record<string, any> = {
    logs: AccessLogsView,
    records: AccessRecordsView,
    qr: QRManagementView,
  };
  return components[currentTab.value];
});
</script>