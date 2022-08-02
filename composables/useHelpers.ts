import { useStore } from '@nuxtjs/composition-api'
import { State } from '~/types/state'

export function useHelpers() {
  const { state } = useStore<State>()
  const isNativeToken = (chainId: number, symbol: string) => {
    const chainIdAdjusted: number = chainId === 1337 ? 1 : chainId
    const chain = state.configs.chains.find((elem) => elem.chainId === chainIdAdjusted && elem.symbol === symbol)
    return !!chain
  }

  const debounce = <F extends (...args: any) => any>(func: F, waitFor: number) => {
    const timeout: number = 0

    const debounced = (...args: any) => {
      clearTimeout(timeout)
      setTimeout(() => func(...args), waitFor)
    }

    return debounced as (...args: Parameters<F>) => ReturnType<F>
  }

  return { isNativeToken, debounce }
}
