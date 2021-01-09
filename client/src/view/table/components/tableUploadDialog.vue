<template>
  <div class="tableUploadDialog">
    <el-dialog
      title="上传模板"
      :visible.sync="open"
      width="700px"
      :before-close="beforeClose"
    >
      <el-upload
        class="uploadModule"
        drag
        :action="action"
        :on-success="handlerSuccess"
        :on-error="handlerError"
        :before-upload="beforeAvatarUpload"
        :headers="headers"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">
          只能上传xlsx文件，且不超过2Mb
        </div>
      </el-upload>
      <span slot="footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      action: 'http://localhost:7001/api/tableUpload',
      headers: {
        Authorization: `Bearer ${this.$store.state.userMsg.token}`
      }
    }
  },
  methods: {
    beforeClose () {
      this.$emit('update:open', false)
    },
    beforeAvatarUpload (file) {
      const xlsx =
        file.type ==
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      const size = file.size / 1024 / 1024 < 2

      if (!xlsx) {
        this.$message.error('上传的模板只能为xlsx格式!')
      }
      if (!size) {
        this.$message.error('上传的文件不能大于2m')
      }
      return xlsx && size
    },
    handlerSuccess (res) {
      this.$emit('success', res.data)
      this.$emit('update:open', false)
    },
    handlerError (err) {
      console.log(err)
    }
  }
}
</script>

<style lang="scss" scoped>
.tableUploadDialog {
  .uploadModule {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
