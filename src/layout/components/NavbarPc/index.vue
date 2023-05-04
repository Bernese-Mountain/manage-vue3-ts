<template>
  <div v-if="isEdit" class="navbarpc">
    <div class="navbarpc-left">
      <div class="navbarpc-logo">
        <!-- <svg-icon icon-class="logo" style="width:100%;height:50px;" /> -->
        <!--<img src="@/assets/logo-pds.png">-->
        <img :src="icon">
      </div>
      <div class="navbarpc-line" />
      <div class="navbarpc-name">
        <!-- {{ projectInfo.projectName }} -->
        应用组装
      </div>
    </div>
    <div class="navbarpc-middle">
      <TopMenu v-if="isUser" class="topmenu-pc" />
    </div>
    <div class="navbarpc-right relative">
      <!-- 换肤功能暂未开放 -->
      <el-dropdown v-if="false" class="flex-x j-c-c a-i-c m-r20" @command="handleCommand">
        <span class="el-dropdown-link flex-x cf f14 skin-fontDepth change-skin-word">
          换肤<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item command="skinWhite" class="flex-x a-i-c">浅白色 <i class="ColorBlock m-l10" style="background: white" /></el-dropdown-item>
          <el-dropdown-item command="skinPink" class="flex-x a-i-c">梦幻粉 <i class="ColorBlock m-l10" style="background: red" /></el-dropdown-item>
          <el-dropdown-item command="skinBlue" class="flex-x a-i-c">天空蓝 <i class="ColorBlock m-l10" style="background: blue" /></el-dropdown-item>
          <el-dropdown-item command="skinGrey" class="flex-x a-i-c">雾霾灰 <i class="ColorBlock m-l10" style="background: pink" /></el-dropdown-item>
          <el-dropdown-item command="skinLight" class="flex-x a-i-c">浅色系 <i class="ColorBlock m-l10" style="background: white" /></el-dropdown-item> -->
          <el-dropdown-item
            v-for="(item, index) in skinList"
            :key="index"
            :class="{ active: skin === item.idName }"
            :command="item.idName"
            class="flex-x a-i-c"
          >
            {{ item.name }} <i class="ColorBlock m-l10" :style="{ backgroundColor: item.exampleBgColor }" />
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <TaskCenter v-if="requestHeaders['x-channel'] === 'zjgn'" class="navarpc-taskCenter" @click="taskCenterClick" />
      <template>
        <UserBox v-if="isShowUserBox" class="navbarpc-userbox" @tan="elasticTan" />
      </template>
      <warning-box1 v-if="requestHeaders['x-channel'] === 'zw'" ref="elastic" />
      <template v-else>
        <warning-box v-if="isTheProjectNeedWarningBox" ref="elastic" />
      </template>
      <TaskBox v-if="requestHeaders['x-channel'] === 'zjgn'" ref="taskCenter" />
    </div>
  </div>
</template>

<script>
// import Logo from '@/components/Logo'
import TopMenu from '@/layout/components/TopMenu';
import UserBox from '@/components/UserBox';
import warningBox from '@/layout/components/WarningBox/index';
import warningBox1 from '@/layout/components/WarningBox/index1';
import TaskBox from '@/layout/components/taskBox';
import TaskCenter from '@/components/taskCenter';
// import { getStorage, setStorage } from '@/utils/storage';
// import { isEmpty } from '@/utils/validate';
import { mapGetters } from 'vuex';
// import { skinList } from '@/settings';
import { defaultSettings } from '@/settings';

const { skinList } = defaultSettings;

export default {
  name: 'NavbarPc',
  components: {
    UserBox,
    TopMenu,
    warningBox,
    warningBox1,
    TaskCenter,
    TaskBox
  },
  data() {
    return {
      // logoUrl: '@/assets/logo-w.png',
      show: false,
      skinList,
      baseUrl: defaultSettings.apiBaseUrl,
      icon: require('@/assets/images/report/indexIcon.png'),
      isTheProjectNeedWarningBox: false, // 是否需求告警弹窗
      isShowUserBox: true, // 是否需要用户模块
      isUser: process.env.VUE_APP_BASE_CLIENT === 'USER'
    };
  },
  computed: {
    ...mapGetters(['skin', 'projectInfo', 'requestHeaders']),
    isEdit() {
      const { $route: route } = this;
      // 应用编辑页面  隐藏
      if (route.name === 'AppPackage-Edit') {
        return false;
      } else {
        return true;
      }
    }
  },
  created() {
    // 新增逻辑 判断当前环境项目是否需要弹窗告警
    // 添加原因 海淡项目不需要
    if (this.requestHeaders['x-channel'] === 'sfhsdh' || this.requestHeaders['x-channel'] === 'st5g') {
      this.isTheProjectNeedWarningBox = false;
    }
  },
  methods: {
    elasticTan() {
      this.$refs.elastic.show = true;
      this.$refs.taskCenter.show = false;
    },
    taskCenterClick(event) {
      const isShow = this.$refs.taskCenter.show;
      this.$refs.taskCenter.show = !isShow;

      // 此处阻止冒泡
      event.stopPropagation();
      event.preventDefault();
    },
    handleCommand(command) {
      // setStorage('skin', command);
      this.$store.dispatch('skin/setSkin', command);
    }
  }
};
</script>

<style lang="less" scoped>
.navbarpc{
    width: 100%;
    display: flex;
    position: relative;
    z-index: 10
}
.navbarpc-left{
    display: flex;
    height: 100%;
    overflow: hidden;
    /* line-height: 50px; */
    color: #fff;
    align-items: center;
    /* flex-basis: 460px; */
    flex-basis: 732px;
    flex-shrink: 0;
    flex-grow: 0;
    background-repeat: no-repeat;
    background-position: bottom;
    background-size:100%;
    // background-image: url('~@/assets/images/pm/map/lo.png');
    background-image: var(--navbar-img-logo)
    /* font-size: 20px; */
    /* background-image: linear-gradient(154deg, #223572 0%, #3851A2 100%);
    box-shadow: 2px 0 8px 0 #000915; */
}
.navbarpc-right{
    display: flex;
    justify-content: flex-end;
    // flex-basis: auto;
    flex-shrink: 1;
    // flex-grow: 1;
    flex-basis: 200px;
}

.navbarpc-logo{
    flex-shrink: 0;
    flex-grow: 0;
    /* flex-basis: 100px; */
    /* flex-basis: 80px; */
    /* flex-basis: 210px; */
    height: 60px;
    /* margin-right: 12px;
    margin-left: 12px; */
    margin-left:28px;
    margin-right:22px;
    display: flex;
    align-items: center;
}
.navbarpc-logo img{
  /* width:100%; */
  height: 40px;
  display: block;
}
.ColorBlock {
  display: inline-block;
  width: 15px;
  height: 15px;
}
.navbarpc-line{
  height:29px;
  width: 1px;
  background-color:  #fff;
  opacity: 0.35;
  margin-right: 22px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 1px;
}
.navbarpc-name{
  /* color: rgba(255,255,255,0.90); */
  color: #E3F5FF;
  font-size: 22px;
  white-space: nowrap;
  flex-grow: 0;
  flex-shrink: 0;
  text-shadow: 0 4px 10px #234687;
  font-weight: 600;
}
.navbarpc-middle{
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
  display: flex;
  flex-direction: row;
}
/**::before 用来浮动布局撑格子 */
.navbarpc-middle::before{
  content: '';
  height: 100%;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: auto;
}
.topmenu-pc{
  display:flex;
  border-color:transparent;
  height: 58px;
  /* margin-right:100px;
  margin-left:90px; */
}
.navbarpc-userbox{
  margin-left: 10px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 160px;
}
.navarpc-taskCenter{
  width: 50px;
  height: 50px;
  padding-top: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
}
/* .navbarpc-topmenu{
    flex-wrap: nowrap;
} */
.change-skin-word{
  white-space: nowrap;
}

.navbarpc-middle {
  /* 头部导航选中项的active背景色 */
  /deep/ .el-menu--horizontal>.el-menu-item.is-active{
    background-image: var(--navbar-bg-Hover);
    background-color: transparent;
    color: var(--navbar-text-color);
    text-shadow: var(--navbar-text-shadow);
    background-size: 100%;
    // color: red;
  }
  /* 头部导航选中项的hover背景色 */
  /deep/ .el-menu--horizontal>.el-menu-item:hover{
    background-image: var(--navbar-bg-Hover);
    background-color: transparent;
    color: var(--navbar-text-color);
    background-size: 100%;
  }
  /* 选中导航,点击浏览器前进后退按钮,focus背景色为白色 */
  /deep/ .el-menu--horizontal>.el-menu-item:focus{
    background-image: var(--navbar-bg-Hover);
    background-color: transparent;
    color: var(--navbar-text-color);
    background-size: 100%;
  }
}
</style>
