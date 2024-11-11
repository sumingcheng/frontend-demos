const reg_chac_str = /^[\'|\"].*?[\'|\"]$/
const reg_str = /[\'|\"]/g

export function isObject(value) {
  return typeof value === 'object' && value !== 'null'
}

export function hasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key)
}

export function isEqual(newValue, oldValue) {
  return newValue === oldValue
}

export function randomNum() {
  return new Date().getTime() + parseInt(Math.random() * 10000)
}

export function checkType(str) {
  // 字符串

  if (reg_chac_str.test(str)) {
    console.log(str.replace(reg_str, ''))
    return str.replace(reg_str, '')
  }
  // 布尔
  switch (str) {
    case 'true':
      return true
    case 'false':
      return false
    default :
      break
  }
  // 数字
  return Number(str)
}
