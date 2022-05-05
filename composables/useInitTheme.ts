import { Context } from '@nuxt/types'
import { ThemeOptions } from '~/types/state'
export default async function useInitTheme(context: Context | any) {
  const theme: ThemeOptions | undefined = context.$cookies.get('theme')

  if (theme && theme === 'light') {
    context.$vuetify.theme.dark = false
    await context.store.dispatch('ui/changeTheme', theme)
  } else {
    context.$cookies.set('theme', 'dark', { path: '/' })
    context.$vuetify.theme.dark = true
    await context.store.dispatch('ui/changeTheme', 'dark')
  }
}
