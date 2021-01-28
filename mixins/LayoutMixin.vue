<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { ThemeOptions } from '~/types/ui'

@Component({ name: 'LayoutMixin' })
export default class LayoutMixin extends Vue {
  $cookies!: Record<string, any>
  $vuetify!: any

  created() {
    const theme: ThemeOptions | undefined = this.$cookies.get('theme')
    if (theme) {
      this.$vuetify.theme[theme] = true
      this.$store.dispatch('ui/changeTheme', theme)
    } else {
      this.$cookies.set('theme', 'dark')
      this.$vuetify.theme.dark = true
      this.$store.dispatch('ui/changeTheme', 'dark')
    }
  }
}
</script>
