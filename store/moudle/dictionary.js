import request from '~/service'
const base = '/api/manager/orgAndConInfo'

export default {
  state: {
    packageStates: [
      { value: 1, txt: '已发布' },
      { value: 2, txt: '已开始' },
      { value: 3, txt: '已满额' },
      { value: 4, txt: '待审核' },
      { value: 5, txt: '审核失败' },
      { value: 6, txt: '审核成功' },
      { value: 7, txt: '待验收' },
      { value: 8, txt: '验收失败' },
      { value: 9, txt: '验收成功' },
      { value: 10, txt: '已结算' },
      { value: 11, txt: '废弃' }
    ],
    taskType: [
      { value: 1, txt: '图片'},
      { value: 2, txt: '音频'}
    ],
    consumerList: [],
    organizationList: []
  },
  mutations: {
    setListData (state, payload) {
      state.consumerList = payload.data.consumerList
      state.organizationList = payload.data.organizationList
    }
  },
  actions: {
    // 查询团队、甲方信息，仅管理员使用
    getList ({ commit }, payload) {
      return new Promise((resolve, reject) => {
        request.get(base)
        .then((res)=>{
          if(res.code === 200){
            commit({
              type: 'setListData',
              data: res.result
            })
          }
        })
      })
    }
  }
}
