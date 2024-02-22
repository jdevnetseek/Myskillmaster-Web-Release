<template>
  <div class="student-details">
    <div v-if="hasHeader" class="student-details__header mb-5">
      <h5 class="mb-2">
        Student
      </h5>
    </div>
    <ProfileAvatarName :user="studentObj" class="mb-6" />
    <h6>What do they want to learn</h6>
    <ReadMore :content="studentObj?.to_learn" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Master Details
 * ==================================================================================
 **/

import Student from '@/models/Student'
import ProfileAvatarName from '@/components/user/common/ProfileAvatarName'
import ReadMore from '@/components/common/ReadMore'

export default {
  components: {
    ProfileAvatarName,
    ReadMore
  },

  props: {
    student: {
      type: [Student, Object],
      default: () => {}
    },

    hasHeader: {
      type: Boolean,
      default: true
    }
  },

  computed: {
    studentObj() {
      return this.student instanceof Student
        ? this.student
        : new Student(this.student)
    }
  }
}
</script>
<style scoped lang="scss">
.student-details {
}
</style>
