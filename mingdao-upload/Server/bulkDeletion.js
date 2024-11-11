const {getTheList, deleteRow} = require('../api/xiaoShuo')
const colors = require('colors-console')

async function init (num) {
  const pageSize = 100
  const total = Math.ceil(num / pageSize)
  const delay = 3000

  console.log(colors('green', `共${total}次，每次间隔3秒`))

  for (let pageIndex = 1; pageIndex <= total; pageIndex++) {
    try {
      const allData = await getList(pageIndex, pageSize)
      const rowIds = allData.map(obj => obj.rowid)
      const joinedRowIds = rowIds.join(',')

      await deleteTheRow(joinedRowIds)

      await sleep(delay)
    } catch (error) {
      console.error('Failed to process batch:', error)
    }
  }
}

async function getList (pageIndex, pageSize) {
  try {
    const data = {
      worksheetId: '647321200279bf9fdb479428',
      viewId: '646db2c44b798e85aaf41d77',
      pageSize,
      pageIndex,
    }
    const listData = await getTheList(data)
    return listData.data.rows
  } catch (error) {
    console.error('Failed to get list data:', error)
    return []
  }
}

async function deleteTheRow (allRowId) {
  try {
    await deleteRow({rowId: allRowId || ''})
  } catch (error) {
    console.error('Failed to delete row:', error)
  }
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

init(101)
