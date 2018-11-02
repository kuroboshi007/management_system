import request from '~/service'
const base = '/api/login/'
let userType = (type) => {
  switch (type) {
    case 'Manager': return `${base}checkManagerLogin`
      break
    case 'Consumer': return `${base}checkConsumerLogin`
      break
    case 'Organization': return `${base}checkOrganizationLogin`
      break
  }
}

export default {
  state:{
    test: ''
  },
  getters: {

  },
  mutations: {

  },
  actions:  {
    //登录
    handleLogin ({ commit }, { username, password, type }) {
      let params = {
        username,
        password,
        type
      }
      return new Promise((resolve, reject) => {
        request.post(userType(type), params)
        .then((e) => {
          if (e && e.code === 200) {
            resolve(e)
          } else {
            reject(e)
          }
        }, (error) => {
          // console.log(error)
          reject(error)
        })
      })
    }
  }
}
