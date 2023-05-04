<!--
 * @Descripttion: 任务中心弹窗
 * @Author: mzl
 * @Date: 2022-01-17 13:48:09
-->
<template>
  <el-collapse-transition>
    <div v-show="show" ref="alarmPopup" class="alarmPopup" @click="thisClick">
      <ul>
        <template v-if="tableData.length > 0">
          <li v-for="(item, index) in tableData" :key="index" class="flex-x">
            <div class="list">
              <el-tooltip
                class="item"
                effect="dark"
                :content="item.name"
                placement="top-start"
              >
                <div class="unitName cursor">
                  <span class="f-hidden" style="width: 110px">
                    {{ item.name }}
                  </span>
                </div>
              </el-tooltip>
              <div class="status cursor">
                <span class="f-hidden" style="width: 110px">
                  {{ item.status || "已完成" }}
                </span>
              </div>
              <div class="icon cursor">
                <template>
                  <div v-if="getPercent(item)">
                    <!-- <i class="el-icon-loading loading" /> -->
                    <el-progress
                      :width="40"
                      type="circle"
                      :percentage="Number(getPercent(item))"
                    />
                  </div>
                  <i v-else class="el-icon-download" @click="downLoad(item)" />
                </template>
              </div>
            </div>
          </li>
        </template>
        <template v-else>
          <div class="flex-x c9 a-i-c j-c-c w100 h100" style="font-size: 28px">暂无数据</div>
        </template>
      </ul>
    </div>
  </el-collapse-transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { getTaskLog } from '@/api/reportform';
const roomInfo = {
  timeStep: 6000, //  间隔毫秒长/刷新频率
  topic: 'latestTenTaskLog',
  //  其他参数
  taskType: 'export',
  channel: ''
};
export default {
  mixins: [],
  sockets: {
    [roomInfo.topic]: function(res) {
      const data = res?.response?.data?.list || [];
      this.setTableData(data);
    }
  },
  data() {
    return {
      // 音频
      tableData: [],
      show: false
    };
  },
  computed: {
    ...mapGetters([
      'socketsHeaders'
    ])
  },
  watch: {
    show: function(val) {
      if (val) {
        // 此处打开页面   打开页面时  请求一次最新数据快照
        this.updateTableData();
      }
    }
  },
  created() {
    this.connectSocket();
    // 设置全局监听
    window.addEventListener('click', this.controlTaskModal);
  },
  mounted() {},
  destroyed() {
    this.disconnectSocket();
  },
  methods: {
    connectSocket() {
      roomInfo.channel = this.socketsHeaders['x-channel'];
      this.$socket.emit('join_room', JSON.stringify(roomInfo));
    },
    disconnectSocket() {
      this.$socket.emit('leave_room', JSON.stringify(roomInfo));
    },
    isUpLoading(item) {
      return item.current < item.total;
    },
    getPercent(item) {
      if (item.status === '错误' || item.status === '完成') {
        return false;
      } else {
        // 正在导出状态  需要进行进度展示
        if (
          typeof item.current !== 'undefined' && typeof item.total !== 'undefined'
        ) {
          if (item.current === item.total || item.current > item.total) {
            return false;
          }
          let precent = Number(item.current) / Number(item.total);
          precent = (precent * 100).toFixed(0);
          return precent;
        } else {
          return false;
        }
      }
    },
    downLoad(item) {
      const url = item?.result || '';
      if (!url) {
        this.$message.warning('导出过程中存在错误 请联系管理员');
      } else {
        window.open(process.env.VUE_APP_BASE_API + url);
      }
    },
    controlTaskModal(event) {
      // 当点击其他区域时  关闭弹窗
      // const clickDom = event?.target || '';
      // const thisDom = this.$refs.alarmPopup;
      this.show = false;
    },
    thisClick(event) {
      event.stopPropagation();
      event.preventDefault();
    },
    updateTableData() {
      // 请求一次最新数据
      const params = {
        pageNum: 1,
        pageSize: 10,
        taskType: 'export'
      };
      getTaskLog(params).then(result => {
        const data = result?.data || [];
        this.setTableData(data);
      });
    },
    setTableData(data) {
      this.tableData = data;
      const loadList = data.filter(e => e.status === '正在导出');
      const num = loadList.length;
      this.$store.dispatch('warningPopup/setTaskLoadNum', num);
    }
  }
};
</script>

<style lang="less" scoped>
.alarmPopup {
  position: fixed;
  width: 420px;
  box-sizing: border-box;
  padding: 10px 10px 10px 10px;
  top: 59px;
  right: 15px;
  background-image: linear-gradient(180deg, #0b162e 0%, #16345f 100%);
  border: 1px solid #3bb4f7;
  border-radius: 2px;
  ul {
    height: 288px;
    overflow-y: auto;
    padding: 0;
    margin: 0;
    position: relative;
    // width: 98.5%;
    border: 1px solid#3E5576;
  }
  ul li {
    list-style: none;
    position: relative;
    .list {
      display: flex;
      color: #ffffff;
      font-size: 20px;
      padding: 15px 0 15px 10px;
      justify-content: center;
      align-items: center;
      border-bottom: 1px solid #3E5576;

      .unitName {
        width: 240px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
      .status {
        width: 80px;
        text-align: center;
      }
      .icon {
        width: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
        .loading {
          position: absolute;
          right: 22px;
          top: 30px;
        }
      }
    }
  }
}
/deep/.el-progress__text{
  color: #FFFFFF;
  font-size: 12px;
}
::-webkit-scrollbar {
  width: 4px;
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(216, 216, 216, 0.5) !important;
  opacity: 0.5;
  border-radius: 5px;
}
</style>

