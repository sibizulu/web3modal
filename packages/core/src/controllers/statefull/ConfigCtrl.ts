import { proxy, subscribe as valtioSub } from 'valtio/vanilla'
import type { ConfigCtrlState, ConfigOptions } from '../../../types/statefullCtrlTypes'

// -- initial state ------------------------------------------------ //
function isDarkMode() {
  return typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
}

const state = proxy<ConfigCtrlState>({
  configured: false,
  projectId: '',
  theme: isDarkMode() ? 'dark' : 'light',
  accentColor: 'default'
})

// -- controller --------------------------------------------------- //
export const ConfigCtrl = {
  state,

  subscribe(callback: (newState: ConfigCtrlState) => void) {
    return valtioSub(state, () => callback(state))
  },

  setConfig(config: ConfigOptions) {
    if (!config.projectId)
      throw new Error(
        'Web3Modal requires projectId that can be obtained at cloud.walletconnect.com'
      )
    Object.assign(state, config)
    state.configured = true
  }
}
