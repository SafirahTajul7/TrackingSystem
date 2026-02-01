<template>
  <AdminLayout>
    <div class="container-fluid py-3">
      <h4 class="fw-bold mb-1">Security & Alerts</h4>
      <small class="text-muted">Smart Base Military Intelligence</small>

      <!-- Tabs -->
      <ul class="nav nav-tabs mt-4">
        <li class="nav-item" v-for="tab in tabs" :key="tab.name">
          <button
            class="nav-link"
            :class="{ active: currentTab === tab.name }"
            @click="currentTab = tab.name"
          >
            <i :class="tab.icon" class="me-2"></i>{{ tab.label }}
          </button>
        </li>
      </ul>

      <!-- Tab content -->
      <div class="tab-content mt-4">
        <component :is="currentTabComponent"></component>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import AdminLayout from "../../layouts/AdminLayout.vue";
import LiveAlertsView from "./LiveAlertsView.vue";
import BehavioralView from "./BehavioralView.vue";
import IncidentsView from "./IncidentsView.vue";

const tabs = [
  { name: "LiveAlertsView", label: "Live Alerts", icon: "bi bi-exclamation-triangle" },
  { name: "BehavioralView", label: "Behavioral", icon: "bi bi-activity" },
  { name: "IncidentsView", label: "Incidents", icon: "bi bi-journal-text" },
];

const currentTab = ref("LiveAlertsView");
const currentTabComponent = computed(() => {
  return { LiveAlertsView, BehavioralView, IncidentsView }[currentTab.value];
});
</script>
