<template>
<div class="container-fluid">
  <div class="loginbox col-12 col-md-6 col-xl-4 ">
    <h3 class="text-center title">长安渠道全生命周期系统</h3>
    <div class="form-group">
      <input type="text" v-model="user" class="form-control" placeholder="账号">
    </div>
    <div class="form-group">
      <input type="password" v-model="psw" class="form-control" placeholder="密码">
    </div>
    <div class="justify-content-md-center text-center">
      <button type="button" class="btn btn-outline-secondary col-6" @click="checkUser">登录</button>
    </div>
  </div>
</div>
</template>
<script>
import {SendLogin} from '~/api/pub.js'
import {alertMsg,setData} from '~/config/pub.js'
import {UserKey} from '~/config/params.js'
export default {
  name: 'login',
  components:{
  },
  data() {
    return {
      user:'',
      psw:'',
      showCaptch:false,
      captchaPath:'',
      captcha:'',
    }
  },
  mounted() {
  },
  methods: {
    checkUser(){
      let _this = this
      if(_this.user==''){
        alertMsg('用户名不能为空！').then((res)=>{}).catch((err)=>{})
      }else if(_this.psw==''){
        alertMsg('密码不能为空！').then((res)=>{}).catch((err)=>{})
      }else{
        SendLogin({
          username:_this.user,
          password:_this.psw,
          authType:'adm-u',
          validateCode:_this.captcha,
          rememberme:true,
        }).then((res)=>{
          if(setData(UserKey,res.Authorization)){
            alertMsg('登录成功')
          }else{
            alertMsg('登录失败')
          }
        }).catch((err)=>{
          if(err.data&&err.data.message){
            alertMsg(err.data.message)
            if(err.data&&err.data.payload==1){
              _this.getCaptcha()
            }
          }else{
            alertMsg('登录失败')
          }
        })
      }
    },
    getCaptcha(){
      this.captchaPath = this.$baseconfig['BaseUrl'] + '/kaptcha/get?' + Math.floor(Math.random() * 100);
      this.showCaptch = true;
    }
  }
}
</script>
<style scoped type="text/css" lang="scss">
	@import "~/config/pub.scss";
	.container-fluid{
    background-color:rgba($blue,0.1);
    min-height: 100%;
    padding:0rem;
    margin:0rem;
    display: flex;
    align-items: center;
    justify-content: center;
    .loginbox{
      padding-bottom: 6rem;
      .title{
        color:$gray-700;
        margin:0rem 0rem 2rem;
      }
      .form-group{
        margin:0rem 2rem 2rem;
        box-sizing: border-box;
        .form-control{
          background-color:rgba($black,0.1);
        }
      }
    }
	}
</style>