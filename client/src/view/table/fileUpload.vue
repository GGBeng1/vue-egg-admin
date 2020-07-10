<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      :action="action"
      :on-preview="handlerPreview"
      :on-remove="handlerRemove"
      :file-list="fileList"
      :before-upload="handlerBeforeAvatarUpload"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button
        style="margin-left: 10px;"
        size="small"
        type="success"
        @click="hanlerSubmitUpload"
        >上传到服务器</el-button
      >
      <!-- <div slot="tip" class="el-upload__tip">
        只能上传jpg/png文件，且不超过500kb
      </div> -->
    </el-upload>
  </div>
</template>

<script>
export default {
  data() {
    return {
      action: "",
      fileList: []
    };
  },
  methods: {
    handlerPreview(info) {
      console.log(info);
    },
    handlerRemove(info, fileList) {},
    hanlerSubmitUpload() {
      this.$refs.upload.submit();
    },
    handlerBeforeAvatarUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        //大于5m分片
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
