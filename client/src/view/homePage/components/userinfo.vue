<template>
  <div class="userInfo">
    <el-drawer
      title="个人信息"
      :visible.sync="open"
      direction="rtl"
      :before-close="handleClose"
    >
      <el-form :model="form" ref="form" label-width="80px" size="mini">
        <el-form-item label="用户头像">
          <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-progress="uploadProcess"
            :on-error="handerErrorUpload"
            :before-upload="beforeAvatarUpload"
            :headers="headers"
          >
            <el-avatar
              v-if="form.avatarUrl && process == false"
              :src="baseUrl + form.avatarUrl"
              :size="100"
              shape="square"
            ></el-avatar>
            <i
              v-if="!form.avatarUrl && process == false"
              class="el-icon-plus avatar-uploader-icon"
            ></i>
            <el-progress
              v-show="process == true"
              type="circle"
              :percentage="percent"
              style="margin-top: 5px"
              :width="90"
            >
            </el-progress>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户昵称">
          <el-input
            v-model="userInfo.nickname"
            :disabled="lock.nickname"
            :maxlength="15"
          >
            <!-- <el-button slot="append" icon="el-icon-edit"></el-button>
             -->
            <i
              slot="suffix"
              class="el-icon-edit"
              style="cursor: pointer"
              @click="handlerEdit('nickname')"
            ></i>
          </el-input>
        </el-form-item>
        <el-form-item v-if="!lock.nickname">
          <el-button type="primary" @click="handlerSubmit">保存</el-button>
          <el-button @click="handleClose">取消</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from '@/http/axios'
import { updateUserNickname } from '@/http/api.js'
export default {
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      lock: {
        nickname: true
      },
      baseUrl: axios.defaults.baseURL,
      serverUrl: axios.defaults.baseURL + '/api/upload',
      headers: {},
      process: false,
      percent: 0,
      userInfo: {}
    }
  },
  computed: {
    ...mapState({
      form: state => state.userMsg
    })
  },
  methods: {
    handleClose () {
      this.$emit('update:open', false)
      this.lock.nickname = true
      this.handlerGetNickname()
      this.userInfo = {}
    },
    handlerSubmit () {
      updateUserNickname({ nickname: this.userInfo.nickname }).then(res => {
        const { code, data } = res.data
        if (code == '200') {
          this.$message({
            message: `昵称已更改为${data.nickname}`,
            type: 'success',
            showClose: true
          })
          this.$store.commit('updateNickname', data.nickname)
        }
      })
    },
    handlerGetNickname () {
      this.userInfo = Object.assign({}, this.form)
    },
    handlerEdit (lable) {
      this.lock[lable] = !this.lock[lable]
    },
    handleAvatarSuccess (file, res) {
      if (res && res.response.code == 200) {
        this.$store.commit('setUserAvatarUrl', res.response.data.avatarUrl)
      }
      setTimeout(() => {
        this.process = false
      }, 500)
    },
    beforeAvatarUpload (file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (
        ['image/jpeg', 'image/gif', 'image/png', 'image/bmp'].indexOf(
          file.type
        ) == -1
      ) {
        this.$message.error('请上传正确的图片格式')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      this.headers.Authorization = `Bearer ${this.form.token}`
    },
    uploadProcess (event, file, fileList) {
      this.process = true
      this.percent = Math.floor(event.percent)
    },
    handerErrorUpload (event) {
      this.process = false
      this.$message.error('头像上传失败，请重新上传！')
    }
  },
  mounted () {
    // this.handlerGetNickname();
  },
  watch: {
    open (val) {
      if (val) {
        this.handlerGetNickname()
      }
    }
  }
}
</script>

<style lang="scss">
.el-drawer__body {
  padding: 20px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 15px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .el-upload {
    height: 100px;
  }
}
</style>
