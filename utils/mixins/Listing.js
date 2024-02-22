import State from '@/utils/rawStates/State'

export default {
  data() {
    return {
      listingForm: State({}),
      list: [],
      meta: {
        current_page: 1,
        last_page: 1
      }
    }
  }
}
