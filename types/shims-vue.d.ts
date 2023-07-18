declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'lodash/*'
declare module 'dom-helpers'
declare module '*.js'
declare module '*.vue'
