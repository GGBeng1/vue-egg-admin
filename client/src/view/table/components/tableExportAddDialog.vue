<template>
  <div>
    <el-dialog
      title="添加信息"
      :visible.sync="open"
      width="60%"
      :before-close="beforeClose"
    >
      <div class="dialogMain">
        <el-form
          :model="form"
          ref="form"
          label-width="80px"
          size="medium"
          :rules="rules"
        >
          <el-form-item label="日期" prop="date">
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="address">
            <el-input v-model="form.address" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer">
        <el-button @click="beforeClose">取 消</el-button>
        <el-button type="primary" @click="handlerSubmit">确 定</el-button>
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
  data() {
    return {
      form: {
        name: "",
        address: "",
        date: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        date: [{ required: true, message: "请输入日期", trigger: "blur" }],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }]
      }
    };
  },
  methods: {
    beforeClose() {
      this.$emit("update:open", false);
      this.handlerResetForm();
    },
    handlerSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit("addMsg", this.form);
          this.$emit("update:open", false);
        }
      });
    },
    handlerResetForm(formName) {
      this.$refs["form"].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.dialogMain {
  width: 70%;
}
</style>