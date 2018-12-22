<template>
  <div class="login-container animated fadeInDown fast">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <h3 class="title animated fadeInDown slow">优车助手汽车服务管理系统</h3>
      <el-form-item prop="username" class="animated lightSpeedIn slow">
        <span class="svg-container">
          <svg-icon icon-class="user"/>
        </span>
        <el-input
          v-model="loginForm.username"
          name="username"
          type="text"
          auto-complete="on"
          placeholder="username"
          class="myinput"
        />
      </el-form-item>
      <el-form-item prop="password" class="animated lightSpeedIn slow">
        <span class="svg-container">
          <svg-icon icon-class="password"/>
        </span>
        <el-input
          :type="pwdType"
          v-model="loginForm.password"
          name="password"
          auto-complete="on"
          placeholder="password"
          @keyup.enter.native="handleLogin"
          class="my-input"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon icon-class="eye"/>
        </span>
      </el-form-item>
      <el-form-item class="animated lightSpeedIn slow">
        <el-button
          :loading="loading"
          style="width:100%;"
          @click.native.prevent="handleLogin"
          class="my-button"
        >Sign in</el-button>
      </el-form-item>
      <div class="tips animated lightSpeedIn slow">
        <span style="margin-right:20px;">username: admin</span>
        <span>password: admin</span>
      </div>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";

export default {
  name: "Login",
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };

    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能小于5位"));
      } else {
        callback();
      }
    };

    return {
      loginForm: {
        username: "admin",
        password: "admin"
      },

      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUsername
          }
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            validator: validatePass
          }
        ]
      },

      loading: false,
      pwdType: "password",
      redirect: undefined
    };
  },

  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },

      immediate: true
    }
  },

  mounted() {},

  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },

    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then(() => {
              this.loading = false;
              this.$router.push({
                path: this.redirect || "/"
              });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss">
$bg: #2d3a4b;
$light_gray: #77bca9;
$lg_input: #fff;
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      font-family: "Montserrat";
      font-weight: 900;
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 4px;
      padding: 12px 5px 12px 15px;
      color: $lg_input;
      height: 47px;
      &:-internal-autofill-selected {
        background-color: rgba(0, 0, 0, 0.1) !important;
      }
      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: #77bca9 !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    color: #fff;
    margin-bottom: 36px;
  }

  input:-moz-placeholder {
    color: $light_gray;
  }

  input:-ms-input-placeholder {
    color: $light_gray;
  }

  input::-webkit-input-placeholder {
    color: $light_gray;
  }

  input:focus {
    outline: none;
    color: $lg_input;
    -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
      0 2px 7px 0 rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
      0 2px 7px 0 rgba(0, 0, 0, 0.2);
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset,
      0 2px 7px 0 rgba(0, 0, 0, 0.2);
  }
}
</style>

<style lang="scss" >
$bg: #2d3a4b;
$light_yellow: #f0f0f0;
$lg_input: #3f3736;
.my-button {
  cursor: pointer;
  background-color: #302c56;
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  border: 1px solid #efede7;
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.25) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  font-family: "Montserrat", Helvetica, Arial, sans-serif;
  letter-spacing: 2px;
  word-spacing: 4px;
  font-size: 20px;
  font-weight: 700;
  color: $light_yellow;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -o-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -ms-transition: all 0.2s;
}

.mybutton:hover {
  background-color: #302c56;
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
}

.mybutton:active {
  -moz-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 15px 30px 0 rgba(255, 255, 255, 0.15) inset,
    0 2px 7px 0 rgba(0, 0, 0, 0.2);
  box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.1) inset,
    0 1px 4px 0 rgba(0, 0, 0, 0.1);
  border: 0px solid #ef4300;
}
.myinput {
  -moz-border-radius: 6px;
  -webkit-border-radius: 6px;
  border-radius: 6px;
  /* browsers that don't support rgba */
  -moz-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.1) inset;
  font-family: Helvetica, Arial, sans-serif;
  font-size: 16px;
  color: $lg_input;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  -o-transition: all 0.2s;
  -moz-transition: all 0.2s;
  -webkit-transition: all 0.2s;
  -ms-transition: all 0.2s;
}

.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: $bg;
  background: url("../../assets/backgrounds/login-bg.jpg") center no-repeat;
  background-size: 100%;
  .el-form-item {
    width: 75%;
    margin-left: 10%;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 750px;
    max-width: 100%;
    padding: 35px 35px 15px 35px;
    margin: 120px auto;
  }
  .tips {
    width: 80%;
    margin-left: 10%;
    font-size: 16px;
    color: #fff;
    margin-bottom: 10px;
    font-family: "Montserrat";

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $light_yellow;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title {
    font-family: "weiruan";
    font-size: 56px;
    color: $light_yellow;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
    user-select: none;
    -webkit-user-select: none;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $light_yellow;
    cursor: pointer;
    user-select: none;
  }
}
</style>
