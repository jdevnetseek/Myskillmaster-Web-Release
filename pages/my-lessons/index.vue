<template>
  <div class="my-lessons-page">
    <v-tabs v-model="tabIndex" centered class="mb-4">
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :value="tab"
        :ripple="false"
      >
        {{ tab }}
      </v-tab>
    </v-tabs>
    <v-card v-if="header === 'To Learn'" flat>
      <LessonAttendanceList :key="'attendance-list' + tabIndex" class="mb-5" />
      <MyEnrollmentList :key="tabIndex" :header="header" />
    </v-card>
    <v-card v-else-if="header === 'To Teach'" flat>
      <MyScheduleList :key="tabIndex" :header="header" />
    </v-card>
    <v-card v-else flat>
      <MyLessonList
        :key="tabIndex"
        :header="header"
        :fetch-filter="filter"
        :can-add="canAdd"
      />
    </v-card>
  </div>
</template>
<script>
/**
 * ==================================================================================
 * My Lessons page
 * ==================================================================================
 **/

import LessonAttendanceList from '@/components/lessons/fields/LessonAttendanceList'
import MyLessonList from '@/components/lessons/fields/MyLessonList'
import MyScheduleList from '@/components/lesson-schedule/fields/MyScheduleList'
import MyEnrollmentList from '@/components/lesson-enrollment/fields/MyEnrollmentList'

export default {
  components: {
    LessonAttendanceList,
    MyLessonList,
    MyScheduleList,
    MyEnrollmentList
  },

  data() {
    return {
      tabIndex: 0,
      tabs: ['To Learn', 'To Teach', 'Listed Lessons', 'Inactive Lessons'],
      header: 'To Learn',
      filter: {},
      canAdd: false
    }
  },

  head() {
    return {
      title: 'My lessons | '
    }
  },
  watch: {
    tabIndex(newValue, oldValue) {
      this.header = this.tabs[newValue]
      this.clearFilter()
      switch (newValue) {
        case 2:
          this.filter.active = true
          this.canAdd = true
          break
        case 3:
          this.filter.active = false
          break
        default:
          break
      }
    }
  },
  methods: {
    clearFilter() {
      this.filter = {}
      this.canAdd = false
    }
  }
}
</script>
<style scoped lang="scss">
.my-lessons-page {
  //
}
</style>
