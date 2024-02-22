<template>
  <div class="attendance">
    <h6 class="mb-1">
      Did you attend this lesson?
    </h6>
    <div class="attendance__actions">
      <v-btn
        color="#E6F1F1"
        depressed
        class="attendance__btn attendance__btn--no"
        :disabled="isLoading"
        @click="notAttended"
      >
        No
      </v-btn>
      <v-btn
        color="primary"
        depressed
        class="attendance__btn"
        :disabled="isLoading"
        @click="attended"
      >
        Yes
      </v-btn>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AttendanceConfirmation',

  props: {
    lessonSlug: {
      type: String,
      required: true
    },
    referenceCode: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      isLoading: false
    }
  },

  methods: {
    attended() {
      this.$router.push({
        name: 'my-lessons-to-rate-reference_code',
        params: {
          reference_code: this.referenceCode
        }
      })
    },

    async notAttended() {
      this.isLoading = true
      try {
        await this.$axios.$post('/lesson/student/not-attended', {
          reference_code: this.referenceCode
        })
        this.$router.push({
          name: 'my-lessons'
        })
      } catch (err) {
        this.showSnackbar('An error occurred while updating the attendance status', false)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
<style scoped lang="scss">
.attendance {
  &__actions {
    display: flex;
    gap: 15px;
    flex-wrap: nowrap;
    margin-top: 24px;
  }

  &__btn {
    max-width: 164px;
    flex-grow: 1;
    &--no {
      color: $primary;
    }
  }
}
</style>
