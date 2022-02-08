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

    // Json logs for transactions dialog
    jsonLogs: 'grey darken-4',
  },
  light: {
    overlayColor: 'grey lighten-4',
    headerTextClass: 'black--text',
    innerCardLighten: 'black--text',
    jsonLogs: 'grey lighten-2',
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
