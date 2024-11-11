const {AppKey, Sign, WorksheetId} = require('../config')
const http = require('./http')

// 获取列表 POST
function getTheList (val) {
  return http({
    url: 'getFilterRows',
    method: 'post',
    data: {
      appKey: AppKey,
      sign: Sign,
      ...val
    }
  })
}

// 删除行记录 POST
function deleteRow (val) {
  return http({
    url: 'deleteRow',
    method: 'post',
    data: {
      appKey: AppKey,
      sign: Sign,
      worksheetId: WorksheetId,
      triggerWorkflow: false,
      ...val
    }
  })
}

// 批量新建行记录 POST
function bulkRowRecords (data) {
  return http({
    url: 'addRows',
    method: 'post',
    data: {
      appKey: AppKey,
      sign: Sign,
      worksheetId: WorksheetId,
      triggerWorkflow: false,
      rows: data
    }
  })
}

module.exports = {
  getTheList,
  deleteRow,
  bulkRowRecords
}

