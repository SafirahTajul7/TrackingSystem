<template>
  <div class="qr-management">
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-semibold">QR Management</h5>
      <div class="d-flex">
        <button class="btn btn-outline-secondary btn-sm me-2">
          <i class="bi bi-download me-1"></i> Export
        </button>
        <button class="btn btn-success btn-sm">
          <i class="bi bi-plus-lg me-1"></i> Generate QR
        </button>
      </div>
    </div>

    <!-- Info Banner -->
    <div class="alert alert-info py-2 small mb-3">
      <i class="bi bi-qr-code me-2"></i>
      <strong>QR Code for Temporary Access</strong><br />
      This system manages temporary QR codes for delivery riders and visitors
      (Foodpanda, Grab, Shopee, etc.). Codes expire automatically after the valid period.
    </div>

    <!-- Stat Cards -->
    <div class="row text-center mb-3">
      <div class="col" v-for="card in statCards" :key="card.label">
        <div class="card border-0 shadow-sm">
          <div class="card-body py-3">
            <h6 class="fw-bold mb-1">{{ card.value }}</h6>
            <small class="text-muted">{{ card.label }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- QR Table -->
    <table class="table align-middle table-bordered shadow-sm">
      <thead class="table-light">
        <tr>
          <th>Rider/Visitor</th>
          <th>Service</th>
          <th>Purpose</th>
          <th>QR Code</th>
          <th>Valid Until</th>
          <th>Time Left</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(qr, index) in qrRecords" :key="index">
          <!-- Rider Info -->
          <td class="d-flex align-items-center">
            <div
              class="rounded-circle bg-success text-white d-flex justify-content-center align-items-center me-2"
              style="width: 35px; height: 35px; font-weight: 600;"
            >
              {{ qr.initial }}
            </div>
            <div>
              <strong>{{ qr.name }}</strong><br />
              <small class="text-muted">{{ qr.phone }}</small>
            </div>
          </td>

          <td>{{ qr.service }}</td>
          <td>{{ qr.purpose }}</td>
          <td><i class="bi bi-qr-code me-1"></i>{{ qr.code }}</td>
          <td>{{ qr.validUntil }}</td>
          <td>{{ qr.timeLeft }}</td>

          <!-- Status -->
          <td>
            <span
              class="badge px-3 py-2"
              :class="{
                'bg-success-subtle text-success': qr.status === 'Active',
                'bg-danger-subtle text-danger': qr.status === 'Expired',
                'bg-secondary-subtle text-secondary': qr.status === 'Completed'
              }"
            >
              <i
                v-if="qr.status === 'Active'"
                class="bi bi-circle-fill me-1"
                style="font-size: 0.6rem"
              ></i>
              <i
                v-if="qr.status === 'Expired'"
                class="bi bi-circle-fill me-1"
                style="font-size: 0.6rem"
              ></i>
              <i
                v-if="qr.status === 'Completed'"
                class="bi bi-circle-fill me-1"
                style="font-size: 0.6rem"
              ></i>
              {{ qr.status }}
            </span>
          </td>

          <!-- Actions -->
          <td>
            <button class="btn btn-light btn-sm me-1">
              <i class="bi bi-qr-code"></i>
            </button>
            <button class="btn btn-light btn-sm me-1">
              <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-light btn-sm">
              <i class="bi bi-x-circle"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Info Section -->
    <div class="mt-4 small text-muted">
      <h6 class="fw-semibold">How It Works:</h6>
      <ul class="mb-0">
        <li>
          Rider arrives at gate and shows QR code from their delivery app.
        </li>
        <li>
          Security scans QR → System generates temporary access (valid 30–60 mins).
        </li>
        <li>
          Rider completes delivery and exits before expiry.
        </li>
        <li>
          QR auto-expires after time limit or manual checkout by security.
        </li>
        <li>
          No permanent registration required for delivery riders.
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface StatCard {
  label: string;
  value: number;
}

interface QRRecord {
  name: string;
  initial: string;
  phone: string;
  service: string;
  purpose: string;
  code: string;
  validUntil: string;
  timeLeft: string;
  status: string;
}

const statCards: StatCard[] = [
  { label: "Active QR Codes", value: 3 },
  { label: "Expired Today", value: 1 },
  { label: "Completed", value: 1 },
  { label: "Total Today", value: 5 },
];

const qrRecords: QRRecord[] = [
  {
    name: "Ali",
    initial: "A",
    phone: "011-2233445",
    service: "Foodpanda",
    purpose: "Food Delivery",
    code: "QR-TEMP-001",
    validUntil: "01:00 PM",
    timeLeft: "15 mins",
    status: "Active",
  },
  {
    name: "Kumar",
    initial: "K",
    phone: "011-2233445",
    service: "Grab",
    purpose: "Package Delivery",
    code: "QR-TEMP-002",
    validUntil: "01:15 PM",
    timeLeft: "8 mins",
    status: "Active",
  },
  {
    name: "Wong",
    initial: "W",
    phone: "011-2233445",
    service: "Shopee",
    purpose: "Parcel Delivery",
    code: "QR-TEMP-003",
    validUntil: "12:00 PM",
    timeLeft: "Expired",
    status: "Expired",
  },
  {
    name: "Raju",
    initial: "R",
    phone: "011-2233445",
    service: "Lalamove",
    purpose: "Document Delivery",
    code: "QR-TEMP-004",
    validUntil: "01:30 PM",
    timeLeft: "22 mins",
    status: "Active",
  },
  {
    name: "Ahmad",
    initial: "W",
    phone: "011-2233445",
    service: "Grab",
    purpose: "Food Delivery",
    code: "QR-TEMP-005",
    validUntil: "11:15 AM",
    timeLeft: "Completed",
    status: "Completed",
  },
];
</script>

<style scoped>
.table td,
.table th {
  vertical-align: middle;
}

.badge {
  font-size: 0.8rem;
  border-radius: 0.5rem;
}

.alert-info {
  background-color: #eaf4ff;
  border-color: #bcdfff;
}

ul {
  list-style: disc;
  margin-left: 1rem;
}
</style>
