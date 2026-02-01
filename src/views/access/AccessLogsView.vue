<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-semibold">Access Logs</h5>
      <button class="btn btn-outline-secondary btn-sm">
        <i class="bi bi-download me-1"></i> Export
      </button>
    </div>

    <!-- Stat Cards -->
    <div class="row text-center mb-3">
      <div class="col" v-for="card in statCards" :key="card.label">
        <div class="card shadow-sm border-0">
          <div class="card-body py-3">
            <h6 class="fw-bold mb-1"
           :class="{
            'text-success': card.label === 'Successful',
            'text-danger': card.label === 'Failed'
           }"
           >
           {{ card.value }}
        </h6>
            <small class="text-muted">{{ card.label }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Access Table -->
    <table class="table align-middle table-bordered shadow-sm">
      <thead class="table-light">
        <tr>
          <th>User</th>
          <th>Action</th>
          <th>Zone</th>
          <th>Time</th>
          <th>Method</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(log, index) in filteredLogs" :key="index">
          <td><strong>{{ log.name }}</strong></td>
          <td>{{ log.action }}</td>
          <td><span class="badge bg-info text-dark">{{ log.zone }}</span></td>
          <td>{{ log.time }}</td>
          <td>{{ log.method }}</td>
          <td>
            <span
              class="badge"
              :class="{
                'bg-success': log.status === 'Success',
                'bg-danger': log.status === 'Failed'
              }"
            >
              {{ log.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script setup lang="ts">
import { ref, computed } from "vue";
const statCards = [
  { label: "Total Access", value: 156 },
  { label: "Successful", value: 148 },
  { label: "Failed", value: 8 },
  { label: "Active Zones", value: 3 },
];
// Mock data 
const accessLogs = ref([
  { name: "Ahmad Ali", action: "Entry", zone: "Main Gate", method: "QR Code", time: "09:30 AM", status: "Success" },
  { name: "Kumar S", action: "Entry", zone: "Zone A", method: "Biometric",time: "09:45 AM", status: "Success" },
  { name: "Lee Wei.", action: "Exit", zone: "Zone B", method: "QR Code",time: "10:00 AM", status: "Success" },
  { name: "Unknown", action: "Entry", zone: "Zone C", method: "Card",time: "10:00 AM", status: "Failed" },
]);

const filteredLogs = computed(() => accessLogs.value);
</script>

<style scoped>
.nav-link.active {
  font-weight: 600;
}
</style>
