import State from '@/utils/rawStates/State'

const rawSignupForm = () => {
  return State({
    email: '',
    avatar: '',
    username: '',
    first_name: '',
    last_name: '',
    place_id: '',
    password: '',
    password_confirmation: ''
  })
}

export default rawSignupForm
