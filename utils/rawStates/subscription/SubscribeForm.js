import State from '@/utils/rawStates/State'

const rawSubscribeForm = () => {
  return State({
    name: '',
    source: '',
    plan: ''
  })
}

export default rawSubscribeForm
