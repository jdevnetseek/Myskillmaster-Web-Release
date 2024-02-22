<template>
  <div class="master-details">
    <div class="master-details__header mb-4">
      <h5 class="mb-4">
        {{ header }}
      </h5>
      <h6
        v-if="masterObj.mine"
        class="master-details__header__btn mb-3 mt-3"
        @click="goToMasterProfile"
      >
        <v-icon color="primary">
          $edit
        </v-icon>
        Edit Master Profile
      </h6>
      <ProfileAvatarName :user="master" class="mb-2" />
      <Rating
        v-if="hasRating"
        :total="masterObj.no_of_reviews"
        :average="masterObj.average_rating"
      />
      <ReadMore :content="masterObj.master_details.about" />
    </div>
    <div class="master-details__content mb-8">
      <h6 class="mb-1">
        Master’s skills & Experiences
      </h6>
      <p>{{ masterObj.master_details.work_experiences }}</p>
    </div>
    <div v-if="masterObj.master_details.portfolio" class="master-details__portfolio">
      <h6 class="mb-2">
        Master’s Portfolio
      </h6>
      <MasterPortfolio :images="masterObj.master_details.portfolio" />
    </div>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Master Details
 * ==================================================================================
 **/

import Master from '@/models/Master'
import Lesson from '@/models/Lesson'
import ProfileAvatarName from '@/components/user/common/ProfileAvatarName'
import Rating from '@/components/common/Rating'
import ReadMore from '@/components/common/ReadMore'
import MasterPortfolio from '@/components/masters/common/MasterPortfolio'

export default {
  components: {
    ProfileAvatarName,
    Rating,
    ReadMore,
    MasterPortfolio
  },
  props: {
    master: {
      type: [Master, Object],
      required: true
    },

    hasRating: {
      type: Boolean,
      default: false
    },

    lesson: {
      type: [Lesson, Object],
      required: true
    },

    header: {
      type: String,
      default: 'Meet the Master'
    }
  },

  computed: {
    masterObj() {
      return this.master instanceof Master
        ? this.master
        : new Master(this.master)
    }
  },

  methods: {
    goToMasterProfile() {
      this.$router.push({
        name: 'settings-master-profile',
        query: {
          from: this.lesson.slug
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.master-details {
  &__header {
    &__btn {
      display: inline-block;
      color: $primary;
      cursor: pointer;
    }
  }
}
</style>
