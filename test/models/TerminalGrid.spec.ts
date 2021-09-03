import 'reflect-metadata'
import Vuex, { Store } from 'vuex'

import { createLocalVue } from '@vue/test-utils'
import { TerminalGrid, terminalUI, GridCellStyles } from '@/models/terminal'

const spyOn = jest.spyOn

const root: any = 'mock root'

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
    const terminalGrid = new TerminalGrid(store, root)
    expect(terminalGrid).toBeInstanceOf(TerminalGrid)
  })

  test('updateTheme method has been called', () => {
    const terminalGrid = new TerminalGrid(store, root)
    spyOn(terminalGrid, 'updateTheme')
    terminalGrid.updateTheme()

    expect(terminalGrid.updateTheme).toHaveBeenCalledTimes(1)
  })

  test('Should dispatch getTerminalData', () => {
    const terminalGrid = new TerminalGrid(store, root)
    terminalGrid.getData()
    expect(actions.getTerminalData).toHaveBeenCalledTimes(1)
  })

  test('Should be able to get cols', () => {
    const terminalGrid = new TerminalGrid(store, root)
    expect(typeof terminalGrid.cols === 'object').toBe(true)
  })

  test('TerminalGrid data to be an empty array', () => {
    const terminalGrid = new TerminalGrid(store, root)

    expect(typeof terminalGrid.data === 'object').toBe(true)
  })

  test('getTokenImage fn should return token url string', () => {
    const url = TerminalGrid.getTokenImage('12345')

    expect(url).toBe('https://tokens.dharma.io/assets/12345/icon.png')
  })

  test('calcReserveEthUsd fn should return a calculated and formatted reserveETH price', () => {
    const calculatedReserve = TerminalGrid.calcReserveEthUsd(10, 5)

    expect(calculatedReserve).toBe('$50.00')
  })

  test('Light Theme ptcCellStyle should return correct styling for value * 100 >= 0', () => {
    terminalUI.theme = 'light'
    const params = { value: 0 }
    const style = GridCellStyles.ptcCellStyle(params)

    expect(style).toStrictEqual({
      'background-color': '#ebf9f0',
      color: 'black',
    })
  })

  test('Light Theme ptcCellStyle should return correct styling for value * 100 > 1 && <= 2.5', () => {
    terminalUI.theme = 'light'
    const params = { value: 0.025 }
    const style = GridCellStyles.ptcCellStyle(params)

    expect(style).toStrictEqual({
      'background-color': '#d8f3e1',
      color: 'black',
    })
  })

  test('Light Theme ptcCellStyle should return correct styling for value * 100 >  2.5 && <= 5', () => {
    terminalUI.theme = 'light'
    const params = { value: 0.05 }
    const style = GridCellStyles.ptcCellStyle(params)

    expect(style).toStrictEqual({
      'background-color': '#c4edd2',
      color: 'black',
    })
  })

  test('Light Theme ptcCellStyle should return correct styling for value * 100 > 5', () => {
    terminalUI.theme = 'light'
    const params = { value: 0.06 }
    const style = GridCellStyles.ptcCellStyle(params)

    expect(style).toStrictEqual({
      'background-color': '#b1e7c3',
      color: 'black',
    })
  })

  test('Light Theme ptcCellStyle should return correct styling for value * 100 < 0 && value * 100 >= -1', () => {
    terminalUI.theme = 'light'
    const params = { value: -0.01 }
    const style = GridCellStyles.ptcCellStyle(params)

    expect(style).toStrictEqual({
      'background-color': '#fdeae8',
      color: 'black',
    })
  })

  test('Light Theme ptcCellStyle should return correct styling for value * 100 < -1 && value * 100 >= -2.5', () => {
    terminalUI.theme = 'light'
    const params = { value: -0.025 }
    const style = GridCellStyles.ptcCellStyle(params)

    expect(style).toStrictEqual({
      'background-color': '#fbd4d0',
      color: 'black',
    })
  })

  test('Light Theme ptcCellStyle should return correct styling for value * 100 < -2.5 && value * 100 >= -5', () => {
    terminalUI.theme = 'light'
    const params = { value: -0.05 }
    const style = GridCellStyles.ptcCellStyle(params)

    expect(style).toStrictEqual({
      'background-color': '#f9bfb9',
      color: 'black',
    })
  })

  test('Light Theme ptcCellStyle should return correct styling for value * 100 < -5', () => {
    terminalUI.theme = 'light'
    const params = { value: -0.06 }
    const style = GridCellStyles.ptcCellStyle(params)

    expect(style).toStrictEqual({
      'background-color': '#f7aaa1',
      color: 'black',
    })
  })

  test('Dark Theme ptcCellStyle should return correct styling for value * 100 >= 0', () => {
    terminalUI.theme = 'dark'
    const params = { value: 0 }
    const style = GridCellStyles.ptcCellStyle(params)

    expect(style).toStrictEqual({
      color: '#4caf50',
      'background-color': 'transparent',
    })
  })

  test('Dark Theme ptcCellStyle should return correct styling for value * 100 < 0', () => {
    terminalUI.theme = 'dark'
    const params = { value: -10 }
    const style = GridCellStyles.ptcCellStyle(params)

    expect(style).toStrictEqual({
      color: '#f44336',
      'background-color': 'transparent',
    })
  })
})
