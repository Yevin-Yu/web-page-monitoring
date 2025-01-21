import { createRouter, createWebHistory } from "vue-router";
import useLogin from "@/hooks/useLogin";
import DatasetHome from "../views/HomeView/DatasetHome.vue";
import WorkbenchView from "../views/Workbench/WorkbenchView.vue";
import ProjectManagementView from "@/views/ProjectManagement/ProjectManagementView.vue";
import BrowsingHistory from "@/views/BrowsingHistory/BrowsingHistoryView.vue"
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/guest",
      name: "home",
      component: DatasetHome,
    },
    {
      path: "/workbench",
      name: "workbench",
      component: WorkbenchView,
    },
    {
      path: "/project-managementView",
      name: "ProjectManagementView",
      component: ProjectManagementView,
    },
    {
      path: "/browsing-history",
      name: "BrowsingHistory",
      component: BrowsingHistory,
    },
  ],
});
router.beforeEach((to, from, next) => {
  const publicPages = ["/guest"];
  const authRequired = !publicPages.includes(to.path);
  // 获取登录状态
  let { isLogin } = useLogin();
  if (authRequired && !isLogin.value) {
    next("/guest");
  } else if (to.path === "/" && isLogin.value) {
    next("/workbench");
  } else {
    next();
  }
});
export default router;
