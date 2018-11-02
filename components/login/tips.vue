<template>
  <div>
    <h3>数据标注管理后台 </h3>
    <p>{{ isLogin?'没有账号？点击下面按钮加入我们':'已有账号？点击下面按钮进行登录' }}</p>
    <button
      class="sign_in_btn transparent"
      @click="changMode()">
      {{ isLogin?'点击注册':'点击登录' }}
    </button>
  </div>
</template>
<script>
  export default {
    props: {
      isLogin: {
        type: Boolean,
        default: true
      },
    },
    methods:{
      changMode () {
        this.$emit('changMode')
      },
    }
  }
</script>