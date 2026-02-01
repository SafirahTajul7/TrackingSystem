<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-semibold">Behavioral</h5>
      <button class="btn btn-outline-secondary btn-sm">
        <i class="bi bi-download me-1"></i> Export
      </button>
    </div>

    <div class="row mb-3 text-center">
      <div class="col" v-for="card in statCards" :key="card.label">
        <div class="card shadow-sm border-0">
          <div class="card-body py-3">
            <h6 class="fw-bold mb-1">{{ card.value }}</h6>
            <small class="text-muted">{{ card.label }}</small>
          </div>
        </div>
      </div>
    </div>

    <table class="table align-middle table-bordered shadow-sm">
      <thead class="table-light">
        <tr>
          <th>Name</th>
          <th>Anomaly Type</th>
          <th>Confidence</th>
          <th>Zone</th>
          <th>Detection</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in behavioral" :key="i">
          <td><strong>{{ item.name }}</strong></td>
          <td>{{ item.type }}</td>
          <td>
            <div class="progress" style="height:6px;">
              <div class="progress-bar bg-danger" :style="{ width: item.confidence + '%' }"></div>
            </div>
            <small>{{ item.confidence }}%</small>
          </td>
          <td><span class="badge bg-info text-dark">{{ item.zone }}</span></td>
          <td>{{ item.detection }}</td>
          <td>
            <span class="badge" :class="item.status === 'Monitoring' ? 'bg-primary' : 'bg-danger'">
              {{ item.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const statCards = [
  { label: "Total Detected", value: 5 },
  { label: "Under Alert", value: 1 },
  { label: "Monitoring", value: 1 },
  { label: "Cleared", value: 3 },
];

const behavioral = [
  {
    name: "Ahmad Ali",
    type: "Nervous Behavior",
    confidence: 85,
    zone: "Zone B",
    detection: "AI Face Recognition",
    status: "Monitoring",
  },
  {
    name: "Kumar S.",
    type: "Unauthorized Zone Entry",
    confidence: 95,
    zone: "Zone C",
    detection: "GPS Tracking",
    status: "Alert",
  },
];
</script>
