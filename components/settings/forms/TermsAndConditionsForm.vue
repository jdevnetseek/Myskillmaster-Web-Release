<template>
  <v-card class="terms-and-conditions-form">
    <v-card-title class="d-flex justify-space-between">
      <h6>Terms and Conditions</h6>
      <v-btn
        text
        color="primary"
        class="v-size--small"
        :loading="form.$busy"
        :disabled="form.$busy"
        @click="submit"
      >
        Edit
      </v-btn>
    </v-card-title>
    <v-card-text>
      <ContentEditor v-model="form.content" :disabled="form.$busy" />
    </v-card-text>
  </v-card>
</template>
<script>
/**
 * ==================================================================================
 * Terms and Conditions form
 * ==================================================================================
 **/

import { mapState } from 'vuex'
import ContentEditor from '@/components/fields/ContentEditor'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  components: {
    ContentEditor
  },
  mixins: [SnackbarMixin],
  computed: {
    ...mapState({
      form: state => state.terms.terms,
      terms: state => state.terms.termsDetails
    })
  },

  watch: {
    terms() {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      if (this.terms) {
        this.form.content = this.terms.content
      }
    },

    async submit() {
      if (this.form.$busy) {
        return
      }

      this.form.$clearErrors()

      await this.$store.dispatch('terms/update', this.form.$data()).then(() => {
        if (this.form.$hasErrors()) {
          this.showSnackbar(this.form.$errorMessage, false)
        } else {
          this.showSnackbar('Terms and Conditions updated successfully!')
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.terms-and-conditions-form {
  width: 100%;
}
</style>
