<template>
  <div>
    <AudioPlayer
      v-for="(item, index) in Itmes"
      :key="index"
      :title='index + 1'
      :source='item'/>
  </div>
</template>

<script>
import AudioPlayer from './AudioPlayer'
export default {
  props: {
    Itmes: {
      type: Array,
      default: () => []
    }
  },
  components: {
    AudioPlayer
  }
}
</script>
