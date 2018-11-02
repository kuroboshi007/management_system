<template>
  <Sider
    :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto', zIndex: '999'}"
    width="240">
    <Menu
      class="menu_active"
      :open-names="openNames"
      :active-name="activeName">
      <!-- <Submenu name="1">
        <template slot="title">
          <Icon type="md-home" /> 首页
        </template>
      </Submenu> -->
      <MenuItem
        :to="'/main'"
        name='main'>
      <Icon type="md-home" /> 首页
      </MenuItem>
      <Submenu
        v-for="(item, index) in subMenuItems"
        :key="index"
        :name="item.subMenuName">
        <template slot="title">
          <Icon :type="item.subMenuIcon" /> {{ item.subMenu }}
        </template>
        <MenuItem
          v-for="(ite, ind) in item.menuItems"
          :key="ind"
          :name="ite.menuName"
          :to="ite.menuPath">{{ ite.menu }}</MenuItem>
      </Submenu>
      <MenuItem
        v-if="userInfo && userInfo.userType === '1'"
        :to="'/member'"
        name='member'>
      <Icon type="ios-contact" /> 注册人员列表
      </MenuItem>
      <MenuItem
        v-if="userInfo && userInfo.userType === '3'"
        :to="'/information'"
        name='information'>
      <Icon type="ios-construct" /> 信息管理
      </MenuItem>
    </Menu>
  </Sider>
</template>
<script>
export default {
  name: 'LayoutSider',
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    this.userInfo = userInfo !== '[[${userInfo}]]' ? resetUserInfoFormat(userInfo) : this.$store.state.userInfo
  },
  methods: {

  },
  props: {
    subMenuItems: {
      require: true,
      type: Array,
      default: () => {
        return []
      }
    },
    activeName: {
      require: false,
      type: String,
      default: '1'
    },
    openNames: {
      require: false,
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>
