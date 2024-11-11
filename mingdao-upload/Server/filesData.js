class FilesData {
  constructor (fileName, base64) {
    this.filesData = [
      {
        controlId: '647321200279bf9fdb479429',
        value: '『JS++饭委会』' + fileName,
      },
      {
        value: fileName,
        controlId: '647321200279bf9fdb47942b',
        editType: 1,
        valueType: 2,
        controlFiles: [{
          baseFile: base64,
          fileName: fileName
        }]
      }
    ]
  }
}

const filesData = [[
  {
    'controlId': '647321200279bf9fdb479429',
    'value': `文本-${Math.random() * 100}`,
  },
  {
    'value': '测试上传',
    'controlId': '647321200279bf9fdb47942b',
    'editType': 1,
    'valueType': 2,
    'controlFiles': [{
      baseFile: 'getFileBase64()',
      fileName: 'git.png'
    }]
  }
]]


module.exports = {filesData, FilesData}
