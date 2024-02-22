import State from '@/utils/rawStates/State'

const rawLoginForm = () => {
  return State({
    email: '',
    password: '',
    remember_me: false
  })
}

export default rawLoginForm
