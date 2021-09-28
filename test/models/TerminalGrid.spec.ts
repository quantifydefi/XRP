import 'reflect-metadata'
import Vuex, { Store } from 'vuex'

import { createLocalVue } from '@vue/test-utils'
import { TerminalGrid } from '@/models/terminal'

const spyOn = jest.spyOn

// const root: any = 'mock root'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Test TerminalGrid Class', () => {
  let store: Store<any>
  let state: any
  let actions: any

  beforeEach(() => {
    actions = {
      getTerminalData: jest.fn(),
    }

    store = new Vuex.Store({
      state,
      modules: {
        terminal: {
          namespaced: true,
          actions,
        },
        ui: {
          namespaced: true,
          state: {
            ui: {
              theme: 'dark',
            },
          },
          actions: {
            changeTheme: jest.fn(),
          },
        },
      },
    })
  })

  test('class init', () => {
    const terminalGrid = new TerminalGrid(store)
    expect(terminalGrid).toBeInstanceOf(TerminalGrid)
  })

  test('Should dispatch getTerminalData', () => {
    const terminalGrid = new TerminalGrid(store)
    terminalGrid.getData()
    expect(actions.getTerminalData).toHaveBeenCalledTimes(1)
  })

  test('Should be able to get cols', () => {
    const terminalGrid = new TerminalGrid(store)
    expect(typeof terminalGrid.cols === 'object').toBe(true)
  })

  test('TerminalGrid data to be an empty array', () => {
    const terminalGrid = new TerminalGrid(store)

    expect(typeof terminalGrid.data === 'object').toBe(true)
  })

  test('getTokenImage fn should return token url string', () => {
    const url = TerminalGrid.getTokenImage('12345')

    expect(url).toBe('https://tokens.dharma.io/assets/12345/icon.png')
  })

  // test('calcReserveEthUsd fn should return a calculated and formatted reserveETH price', () => {
  //   const calculatedReserve = TerminalGrid.calcReserveEthUsd(10, 5)
  //
  //   expect(calculatedReserve).toBe('$50.00')
  // })
})
