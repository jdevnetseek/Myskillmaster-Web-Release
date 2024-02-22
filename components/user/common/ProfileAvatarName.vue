<template>
  <div class="profile-avatar-name d-flex flex-row align-center">
    <Avatar :avatar="avatar" :size="size" class="mr-3" />
    <div class="profile-avatar-name__content">
      <h6 class="mb-0">
        {{ fullName }}
      </h6>
      <caption class="mb-0">
        {{
          location
        }}
      </caption>
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Profile Avatar & Name
 * ==================================================================================
 **/

import Avatar from '@/components/common/Avatar'

export default {
  components: {
    Avatar
  },
  props: {
    user: {
      type: Object,
      required: true
    },

    size: {
      type: Number,
      default: 48
    }
  },
  computed: {
    fullName() {
      if (this.user.full_name) {
        return this.user.full_name
      }

      return this.user.first_name && this.user.last_name
        ? `${this.user.first_name} ${this.user.last_name}`.trim()
        : this.user.email
    },
    avatar() {
      return (
        this.user.avatar ||
        this.user.avatar_permanent_thumb_url ||
        this.user.avatar_permanent_url
      )
    },

    location() {
      return this.hasLocation ? this.user.address.formatted_address : null
    },

    hasLocation() {
      return !!this.user.address
    }
  }
}
</script>
<style scoped lang="scss">
.profile-avatar-name {
  &__content {
    > * {
      display: block;
      text-align: left;
    }

    p {
    }

    caption {
      color: $secondary-text;
    }
  }
}
</style>
