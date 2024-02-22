import State from '@/utils/rawStates/State'

const rawPayoutAccountForm = () => {
  return State({
    account_name: '',
    account_number: '',
    account_bsb: ''
  })
}

export default rawPayoutAccountForm
