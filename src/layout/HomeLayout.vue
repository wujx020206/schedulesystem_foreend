<template>
  <div class="wrapper">
    <side-bar>
      <template slot="links">
        <sidebar-link to="/home" name="主页" icon="ti-home" />
        <sidebar-link to="/store" name="门店管理" icon="ti-bell" />
        <sidebar-link to="/staff" name="员工管理" icon="ti-user"/>
        <sidebar-link to="/preference" name="偏好管理" icon="ti-heart"/>
        <sidebar-link to="/scheduling" name="排班规则管理" icon="ti-settings"/>
        <sidebar-link to="/business" name="业务预测数据管理" icon="ti-stats-up" />
        <sidebar-link to="/schedule" name="排班表" icon="ti-view-list-alt"/>
      </template>
    </side-bar>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar"> </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>

<style lang="scss"></style>

<script>
import TopNavbar from "./TopNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
import MobileMenu from "./MobileMenu";
export default {
  components: {
    TopNavbar,
    ContentFooter,
    DashboardContent,
    MobileMenu
  },
  data() {
    return {
      isClosed:true
    }
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    }
  },
};
</script>
