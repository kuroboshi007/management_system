<template>
  <Header class="header">
    <Menu
      class="header-container"
      mode="horizontal"
      active-name="1"
    >
      <div class="layout-logo">
        <p>数据标注管理后台</p>
      </div>
      <Dropdown
        class="user_wrap"
        trigger="click"
        placement='bottom-end'
        @on-click='dropDownClick'
        style="margin-left: 20px">
        <Avatar
          size="large">
          USER
        </Avatar>
        <Icon
          type="md-arrow-dropdown"
          size="16" />
        <DropdownMenu
          class="user_menu"
          slot="list">
          <DropdownItem
            name='userName'
            disabled>
            <Icon 
              class="fz_grape"
              type="md-person" /> 
            {{ userInfo.userName }} [ {{ userInfo.userType=='1'?'管理员':(userInfo.userType=='2'?'代理商':'客户') }} ]
          </DropdownItem>
          <DropdownItem
            name='userPhone'
            disabled>
            <Icon 
              class="fz_navy"
              type="md-phone-portrait" /> {{ userInfo.userPhone }}
          </DropdownItem>
          <Divider />
          <DropdownItem name='logOut'>
            <Icon 
              type="md-log-out" 
              size="15" /> 安全退出
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Menu>
  </Header>
</template>
<script>

export default {
  name: 'LayoutHeader',
  data () {
    return {
      loginModalVisible: false,
      registerModalVisible: false,
      userInfo: {}
    }
  },
  created () {
    this.userInfo = userInfo !== '[[${userInfo}]]' ? resetUserInfoFormat(userInfo) : this.$store.state.userInfo
  },
  mounted () {

  },
  methods: {
    jumpPage (url) {
      this.$router.push({
        path: url
      })
    },
    dropDownClick (name) {
      if (name === 'logOut') return window.location.href = 'http://2k16j87776.imwork.net:27425/logout'
      // if (name === 'logOut') return window.location.href = 'http://xiaobu-manage.bind.ai/logout'
      return
    }
  }
}
</script>
<style lang="less" scoped>
.header-container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}
.user_menu{
  .ivu-divider-horizontal{
    margin: 5px 0;
  }
}
.layout-logo{
  // width: 200px;
  // height: 30px;
  // background: #5b6270;
  // border-radius: 3px;
  float: left;
  p {
    color: #5b6270;
    font-size: 24px;
    line-height: 30px;
    text-align: center;
  }
}
.user_wrap{
  width: 60px;
  text-align: center;
}
</style>
