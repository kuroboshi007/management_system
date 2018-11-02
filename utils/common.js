import request from '~/service'
let baseAuto = ''
switch (resetUserInfoFormat(userInfo) && resetUserInfoFormat(userInfo).userType) {
  case '1':
    baseAuto = '/api/manager/'
    // console.log('baseAuto M',baseAuto)
    break
  case '2':
    baseAuto = '/api/organization/'
    // console.log('baseAuto O',baseAuto)
    break
  case '3':
    baseAuto = '/api/consumer/'
    // console.log('baseAuto C',baseAuto)
    break
}


// post请求
export const axiosPostRequest = function (params, url) {
  let URL = baseAuto + url
  return new Promise((resolve, reject) => {
    request.post(URL, params)
    .then(res => {
      resolve(res)
    }, error => {
      reject(error)
    })
  })
}
// get请求
export const axiosGetRequest = function (params, url) {
  let URL = baseAuto + url
  return new Promise((resolve, reject) => {
    request.get(URL, params)
    .then(res => {
      resolve(res)
    }, error => {
      reject(error)
    })
  })
}
// 任务id获取采集任务详情,平台、团队、甲方管理员公用接口
export const getTaskInfoById = function (id) {
  var params = { id }
  return new Promise((resolve, reject) => {
    request.post('/api/baseinterface/findTaskInfoById', params)
    .then(res => {
      resolve(res)
    }, error => {
      reject(error)
    })
  })
}

// 获取数据后转换UTC日期格式
export const fmtUTCDate = function (_date) {
  var date = new Date(_date)
  var y = 1900 + date.getYear()
  var m = '0' + (date.getMonth() + 1)
  var d = '0' + date.getDate()
  return y + '-' + m.substring(m.length - 2, m.length) + '-' + d.substring(d.length - 2, d.length)
}


//转换状态格式 manager
export const fmtMstatus = function (val) {
  return val = PackageStatus.properties[val].txt
}
//转换状态格式 orgnaizition
export const fmtOrgStatus = function (val) {
  return val = orgStatus.properties[val].txt
}
//转换状态格式 consumer
export const fmtConStatus = function (val) {
  return val = conStatus.properties[val].txt
}





/* 状态值 */

/*单条任务状态 管理员*/
export const SingleStatus = {
  IS_START: 1,  //已开始
  HOLD: 2,  //暂存
  FOR_CHECKOUT: 3,  //待检验
  CHECKOUT_ERROR: 4,  //检验失败
  CHECKOUT_PASS: 5,  //检验成功
  FOR_INSPECTION: 6,  //待审核
  INSPECTION_ERROR: 7,  //审核失败
  INSPECTION_PASS: 8,  //审核成功
  ACCEPTANCE_ERROR: 9,  //验收失败
  ACCEPTANCE_SUCCESS: 10,  //验收成功
  IS_CLOSE_ACCOUNT: 11,  //已结算
  properties: {
    1: { txt:'已开始', value: 1 },
    2: { txt:'暂存', value: 2 },
    3: { txt:'待检验', value: 3 },
    4: { txt:'检验失败', value: 4 },
    5: { txt:'检验成功', value: 5 },
    6: { txt:'待审核', value: 6 },
    7: { txt:'审核失败', value: 7 },
    8: { txt:'审核成功', value: 8 },
    9: { txt:'验收失败', value: 9 },
    10: { txt:'验收成功', value: 10 },
    11: { txt: '已结算', value: 11 }
  }
}
// e.g: PackageStatus.IS_START // 1
// PackageStatus.properties[PackageStatus.IS_START].txt // 已开始


// 任务包状态
// 请求及转换 管理员 
export const PackageStatus = {
  IS_ISSUE: 1,  //已发布
  IS_START: 2,  //已开始
  FULFIL_QUOTA: 3,  //已满额
  FOR_INSPECTION: 4,  //待审核
  INSPECTION_ERROR: 5,  //审核失败
  INSPECTION_PASS: 6,  //审核成功
  FOR_ACCEPTANCE: 7,  //待验收
  ACCEPTANCE_ERROR: 8,  //验收失败
  ACCEPTANCE_SUCCESS: 9,  //验收成功
  IS_CLOSE_ACCOUNT: 10,  //已结算
  DISCARD: 11,  //废弃
  properties: {
    1: { txt:'已发布', value: 1 },
    2: { txt:'已开始', value: 2 },
    3: { txt:'已满额', value: 3 },
    4: { txt:'待审核', value: 4 },
    5: { txt:'审核失败', value: 5 },
    6: { txt:'审核成功', value: 6 },
    7: { txt:'待验收', value: 7 },
    8: { txt:'验收失败', value: 8 },
    9: { txt:'验收成功', value: 9 },
    10: { txt:'已结算', value: 10 },
    11: { txt: '废弃', value: 11 }
  }
}
// 列表 管理员
export const listMStatus = [
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
]


// 列表 团队
// 团队任务列表中状态参数为 statuss ，待审核状态的值为'3,5,6,7'
export const orgListStates = [
  { value: 1, txt: '已发布' },
  { value: 2, txt: '已开始' },
  { value: 3, txt: '已开始' },
  { value: 4, txt: '待审核' },
  { value: 5, txt: '审核失败' },
  { value: 6, txt: '待审核' },
  { value: 7, txt: '待审核' },
  { value: 8, txt: '待审核' },
  { value: 9, txt: '审核成功' },
  { value: 10, txt: '已结算' },
  { value: 11, txt: '废弃' }
]
// 请求及转换 团队 
export const orgStatus = {
  IS_ISSUE: 1,  //已发布
  IS_START: 2,  //已开始
  FULFIL_QUOTA: 3,  //已满额
  FOR_INSPECTION: 4,  //待审核
  INSPECTION_ERROR: 5,  //审核失败
  INSPECTION_PASS: 6,  //审核成功
  FOR_ACCEPTANCE: 7,  //待验收
  ACCEPTANCE_ERROR: 8,  //验收失败
  ACCEPTANCE_SUCCESS: 9,  //验收成功
  IS_CLOSE_ACCOUNT: 10,  //已结算
  DISCARD: 11,  //废弃
  properties: {
    1: { txt:'已发布', value: 1 },
    2: { txt:'已开始', value: 2 },
    3: { txt:'已开始', value: 3 },
    4: { txt:'待审核', value: 4 },
    5: { txt:'审核失败', value: 5 },
    6: { txt:'待审核', value: 6 },
    7: { txt:'待审核', value: 7 },
    8: { txt:'待审核', value: 8 },
    9: { txt:'审核成功', value: 9 },
    10: { txt:'已结算', value: 10 },
    11: { txt: '废弃', value: 11 }
  }
}


// 列表 甲方
export const conListStates = [
  { value: 1, txt: '进行中' },
  { value: 2, txt: '进行中' },
  { value: 3, txt: '进行中' },
  { value: 4, txt: '进行中' },
  { value: 5, txt: '进行中' },
  { value: 6, txt: '进行中' },
  { value: 7, txt: '待验收' },
  { value: 8, txt: '验收失败' },
  { value: 9, txt: '验收成功' },
  { value: 10, txt: '已结算' },
  { value: 11, txt: '废弃' }
]

// 请求及转换 甲方 
export const conStatus = {
  IS_ISSUE: 1,  //已发布
  IS_START: 2,  //已开始
  FULFIL_QUOTA: 3,  //已满额
  FOR_INSPECTION: 4,  //待审核
  INSPECTION_ERROR: 5,  //审核失败
  INSPECTION_PASS: 6,  //审核成功
  FOR_ACCEPTANCE: 7,  //待验收
  ACCEPTANCE_ERROR: 8,  //验收失败
  ACCEPTANCE_SUCCESS: 9,  //验收成功
  IS_CLOSE_ACCOUNT: 10,  //已结算
  DISCARD: 11,  //废弃
  properties: {
    1: { txt:'进行中', value: 1 },
    2: { txt:'进行中', value: 2 },
    3: { txt:'进行中', value: 3 },
    4: { txt:'进行中', value: 4 },
    5: { txt:'进行中', value: 5 },
    6: { txt:'进行中', value: 6 },
    7: { txt:'待验收', value: 7 },
    8: { txt:'验收失败', value: 8 },
    9: { txt:'验收成功', value: 9 },
    10: { txt:'已结算', value: 10 },
    11: { txt: '废弃', value: 11 }
  }
}




