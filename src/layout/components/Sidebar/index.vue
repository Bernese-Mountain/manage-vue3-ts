<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
import { computed } from 'vue'
import { useStore } from 'pinia'
import { useRouter } from 'vue-router';

const mapStore = useStore();
const router = useRouter();
const routes = router.getRoutes();

const activeMenu = computed(() => {
      const { meta, path } = routes
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
});
const showLogo = computed(() => mapStore.state.settings.sidebarLogo);
const isCollapse = computed(() => !mapStore.sidebar.opened);

</script>
