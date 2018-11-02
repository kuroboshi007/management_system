<template>
  <div>
    <h3 class="sign_in_txt">注册</h3>
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
    </Form>
    <button
      class="sign_in_btn"
      @click="register()">注册
    </button>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          username: '',
          password: '',
          type: ''
        },
        ruleInline: {
          username: [
            { required: true, message: '请输入你的用户名', trigger: 'blur' },
            { min: 3, message: '用户名不能少于三个字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入你的密码', trigger: 'blur' },
            { min: 6, message: '密码不能少于6位数', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      changMode () {
        this.$emit('changMode')
      },
      register () {
        console.log('注册成功')
      }
    }
  }
</script>