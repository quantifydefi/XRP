/* eslint-disable @typescript-eslint/no-unused-vars */
import type { ActionTree, MutationTree } from 'vuex'
import { ThemeOptions } from '~/types/ui'

export const state = () => ({
  // TODO: Add models for UI types
  theme: 'dark' as ThemeOptions,
  dark: {
    overlayColor: 'grey darken-4',

    // header
    headerTextClass: 'white--text',
    innerCardLighten: 'grey--text text--lighten-1',

    //
    // background: '#121212',
    // bgAccent: 'grey darken-4',
    // overlay: '#121212',
    // appBg: '#151A23',
    // baseText: '#fff',
    // outline: '#2F2F2F',
    // baseButton: 'grey darken-4',
    // card: '#121212',
    // innerCard: '#151A23',
  },
  light: {
    overlayColor: 'grey lighten-4',
    // header
    headerTextClass: 'black--text',
    innerCardLighten: 'black--text',
    // background: '#fff',
    // bgAccent: '#fff',
    // overlay: '#fff',
    // appBg: 'grey lighten-4',
    // baseText: 'grey darken-3',
    // outline: '#E0E0E0',
    // baseButton: 'white',
    // card: 'grey lighten-2',
    // innerCard: 'grey lighten-2',
  },
})
export type UiState = ReturnType<typeof state>

export const mutations: MutationTree<UiState> = {
  SET_THEME: (state, theme: ThemeOptions) => (state.theme = theme),
}

export const actions: ActionTree<UiState, UiState> = {
  changeTheme({ commit }, theme: string): void {
    commit('SET_THEME', theme)
  },
}
