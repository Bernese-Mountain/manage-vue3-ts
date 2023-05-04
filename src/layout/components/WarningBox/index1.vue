<template>
  <el-collapse-transition>
    <div v-show="show" class="alarmPopup">
      <ul>
        <li v-for="(item,index) in tableData" :key="index" class="flex-x">
          <div class="stationName flex-x a-i-c j-c-c">
            <el-tooltip class="item" effect="dark" :content="item.stationName" placement="top-start">
              <p :style="{'-webkit-line-clamp':item.resultList.length}" class="cursor">{{ item.stationName }}</p>
            </el-tooltip>
          </div>
          <div class="list">
            <div v-for="(val,i) in item.resultList" :key="i" class="listP flex-x" :class="{'active' : val.eventType == 1}">
              <el-tooltip class="item" effect="dark" :content="val.eventDesc" placement="top-start">
                <p class="unitName cursor">
                  <span class="f-hidden" style="width:170px"> {{ val.eventDesc }} </span>
                </p>
              </el-tooltip>
              <p class="time flex-y t-a-r">
                <span class="f-hidden"> {{ parseTime(val.ct, '{h}:{i}:{s}') }} </span>
                <span class="f-hidden"> {{ parseTime(val.ct, '{y}:{m}:{d}').replace(/:/g,'/') }} </span>
              </p>
              <p class="button flex-y t-a-r">
                <BtnPm size="mini" :width="90" style="font-size:14px" class="BtnPm-z" :name="'查看详情'" @click="jumpToDetail(val)" />
              </p>
            </div>
          </div>
        </li>
      </ul>
      <div class="footer flex-x a-i-c">
        <div class="footerList flex-x j-c-a a-i-c">
          <BtnPm size="mini" :width="94" style="font-size:14px" :name="'收起'" @click="close" />
          <!-- <BtnPm size="mini" :width="94" style="font-size:14px" class="BtnPm-z" :color="'#28D9FF'" :name="'查看详情'" @click="seeDetails" /> -->
          <template>
            <BtnPm v-if="isOpenVoice" size="mini" :width="94" style="font-size:14px" :name="'关闭声音'" @click="offVoice" />
            <BtnPm v-else size="mini" :width="94" style="font-size:14px" :name="'打开声音'" @click="openVoice" />
          </template>
          <!-- <div class="btn cursor" @click="close">
            收起
          </div>
          <i class="steel" />
          <div class="btn cursor" @click="seeDetails">
            查看详情
          </div>
          <i class="steel" />
          <div class="btn cursor" @click="offVoice">
            关闭声音
          </div> -->
        </div>
      </div>
      <audio id="play" ref="myAudio" style="height:0px" :src="musicList" :loop="true" :autoplay="true" />
    </div>
  </el-collapse-transition>
</template>

<script>
import { mapGetters } from 'vuex';
import { parseTime } from '@/utils/index';
import { SocketMixin } from '@/utils/mixin';
import { stationNewWarn } from '@/api/kpi';
// import { detailsToJump } from '@/api/robot';
import { mapActions } from 'vuex';
export default {
  mixins: [SocketMixin],
  sockets: {
    GET_EVENT: function(res) {
      if (typeof res === 'string') {
        // 清除场站
        this.spliceStr(res);
      } else {
        // 新增 去除 场站
        this.changeArr(res);
      }
    }
  },
  data() {
    return {
      // 音频
      musicList: './ringTone/alarm_td.mp3',
      AudioSwitch: false,
      tableData: [],
      show: false,
      isOpenVoice: false
    };
  },
  computed: {
    ...mapGetters([
      // 铃铛数量
      'warningNumber',
      // 铃铛铃声
      'warnigPlayer',
      // 铃铛弹框
      'warnigPopup',
      // 用户id
      'userId'
    ])
  },
  watch: {
    // 音频播放
    warningNumber(name, val) {
      if (!name) {
        this.offVoice();
        this.show = false;
      }
    }
  },
  mounted() {
    // 告警音频默认静音
    this.$refs.myAudio.muted = true;
    stationNewWarn().then(res => {
      if (res.data.length > 0) {
        const list = [];
        // 抽出所有的场站
        res.data.forEach(item => {
          if (list.indexOf(item.stationName) === -1) {
            list.push(item.stationName);
          }
        });
        this.tableData = [];
        // 梳理数组结构
        list.forEach((item, index) => {
          this.tableData[index] = { stationName: item, resultList: [] };
          // this.tableData[index].stationName = item;
          res.data.forEach(item1 => {
            if (item === item1.stationName) {
              item1.eventType = 1;
              this.tableData[index].resultList.push(item1);
            }
          });
        });
        // 数量
        let num = 0;
        this.tableData.forEach(res => {
          num += res.resultList.length;
          //  铃声弹框
          const z = res.resultList.findIndex(s => s.news === 2);
          if (z === -1) {
            this.show = true;
            // 因chrome现在音频自动播放原因  暂时设置默认静音
            // this.audioPlayer();
          }
        });
        // 历史问题 登录时展开弹窗 无论是否调用audioPlayer都会播放 次数设置默认静音
        this.$store.dispatch('warningPopup/setNumber', num);
      }
    });
  },
  methods: {
    ...mapActions({
      setCrewData: 'sbkNav/setCrewData'
    }),
    // 跳转
    seeDetails() {
      this.$router.push({ path: '/warning' });
    },
    // zw 铃铛列表 每列告警跳转到对应的告警信息页面
    jumpToDetail(item) {
      // this.$router.push({ name: 'ZwMonitoring-FanDetails', params: { code: item.unitId, stationCode: item.stationId, stationName: item.stationName }});
      this.$router.push({
        name: 'ZwAlgorithm-WarningDetails'
      });
      this.$router.push({
        name: 'ZwAlgorithm-WarningDetails',
        params: {
          id: item._id,
          code: item.modelCode,
          stationCode: item.sid,
          unitId: item.unitId
        }
      });
    },
    // 时间戳
    parseTime(data, value) {
      if (data) {
        return parseTime(data, value);
      }
      return '';
    },
    // 音频播放事件
    audioPlayer() {
      this.$nextTick(() => {
        this.$refs.myAudio.play();
        this.isOpenVoice = true;
      });
    },
    // 关闭声音
    offVoice() {
      this.$refs.myAudio.pause();
      this.isOpenVoice = false;
    },
    openVoice() {
      // 手动调用按钮  开始语音告警
      this.$refs.myAudio.muted = false;
      this.tableData.forEach(res => {
        const z = res.resultList.findIndex(s => s.news === 2);
        if (z === -1) {
          this.audioPlayer();
        }
      });
    },
    // 关闭告警
    close() {
      this.show = false;
    },
    // 新增 替换 删除 场站
    changeArr(res) {
      // 处理数据
      const arr = {
        stationName: '',
        resultList: []
      };
      // title
      arr.stationName = res[0].stationName;
      // 子长站
      res.forEach(item => {
        arr.resultList.push(item);
      });
      // 过滤场站替换新的场站
      const index = this.tableData.findIndex(i => {
        return i.stationName === res[0].stationName;
      });
      if (index === -1) {
        this.tableData.unshift(arr);
      } else {
        this.tableData.splice(index, 1, arr);
      }
      // 数量
      let num = 0;
      // 告警状态
      const news = [];
      this.tableData.forEach(res => {
        // 数量
        num += res.resultList.length;
        // 告警状态
        res.resultList.forEach(res => {
          news.push(res.news);
        });
      });
      const isNwse = news.findIndex(i => {
        return i === 2;
      });
      if (isNwse === -1) {
        this.show = false;
        this.offVoice();
      } else {
        this.show = true;
        this.audioPlayer();
      }
      this.$store.dispatch('warningPopup/setNumber', num);
    },
    // 清除场站
    spliceStr(val) {
      const index = this.tableData.findIndex(item => {
        return item.stationName === val;
      });
      if (index !== -1) {
        this.tableData.splice(index, 1);
      }
      const length = this.tableData.length;
      if (!length) {
        this.$store.dispatch('warningPopup/setNumber', 0);
        this.show = false;
        this.offVoice();
        // 告警清除时  关闭弹窗  关闭声音  此时更新按钮状态
      }
    }
  }
};
</script>

<style lang="less" scoped>
.alarmPopup {
  position: fixed;
  width: 500px;
  box-sizing: border-box;
  padding: 17px 20px 0 20px;
  top: 59px;
  right: 15px;
  background-image: linear-gradient(180deg, #262A39 0%, #262A39 100%);
  // background-color: #262A39;
  border: 1px solid #0fc3B4;
  border-radius: 2px;
  .title {
    font-size: 14px;
    color: #FFFFFF;
    margin: 7px 0;
  }
  ul {
    max-height: 288px;
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
    // margin-bottom: 4px;
    // margin-right: 3px;
    .stationName {
      border: 1px solid #3E5576;
      flex: 0 0 70px;
      p {
        // width: 100px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        margin: 0;
        line-height: 22px;
        font-size: 16px;
        color: #FFFFFF;
      }
    }
    .list {
      flex: 1;
      margin: 0;
      padding: 0;
      // padding-top: 2px;
      .listP {
        box-sizing: border-box;
        height: 58px;
        line-height: 58px;
        // margin: 0 0 2px 0;
        border: 1px solid #3E5576;
        padding: 0;
        width: 100%;
        background-origin:content-box;
        background-clip:content-box;
        color: #fff;
        p {
          padding: 0;
          margin: 0;
        }
        .unitName {
          margin: 0 0 0 16px;
          padding: 0;
          font-size: 16px;
          // flex: 1;
          flex-basis:170px;
          span {
            display: block;
          }
        }
        .button{
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          background-image: linear-gradient(180deg, #262A39 0%, #262A39 100%);
        }
        .time {
          font-size: 10px;
          padding-right: 14px;
          box-sizing: border-box;
          justify-content: space-evenly;
          span {
            height: 18px;
            line-height: 16px;
            font-size: 14px;
          }
        }
      }
      .active {
        background: #FF4D4F;
        color: #C1DEFF;
        background-origin:content-box;
        background-clip:content-box;
      }
    }
  }
  .footer {
    justify-content: center;
    .footerList {
      margin: 15px 0;
      width: 378px;
      height: 32px;
      .btn {
        width: 92px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        font-size: 12px;
        color: #FFFFFF;
      }
      .btn {
        &:hover {
          background: #409EFF;
        }
      }
      .steel {
        width: 1px;
        height: 20px;
        background: #484F77;
      }
    }
  }
}
/deep/ .btn-pm.default-btn{
  background-image: linear-gradient(180deg, #262A39 0%, #262A39 100%);
  border: 1px solid #47FEEB;
}
/deep/.cell {
  overflow: hidden;
  text-overflow: ellipsis; //超出部分以省略号显示
  white-space: nowrap;
}
/deep/.is-scrolling-none {
  max-height: 444px;
  overflow-y: auto;
}
::-webkit-scrollbar {
  width: 4px;
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background: rgba(216,216,216,0.50) !important;
  opacity: 0.5;
  border-radius: 5px;
}
</style>
