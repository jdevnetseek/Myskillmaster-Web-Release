<template>
  <ConfirmationModal
    v-model="showDelete"
    title="Delete account"
    content="Are you sure you want to delete your account?"
    :loading="isLoading"
    @confirm="deleteAccount"
  >
    <template #additional-content>
      <p class="red--text">
        This would automatically
        cancel all your scheduled classes with no refunds.
      </p>
    </template>
  </ConfirmationModal>
</template>
<script>
import { mapState } from 'vuex'
import ConfirmationModal from '@/components/modals/ConfirmationModal'
import SnackbarMixin from '@/utils/mixins/Snackbar'

export default {
  name: 'DeleteAccountModal',

  components: {
    ConfirmationModal
  },

  mixins: [SnackbarMixin],

  data() {
    return {
      isLoading: false
    }
  },

  computed: {
    ...mapState(['showDeleteAccountModal']),
    showDelete: {
      get() {
        return this.showDeleteAccountModal
      },
      set(value) {
        this.$store.commit('toggleDeleteAccountModal', value)
      }
    }
  },

  methods: {
    async deleteAccount() {
      this.isLoading = true
      try {
        await this.$axios.delete('/auth/account')
        await this.$store.dispatch('user/logout')
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'An error occurred while trying to delete the account'
        this.showSnackbar(errorMessage, false)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
