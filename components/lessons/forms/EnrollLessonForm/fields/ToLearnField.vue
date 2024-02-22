<template>
  <div class="to-learn-field">
    <v-textarea
      v-model="form.to_learn"
      type="text"
      flat
      filled
      hide-details="auto"
      placeholder="What do you want to learn..."
      :no-resize="true"
      :maxlength="500"
      :counter="500"
      :disabled="form.$busy"
      :error-messages="
        form.$getError('to_learn') || hasError('form.to_learn', 'Field')
      "
    />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * To Learn Field
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import { hasError, validationMixin } from '@/validations'
import { lessonEnrollToLearn } from '@/validations/lesson/lessonEnrollToLearn'

export default {
  mixins: [validationMixin],
  computed: {
    hasError,
    ...mapState({
      form: state => state.lesson.lessonEnroll
    })
  },

  validations() {
    return {
      form: lessonEnrollToLearn
    }
  }
}
</script>
<style scoped lang="scss">
.to-learn-field {
  //
}
</style>
