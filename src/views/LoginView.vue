<template>
  <div class="container vh-100 d-flex justify-content-center align-items-center bg-light">
    <div class="card shadow p-5 text-center" style="width: 380px;">
      <div class="display-6 fw-bold text-success mb-2">T</div>
      <h3 class="fw-bold mb-1">Tracking System</h3>
      <p class="text-muted mb-4">COMMAND CONSOLE</p>

      <form @submit.prevent="login">
        <div class="mb-3 text-start">
          <label class="form-label">Username</label>
          <input v-model="username" type="text" class="form-control" placeholder="Enter Username" />
        </div>
        <div class="mb-4 text-start">
          <label class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" placeholder="Enter Password" />
        </div>
        <button class="btn btn-success w-100">Login</button>
      </form>

      <p class="text-muted small mt-4 mb-0">© 2025 Tracking System. All rights reserved</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");

function login() {
  if (username.value && password.value) {
    router.push("/dashboard");
  } else {
    alert("Please enter both username and password");
  }
}
</script>
