/* eslint-disable camelcase */
import 'reflect-metadata'
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Context } from '@nuxt/types'
import { ProtocolGQL } from '~/apollo/main/portfolio.query.graphql'
import { Protocol } from '~/types/apollo/main/types'

@Component({
  apollo: {
    protocol: {
      prefetch: false,
      query: ProtocolGQL,
      deep: false,
      variables() {
        return {
          protocolId: this.currentProtocolId,
        }
      },
      // Optional result hook
      result({ loading }) {
        this.config.isCurrentProtocolLoading = loading
      },
      watchLoading(isLoading) {
        this.config.isCurrentProtocolLoading = isLoading
      },
    },
  },
  async asyncData(context: Context) {
    let currentProtocolId: string | (string | null)[] = '3'
    if (context.route.query?.protocol) {
      currentProtocolId = await context.route.query.protocol
      return { currentProtocolId }
    }
    return { currentProtocolId }
  },
})
export class Protocols extends Vue {
  config = {
    isProtocolsLoading: false,
    isCurrentProtocolLoading: false,
  }

  protocol!: Protocol
  currentProtocolId!: string

  @Watch('$route.query.protocol')
  onProtocolChange(value: string) {
    this.currentProtocolId = value
  }
}
