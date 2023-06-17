import mitt from 'mitt'

type Events = {
  priceStream: string
  onInitGlobalSearch: string
}
const emitter = mitt<Events>()
export default emitter
