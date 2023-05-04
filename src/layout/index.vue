<template>
  <div :class="classObj" class="app-wrapper">
    <template v-if="device !== 'mobile'">
      <!-- <NavbarPc class="navbar-pc user-no-select" /> -->
      <div>
        <sidebar v-if="pcHasSideBar" class="sidebar-container" />
        <!-- <div :class="{'fixed-header':fixedHeader}">
          <navbar />
        </div> -->
        <div class="main-container" :class="{'main-no-sidebar': !pcHasSideBar}">
          <app-main v-if="showPageComp" :pc-has-side-bar="pcHasSideBar" />
        </div>
      </div>
    </template>
    <template v-else>
      <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
      <sidebar class="sidebar-container" />
      <div class="main-container">
        <div :class="{'fixed-header':fixedHeader}">
          <navbar />
        </div>
        <app-main v-if="showPageComp" :pc-has-side-bar="pcHasSideBar" />
      </div>
    </template>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components';
// import NavbarPc from '@/layout/components/NavbarPc';
import ResizeMixin from './mixin/ResizeHandler';

export default {
  name: 'Layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
    // NavbarPc
  },
  mixins: [ResizeMixin],
  props: {
    showPageComp: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar;
    },
    device() {
      return this.$store.state.app.device;
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader;
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      };
    },
    pcHasSideBar() {
      // 冀北系统所有菜单转移到左侧  侧边栏需要一直显示
      // const { $route: route, $router: { options: { routes }}} = this;
      // // 应用编辑页面  隐藏
      // if (route.name === 'AppPackage-Edit') {
      //   return false;
      // }
      // const key = route.name.split('-')[0];
      // let targetItem = null;
      // const hasKey = Array.prototype.slice.call(routes).some(item => {
      //   if (item.name === key) {
      //     targetItem = item;
      //     return true;
      //   }
      // });
      // if (hasKey) {
      //   if (targetItem.hasOwnProperty('children') && targetItem.children.length > 0) {
      //     if (targetItem.children.length > 1 && !targetItem.children[0].hidden) {
      //       return true;
      //     } else {
      //       if (targetItem.children[0].hasOwnProperty('children')) {
      //         return true;
      //       }
      //     }
      //   }
      // }
      // if (process.env.VUE_APP_BASE_CLIENT === 'USER') {
      //   return true;
      // }
      // return false;
      return true;
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false });
    }
  }
};
</script>

<style lang="less" scoped>
  @import "~@/styles/mixin.less";
  @import "~@/styles/variables.less";

  .app-wrapper {
    .clearfix();
    position: relative;
    height: 100%;
    width: 100%;
    background-image: var(--content-img-bg);
    background-repeat: no-repeat;
    background-position: center;

    .navbar-pc{
      // height: 50px;
      height: var(--navbar-height);
      overflow: hidden;
      background-image: var(--navbar-img-topA);
      background-repeat: no-repeat;
      background-position: center;
      box-shadow: var(--navbar-img-shadow);
      border-bottom: var(--navbar-border-bottom, none);
    }
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 10;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    // width: calc(100% - var(@sideBarWidth)); todo1129
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  #app .main-no-sidebar{
    margin-left: 0;
  }
</style>
