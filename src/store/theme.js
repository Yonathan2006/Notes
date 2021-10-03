import {writable, derived} from 'svelte/store'
import { localStore } from './notes'

export const themeColor = localStore('theme','dark')

export const fontColor = derived(
  themeColor,
  $themeColor => (['light','warning','info'].includes($themeColor) ? 'dark' : 'light')
)