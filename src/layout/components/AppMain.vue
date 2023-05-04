<template>
  <section class="app-main" :class="{ 'noside-page' : (device !== 'mobile' && !pcHasSideBar) , 'app-main-pc': device !== 'mobile', 'appEditPage': isEdit, 'app-zw': socketsHeaders['x-channel'] === 'zw'}">
    <!-- <NavbarPc class="navbar-pc user-no-select" /> -->
    <!-- <div v-if="device === 'mobile' || pcHasSideBar" class="nav-record"> -->
    <!-- <span v-if="device !== 'mobile'">{{ routeName }}</span> -->
    <div class="topbar">
      <el-select
        v-model="stationVal"
        placeholder="请选择场站"
        class="select-pm station"
        size="small"
        :popper-append-to-body="false"
        style="width: 250px; height: 32px"
        @change="changeStaion"
      >
        <el-option
          v-for="item in stationList"
          :key="item.id"
          :label="item.name"
          :value="item.code"
        />
      </el-select>
      <!-- <Hamburger v-if="device !== 'mobile'" :is-active="sidebar.opened" @toggleClick="toggleSideBar" /> -->
      <UserBox class="navbarpc-userbox" />
      <!-- <div v-if="device !== 'mobile'">{{ routeName }}</div> -->
    </div>

    <!-- </div> -->
    <div class="each-page">
      <!-- <Breadcrumb class="breadcrumb-container" /> -->
      <Breadcrumb
        v-if="isShowBreadcrumb"
        slot="header"
      />
      <transition name="fade-transform" mode="out-in">
        <router-view :key="key" />
      </transition>
    </div>
  </section>
</template>

<script>
// import Hamburger from '@/components/Hamburger';
// import NavbarPc from '@/layout/components/NavbarPc';
import { mapGetters } from 'vuex';
// import { stationlistApi } from '@/api/station';
import UserBox from '@/components/UserBox';
import Breadcrumb from '@/components/Breadcrumb1';
import { all } from '@/api/stationList';

export default {
  name: 'AppMain',
  components: {
    UserBox,
    Breadcrumb
    // Hamburger,
    // NavbarPc
  },
  props: {
    pcHasSideBar: {
      type: Boolean,
      default() {
        return true;
      }
    }
  },
  data() {
    return {
      routerList: [],
      noBreadcrumbList: [],
      hideOrg: ['Organization-Rules', 'Organization-Manage', 'Operate-Account-Index',
        'Operate-Account-Settings', 'Operate-Emission', 'Chargetarget-Edit', 'Chargecalculate-Factors'],
      hideTime: ['Organization-Rules', 'Organization-Manage', 'Operate-Account-Index',
        'Operate-Account-Settings', 'Operate-Emission', 'Chargetarget-Edit',
        'Chargetarget-Index', 'Chargecalculate-Factors'],
      showBack: ['Chargetarget-Edit'],
      stationVal: '',
      stationList: []
    };
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'socketsHeaders',
      'station'
    ]),
    routeName() {
      return this.$route.meta.title;
    },
    // isShowOrg() {
    //   const { $route: route } = this;
    //   if (this.hideOrg.includes(route.name)) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    // isShowTime() {
    //   const { $route: route } = this;
    //   if (this.hideTime.includes(route.name)) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // },
    // isShowBack() {
    //   const { $route: route } = this;
    //   if (this.showBack.includes(route.name)) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    isShowBreadcrumb() {
      const { $route: route } = this;
      if (this.noBreadcrumbList.includes(route.name)) {
        return false;
      } else {
        return true;
      }
    },
    // device() {
    //   return this.$store.state.app.device
    // },
    key() {
      return this.$route.path;
    },
    isEdit() {
      const { $route: route } = this;
      // 应用编辑页面  隐藏
      if (route.name === 'AppPackage-Edit') {
        return true;
      } else {
        return false;
      }
    }
  },
  watch: {
    $route(to, from) {
      this.routerList = to.matched;
    },
    stationVal(val) {
      this.$store.dispatch('sfhsdh/setStation', val);
    }
  },
  created() {
    this.routerList = this.$route.matched;
    this.getStation();
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar');
    },
    getStation() {
      all().then(res => {
        const { data } = res;
        const result = data.list || [];
        this.stationList.splice(0, this.stationList.length, ...result);
        this.stationVal = this.stationList?.[0]?.code;
      }).catch(() => {});
    },
    changeStaion() {
      this.$store.dispatch('sfhsdh/setStation', this.stationVal);
    }
  }
};
</script>

<style lang="less" scoped>
.app-main {
  /*50 = navbar  */
  /* min-height: calc(100vh - 50px); */
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  /* padding:50px 15px 0; */
  /* padding-top: 50px; */
  box-sizing: border-box;
  /* background-color: #1f2747; */
  /* background: rgb(0, 1, 3); */
}
.station{
  margin-right: 20px;
}
/deep/.el-breadcrumb__inner.is-link {
  color: rgba(255,255,255,0.40);
}
// /deep/.el-breadcrumb__separator {
//   color: rgba(255,255,255,0.40);
// }
/deep/.el-breadcrumb__item:nth-last-child(1) {
  .el-breadcrumb__inner.is-link {
    color: rgba(255,255,255,0.80) !important;
  }
}
.app-main-pc{
   height: calc(100vh - 10px);
  //  overflow: auto;
}
.appEditPage{
  height: calc(100vh - 0px);
}
.app-zw{
  background: #3a3f53;
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.nav-record{
  width: 100%;
  z-index: 1;
  position: absolute;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  top: 0;
  left: 0;
  display: flex;
  padding:0 15px 0 0;
  justify-content: space-between;
}
// .hamburger-container{
//   line-height: 46px;
//   flex-basis: 50px;
//   flex-shrink: 0;
//   flex-grow: 0;
//   cursor: pointer;
// }
.nav-record>div{
  display: flex;
}
.nav-record>div{
  line-height: 50px;
  font-weight: bold;
  flex-basis: auto;
   text-align: left;
}
/* .fixed-header+.app-main {
  padding-top: 50px;
} */
.noside-page{
  padding-top: 0;
}
</style>

<style lang="less">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
.topbar{
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 10px;
  background-image: var(--navbar-img-topA);
  background-repeat: no-repeat;
  background-position: 50%;
}
.navbarpc-userbox{
  flex-basis: 160px;
}
</style>
