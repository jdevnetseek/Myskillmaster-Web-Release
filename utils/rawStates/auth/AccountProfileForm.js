import State from '@/utils/rawStates/State'

const rawAccountProfileForm = () => {
  return State({
    first_name: '',
    last_name: '',
    place_id: '',
    birthdate: ''
  })
}

export default rawAccountProfileForm
