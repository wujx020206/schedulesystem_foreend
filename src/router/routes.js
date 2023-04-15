import HomeLayout from "@/layout/HomeLayout.vue";
import NotFound from "@/views/NotFoundPage.vue";
import Loading from "@/views/Loading.vue";
import Home from "@/views/Home.vue";
import StaffManagement from "@/views/StaffManagement .vue";
import StoreManagement from "@/views/StoreManagement.vue";
import BusinessForecast from "@/views/BusinessForecast.vue";
import SchedulingRules from "@/views/SchedulingRules.vue";
import Preference from "@/views/StaffPreferences.vue";
import Schedule from "@/views/Schedule.vue";

const routes = [
  {
    path: "/",
    component: Loading,
  },
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
        component: Preference
      },
      {
        path:"/schedule",
        name:"schedule",
        component: Schedule
      }
    ],
  },
  { path: "*", component: NotFound },
];

export default routes;
