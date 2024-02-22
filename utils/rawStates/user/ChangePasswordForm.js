import State from '@/utils/rawStates/State'

const rawChangePasswordForm = () => {
  return State({
    old_password: '',
    new_password: '',
    new_password_confirmation: ''
  })
}

export default rawChangePasswordForm
