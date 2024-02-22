<template>
  <Modal
    class="confirmation-modal"
    :value="value"
    :title="title"
    :max-width="maxWidth"
    v-bind="$attrs"
    @input="toggle"
  >
    <div class="confirmation-modal__content">
      <p>{{ content }}</p>
      <slot name="additional-content" />
    </div>
    <div class="confirmation-modal__actions d-flex justify-space-between">
      <v-btn
        v-if="!hideCancelButton"
        :disabled="disabled"
        :loading="loading"
        color="primary"
        class="confirmation-modal__actions__cancel mr-3"
        text
        @click="cancel"
      >
        {{ cancelLabel }}
      </v-btn>
      <v-btn
        class="confirmation-modal__actions__confirm"
        :disabled="disabled"
        :loading="loading"
        :color="confirmColor"
        depressed
        @click="confirm"
      >
        {{ confirmLabel }}
      </v-btn>
    </div>
  </Modal>
</template>
<script>
/**
 * ==================================================================================
 * Confirmation modal
 * ==================================================================================
 **/

import Modal from '@/components/modals/Modal'
import ModalMixin from '@/utils/mixins/Modal'

export default {
  components: {
    Modal
  },
  mixins: [ModalMixin],
  props: {
    icon: {
      type: String,
      default: null
    },

    title: {
      type: String,
      default: 'Confirmation'
    },

    content: {
      type: String,
      default: 'Are you sure you want to proceed?'
    },

    confirmLabel: {
      type: String,
      default: 'Confirm'
    },

    confirmColor: {
      type: String,
      default: 'primary'
    },

    cancelLabel: {
      type: String,
      default: 'Cancel'
    },

    closeOnConfirm: {
      type: Boolean,
      default: true
    },

    disabled: {
      type: Boolean,
      default: false
    },

    loading: {
      type: Boolean,
      default: false
    },

    hideCancelButton: {
      type: Boolean,
      default: false
    },

    maxWidth: {
      type: Number,
      default: 425
    }
  },

  methods: {
    confirm() {
      this.toggle(!this.closeOnConfirm, 'confirm')
    },

    cancel() {
      this.toggle(false, 'cancel')
    }
  }
}
</script>
<style scoped lang="scss">
.confirmation-modal {
  &__content {
    padding-bottom: 30px;

    p {
    }
  }

  &__actions {
    .v-btn {
      flex-grow: 1;
    }

    &__cancel {
      background: #e6f1f1;
    }
  }
}
</style>
