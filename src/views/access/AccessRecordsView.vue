<template>
  <div>
    <!-- Header -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-semibold">Entry/Exit Records</h5>
      <div class="d-flex">
        <button class="btn btn-outline-secondary btn-sm me-2">
          <i class="bi bi-download me-1"></i> Export
        </button>
        <button class="btn btn-success btn-sm">
          <i class="bi bi-plus-lg me-1"></i> Add New
        </button>
    </div>
</div>
    <!-- Stat cards -->
    <div class="row text-center mb-3">
      <div class="col" v-for="card in statCards" :key="card.label">
        <div class="card shadow-sm border-0">
          <div class="card-body py-3">
            <h6 
            class="fw-bold mb-1" 
            :class="{
                'text-success': card.label === 'In Compound'
            }"
            >
            {{ card.value }}
        </h6>
            <small class="text-muted">{{ card.label }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Table -->
    <table class="table align-middle table-bordered shadow-sm">
      <thead class="table-light">
        <tr>
          <th>Name</th>
          <th>Company</th>
          <th>Entry</th>
          <th>Exit</th>
          <th>Duration</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in accessRecords" :key="index">
          <td><strong>{{ record.name }}</strong></td>
          <td>{{ record.company }}</td>
          <td>{{ record.entry }}</td>
          <td>{{ record.exit || '-' }}</td>
          <td>{{ record.duration }}</td>
          <td>
            <span
            class="badge px-3 py-2"
            :class="{
                'bg-success-subtle text-success': record.status === 'In Compound',
                'bg-primary-subtle text-primary': record.status === 'Checked Out'
            }"
            >
            {{ record.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
const statCards = [
  { label: "In Compound", value: 15 },
  { label: "Checked Out", value: 42 },
  { label: "Avg Duration", value: "3.5h" },
  { label: "Total Today", value: 57 },
];

const accessRecords = [
  {
    name: "Ahmad Ali",
    initial: "A",
    company: "ABC Construction",
    entry: "08:30 AM",
    exit: "",
    duration: "2h 15m",
    status: "In Compound",
  },
  {
    name: "Kumar S.",
    initial: "K",
    company: "Tech Solutions",
    entry: "09:00 AM",
    exit: "",
    duration: "1h 45m",
    status: "In Compound",
  },
  {
    name: "Lee Wei",
    initial: "W",
    company: "Security Plus",
    entry: "07:45 AM",
    exit: "04:30PM",
    duration: "8h 45m",
    status: "Checked Out",
  },
];
</script>

<style scoped>
.nav-link.active{
    font-weight: 600;
}
</style>
