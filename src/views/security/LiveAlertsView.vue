<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-semibold">Live Alerts</h5>
      <button class="btn btn-outline-secondary btn-sm">
        <i class="bi bi-download me-1"></i> Export
      </button>
    </div>

    <div class="alert-list">
      <div
        v-for="(alert, i) in alerts"
        :key="i"
        class="card shadow-sm border-2 mb-3"
        :class="{
          'border-danger': alert.level === 'Critical',
          'border-warning': alert.level === 'High',
          'border-success': alert.level === 'Resolved',
        }"
      >
        <div class="card-body">
          <div class="d-flex justify-content-between">
            <h6 class="fw-bold mb-1">
              <i :class="alert.icon" class="me-2"></i>{{ alert.title }}
              <span class="badge ms-2" :class="`bg-${alert.badgeColor}`">{{ alert.level }}</span>
            </h6>
            <small class="text-muted">{{ alert.status }}</small>
          </div>

          <p class="text-muted small mb-2">{{ alert.description }}</p>

          <div class="row small">
            <div class="col"><strong>Person:</strong> {{ alert.person }}</div>
            <div class="col"><strong>Zone:</strong> {{ alert.zone }}</div>
            <div class="col"><strong>Camera:</strong> {{ alert.camera }}</div>
            <div class="col"><strong>Time:</strong> {{ alert.time }}</div>
          </div>

          <div class="mt-3 d-flex justify-content-end gap-2">
            <button class="btn btn-primary btn-sm">View CCTV</button>
            <button
              v-if="alert.level !== 'Resolved'"
              class="btn btn-success btn-sm"
            >
              Mark Resolved
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const alerts = [
  {
    icon: "bi bi-exclamation-octagon",
    title: "Unauthorized Access Attempt",
    description: "Unknown person attempting entry to Zone C",
    person: "Unknown",
    zone: "Zone C",
    camera: "CAM-03",
    time: "2 mins ago",
    level: "Critical",
    badgeColor: "danger",
    status: "Active",
  },
  {
    icon: "bi bi-exclamation-triangle",
    title: "Loitering Detected",
    description: "Person detected loitering near restricted area for 10 minutes",
    person: "Ahmad Ali",
    zone: "Zone B",
    camera: "CAM-05",
    time: "5 mins ago",
    level: "High",
    badgeColor: "warning",
    status: "Active",
  },
  {
    icon: "bi bi-shield-check",
    title: "Tailgating Detected",
    description: "Multiple persons entering with single card scan",
    person: "Lee Wei + 1",
    zone: "Main Gate",
    camera: "CAM-01",
    time: "12 mins ago",
    level: "High",
    badgeColor: "success",
    status: "Resolved",
  },
];
</script>
