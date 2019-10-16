<template>
  <div class="login">
    <div class="content">
      <el-card :body-style="{ padding: '20px' }" style="width:400px;">
        <div slot="header">
          <span>Login</span>
        </div>
        <!-- card body -->
        <el-form :model="form" ref="form" :rules="rules" status-icon>
          <el-form-item prop="username">
            <el-input v-model="form.username" clearable>
              <i slot="prepend" class="el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="form.password" clearable show-password>
              <i slot="prepend" class="el-icon-lock"></i>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" round style="width:100%"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { login } from "@/http/api.js";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        let ref = /^(?![a-z]+$)(?![A-Z]+$)(?![0-9]+$)[0-9a-zA-Z\W]\S{7,20}$/;
        if (ref.test(value)) {
          callback();
        } else {
          callback(new Error("密码长度不小于八位包含大小写,数字,不少于两种"));
        }
      }
    };
    return {
      form: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          let res = await login(this.form);
          let { state, userMsg } = res.data.data;
          if (state) {
            window.localStorage.setItem("userMsg", JSON.stringify(userMsg));
            this.$store.commit("setUserMsg", userMsg);
            this.$router.push("/home");
          }
        } else {
          // console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  background-color: #fff;
  height: 100%;
  .content {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>