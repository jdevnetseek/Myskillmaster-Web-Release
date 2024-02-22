export const state = () => ({})

export const getters = {}

export const mutations = {}

export const actions = {
  async uploadMedia({ commit }, file) {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await this.$axios.post('admin/media', formData)

    return data.data
  }
}
