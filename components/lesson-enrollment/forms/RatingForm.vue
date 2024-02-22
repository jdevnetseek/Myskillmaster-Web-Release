<template>
  <div class="rating-form">
    <ProfileAvatarName :user="masterProfile" class="mb-2" />
    <h5 class="mb-3">
      Rate your experience with this master
    </h5>
    <div>
      <Stars :size="50" :gap="2" :value="rating" interactive @clicked="rate">
        <div slot="bottom-label" class="d-flex justify-space-between">
          <span v-if="isNeedsImprovement">Needs improvement</span>
          <span v-if="isExcellent">Excellent!</span>
        </div>
      </Stars>
    </div>
    <v-btn
      class="rating-form__submit-btn"
      color="primary"
      depressed
      block
      :disabled="isSubmitButtonDisabled"
      :loading="isLoading"
      @click="submit"
    >
      Submit rating
    </v-btn>
  </div>
</template>
<script>
import ProfileAvatarName from '@/components/user/common/ProfileAvatarName'
import Stars from '@/components/common/Rating/common/Stars'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    ProfileAvatarName,
    Stars
  },
  mixins: [SnackbarMixin],
  props: {
    masterProfile: {
      type: Object,
      required: true
    },
    referenceCode: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      rating: 0
    }
  },
  computed: {
    isSubmitButtonDisabled() {
      return !this.rating || this.isLoading
    },

    isExcellent() {
      return this.rating === 0 || this.rating >= 4
    },

    isNeedsImprovement() {
      return this.rating === 0 || !this.isExcellent
    }
  },
  methods: {
    rate(index) {
      this.rating = index
    },
    async submit() {
      this.isLoading = true
      try {
        await this.$axios.post('/rate/master', {
          reference_code: this.referenceCode,
          rating: this.rating
        })
        this.$router.push({
          name: 'my-lessons-to-rate-reference_code-success',
          params: {
            reference_code: this.referenceCode
          }
        })
      } catch (err) {
        this.showSnackbar('An error occurred while rating the master', false)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.rating-form {
  &__submit-btn {
    margin-top: 100px;
  }
}
</style>
