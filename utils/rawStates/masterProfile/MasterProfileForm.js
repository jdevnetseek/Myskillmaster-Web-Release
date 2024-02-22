import State from '@/utils/rawStates/State'

const rawMasterProfileForm = () => {
  return State({
    about: '',
    work_experiences: '',
    languages: '',
    portfolio: []
  })
}

export default rawMasterProfileForm
