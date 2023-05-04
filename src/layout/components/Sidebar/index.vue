<template>
  <!-- 'has-logo':showLogo 类添加方案删掉 采用flex布局动态自适应高度 -->
  <div :class="{ 'sidebar-pc': device !== 'mobile'}" class="sidebar-box user-no-select">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <SfhsdhStation />
    <el-scrollbar wrap-class="scrollbar-wrapper" class="skin-sidebarBg">
      <!-- <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      > -->
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="'transparent'"
        :text-color="variables.skinSidebarTextColor"
        :unique-opened="false"
        active-text-color="#fff"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="handleBasePath(route.path)" />
      </el-menu>
    </el-scrollbar>
    <!-- <div v-show="device !== 'mobile'" class="hamburger-box">
      <hamburger :is-active="sidebar.opened" :fill-color="'#fff'" class="hamburger-container" @toggleClick="toggleSideBar" />
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Logo from './Logo';
import SidebarItem from './SidebarItem';
import variables from '@/styles/variables.less';
// import Hamburger from '@/components/Hamburger';
import { isExternal } from '@/utils/validate';
import SfhsdhStation from '@/components/sfhsdh/station.vue';
// import { parse } from 'path-to-regexp';

export default {
  components: { SidebarItem, Logo, SfhsdhStation },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'device',
      'requestHeaders'
    ]),
    routes() {
      // const { $route: route, $router: { options: { routes }}} = this;
      // if (this.$store.state.app.device === 'mobile') {
      //   return routes;
      // } else {
      //   const list = [];
      //   routes.some(item => {
      //     if (route.name.indexOf(item.name) === 0) {
      //       if (item.hasOwnProperty('children')) {
      //         list.push(...item.children);
      //         return true;
      //       }
      //     }
      //   });
      //   return list;
      // }

      const { $router: { options: { routes }}} = this;
      return routes;
    },
    activeMenu() {
      const route = this.$route;
      const { matched } = route;
      // if set path, the sidebar will highlight the path you set
      // if (meta.activeMenu) {
      //   return meta.activeMenu;
      // }
      let path = '';
      for (let i = matched.length - 1; i >= 0; i--) {
        if (matched[i].meta.hidden) {
          continue;
        } else {
          path = matched[i].path;
          break;
        }
      }
      // console.log(path, '菜单名');
      return path;
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo;
      // return true;
    },
    variables() {
      return variables;
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  created() {
    // console.log(this.requestHeaders['x-channel']);
    this.judgeEnvironment();
  },
  methods: {
    judgeEnvironment() {
      // this.address = '//iot-dev.iot.sedt.com/commonfront';
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    handleBasePath(path) {
      // debugger;
      if (this.device === 'mobile') {
        return path;
      } else {
        const { $route: route, $router: { options: { routes }}} = this;
        // let originPath = '';
        routes.some(item => {
          if (route.name.indexOf(item.name) === 0) {
            // originPath = item.path;
            return true;
          }
        });
        if (isExternal(path)) {
          const pathParams = `${path}/#/?projectName=${this.requestHeaders['x-channel']}`;
          return pathParams;
        }
        // console.log(originPath + path);
        return path;
        // return originPath + path;
      }
    }
  }
};
</script>

<style lang="less" scoped>
#app  .sidebar-pc{
  // padding-bottom: 30px;
  top: 0px;
  height:calc(100vh - 10px);
}
.hamburger-box{
  height: 30px;
  background: var(--sidebarBg);
  text-align: center;
  .hamburger-container{
    display: var(--sideBarShow);
    height: 100%;
  }
}
.sidebar-box{
  display: flex;
  flex-direction: column;
}
.skin-sidebarBg {
  background-image: var(--sidebarBg);
}
.sidebar-box /deep/ .el-menu-item.is-active{
  background: var(--sidebarSelect);
  // color: #BDF0FA;
  color: var(--sidebarTextColor) !important;
  border-left: var(--sidebarSelectBorder, none);
}
/deep/ .submenu-title-noDropdown,
/deep/ .el-submenu__title {
  &:hover {
    background: var(--sidebarHover) !important;
  }
}
</style>
