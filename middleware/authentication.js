export default (context) => {
  if (context.route.path !='/' && context.route.path !='/manage/main'&& context.route.path !='/manage/information') {
    // const parts = this.$route.path.split('/').slice(1)
    // return parts.slice(1)
    let openMenuArr = context.route.name.split('-')
    openMenuArr.pop()
    context.store.state.menuArr = context.route.name.split('-')
    context.store.state.activeMenu = context.route.name
    context.store.state.openMenu = openMenuArr
  }
}
