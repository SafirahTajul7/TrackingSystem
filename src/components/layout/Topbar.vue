<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom px-4 shadow-sm">
    <div class="container-fluid justify-content-between">
      <span class="navbar-brand fw-bold">Dashboard</span>
      <div class="d-flex align-items-center">
        <button class="btn btn-outline-success me-3">
          <i class="bi bi-bell"></i> 
        </button>
        <div class="dropdown">
          <a class="dropdown-toggle text-success fw-semibold" href="#" data-bs-toggle="dropdown">
            Admin
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li><a class="dropdown-item" href="#">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>
