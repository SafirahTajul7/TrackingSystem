<template>
  <div class="row">
    <!-- Map Section -->
    <div class="col-lg-8">
      <div class="card border-0 shadow-sm" style="height: 600px">
        <div class="card-header bg-white border-0 py-3">
          <div class="d-flex justify-content-between align-items-center">
            <h6 class="mb-0 fw-semibold">
              <i class="bi bi-map me-2"></i>Live GPS Tracking
            </h6>
            <div class="d-flex gap-2">
              <button class="btn btn-sm btn-outline-secondary">
                <i class="bi bi-fullscreen"></i>
              </button>
              <button class="btn btn-sm btn-outline-secondary">
                <i class="bi bi-arrows-fullscreen"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="card-body p-0 position-relative">
          <!-- Map Placeholder -->
          <div class="map-container bg-light d-flex align-items-center justify-content-center">
            <div class="text-center">
            </div>

            <!-- Zone Overlays (Demo) -->
            <div class="zone-overlay zone-a">
              <span class="zone-label">Zone A</span>
              <div class="personnel-markers">
                <div class="marker marker-contractor" style="top: 30%; left: 20%"></div>
                <div class="marker marker-contractor" style="top: 50%; left: 40%"></div>
              </div>
            </div>

            <div class="zone-overlay zone-b">
              <span class="zone-label">Zone B</span>
              <div class="personnel-markers">
                <div class="marker marker-staff" style="top: 40%; left: 60%"></div>
              </div>
            </div>

            <div class="zone-overlay zone-c">
              <span class="zone-label">Zone C</span>
              <div class="personnel-markers">
                <div class="marker marker-visitor" style="top: 70%; left: 30%"></div>
              </div>
            </div>
          </div>

          <!-- Map Legend -->
          <div class="position-absolute bottom-0 start-0 m-3 bg-white rounded p-3 shadow-sm">
            <h6 class="small fw-semibold mb-2">Legend</h6>
            <div class="d-flex flex-column gap-1">
              <div class="d-flex align-items-center gap-2">
                <div class="legend-marker bg-primary"></div>
                <small>Staff</small>
              </div>
              <div class="d-flex align-items-center gap-2">
                <div class="legend-marker bg-danger"></div>
                <small>Contractor</small>
              </div>
              <div class="d-flex align-items-center gap-2">
                <div class="legend-marker bg-warning"></div>
                <small>Visitor</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Active Personnel Sidebar -->
    <div class="col-lg-4">
      <div class="card border-0 shadow-sm" style="height: 600px">
        <div class="card-header bg-white border-0 py-3">
          <h6 class="mb-0 fw-semibold">
            <i class="bi bi-people me-2"></i>Active Personnel
          </h6>
        </div>
        <div class="card-body p-0 overflow-auto">
          <div class="list-group list-group-flush">
            <div
              v-for="person in activePersonnel"
              :key="person.id"
              class="list-group-item list-group-item-action"
              @click="$emit('viewPersonnel', person.id)"
            >
              <div class="d-flex align-items-start">
                <div
                  class="rounded-circle d-flex align-items-center justify-content-center me-2 text-white"
                  :class="getPersonTypeColor(person.type)"
                  style="width: 36px; height: 36px; min-width: 36px; font-size: 0.875rem; font-weight: 600"
                >
                  {{ person.name.charAt(0) }}
                </div>
                <div class="flex-grow-1 min-w-0">
                  <div class="d-flex justify-content-between align-items-start mb-1">
                    <h6 class="mb-0 small fw-semibold">{{ person.name }}</h6>
                    <span class="badge bg-info-subtle text-info small">
                      {{ person.zone }}
                    </span>
                  </div>
                  <div class="small text-muted mb-1">
                    <i class="bi bi-briefcase me-1"></i>
                    {{ person.task }}
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                    <span class="badge" :class="getStatusBadgeClass(person.status)">
                      {{ person.status }}
                    </span>
                    <small class="text-muted">
                      <i class="bi bi-clock me-1"></i>{{ person.lastUpdate }}
                    </small>
                  </div>
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
// Emits
const emit = defineEmits<{
  viewPersonnel: [id: number];
}>();

// Types
interface Person {
  id: number;
  name: string;
  type: "staff" | "contractor" | "visitor";
  zone: string;
  task: string;
  status: string;
  lastUpdate: string;
}

// Mock Data
const activePersonnel: Person[] = [
  {
    id: 1,
    name: "Ahmad Ali",
    type: "contractor",
    zone: "Zone A",
    task: "Maintenance",
    status: "Active",
    lastUpdate: "2 mins ago",
  },
  {
    id: 2,
    name: "Kumar S.",
    type: "contractor",
    zone: "Zone B",
    task: "IT Installation",
    status: "Active",
    lastUpdate: "5 mins ago",
  },
  {
    id: 3,
    name: "Lee Wei",
    type: "contractor",
    zone: "Zone C",
    task: "Security Audit",
    status: "Patrol",
    lastUpdate: "1 min ago",
  },
  {
    id: 4,
    name: "Siti Rahman",
    type: "staff",
    zone: "Zone A",
    task: "Patrol",
    status: "Active",
    lastUpdate: "Just now",
  },
  {
    id: 5,
    name: "Cpl. Razak",
    type: "staff",
    zone: "Main Gate",
    task: "Security",
    status: "On Duty",
    lastUpdate: "3 mins ago",
  },
  {
    id: 6,
    name: "Ali Foodpanda",
    type: "visitor",
    zone: "Main Gate",
    task: "Food Delivery",
    status: "In Compound",
    lastUpdate: "8 mins ago",
  },
];

// Helper Functions
const getPersonTypeColor = (type: string): string => {
  switch (type) {
    case "staff":
      return "bg-success";
    case "contractor":
      return "bg-primary";
    case "visitor":
      return "bg-info";
    default:
      return "bg-secondary";
  }
};

const getStatusBadgeClass = (status: string): string => {
  if (status === "Active" || status === "On Duty") {
    return "bg-success-subtle text-success";
  } else if (status === "Patrol") {
    return "bg-primary-subtle text-primary";
  } else {
    return "bg-info-subtle text-info";
  }
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

/* Zone Overlays */
.zone-overlay {
  position: absolute;
  border: 2px dashed #6c757d;
  background: rgba(108, 117, 125, 0.05);
  border-radius: 8px;
  padding: 8px;
}

.zone-a {
  top: 10%;
  left: 10%;
  width: 35%;
  height: 40%;
  border-color: #0dcaf0;
  background: rgba(13, 202, 240, 0.05);
}

.zone-b {
  top: 15%;
  right: 10%;
  width: 40%;
  height: 35%;
  border-color: #198754;
  background: rgba(25, 135, 84, 0.05);
}

.zone-c {
  bottom: 10%;
  left: 10%;
  width: 38%;
  height: 35%;
  border-color: #ffc107;
  background: rgba(255, 193, 7, 0.05);
}

.zone-label {
  position: absolute;
  top: 8px;
  left: 8px;
  background: white;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* Personnel Markers */
.personnel-markers {
  position: relative;
  width: 100%;
  height: 100%;
}

.marker {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  animation: pulse 2s infinite;
}

.marker-staff {
  background: #198754;
}

.marker-contractor {
  background: #dc3545;
}

.marker-visitor {
  background: #ffc107;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

/* Legend */
.legend-marker {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Sidebar */
.list-group-item {
  cursor: pointer;
  transition: background-color 0.2s;
}

.list-group-item:hover {
  background-color: #f8f9fa;
}

.overflow-auto {
  max-height: calc(600px - 60px);
}
</style>