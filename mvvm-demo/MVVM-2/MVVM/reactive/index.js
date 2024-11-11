import { isObject } from '../shared/utils'
import { mutbaleHandler } from './mutableHandler'

export function useReactive(target) {
  return createReactObject(target, mutbaleHandler)
}

function createReactObject(target, baseHandler) {
  if (!isObject(target)) {
    return target
  }

  return new Proxy(target, baseHandler)
}
