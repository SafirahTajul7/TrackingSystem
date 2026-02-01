<template>
  <div
    :class="[
      'd-flex flex-column bg-white border-end shadow-sm transition-all',
      collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'
    ]"
  >
    <!-- Logo -->
    <div class="p-3 text-center border-bottom">
      <div v-if="!collapsed" class="fw-bold text-success fs-5">Tracking System</div>
      <div v-else class="fw-bold text-success fs-4">T</div>
    </div>

    <!-- Navigation Menu -->
    <ul class="nav flex-column mt-3 text-nowrap">
      <li v-for="item in menu" :key="item.name" class="nav-item">
        <router-link
          :to="item.path"
          class="nav-link text-dark d-flex align-items-center px-3 py-2 reusable-hover"
          :class="{ active: $route.name === item.name }"
        >
          <i :class="`bi ${item.icon} fs-5 me-2 text-success`"></i>
          <span v-if="!collapsed">{{ item.label }}</span>
        </router-link>
      </li>
    </ul>

    <!-- Spacer -->
    <div class="flex-grow-1"></div>

    <!-- Toggle Button -->
    <div class="text-center py-3 border-top">
      <button
        class="btn btn-sm btn-outline-success rounded-circle"
        @click="collapsed = !collapsed"
      >
        <i :class="collapsed ? 'bi bi-chevron-double-right' : 'bi bi-chevron-double-left'"></i>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const collapsed = ref(false);

const menu = [
  { name: "Dashboard", label: "Dashboard", icon: "bi-house-door", path: "/dashboard" },
  { name: "Personnel", label: "Personnel", icon: "bi-people-fill", path: "/personnel" },
  { name: "Monitoring", label: "Monitoring", icon: "bi-geo-alt-fill", path: "/monitoring" },
  { name: "Access", label: "Access Control", icon: "bi-key-fill", path: "/access" },
  { name: "Security", label: "Security & Alerts", icon: "bi-shield-lock-fill", path: "/security" },
];
</script>

<style scoped>
/* Sidebar width states */
.sidebar-expanded {
  width: 220px;
  transition: width 0.3s ease;
}

.sidebar-collapsed {
  width: 80px;
  transition: width 0.3s ease;
}

/* Nav links */
.nav-link {
  border-radius: 6px;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.nav-link.active {
  background-color: rgba(25, 135, 84, 0.1);
  font-weight: 600;
}

.nav-link i {
  min-width: 20px;
  text-align: center;
}

/* Hover animation */
.reusable-hover:hover {
  background-color: rgba(25, 135, 84, 0.05);
}

/* Smooth sidebar animation */
.transition-all {
  transition: all 0.3s ease-in-out;
}
</style>
