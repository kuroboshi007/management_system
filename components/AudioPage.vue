<template>
  <div class="audioPage-container">
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
    <div class="task_list">
      <Table
        :loading="loading"
        width="100%"
        border
        size="small"
        :columns="columns"
        :data="data">
      </Table>
      <div style="margin-top: 30px;overflow: hidden">
        <div style="float: right;">
          <Page
            :total="pageTotal"
            :current="1"
            @on-change="changePage">
          </Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AudioPlayer from './AudioPlayer'
import ForTemp from './forTemplate'
export default {
  data () {
    return {
      columns: [],
      showModal: false,
      showOkBtn: true
    }
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    pageTotal: {
      type: Number,
      default: null
    },
    isShow: {
      type: Boolean,
      default: false
    },
    totalNum: {
      type: String,
      default: '150'
    },
    passNum: {
      type: String,
      default: '100'
    },
    errorNum: {
      type: String,
      default: '50'
    },
    percent: {
      type: String,
      default: '50'
    },
    standPercent: {
      type: Number,
      default: null
    }
  },
  watch: {
    isShow (val, oldVal) {
      this.showModal = val
    },
    percent (val, oldVal) {
      Number(val) >= this.standPercent ? this.showOkBtn = true : this.showOkBtn = false
    }
  },
  created () {
    this.columns = [
      {
        title: '序号',
        type: 'index',
        width: 100,
      },
      {
        title: 'ID',
        key: 'id',
        width: 100,
        fixed: 'left'
      },
      {
        title: '任务名称',
        key: 'name',
        render: (h, params) => {
          return h('div', [
            h('strong', params.row.taskName)
          ])
        }
      },
      { title: '用户名', key: 'userName', width:200},
      {
        title: '音频',
        key: 'audio',
        align: 'center',
        render: (h, params) => {
          if (Array.isArray(JSON.parse(params.row.collectData.value).url)) {
           return <ForTemp Itmes={JSON.parse(params.row.collectData.value).url} />
          } else {
            return <AudioPlayer title={1} source={JSON.parse(params.row.collectData.value).url} />
          }
        },
      },
      {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: (h, params) => {
          return h('div', {class:'clearfix'},[
            h('Button', {
              props: {
                type: 'success',
                size: 'small'
              },
              class:'fl',
              style: {
                marginRight: '5px'
              },
              on: {
                click: () => {
                  this.passBtn(params.index)
                }
              }
            }, '通过'),
            h('Button', {
              props: {
                type: 'error',
                size: 'small'
              },
              class:'fr',
              on: {
                click: () => {
                  this.noPassBtn(params.index)
                }
              }
            }, '不通过')
          ])
        },
        fixed: 'right'
      }
    ]
  },
  methods: {
    changePage (currentPage) {
      this.$emit('changePage', currentPage)
    },
    passBtn (index) {
      this.$emit('passBtn', index)
    },
    noPassBtn (index) {
      this.$emit('noPassBtn', index)
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
.audioPage-container{
  width: 100%;
}
</style>
