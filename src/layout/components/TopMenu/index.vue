<template>
  <el-menu
    :default-active="activeIndex"
    text-color="#BDF0FA;"
    class="el-menu-demo skin-DepthBg"
    mode="horizontal"
    @select="handleSelect"
  >
    <template v-if="socketsHeaders['x-channel'] === 'zw'">
      <el-menu-item v-for="(item, index) in list" :key="index" class="each-item skin-fontDepth navbarpc" style="color:#ffffff" :index="item.index">
        <div v-if="index !== 0" class="navbarpc-line" />
        {{ item.name }}
      </el-menu-item>
    </template>
    <template v-else>
      <el-menu-item v-for="(item, index) in list" :key="index" class="each-item skin-fontDepth" :index="item.index">{{ item.name }}</el-menu-item>
    </template>
  </el-menu>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'TopMenu',
  inject: ['reload'],
  data() {
    return {
      activeIndex: '',
      activeKey: 0,
      list: [],
      originList: []
    };
  },
  // computed: {
  //   device() {
  //     return this.$store.state.app.device
  //   }
  // },
  // beforeRouteEnter(to, from, next) {
  //   console.log(to, from, next)
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(to, from, next)
  //   this.setActiveIndex()
  // },
  computed: {
    ...mapGetters(['requestHeaders', 'socketsHeaders'])
  },
  watch: {
    $route() {
      this.setActiveIndex();
    }
  },
  created() {
    // console.log(this.$router.options.routes, this.$route);
    const { list, originList, $router: { options: { routes }}} = this;
    // console.log(this.$router, routes);
    Array.prototype.slice.call(routes).forEach(item => {
      if ((!item.hidden) && item.component) {
        originList.push(item);
        list.push({
          name: item.meta.title,
          index: item.name,
          path: item.path
        });
      }
    });
    this.setActiveIndex();
  },
  methods: {
    ...mapActions({
      setPageParams: 'pageParams/setPageParams'
    }),

    setActiveIndex() {
      const { list, $route: route } = this;
      const hasDefault = list.some((item, index) => {
        if (route.name.indexOf(item.index) === 0) {
          this.activeIndex = item.index;
          this.activeKey = index;
          return true;
        }
      });
      if (!hasDefault && list.length > 0) {
        this.activeIndex = list[0].index;
        this.activeKey = 0;
      }
      // 海淡定制化逻辑 系统配置分离为按钮
      if (this.requestHeaders['x-channel'] === 'sfhsdh' || this.requestHeaders['x-channel'] === 'songz_jd') {
        if (this.$route.name.indexOf('Manage-') === 0) {
          this.activeIndex = '-1';
          this.activeKey = '-1';
        }
      }
    },

    //  设置前往的页面页码参数
    setLastLevelItemPageParams(item, key) {
      const { children } = item;
      if (children && children.length > 0) {
        this.setLastLevelItemPageParams(children[0], key);
      } else {
        //  清空前往页面页码数据
        this.setPageParams({
          [item.name]: {}
        });
        if (item.name === key) {
          //  刷新当前
          this.reload();
        }
      }
    },

    handleSelect(key, keyPath) {
      const vm = this;
      const { list, $router: { options: { routes }}, $route } = this;
      // console.log(this, list, key, keyPath);
      list.some(item => {
        // console.log(item, item.index, key, item.index === key);
        if (item.index === key) {
          if (key === 'Screen') {
            window.open(`${location.protocol}//${location.host + location.pathname}#/screen/index`);
            return true;
          } else {
            vm.$router.push(item.path);
            return true;
          }
        }
      });
      routes.some(item => {
        if (item.name === key) {
          this.setLastLevelItemPageParams(item, $route.name);
          return true;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu-demo{
  flex-basis: auto;
  flex-shrink: 1;
  flex-grow: 1;
  background-color: transparent;
  justify-content: flex-end;
}
.each-item{
  height: 100%;
}
.el-menu--horizontal>.el-menu-item{
  font-size: 18px;
  color: #BDF0FA;
}
/deep/.el-menu-item.is-active {
  border-bottom: 2px solid transparent !important;
}
.navbarpc{
  margin: 0 5px;
}
.navbarpc-line{
  height:30px;
  width: 1px;
  margin-left: -25px;
  margin-top: 15px;
  background-color:  #fff;
  opacity: 0.35;
  margin-right: 22px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 1px;
  position: absolute;
}
</style>
