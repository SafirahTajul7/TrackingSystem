<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-semibold">Incident Reports</h5>
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

    <div
      v-for="(incident, i) in incidents"
      :key="i"
      class="card border-danger shadow-sm mb-3"
    >
      <div class="card-body">
        <h6 class="fw-bold">
          {{ incident.title }}
          <span class="badge bg-danger ms-2">{{ incident.severity }}</span>
          <span class="badge bg-warning ms-2">{{ incident.status }}</span>
        </h6>

        <div class="row small mt-2 mb-3">
          <div class="col"><strong>Reported By:</strong> {{ incident.reportedBy }}</div>
          <div class="col"><strong>Date & Time:</strong> {{ incident.date }}</div>
          <div class="col"><strong>Zone:</strong> {{ incident.zone }}</div>
        </div>

        <p class="text-muted small mb-2">{{ incident.description }}</p>

        <div class="bg-light p-2 rounded small">
          <strong>Actions Taken:</strong>
          <p class="text-primary mb-0">{{ incident.actions }}</p>
        </div>

        <div class="mt-3 d-flex justify-content-end gap-2">
          <button class="btn btn-primary btn-sm">View CCTV</button>
          <button class="btn btn-success btn-sm">Mark Resolved</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const statCards = [
  { label: "Total Reports", value: 5 },
  { label: "Critical", value: 1 },
  { label: "Investigating", value: 2 },
  { label: "Resolved", value: 2 },
];

const incidents = [
  {
    title: "Unauthorized Access Attempt",
    severity: "Critical",
    status: "Investigating",
    reportedBy: "Security Team",
    date: "02 Nov 2025, 10:15 AM",
    zone: "Zone C",
    description:
      "Unknown person attempted to enter Zone C using invalid access card. CCTV footage captured. Person fled the scene.",
    actions: "Security alerted, perimeter check ongoing",
  },
];
</script>
