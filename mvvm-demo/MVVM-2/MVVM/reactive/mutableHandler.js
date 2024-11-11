import { hasOwnProperty, isEqual, isObject } from '../shared/utils'
import { useReactive } from './index'
import { update } from '../render'
import { statePool } from '../compiler/state'

const get = createGetter()
const set = createSetter()

function createGetter() {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver)
    if (isObject(res)) {
      // 深度代理
      return useReactive(res)
    }
    return res
  }
}

function createSetter() {
  return function set(target, key, value, receiver) {
    const isKeyExist = hasOwnProperty(target, key),
        oldValue = target[key],
        res = Reflect.set(target, key, value, receiver)

    if (!isKeyExist) {
    } else if (!isEqual(value, oldValue)) {
      update(statePool, key, value)
    }
    return res
  }
}

const mutbaleHandler = {
  get,
  set,
}

export {
  mutbaleHandler
}
