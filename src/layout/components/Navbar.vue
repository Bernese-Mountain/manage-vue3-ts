<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" :arrow="arrow_direction" class="hamburger-container" @toggleClick="toggleSideBar" />

    <!-- <TopMenu v-show="device !== 'mobile'" class="top-menu" /> -->
    <!-- <TopMenu class="top-menu" /> -->

    <breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <UserBox />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Breadcrumb from '@/components/Breadcrumb';
import Hamburger from '@/components/Hamburger';
import UserBox from '@/components/UserBox';
// import TopMenu from './TopMenu'

// console.log(TopMenu)
export default {
  components: {
    Breadcrumb,
    // TopMenu,
    UserBox,
    Hamburger
  },
  data() {
    return {
      arrow_direction: true
    };
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ])
  },
  methods: {
    toggleSideBar() {
      this.arrow_direction = this.sidebar.opened;
      this.$store.dispatch('app/toggleSideBar');
    }
  }
};
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  height: 50px;
  // overflow: hidden;
  z-index:1;
  position: relative;
  background: #2D3C6B;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  // .main-menu{
  //   // display: flex;
  //   flex-basis: auto;
  //   flex-grow: 1;
  //   flex-shrink: 1;
  //   text-align: center;
  // }
  // .main-menu>li{
  //   display: inline-block;
  // }
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    // float: left;
    flex-grow: 1;
    flex-shrink: 1;
    flex-basis: auto;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #ffffff;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }
  }
}
</style>
