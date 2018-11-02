<template>
  <div>
    <h3 class="sign_in_txt">登陆</h3>
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
    </Form>
    <button
      class="sign_in_btn"
      @click="login()">登陆
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
      login(){
        console.log('登陆成功')
      }
    }
  }
</script>