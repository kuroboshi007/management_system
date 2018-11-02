<template>
  <section>
    <div v-if="userInfo.userType == '1'">
      <Manager/>
    </div>
    <div v-if="userInfo.userType == '2'">
      <Organization/>
    </div>
    <div v-if="userInfo.userType == '3'">
      <Consumer/>
    </div>
  </section>
</template>

<script>
import Manager from '~/components/homepages/manager.vue'
import Organization from '~/components/homepages/organization.vue'
import Consumer from '~/components/homepages/consumer.vue'

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  components: {
    Manager,
    Organization,
    Consumer
  },
  created () {
    if (Object.keys(this.$store.state.userInfo).length !== 0) {
      this.userInfo = this.$store.state.userInfo
    } else {
      this.userInfo = userInfo !== '[[${userInfo}]]' ? resetUserInfoFormat(userInfo) : this.$store.state.userInfo
    }
  },
  mounted () {

  },
  methods: {

  }
}

</script>

<style lang="less" scoped>

</style>
