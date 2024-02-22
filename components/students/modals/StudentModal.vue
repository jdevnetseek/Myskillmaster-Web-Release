<template>
  <Modal
    class="student-modal"
    :value="value"
    :title="title"
    :max-width="maxWidth"
    v-bind="$attrs"
    @input="toggle"
  >
    <ProfileAvatarName :user="student" class="mb-6" />
    <h6>What do they want to learn</h6>
    <ReadMore :content="student?.to_learn" />
  </Modal>
</template>
<script>
/**
 * ==================================================================================
 * Global Modal
 * ==================================================================================
 **/

import Modal from '@/components/modals/Modal'
import ModalMixin from '@/utils/mixins/Modal'
import Student from '@/models/Student'
import ProfileAvatarName from '@/components/user/common/ProfileAvatarName'
import ReadMore from '@/components/common/ReadMore'

export default {
  components: {
    Modal,
    ProfileAvatarName,
    ReadMore
  },
  mixins: [ModalMixin],
  props: {
    student: {
      type: [Student, Object],
      required: true
    },

    title: {
      type: String,
      default: 'Student Details'
    },

    maxWidth: {
      type: Number,
      default: 425
    }
  }
}
</script>
<style lang="scss" scoped>
.student-modal {
}
</style>
