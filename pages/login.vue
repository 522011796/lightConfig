<template>
  <div>
    <div class="login-title">
      登录
    </div>
    <div class="login-main padding-lf15">
      <el-form ref="form" :model="form" label-width="100px" class="marginTop50">
        <el-form-item label="用户名">
          <el-input v-model="form.username" style="width: 85%"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" style="width: 85%"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" style="width: 85%" placeholder="请选择" @change="changeType">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="textCenter marginTop30 marginBottom50">
        <el-button type="success" size="medium" :loading="loading" style="width: 80%" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'defaultFull',
  components: { },
  data(){
    return {
      cb: '',
      restaurants: [],
      restaurantsTemp: [],
      loading: false,
      drawerVisible: false,
      direction: 'btt',
      dialogSize: '60%',
      sessionId: '',
      userKey: '',
      imageCodeAuth: false,
      imageCode: '',
      envListData: [],
      options: [
        {
          value: 'light',
          label: '灯'
        },
        {
          value: 'switch',
          label: '开关'
        },
        {
          value: 'repeater',
          label: '中继器'
        },
        {
          value: 'sensor',
          label: '传感器'
        }
      ],
      form:{
        username: '',
        password: '',
        imageCode: '',
        url: '',
        type: 'light'
      }
    }
  },
  created() {
    if (process.client){
      this.restaurantsTemp = [];
      this.restaurants = localStorage.getItem("account") ? JSON.parse(localStorage.getItem("account")) : [];
      for (let i = 0; i < this.restaurants.length; i++){
        this.restaurantsTemp.push(this.restaurants[i].value);
      }
    }
  },
  methods:{
    changeType(data){
      this.form.type = data;
    },
    login(){
      let params = {
        username: this.form.username,
        password: this.form.password
      };
      params = this.$qs.stringify(params);
      this.loading = true;
      this.$axios.post('/proxy/login.php', params, {loading: false}).then(res => {
        if (res.data.code == 200){
          this.$router.replace({
            path: '/',
            query: {
              devType: this.form.type
            }
          });
        }else {
          this.$message({
            message: res.data.desc,
            type: 'info'
          });
        }
        this.loading = false;
      });
    }
  }
}
</script>

<style scoped>
.login-title{
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #FFFFFF;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5%;
}
.login-main{
  background: #f5f5f5;
  width: 30%;
  min-width: 350px;
  max-width: 400px;
  margin: 0 auto;
  margin-top: 10px;
  border-radius: 10px;
  padding: 10px;
}
.block-list-content-item:hover{
  box-shadow: 1px 1px 2px #000000;
}
</style>
