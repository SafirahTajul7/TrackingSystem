<template>
    <div class="page-content">
      <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="fw-semibold">CCTV Feeds</h5>
    </div>

    <!-- Stat Cards -->
 <div class="row mb-4 g-3">
      <div
        class="col-md-3"
        v-for="card in statCards"
        :key="card.label"
      >
        <div class="card shadow-sm border-0">
          <div class="card-body d-flex justify-content-between align-items-center">
            <div>
              <h4
                class="fw-bold mb-0"
                :class="{
                  'text-success': card.label === 'Active',
                  'text-danger': card.label === 'Alert'
                }"
              >
                {{ card.value }}
              </h4>
              <small class="text-muted">{{ card.label }}</small>
            </div>
            <i :class="card.icon" class="fs-3"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Live Feeds Grid -->
     <div class="row g-3">
      <div class="col-md-3" v-for="feed in liveFeeds" :key="feed.id">
        <div class="card bg-dark text-white border-0 shadow-sm video-card position-relative overflow-hidden">

           <!-- Show video if available -->
          <video
            v-if="feed.videoUrl"
            :src="feed.videoUrl"
            autoplay
            muted
            loop
            playsinline
            class="w-100 h-100 object-fit-cover"
          ></video>

          <!-- Show placeholder if no video -->
          <div v-else class="video-placeholder d-flex align-items-center justify-content-center">
            <i class="bi bi-camera-video fs-1 text-secondary"></i>
          </div>

           <!-- LIVE label (top-left) -->
          <div class="position-absolute top-0 start-0 p-2 d-flex align-items-center">
            <span class="live-dot me-1"></span>
            <span class="fw-semibold small">LIVE</span>
          </div>

          <!-- ALERT badge (top-right, only if status is Alert) -->
          <div
            v-if="feed.status === 'Alert'"
            class="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 fw-semibold small rounded-start"
          >
            Alert
          </div>

            <div class="card-footer-overlay bg-white text-dark p-2">
              <h6 class="mb-0 fw-bold">{{ feed.name }}</h6>
              <small class="text-muted">{{ feed.zone }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const statCards = [
  { label: "Total Camera", value: 24, icon: "bi bi-camera-video text-primary" },
  { label: "Active", value: 18, icon: "bi bi-activity text-success" },
  { label: "Alert", value: 6, icon: "bi bi-exclamation-triangle text-danger" },
  { label: "Recording", value: 8, icon: "bi bi-record-circle text-info" },
];

// Mock data for video feeds
const liveFeeds = ref([
  { id: 1, name: 'Main Gate - Entrance', zone: 'Main Gate', status: 'Live', videoUrl: '/videos/cam1.mp4' },
  { id: 2, name: 'Zone A - Building 1', zone: 'Zone A', status: 'Live', videoUrl: '/videos/cam4.mp4' },
  { id: 3, name: 'Zone B - Warehouse', zone: 'Zone B', status: 'Alert', videoUrl: '/videos/cam8.mp4' },
  { id: 4, name: 'Zone C - Parking', zone: 'Zone C', status: 'Live', videoUrl: '/videos/cam2.mp4' },
  { id: 5, name: 'Zone D - Storage', zone: 'Zone D', status: 'Live', videoUrl: '/videos/cam7.mp4'  },
  { id: 6, name: 'Perimeter - North', zone: 'Perimeter', status: 'Live', videoUrl: '/videos/cam6.mp4'  },
  { id: 7, name: 'Perimeter - South', zone: 'Perimeter', status: 'Live', videoUrl: '/videos/cam5.mp4'  },
  { id: 8, name: 'Emergency Exit', zone: 'Exit', status: 'Live', videoUrl: '/videos/cam3.mp4'  },
]);
</script>

<style scoped>
.page-content {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  overflow-x: hidden; /* prevents horizontal push */
}

.video-card {
  height: 200px; /* Adjust height as needed */
  border-radius: 0.5rem;
  position: relative;
  overflow: hidden;
}

.video-card video {
  display: block;
  object-fit: cover;
}

.video-placeholder {
  height: 100%;
  background-color: #212529; /* Dark background similar to the image */
}

/* Blinking green dot */
.live-dot {
  width: 8px;
  height: 8px;
  background-color: #28a745; /* Bootstrap green */
  border-radius: 50%;
  animation: blink 3s infinite;
}

@keyframes blink {
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0.3;
  }
}

/* Make alert box stand out */
.bg-danger {
  background-color: #ff0019 !important;
}

.card-img-overlay {
  padding: 1rem;
}

.footer-info {
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0));
  margin: -1rem; /* Extend background to card edges */
  padding: 1rem;
}

.card-footer-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 0.5rem 1rem;
}

</style>
