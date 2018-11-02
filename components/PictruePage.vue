<template>
  <div class="pictruePage-container">
    <div
      v-if="!loading && data.length === 0"
      class="pictruePage-noData">暂无数据</div>
    <Modal
      id="alertBox"
      v-model="showModal"
      :mask-closable='false'
      :closable='false'
      width='400'
      class-name="vertical-center-modal">
      <p
        slot="header"
        style="fontSize:20px;color:#f60;text-align:center">
        抽检结果
      </p>
      <p style="fontSize:16px;color:#333;text-align:center">抽检总数：{{ totalNum }}个</p>
      <p style="fontSize:16px;color:#333;text-align:center">审核通过：{{ passNum }}个</p>
      <p style="fontSize:16px;color:#333;text-align:center">审核失败：{{ errorNum }}个</p>
      <p style="fontSize:16px;color:#333;text-align:center">审核通过率：{{ percent }}%</p>
      <div slot="footer">
        <Button
          type="error"
          size="large"
          @click="cancelBtn">不通过</Button>
        <Button
          v-if="showOkBtn"
          type="success"
          size="large"
          @click="okBtn">确认通过</Button>
      </div>
    </Modal>
    <div
      v-if="!loading && data.length !== 0"
      v-for="(item, index) in data"
      :key="index"
      class="pictrue-dataBox">
      <table
        width="70%"
        class="table"
        v-show="activeData === index">
        <tr>
          <th>序号</th>
          <th>任务名称</th>
          <th>成员名称</th>
        </tr>
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ item.taskName }}</td>
          <td>{{ item.userName }}</td>
        </tr>
      </table>
      <div
        v-for="(ite, ind) in item.collectData.value.url"
        :key="ind"
        v-if="activeData === index && activePic === ind"
        class="pictrue-picBox">
        <div
          @click="prePic(ind)"
          :class="ind === 0 ? ['pictrue-arrowLBox', 'pictrue-noClick']: ['pictrue-arrowLBox', 'pictrue-click']">
          <img
            :src="ind === 0 ? require('../assets/images/arrowNone.png') : require('../assets/images/arrow.png')"
            alt="">
        </div>
        <div class="pictrue-preBox">
          <pic-zoom
            :url="ite"
            @imgIsOk='imgisoK'
            :scale="3"/>
          <img
            v-if="imgLoading"
            src="../assets/images/loading.gif" >
        </div>
        <div
          @click="nextPic(ind, item.collectData.value.url)"
          :class="ind === item.collectData.value.url.length - 1 ? ['pictrue-arrowRBox', 'pictrue-noClick'] : ['pictrue-arrowRBox', 'pictrue-click']">
          <img
            id="imgEl"
            :src="ind === item.collectData.value.url.length - 1 ? require('../assets/images/arrowNone.png') : require('../assets/images/arrow.png')"
            alt="">
        </div>
        <div class="pictrue-picNumBox">
          <span>{{ ind + 1 }}</span> / <span>{{ item.collectData.value.url.length }}</span>
        </div>
      </div>
      <div
        v-show="activeData === index"
        class="pictrue-btnBox">
        <Button
          @click="preData(index)"
          :disabled='index === 0 ? true : false'
          type="primary">上一条</Button>
        <Button
          @click="passBtn(index)"
          size='large'
          type="primary">审核通过</Button>
        <Button
          @click="noPassBtn(index)"
          size='large'
          type="error">审核不通过</Button>
        <Button
          @click="nextData(index)"
          :disabled='index === data.length - 1 ? true : false'
          type="primary">下一条</Button>
      </div>
    </div>
    <Spin
      v-if="loading"
      fix>
      <Icon
        type="ios-loading"
        size=58
        class="demo-spin-icon-load login-loading-style"></Icon>
      <div style="fontSize: 20px">Loading...</div>
    </Spin>
  </div>
</template>

<script>
import PicZoom from './PicZoom'
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    },
    loading: {
      type: Boolean,
      default: false
    },
    isHandle: {
      type: Number,
      default: null
    },
    isShow: {
      type: Boolean,
      default: false
    },
    totalNum: {
      type: Number,
      default: 0
    },
    passNum: {
      type: Number,
      default: 0
    },
    errorNum: {
      type: Number,
      default: 0
    },
    percent: {
      type: Number,
      default: 0
    },
    standPercent: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      columns: [],
      activeData: 0,
      activePic: 0,
      imgLoading: true,
      showModal: false,
      showOkBtn: true
    }
  },
  components: {
    PicZoom
  },
  watch: {
    isHandle (val, oldVal) {
      this.imgLoading = true
      if (val > this.data.length - 1) {
        this.activeData = this.data.length - 1
      }
    },
    isShow (val, oldVal) {
      this.showModal = val
    },
    percent (val, oldVal) {
      Number(val) >= this.standPercent ? this.showOkBtn = true : this.showOkBtn = false
    }
  },
  created () {

  },
  mounted () {
    document.querySelector('#alertBox button').className = 'ivu-btn ivu-btn-error ivu-btn-large'
  },
  methods: {
    imgisoK (data) {
      data ? this.imgLoading = false : this.imgLoading = true
    },
    preData (index) {
      this.imgLoading = true
      this.activePic = 0
      if (index) {
        this.activeData = --index
      } else {
        return
      }
    },
    nextData (index) {
      this.imgLoading = true
      this.activePic = 0
      this.$emit('nextData', index)
      if (this.data.length - 1 > index ) {
        this.activeData = ++index
      } else {
        return
      }
    },
    passBtn (index) {
      this.$emit('passBtn', index)
    },
    noPassBtn (index) {
      this.$emit('noPassBtn', index)
    },
    prePic (index) {
      if (index) {
        this.imgLoading = true
        this.activePic = --index
      } else {
        return
      }
    },
    nextPic (index, arr) {
      if (arr.length - 1 > index ) {
        this.imgLoading = true
        this.activePic = ++index
      } else {
        return
      }
    },
    okBtn () {
      this.showModal = false
      this.$emit('okBtn')
    },
    cancelBtn () {
      this.showModal = false
      this.$emit('cancelBtn')
    }
  }
}
</script>

<style lang="less" scoped>
.pictruePage-container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  .pictruePage-noData{
    width: 100%;
    font-size: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .pictrue-picBox{
    width: 68%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    .pictrue-noClick{
      cursor: not-allowed;
    }
    .pictrue-click{
      cursor: pointer;
    }
    .pictrue-arrowLBox{
      width: 45px;
      transform: rotate(180deg);
      img{
        width: 100%;
      }
    }
    .pictrue-arrowRBox{
      width: 45px;
      img{
        width: 100%;
      }
    }
    .pictrue-picNumBox{
      font-size: 16px;
      position: absolute;
      bottom: -25px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  .pictrue-dataBox{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    .pictrue-preBox{
      margin-top: 20px;
      width: 320px;
      min-height: 320px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      img{
        width: 100%;
      }
    }
    .pictrue-btnBox{
      margin-top: 30px;
      width: 80%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
    }
  }
}
.ivu-btn-text{
  background-color: #de1d1d;
  color: #fff;
}
table {
  border-collapse: collapse;
  margin: 0 auto;
  text-align: center;
}
table td, table th {
  border: 1px solid #808185;
  color: #515a6e;
  height: 30px;
}
table tr th {
  background-color: #f8f8f9;
  width: 100px;
}
table tr td {
  background: #fff;
}
</style>
