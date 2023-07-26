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
  state: () => ({
    sidebar: {
      opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
      withoutAnimation: false
    },
    device: 'desktop'
  }),
  getters: {
    //
  },
  actions: {
    toggleSideBar(state:appStore) {
      state.sidebar.opened = !state.sidebar.opened
      state.sidebar.withoutAnimation = false
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1)
      } else {
        Cookies.set('sidebarStatus', 0)
      }
    },
    closeSideBar(state:appStore, withoutAnimation: Boolean) {
      Cookies.set('sidebarStatus', 0)
      state.sidebar.opened = false
      state.sidebar.withoutAnimation = withoutAnimation
    },
    toggleDevice(state:appStore, device: string) {
      state.device = device
    }
  }
})
