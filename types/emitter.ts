import mitt from 'mitt'

type Events = {
  priceStream: string
}
const emitter = mitt<Events>()
export default emitter
