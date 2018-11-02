<template>
  <div>
    <Layout>
      <LayoutSider
        :open-names='$store.state.openMenu'
        :active-name='$store.state.activeMenu'
        :sub-menu-items='siderMenuItems'/>
      <Layout :style="{marginLeft: '240px'}">
        <LayoutHeader/>
        <Content :style="{padding: '0 16px 16px'}">
          <Breadcrumb :style="{margin: '16px 0'}">
            <BreadcrumbItem to="/main">首页</BreadcrumbItem>
          </Breadcrumb>
          <div style="min-height: 600px">
            <nuxt v-if="isRouteAlive"/>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import LayoutHeader from '~/components/layoutheader'
import LayoutSider from '~/components/layoutsider'
export default {
  data () {
    return {
      isRouteAlive: true,
      siderMenuItems: [],
      userInfo: {}
    }
  },
  computed: {

  },
  provide () {
    return {
      reload: this.reload
    }
  },
  created () {
    if (userInfo !== '[[${userInfo}]]') {
      this.$store.state.userInfo = resetUserInfoFormat(userInfo)
      this.userInfo = resetUserInfoFormat(userInfo)
    } else {
      this.userInfo = this.$store.state.userInfo
    }
    switch (this.userInfo && this.userInfo.userType) {
      case '1': this.siderMenuItems.push(
        this.menuFormat(
          ['数据采集', 'collect', 'ios-paper'],
          [
            ['任务列表', 'collect-list', '/collect/list'],
            ['发布任务', 'collect-release', '/collect/release'],
            ['数据审核', 'collect-check', '/collect/check']
          ]
        ),
        // this.menuFormat(
        //   ['数据标注', 'label', 'ios-flag'],
        //   [
        //     ['任务列表', 'label-list', '/label/list'],
        //     ['发布任务', 'label-release', '/label/release'],
        //     ['审核任务', 'label-examine', '/label/examine']
        //   ]
        // ),
        this.menuFormat(
          ['客户管理', 'consumer', 'ios-construct'],
          [
            ['客户列表', 'consumer-list', '/consumer/list'],
            ['新增客户', 'consumer-new', '/consumer/new']
          ]
        ),
        this.menuFormat(
          ['代理商管理', 'organization', 'ios-people'],
          [
            ['代理商列表', 'organization-list', '/organization/list'],
            ['新增代理商', 'organization-new', '/organization/new']
          ]
        )
      )
        break
      case '3': this.siderMenuItems.push(
        this.menuFormat(
          ['数据采集', 'collect', 'ios-paper'],
          [
            ['任务列表', 'collect-consumerlist', '/collect/consumerlist'],
            ['任务验收', 'collect-acceptance', '/collect/acceptance']
          ]
        ),
        // this.menuFormat(
        //   ['信息管理', 'collect', 'ios-paper']
        // ),
        // this.menuFormat(
        //   ['数据标注', 'label', 'ios-flag'],
        //   [
        //     ['任务列表', 'label-list', '/label/list'],
        //     ['审核任务', 'label-examine', '/label/examine']
        //   ]
        // )
      )
        break
      case '2': this.siderMenuItems.push(
        this.menuFormat(
          ['数据采集', 'collect', 'ios-paper'],
          [
            ['任务列表', 'collect-organizationlist', '/collect/organizationlist'],
            ['任务质检', 'collect-inspection', '/collect/inspection']
          ]
        ),
        // this.menuFormat(
        //   ['数据标注', 'label', 'ios-flag'],
        //   [
        //     ['任务列表', 'label-list', '/label/list'],
        //     ['审核任务', 'label-examine', '/label/examine']
        //   ]
        // ),
        this.menuFormat(
          ['代理商管理', 'organization', 'ios-people'],
          [
            ['成员列表', 'organization-member', '/organization/member'],
            // ['新增成员', 'organization-new', '/organization/new']
          ]
        )
      )
        break
    }
  },
  components: {
    LayoutHeader,
    LayoutSider
  },
  mounted () {

  },
  methods: {
    isChinese (temp) {
      let reg = new RegExp('[\\u4E00-\\u9FFF]+$', 'g')
      if (reg.test(temp)) return true
      return false
    },
    getMenuItems (arr) {
      let newArr = arr.map((curVal, index) => {
        let ObjInit = {}
        curVal.map((cv) => {
          let Obj = {}
          if (this.isChinese(cv)) {
            Obj['menu'] = cv
          } else if (cv.indexOf('-') !== -1) {
            Obj['menuName'] = cv
          } else if (cv.indexOf('/') !== -1) {
            Obj['menuPath'] = cv
          }
          ObjInit = Object.assign(Obj, ObjInit)
        })
        return ObjInit
      })
      return newArr
    },
    getMenuMain (arr) {
      let ObjInit = {}
      arr.map((cv) => {
        let Obj = {}
        if (this.isChinese(cv)) {
          Obj['subMenu'] = cv
        } else if (cv.indexOf('-') !== -1) {
          Obj['subMenuIcon'] = cv
        } else {
          Obj['subMenuName'] = cv
        }
        ObjInit = Object.assign(Obj, ObjInit)
      })
      return ObjInit
    },
    menuFormat (Arr, ArrItem) {
      let Obj = {}
      Obj = Object.assign(this.getMenuMain(Arr), {})
      Obj['menuItems'] = this.getMenuItems(ArrItem)
      return Obj
    },
    reload () {
      this.isRouteAlive = false
      this.$nextTick(() => {
        this.isRouteAlive = true
      })
    }
  }
}

</script>

<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

</style>
