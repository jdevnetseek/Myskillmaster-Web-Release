<template>
  <Modal
    class="student-modal"
    :value="value"
    :title="title"
    :max-width="maxWidth"
    v-bind="$attrs"
    @input="toggle"
  >
    <StudentDetails :student="student" :has-header="false" />
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
import StudentDetails from '@/components/students/common/StudentDetails'

export default {
  components: {
    Modal,
    StudentDetails
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
