<template>
  <div class="page-content">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-semibold">Zone Activity</h5>
    </div>

    
    <!-- Zone Activity Cards Container -->
    <div class="row g-3">
      <div class="col-12" v-for="zone in zones" :key="zone.name">
        <div class="card shadow-sm border-0">
          <div class="card-body">
            <!-- Zone Header -->
            <div class="d-flex justify-content-between align-items-center mb-3">
              <div>
                <span :class="zone.trend === 'up'? 'text-success' : 'text-danger'">
                  <i :class="['bi', zone.trend === 'up' ? 'bi-graph-up' : 'bi-graph-down']"></i>
                </span>
                <h5 class="fw-bold d-inline ms-2 mb-0">{{ zone.name }}</h5>
              </div>
              <small class="text-muted d-block mb-3">{{ zone.last_updated }}</small>
            </div>

            <!-- Zone Stats Grid -->
            <div class="row row-cols-1 row-cols-md-4 g-3">
              <!-- Personnel -->
              <div class="col">
                <div class="p-3 bg-light rounded h-100">
                  <i class="bi bi-person me-2"></i>
                  <small class="text-muted">Personnel</small>
                  <h4 class="fw-bold mb-0 mt-1">{{ zone.personnel }}</h4>
                </div>
              </div>

              <!-- Alerts -->
              <div class="col">
                <div class="p-3 bg-light rounded h-100">
                  <i class="bi bi-bell me-2"></i>
                  <small class="text-muted">Alerts</small>
                  <h4 :class="zone.alerts > 0 ? 'text-danger fw-bold' : 'fw-bold'">{{ zone.alerts }}</h4>
                </div>
              </div>

              <!-- Occupancy -->
              <div class="col">
                <div class="p-3 bg-light rounded h-100">
                  <i class="bi bi-bar-chart me-2"></i>
                  <small class="text-muted">Occupancy</small>
                  <h4 class="fw-bold mb-1 mt-1">{{ zone.occupancy }}%</h4>
                  <div class="progress" style="height: 5px;">
                    <div 
                      class="progress-bar" 
                      :class="zone.occupancy > 50 ? 'bg-warning' : 'bg-success'" 
                      role="progressbar" 
                      :style="{width: zone.occupancy + '%'}" 
                      :aria-valuenow="zone.occupancy" 
                      aria-valuemin="0" 
                      aria-valuemax="100">
                    </div>
                  </div>
                </div>
              </div>

              <!-- Avg Duration -->
              <div class="col">
                <div class="p-3 bg-light rounded h-100">
                  <i class="bi bi-clock me-2"></i>
                  <small class="text-muted">Avg Duration</small>
                  <h4 class="fw-bold mb-0 mt-1">{{ zone.avg_duration }}h</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Zone {
  name: string;
  trend: 'up' | 'down';
  last_updated: string;
  personnel: number;
  alerts: number;
  occupancy: number;
  avg_duration: number;
}

// Mock data matching the image content
const zones = ref<Zone[]>([
  {
    name: "Zone A",
    trend: "up",
    last_updated: "2 mins ago",
    personnel: 8,
    alerts: 0,
    occupancy: 65,
    avg_duration: 2.5
  },
  {
    name: "Zone B",
    trend: "down",
    last_updated: "1 mins ago",
    personnel: 5,
    alerts: 2,
    occupancy: 42,
    avg_duration: 2.5
  },
  {
    name: "Zone C",
    trend: "up",
    last_updated: "2 mins ago",
    personnel: 4,
    alerts: 0,
    occupancy: 35,
    avg_duration: 2.5
  },
  {
    name: "Zone D",
    trend: "up",
    last_updated: "2 mins ago",
    personnel: 2,
    alerts: 0,
    occupancy: 18,
    avg_duration: 2.5
  }
]);
</script>

<style scoped>
.page-content {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
}

/* Custom background colors for the badges to match the image style */
.bg-success-light {
    background-color: #d1e7dd !important;
}

.bg-danger-light {
    background-color: #f8d7da !important;
}
</style>
