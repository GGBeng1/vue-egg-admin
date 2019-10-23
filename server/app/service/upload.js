'use strict'

const Service = require('egg').Service
const XLSX = require('xlsx')
class UplaodService extends Service {
  uploadExcel(stream) {
    return new Promise((resolve, reject) => {
      let exceldata = []
      stream.on('error', reject)
      stream.on('data', chunk => {
        let workbook = XLSX.read(chunk, { type: 'buffer' })
        for (let sheet in workbook.Sheets) {
          if (workbook.Sheets.hasOwnProperty(sheet)) {
            // 利用 sheet_to_json 方法将 excel 转成 json 数据
            exceldata = exceldata.concat(
              XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
            )
            break // 只取第一张表
          }
        }
      })
      stream.on('end', () => {
        let result = exceldata.map(o => {
          return { name: o['名称'], date: o['日期'], address: o['地址'] }
        })
        resolve(result)
      })
    })
  }
}

module.exports = UplaodService
