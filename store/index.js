export const state = () => ({
  lanyard: '',
})

export const mutations = {
  lanyard(state, colour) {
    state.lanyard = colour
  },
}
