<template>
  <div>
    <Layout>
      <Layout :style="{marginLeft: '0px'}">
        <!-- <LayoutHeader/> -->
        <Content :style="{padding: '0'}">
          <Breadcrumb :style="{padding: '16px', boxSizing: 'border-box'}">
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
          <Card
            dis-hover>
            <div style="min-height: 600px">
              <nuxt/>
            </div>
          </Card>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import LayoutHeader from '~/components/layoutheader'
export default {
  data () {
    return {

    }
  },
  computed: {

	},
  created () {

  },
  components: {
    LayoutHeader
  },
  mounted () {

  },
  methods: {
  	fmtMenu (text, firstMenu) {
      if (firstMenu === 'collect') {
        switch (text) {
          case 'collect': return '数据采集'
          case 'list': return '任务列表'
          case 'organizationlist': return '任务列表'
          case 'consumerlist': return '任务列表'
          case 'edit': return '任务编辑'
          case 'split': return '任务拆分'
          case 'detail': return '详情'
          case 'release': return '发布任务'
          case 'check': return '数据审核'
          case 'audio': return '音频审核'
          case 'pictrue': return '图片审核'
          case 'inspection': return '任务质检'
          case 'acceptance': return '任务验收'
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
