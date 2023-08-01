import { defineStore } from 'pinia'
import Cookies from 'js-cookie'


interface appStore {
  sidebar: {
    opened: Boolean,
    withoutAnimation: Boolean
  }
  device: string
};
// 编辑区域内容
export const useAppStore = defineStore({
  id: 'useAppStore',
  state(): any {
    return {
      sidebar: {
        opened: true,
        withoutAnimation: false
      },
      device: 'desktop'
    }
  },
  getters: {
    //
  },
  actions: {
    toggleSideBar() {
      this.state.sidebar.opened = !this.state.sidebar.opened
      this.state.sidebar.withoutAnimation = false
      if (this.state.sidebar.opened) {
        Cookies.set('sidebarStatus', '1');
      } else {
        Cookies.set('sidebarStatus', '0')
      }
    },
    closeSideBar(withoutAnimation: Boolean) {
      Cookies.set('sidebarStatus', '0')
      this.state.sidebar.opened = false
      this.state.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(device: string) {
      this.state.device = device
    }
  }
})
