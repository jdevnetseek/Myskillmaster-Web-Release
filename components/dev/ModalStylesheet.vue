<template>
  <div class="modal-stylesheet">
    <h5 class="mb-4">
      Modals
    </h5>
    <v-card>
      <v-card-text>
        <v-btn color="primary" @click="confirmation = true">
          <v-icon left>
            mdi-comment-check
          </v-icon>
          Confirm
        </v-btn>
      </v-card-text>
    </v-card>
    <ConfirmationModal v-model="confirmation" @confirm="emitting('confirm')" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Modal Stylesheet
 * ==================================================================================
 **/

import ConfirmationModal from '@/components/modals/ConfirmationModal'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  name: 'ModalStylesheet',
  components: {
    ConfirmationModal
  },
  mixins: [SnackbarMixin],
  data() {
    return {
      confirmation: false
    }
  },

  methods: {
    emitting() {
      this.showSnackbar("Emitted 'confirm' event!")
    }
  }
}
</script>
<style scoped lang="scss">
.modal-stylesheet {
  //
}
</style>
