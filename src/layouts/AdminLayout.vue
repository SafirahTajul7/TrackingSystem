<template>
  <div class="d-flex" id="wrapper">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main Content -->
    <div id="page-content-wrapper" class="flex-grow-1 bg-light" style="min-height: 100vh;">
      <Topbar />
      <div class="container-fluid py-3">
        <slot />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from "../components/layout/Sidebar.vue";
import Topbar from "../components/layout/Topbar.vue";
</script>
