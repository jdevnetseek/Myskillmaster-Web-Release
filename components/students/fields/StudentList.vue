<template>
  <div class="student-list">
    <div class="student-list__header mb-4">
      <h5 class="mb-4">
        {{ header }}
      </h5>
      <div
        v-for="(student, index) in students"
        :key="index"
        class="my-4"
        @click="selectStudent(student)"
      >
        <div class="d-flex flex-row align-center">
          <ProfileAvatarName :user="student" />
          <v-icon right>
            mdi-chevron-right
          </v-icon>
        </div>
      </div>
    </div>
    <StudentModal v-if="display" v-model="display" :student="selectedStudent" />
  </div>
</template>
<script>
/**
 * ==================================================================================
 * Student List
 * ==================================================================================
 **/

import ProfileAvatarName from '@/components/user/common/ProfileAvatarName'
import StudentModal from '@/components/students/common/StudentModal'

export default {
  components: {
    ProfileAvatarName,
    StudentModal
  },
  props: {
    students: {
      type: Array,
      default: () => [],
      required: true
    },

    header: {
      type: String,
      default: 'Students'
    }
  },
  data() {
    return {
      display: false,
      selectedStudent: null
    }
  },
  methods: {
    selectStudent(student) {
      this.selectedStudent = student
      this.display = true
    }
  }
}
</script>
<style scoped lang="scss">
.student-list {
  &__header {
    &__btn {
      display: inline-block;
      color: $primary;
      cursor: pointer;
    }
  }
}
</style>
