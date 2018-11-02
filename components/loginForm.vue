<template>
  <Form
    ref="LoginForm"
    :model="formInline"
    :rules="ruleInline">
    <FormItem
      prop="username"
      class="login_item">
      <Input
        type="text"
        v-model="formInline.username"
        placeholder="Username">
      <Icon
        type="ios-person-outline"
        slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem
      prop="password"
      class="login_item">
      <Input
        type="password"
        v-model="formInline.password"
        placeholder="Password">
      <Icon
        type="ios-lock-outline"
        slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <RadioGroup v-model="formInline.type">
        <Radio label="Manager">管理员登录</Radio>
        <Radio label="Organization">代理商登录</Radio>
        <Radio label="Consumer">客户</Radio>
      </RadioGroup>
    </FormItem>
    <FormItem>
      <Button
        type="primary"
        long
        @click="handleSubmit">登陆</Button>
      <nuxt-link
        style="text-align: center;display: block;"
        to="/register">没有账号？点击注册</nuxt-link>
    </FormItem>
  </Form>
</template>
<script>
export default {
  name:'LoginForm',
  data () {
    return {
       formInline: {
        username: '',
        password: '',
        type: ''
      },
      ruleInline: {
        username: [
          { required: true, message: 'Please fill in the user name', trigger: 'blur' },
          { min: 3, message: 'The userName length cannot be less than 3 bits', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please fill in the password.', trigger: 'blur' },
          { min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
        ]
      }
    }
  },
  created () {

  },
  updated () {

  },
  methods: {
    handleSubmit () {
      this.$refs.LoginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.formInline.username,
            password: this.formInline.password,
            type: this.formInline.type
          })
        }
      })
    }
  }
}
</script>

