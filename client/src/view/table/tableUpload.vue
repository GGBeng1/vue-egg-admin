<template>
  <div class="tableUpload">
    <div class="top">
      <el-button
        type="primary"
        icon="el-icon-download"
        size="medium"
        @click="handlerDownLoad"
        >下载模板</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-upload"
        size="medium"
        @click="handerUpload"
        >上传</el-button
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
    <uploadDialog :open.sync="open" @success="handlerSuccess"></uploadDialog>
  </div>
</template>

<script>
import uploadDialog from "./components/tableUploadDialog";
import { tableUpload } from "@/http/api.js";
export default {
  components: {
    uploadDialog
  },
  data() {
    return {
      tableData: [],
      open: false,
      columns: [
        {
          prop: "name",
          label: "名称"
        },
        {
          prop: "date",
          label: "日期",
          sortable: true
        },
        {
          prop: "address",
          label: "地址"
        }
      ],
      selectOption: []
    };
  },
  methods: {
    handlerSelectionChange(val) {
      this.selectOption = val;
    },
    handlerDownLoad() {
      window.location = tableUpload;
    },
    handerUpload() {
      this.open = true;
    },
    handlerSuccess(data) {
      this.tableData = data;
    },
    handlerDeleteRow(index) {
      this.tableData.splice(index, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>