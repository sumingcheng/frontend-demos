const colors = require('colors-console')

function print (data, msg) {
  let _msg = msg || ''
  console.log(JSON.stringify(data, null, 2), _msg)
}

module.exports = {
  print
}
