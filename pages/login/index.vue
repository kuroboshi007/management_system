<template>
  <section class="login">
    <div :class="{'login_tips':loginFrom,'login_from':!loginFrom}">
      <Tips 
        v-if="loginFrom"
        @changMode='changMode'></Tips>
      <registerForm v-if="!loginFrom"></registerForm>
    </div>
    <div :class="{'login_from':loginFrom,'login_tips':!loginFrom}">
      <loginForm v-if="loginFrom"></loginForm>
      <Tips 
        v-if="!loginFrom"
        :is-login="false"
        @changMode='changMode'></Tips>
    </div>
  </section>
</template>
<script>
import { mapActions } from 'vuex'
import loginForm from '~/components/login/form'
import Tips from '~/components/login/tips'
import registerForm from '~/components/register/form'

export default {
  layout: 'free',
  components: {
    loginForm,
    Tips,
    registerForm,
  },
  head () {
    return {
      title: this.loginFrom?'标注后台管理系统-登陆':'标注后台管理系统-注册'
    }
  },
  data () {
    return {
      loginFrom: true,
    }
  },
  created () {

  },
  methods: {
    ...mapActions(['handleLogin']),
    async handleSubmit ({ username, password, type }) {
      this.$Loading.start()
      try {
        let data = await this.handleLogin ({ username, password, type })
        if (data && data.code === 200) {
          this.$Loading.finish()
          window.location.href = '/main'
        }
      } catch (error) {
        this.$Loading.error()
        this.errorProcessFn(error)
      }
    },
    errorProcessFn (error) {
      if (error && error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
        this.$Spin.hide()
        this.$Message.error({
          content: '请求超时，请检查网络',
          duration: 0,
          closable: true
        })
      } else {
        this.$Spin.hide()
        this.$Message.error({
          content: error ? error.message : '身份验证失败',
          duration: 1.5
        })
      }
    },
    changMode(){
      this.loginFrom = !this.loginFrom
    }
  }
}
</script>

