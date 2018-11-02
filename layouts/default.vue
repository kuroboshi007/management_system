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
            <BreadcrumbItem
              v-if="$store.state.menuArr.length <= 2 && $route.path!='/main'"
              v-for="menu in $store.state.menuArr"
              :key="menu">
              {{ fmtMenu(menu, $store.state.menuArr[0]) }}
            </BreadcrumbItem>
            <BreadcrumbItem
              v-if="$store.state.menuArr.length > 2"
              v-for="menu in $store.state.menuArr"
              :to='$store.state.menuArr[0] === menu || $store.state.menuArr[$store.state.menuArr.length - 1] === menu ? "" : `/${$store.state.menuArr.slice(0, $store.state.menuArr.length - 1).join("/")}`'
              :key="menu">
              {{ fmtMenu(menu, $store.state.menuArr[0]) }}
            </BreadcrumbItem>
          </Breadcrumb>
          <Card dis-hover>
            <div style="min-height: 600px">
              <nuxt v-if="isRouteAlive"/>
            </div>
          </Card>
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
          ['数据标注', 'label', 'ios-paper'],
          [
            ['任务列表', 'label-list', '/label/list'],
            ['发布任务', 'label-release', '/label/release'],
            ['数据审核', 'label-check', '/label/check']
          ]
        ),
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
          ['数据标注', 'label', 'ios-paper'],
          [
            ['任务列表', 'label-list', '/label/list'],
            ['任务验收', 'label-acceptance', '/label/acceptance']
          ]
        ),
      )
        break
      case '2': this.siderMenuItems.push(
        this.menuFormat(
          ['数据标注', 'label', 'ios-paper'],
          [
            ['任务列表', 'label-list', '/label/list'],
            ['任务质检', 'label-inspection', '/label/inspection']
          ]
        ),
        this.menuFormat(
          ['代理商管理', 'organization', 'ios-people'],
          [
            ['成员列表', 'organization-member', '/organization/member'],
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
  	fmtMenu (text, firstMenu) {
      if (firstMenu === 'label') {
        switch (text) {
          case 'label': return '数据标注'
          case 'list': return '任务列表'
          case 'edit': return '任务编辑'
          case 'split': return '任务拆分'
          case 'detail': return '详情'
          case 'release': return '发布任务'
          case 'check': return '数据审核'
          case 'audio': return '音频审核'
          case 'pictrue': return '图片审核'
          case 'inspection': return '任务质检'
          case 'acceptance': return '任务验收'
          case 'getdata': return '任务领取'
          case 'failed': return '验收失败详情'
        }
      } else if (firstMenu === 'consumer') {
        switch (text) {
          case 'consumer': return '客户管理'
          case 'list': return '客户列表'
          case 'new': return '新增客户'
        }
      } else if (firstMenu === 'organization') {
        switch (text) {
          case 'organization': return '代理商管理'
          case 'list': return '代理商列表'
          case 'new': return '新增代理商'
          case 'member': return '成员列表'
          case 'examine': return '成员审核'
        }
      } else if (firstMenu === 'information') {
        return '信息管理'
      } else if (firstMenu === 'member') {
        switch (text) {
          case 'member': return '注册人员列表'
          case 'examine': return '注册人员审核'
        }
      }
    },
    reload () {
      this.isRouteAlive = false
      this.$nextTick(() => {
        console.log('reload --- nextTick')
        this.isRouteAlive = true
      })
    }
  }
}

</script>

<style lang="less" scoped>
.layout {
  border: 1px solid #d7dde4;
  // background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}

.ivu-layout-sider{
  background-color: #fff !important;
}
</style>
