import State from '@/utils/rawStates/State'

const rawForgotPasswordForm = () => {
  return State({
    email: '',
    token: '',
    password: '',
    password_confirmation: ''
  })
}

export default rawForgotPasswordForm
