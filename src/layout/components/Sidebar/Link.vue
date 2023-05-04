
<template>
  <!-- eslint-disable vue/require-component-is -->
  <!-- <component v-bind="linkProps(to)">
    <slot />
  </component> -->
  <component is="div" @click="jumpTo(to, itemData)">
    <slot />
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate';
import { mapActions } from 'vuex';

export default {
  inject: ['reload'],
  props: {
    to: {
      type: String,
      required: true
    },

    itemData: {
      type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      setPageParams: 'pageParams/setPageParams'
    }),

    jumpTo(url, itemData) {
      const { $route } = this;
      if (isExternal(url)) {
        const otherWindow = window.open(url);
        otherWindow.opener = null;
      } else {
        this.setPageParams({
          [itemData.name]: {}
        });
        if ($route.name === itemData.name) {
          //  刷新当前
          this.reload();
        } else {
          //  前往其它页面
          this.$router.push({ name: itemData.name });
        }
      }
    }
  }
};
</script>
