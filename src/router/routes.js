import HomeLayout from "@/layout/HomeLayout.vue";
import NotFound from "@/views/NotFoundPage.vue";
import Home from "@/views/Home.vue";
import StaffManagement from "@/views/StaffManagement .vue";
import StoreManagement from "@/views/StoreManagement.vue";
import BusinessForecast from "@/views/BusinessForecast.vue";
import SchedulingRules from "@/views/SchedulingRules.vue";
import Prefenence from "@/views/StaffPreferences.vue";

const routes = [
  {
    path: "/",
    component: HomeLayout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        name: "home",
        component: Home,
      },
      {
        path: "/staff",
        name: "staff",
        component: StaffManagement,
      },
      {
        path: "/store",
        name: "store",
        component: StoreManagement,
      },
      {
        path: "/business",
        name: "business",
        component: BusinessForecast,
      },
      {
        path: "/scheduling",
        name: "scheduling",
        component: SchedulingRules,
      },
      {
        path: "/preference",
        name:"preference",
        component: Prefenence
      }
    ],
  },
  { path: "*", component: NotFound },
];

export default routes;
