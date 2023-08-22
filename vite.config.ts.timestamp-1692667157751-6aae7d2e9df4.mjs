// vite.config.ts
import { defineConfig } from "file:///E:/Personal/Desktop/personal/vue/vue-project/manage-vue3-ts/node_modules/vite/dist/node/index.js";
import AutoImport from "file:///E:/Personal/Desktop/personal/vue/vue-project/manage-vue3-ts/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///E:/Personal/Desktop/personal/vue/vue-project/manage-vue3-ts/node_modules/unplugin-vue-components/dist/vite.mjs";
import { ElementPlusResolver } from "file:///E:/Personal/Desktop/personal/vue/vue-project/manage-vue3-ts/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import { resolve } from "path";
import vue from "file:///E:/Personal/Desktop/personal/vue/vue-project/manage-vue3-ts/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_dirname = "E:\\Personal\\Desktop\\personal\\vue\\vue-project\\manage-vue3-ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver({ importStyle: false })]
    }),
    Components({
      resolvers: [ElementPlusResolver({ importStyle: false })]
    })
  ],
  resolve: {
    alias: {
      "@": resolve(__vite_injected_original_dirname, "src")
      // 路径别名
    },
    extensions: [".js", ".json", ".ts", ".vue"]
    // 使用路径别名时想要省略的后缀名，可以自己 增减
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@import "@/styles/index.scss";`
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxQZXJzb25hbFxcXFxEZXNrdG9wXFxcXHBlcnNvbmFsXFxcXHZ1ZVxcXFx2dWUtcHJvamVjdFxcXFxtYW5hZ2UtdnVlMy10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcUGVyc29uYWxcXFxcRGVza3RvcFxcXFxwZXJzb25hbFxcXFx2dWVcXFxcdnVlLXByb2plY3RcXFxcbWFuYWdlLXZ1ZTMtdHNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L1BlcnNvbmFsL0Rlc2t0b3AvcGVyc29uYWwvdnVlL3Z1ZS1wcm9qZWN0L21hbmFnZS12dWUzLXRzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCBBdXRvSW1wb3J0IGZyb20gJ3VucGx1Z2luLWF1dG8taW1wb3J0L3ZpdGUnXG5pbXBvcnQgQ29tcG9uZW50cyBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy92aXRlJ1xuaW1wb3J0IHsgRWxlbWVudFBsdXNSZXNvbHZlciB9IGZyb20gJ3VucGx1Z2luLXZ1ZS1jb21wb25lbnRzL3Jlc29sdmVycydcbmltcG9ydCB7IHJlc29sdmUgfSBmcm9tICdwYXRoJ1xuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgdnVlKCksXG4gICAgQXV0b0ltcG9ydCh7XG4gICAgICByZXNvbHZlcnM6IFtFbGVtZW50UGx1c1Jlc29sdmVyKHsgaW1wb3J0U3R5bGU6IGZhbHNlIH0pXSxcbiAgICB9KSxcbiAgICBDb21wb25lbnRzKHtcbiAgICAgIHJlc29sdmVyczogW0VsZW1lbnRQbHVzUmVzb2x2ZXIoeyBpbXBvcnRTdHlsZTogZmFsc2UgfSldLFxuICAgIH0pLFxuICBdLFxuICAgIHJlc29sdmU6IHtcbiAgICAgIGFsaWFzOiB7XG4gICAgICAgICdAJzogcmVzb2x2ZShfX2Rpcm5hbWUsICdzcmMnKSAvLyBcdThERUZcdTVGODRcdTUyMkJcdTU0MERcbiAgICAgIH0sXG4gICAgICBleHRlbnNpb25zOiBbJy5qcycsICcuanNvbicsICcudHMnLCAnLnZ1ZSddIC8vIFx1NEY3Rlx1NzUyOFx1OERFRlx1NUY4NFx1NTIyQlx1NTQwRFx1NjVGNlx1NjBGM1x1ODk4MVx1NzcwMVx1NzU2NVx1NzY4NFx1NTQwRVx1N0YwMFx1NTQwRFx1RkYwQ1x1NTNFRlx1NEVFNVx1ODFFQVx1NURGMSBcdTU4OUVcdTUxQ0ZcbiAgICB9LFxuICAgIGNzczoge1xuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgICBzY3NzOiB7XG4gICAgICAgICAgLy8gYWRkaXRpb25hbERhdGE6IGBAaW1wb3J0IFwiQC9zdHlsZXMvaW5kZXguc2Nzc1wiO2BcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlYLFNBQVMsb0JBQW9CO0FBQzlZLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sZ0JBQWdCO0FBQ3ZCLFNBQVMsMkJBQTJCO0FBQ3BDLFNBQVMsZUFBZTtBQUN4QixPQUFPLFNBQVM7QUFMaEIsSUFBTSxtQ0FBbUM7QUFRekMsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osV0FBVztBQUFBLE1BQ1QsV0FBVyxDQUFDLG9CQUFvQixFQUFFLGFBQWEsTUFBTSxDQUFDLENBQUM7QUFBQSxJQUN6RCxDQUFDO0FBQUEsSUFDRCxXQUFXO0FBQUEsTUFDVCxXQUFXLENBQUMsb0JBQW9CLEVBQUUsYUFBYSxNQUFNLENBQUMsQ0FBQztBQUFBLElBQ3pELENBQUM7QUFBQSxFQUNIO0FBQUEsRUFDRSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLFFBQVEsa0NBQVcsS0FBSztBQUFBO0FBQUEsSUFDL0I7QUFBQSxJQUNBLFlBQVksQ0FBQyxPQUFPLFNBQVMsT0FBTyxNQUFNO0FBQUE7QUFBQSxFQUM1QztBQUFBLEVBQ0EsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBO0FBQUEsTUFFTjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
