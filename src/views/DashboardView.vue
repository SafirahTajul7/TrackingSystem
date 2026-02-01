<template>
  <AdminLayout>
    <div class="container-fluid py-3">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 class="fw-bold mb-0">Dashboard</h4>
          <small class="text-muted">Smart Base Military Intelligence</small>
        </div>
        <div>
          <span class="badge bg-success">Real-time</span>
        </div>
      </div>

      <div class="row g-4">
        <!-- Live Map -->
        <div class="col-lg-8">
          <div class="card shadow-sm h-100 border-0">
            <div class="card-header bg-white fw-semibold border-0">
              Live Map Tracking
            </div>
            <div class="card-body p-0">
              <div id="liveMap" style="height: 390px; border-radius: 0.5rem;"></div>
            </div>
            <div
              class="card-footer bg-white d-flex justify-content-center align-items-center flex-wrap small text-muted border-0"
            >
              <div class="legend-item me-3">
                <span class="dot blink bg-success"></span> Staff
              </div>
              <div class="legend-item me-3">
                <span class="dot blink bg-warning"></span> Contractor
              </div>
              <div class="legend-item me-3">
                <span class="dot blink bg-primary"></span> Visitor
              </div>
              <div class="legend-item">
                <span class="dot blink bg-danger"></span> Alert Zone
              </div>
            </div>
          </div>
        </div>

        <!-- Live Alerts -->
        <div class="col-lg-4">
          <div class="card shadow-sm h-100 border-0">
            <div
              class="card-header bg-white d-flex justify-content-between align-items-center border-0"
            >
              <span class="fw-semibold">Live Alerts</span>
              <span class="badge bg-danger pulse">5 Active</span>
            </div>
            <ul class="list-group list-group-flush">
              <li
                v-for="(alert, i) in alerts"
                :key="i"
                class="list-group-item border-0 border-bottom d-flex flex-column reusable-hover rounded-3"
              >
                <div class="d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <span :class="`dot blink bg-${alert.color} me-2`"></span>
                    <span class="fw-semibold">{{ alert.title }}</span>
                  </div>
                  <small class="text-muted">{{ alert.time }}</small>
                </div>
                <small class="text-muted ps-4">{{ alert.zone }}</small>
              </li>
            </ul>
          </div>
        </div>

        <!-- Contractor Activity Chart -->
        <div class="col-lg-4">
          <div class="card shadow-sm h-100 border-0">
            <div
              class="card-header bg-white d-flex justify-content-between align-items-center border-0"
            >
              <span class="fw-semibold">Contractor Activity Trend</span>
              <span class="text-muted small">Last 5 Hours</span>
            </div>
            <div class="card-body">
              <canvas id="activityChart" height="160"></canvas>
            </div>
          </div>
        </div>

        <!-- Zone Risk Level -->
        <div class="col-lg-4">
          <div class="card shadow-sm h-100 border-0">
            <div class="card-header bg-white fw-semibold border-0">
              Zone Risk Level
            </div>
            <div class="card-body small">
              <div v-for="(zone, i) in riskZones" :key="i" class="mb-3">
                <div class="d-flex justify-content-between">
                  <span class="fw-semibold">{{ zone.name }}</span>
                  <span class="text-muted">{{ zone.level }}</span>
                </div>
                <div class="progress" style="height: 6px;">
                  <div
                    class="progress-bar"
                    :class="`bg-${zone.color}`"
                    role="progressbar"
                    :style="{ width: zone.percent + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Personnel Status -->
        <div class="col-lg-4">
          <div class="card shadow-sm h-100 border-0 text-center">
            <div class="card-header bg-white fw-semibold border-0">
              Personnel Status
            </div>
            <div class="card-body">
              <div
                class="rounded-circle mx-auto bg-light d-flex align-items-center justify-content-center border border-success"
                style="width: 160px; height: 160px;"
              >
                <div>
                  <h4 class="fw-bold mb-0">15</h4>
                  <small class="text-muted">Total</small>
                </div>
              </div>
              <div class="mt-3 small">
                <span class="me-3 text-success fw-semibold"
                  ><i class="bi bi-circle-fill me-1"></i>Active</span
                >
                <span class="text-danger fw-semibold"
                  ><i class="bi bi-circle-fill me-1"></i>Idle</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup lang="ts">
import AdminLayout from "../layouts/AdminLayout.vue";
import { onMounted } from "vue";
import L from "leaflet";
import Chart from "chart.js/auto";

const alerts = [
  { color: "danger", title: "Unauthorized Access Defected - Zone B", zone: "Zone B", time: "2 mins ago" },
  { color: "warning", title: "Behavioral Anomaly - Loitering Detected", zone: "Zone A", time: "5 mins ago" },
  { color: "primary", title: "Contractor Entering - Ahmad", zone: "Main Gate", time: "8 mins ago" },
  { color: "danger", title: "GPS Mismatch - Verification Failed", zone: "Zone C", time: "12 mins ago" },
  { color: "success", title: "Task Check-in Complete", zone: "Warehouse A", time: "15 mins ago" },
];

const riskZones = [
  { name: "Zone A", level: "Low", color: "success", percent: 80 },
  { name: "Zone B", level: "High", color: "danger", percent: 95 },
  { name: "Zone C", level: "Medium", color: "warning", percent: 70 },
  { name: "Zone D", level: "Low", color: "success", percent: 40 },
];

onMounted(() => {
  // Minimalist map
  const map = L.map("liveMap", {
    zoomControl: false,
    attributionControl: false,
  }).setView([5.4, 100.3], 14);

  L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
    {}
  ).addTo(map);

  const positions = [
    { lat: 5.401, lng: 100.302, color: "green", title: "Zone A" },
    { lat: 5.405, lng: 100.308, color: "orange", title: "Zone B" },
    { lat: 5.398, lng: 100.306, color: "blue", title: "Zone C" },
    { lat: 5.404, lng: 100.311, color: "red", title: "Zone D" },
  ];

  positions.forEach((pos) => {
    L.circleMarker([pos.lat, pos.lng], {
      color: pos.color,
      radius: 10,
      fillOpacity: 0.9,
      weight: 2,
    })
      .addTo(map)
      .bindPopup(`<b>${pos.title}</b>`);
  });

  // Chart.js
  const ctx = document.getElementById("activityChart") as HTMLCanvasElement;
  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["8 AM", "9 AM", "10 AM", "11 AM", "12 PM"],
      datasets: [
        {
          label: "Contractors",
          data: [5, 9, 7, 10, 8],
          borderColor: "#198754",
          backgroundColor: "rgba(25, 135, 84, 0.15)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "Visitors",
          data: [3, 4, 6, 8, 5],
          borderColor: "#0d6efd",
          backgroundColor: "rgba(13, 110, 253, 0.15)",
          tension: 0.4,
          fill: true,
        },
      ],
    },
    options: {
      plugins: { legend: { display: true, position: "bottom" } },
      scales: { y: { beginAtZero: true, grid: { color: "#eee" } } },
    },
  });
});
</script>

<style scoped>
#liveMap {
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
}

/* 🔁 Reusable utility classes */
.dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.blink {
  animation: blink 1.3s infinite alternate;
}

@keyframes blink {
  from {
    opacity: 0.5;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1.2);
  }
}

.reusable-hover {
  transition: background-color 0.3s ease;
}

.reusable-hover:hover {
  background-color: rgba(25, 135, 84, 0.05);
}

/* Pulsing red badge */
.pulse {
  animation: pulse 1.6s infinite;
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0.4);
  }
  70% {
    box-shadow: 0 0 0 8px rgba(220, 53, 69, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(220, 53, 69, 0);
  }
}

.legend-item {
  display: flex;
  align-items: center;
}
</style>
