<template>
  <Avatar
    class="profile-avatar"
    :avatar="image"
    :size="size"
    :background="background"
    :alt="name"
    v-bind="$attrs"
  />
</template>
<script>
/**
 * ==================================================================================
 * Profile Avatar
 * ==================================================================================
 **/
import { mapGetters } from 'vuex'
import Avatar from '@/components/common/Avatar'

export default {
  components: {
    Avatar
  },
  props: {
    size: {
      type: [String, Number],
      default: 97
    },

    background: {
      type: String,
      default: '#e8e8e8'
    }
  },

  computed: {
    ...mapGetters({
      isLoggedIn: 'user/isLoggedIn',
      name: 'user/getUserName',
      user: 'user/getUser'
    }),

    image() {
      if (!this.isLoggedIn) {
        return null
      }

      return (
        this.user.avatar ||
        this.user.avatar_permanent_thumb_url ||
        this.user.avatar_permanent_url
      )
    }
  }
}
</script>
<style scoped lang="scss">
.profile-avatar {
}
</style>
