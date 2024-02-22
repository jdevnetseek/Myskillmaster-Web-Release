<template>
  <v-avatar
    class="avatar"
    :size="size"
    :style="{
      background: background,
    }"
    v-bind="$attrs"
  >
    <img :src="image" :alt="alt" :draggable="draggable">
  </v-avatar>
</template>
<script>
/**
 * ==================================================================================
 * Avatar
 * ==================================================================================
 **/
import IMAGE from '@/utils/Image'

export default {
  props: {
    avatar: {
      type: [String, Object],
      default: () => null
    },

    alt: {
      type: String,
      default: 'alt'
    },

    size: {
      type: [String, Number],
      default: 97
    },

    background: {
      type: String,
      default: '#e8e8e8'
    },

    draggable: {
      type: Boolean,
      default: false
    },

    defaultAvatar: {
      type: String,
      default: require('@/assets/logo.svg')
    }
  },

  computed: {
    image() {
      return IMAGE.url(this.avatar ? this.avatar : this.defaultAvatar)
    }
  }
}
</script>
<style scoped lang="scss">
.avatar {
}
</style>
