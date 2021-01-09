<template>
  <div class="tableExport">
    <div class="top">
      <el-button
        type="primary"
        @click="handerAdd"
        icon="el-icon-plus"
        size="medium"
        >添加</el-button
      >
      <el-button
        type="primary"
        @click="handerExport"
        icon="el-icon-document-checked"
        size="medium"
        >导出已选项</el-button
      >
    </div>
    <el-table
      :data="tableData"
      stripe
      show-overflow-tooltip
      tooltip-effect="dark"
      @selection-change="handlerSelectionChange"
      highlight-current-row
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-for="col in columns"
        :prop="col.prop"
        :key="col.prop"
        :label="col.label"
        :width="col.width"
        :sortable="col.sortable"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click.native.prevent="handlerDeleteRow(scope.$index)"
            type="text"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <addDialog
      :open.sync="open"
      @addMsg="handlerAddMsg"
      ref="addDialog"
    ></addDialog>
  </div>
</template>

<script>
import { tableExport } from '@/http/api.js'
import addDialog from './components/tableExportAddDialog'
export default {
  components: {
    addDialog
  },
  data () {
    return {
      open: false,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        {
          date: '2016-05-05',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
      columns: [
        {
          prop: 'name',
          label: '名称'
        },
        {
          prop: 'date',
          label: '日期',
          sortable: true
        },
        {
          prop: 'address',
          label: '地址'
        }
      ],
      selectOption: []
    }
  },
  methods: {
    handlerSelectionChange (val) {
      this.selectOption = val
    },
    handerAdd () {
      this.open = true
    },
    async handerExport () {
      if (this.selectOption.length == 0) {
        this.$message({
          message: '请选择导出内容',
          type: 'warning',
          showClose: true
        })
        return
      }
      const res = await tableExport({ selectOption: this.selectOption })
      const fileName = res.headers['content-disposition'].split('=')[1]
      const blob = new Blob([res.data], {
        type: 'application/vnd.ms-excel'
      }) // 处理文档流
      const elink = document.createElement('a')
      elink.download = fileName
      elink.style.display = 'none'
      elink.href = URL.createObjectURL(blob)
      document.body.appendChild(elink)
      elink.click()
      URL.revokeObjectURL(elink.href) // 释放URL 对象
      document.body.removeChild(elink)
    },
    handlerAddMsg (val) {
      this.tableData.push(Object.assign({}, val))
      this.$refs.addDialog.handlerResetForm()
    },
    handlerDeleteRow (index) {
      this.tableData.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
