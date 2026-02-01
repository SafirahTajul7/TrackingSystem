import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import DashboardView from "../views/DashboardView.vue";
import SecurityTabs from "../views/security/SecurityTabs.vue";
import PersonnelTabs from "../views/personnel/PersonnelTabs.vue";
import MonitoringTabs from "../views/monitoring/MonitoringTabs.vue";
import AccessTabs from "../views/access/AccessTabs.vue";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/dashboard", name: "Dashboard", component: DashboardView },
  { path: "/security", name: "Security", component: SecurityTabs },
  { path: "/personnel", name: "Personnel", component: PersonnelTabs },
  { path: "/monitoring", name: "Monitoring", component: MonitoringTabs },
  { path: "/access", name: "Access", component: AccessTabs },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
