import { defineStore } from 'pinia'

const chartHistoryStore = useChartHistoryStore()
const settingStore = useSettingStore()

// 编辑区域内容
export const useChartEditStore = defineStore({
  id: 'useChartEditStore',
  state: (): ChartEditStoreType => ({
    // 画布属性
    editCanvas: {
      // 编辑区域 Dom
      editLayoutDom: null,
      editContentDom: null,
      // 偏移量
      offset: 20,
      // 系统控制缩放
      scale: 1,
      // 用户控制的缩放
      userScale: 1,
      // 锁定缩放
      lockScale: false,
      // 初始化
      isCreate: false,
      // 拖拽中
      isDrag: false,
      // 框选中
      isSelect: false
    },
    // 右键菜单
    rightMenuShow: false,
    // 鼠标定位
  }),
  getters: {
    getComponentList(): Array<CreateComponentType | CreateComponentGroupType> {
      return this.componentList
    },
    // 获取需要存储的数据项
    getStorageInfo(): ChartEditStorage {
      return {
        [ChartEditStoreEnum.EDIT_CANVAS_CONFIG]: this.getEditCanvasConfig,
        [ChartEditStoreEnum.COMPONENT_LIST]: this.getComponentList,
        [ChartEditStoreEnum.REQUEST_GLOBAL_CONFIG]: this.getRequestGlobalConfig
      }
    }
  },
  actions: {
    // * 设置 editCanvas 数据项
    setEditCanvas<T extends keyof EditCanvasType, K extends EditCanvasType[T]>(key: T, value: K) {
      this.editCanvas[key] = value
    },
    // * 找到目标 id 数据的下标位置，id可为父级或子集数组（无则返回-1）
    fetchTargetIndex(id?: string): number {
      const targetId = id || (this.getTargetChart.selectId.length && this.getTargetChart.selectId[0]) || undefined
      if (!targetId) {
        loadingFinish()
        return -1
      }
      const targetIndex = this.componentList.findIndex(e => e.id === targetId)

      // 当前
      if (targetIndex !== -1) {
        return targetIndex
      } else {
        const length = this.getComponentList.length
        for (let i = 0; i < length; i++) {
          if (this.getComponentList[i].isGroup) {
            for (const cItem of (this.getComponentList[i] as CreateComponentGroupType).groupList) {
              if (cItem.id === targetId) {
                return i
              }
            }
          }
        }
      }
      return -1
    }
  }
})
