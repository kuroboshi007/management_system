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
import Tips from '~/components/login/tips'
import loginForm from '~/components/login/login'
import registerForm from '~/components/login/register'

export default {
  layout: 'free',
  components: {
    Tips,
    loginForm,
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
    changMode(){
      this.loginFrom = !this.loginFrom
    }
  }
}
</script>

