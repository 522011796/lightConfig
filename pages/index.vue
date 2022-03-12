<template>
  <div class="mian-block">
    <div class="main-block-title">
      Ilight配置
      <span class="main-block-add">
        <i class="fa fa-plus-circle" style="font-size: 25px" @click="add"></i>
      </span>
    </div>
    <div class="padding-full10" style="box-shadow: 0 0 5px 5px #434343;">
      <div class="main-block-list" :style="mainStyle">
        <div v-if="data.length <= 0">
          <el-empty description="暂无数据" style="margin-top: 20%"></el-empty>
        </div>
        <div class="main-block-list-item marginBottom10" v-if="data.length > 0" v-for="(item, index) in data" :key="index">
          <el-row>
            <el-col :span="10" class="textLeft">
              <div class="font-size-12 marginTop10">{{ item.fileName }}</div>
              <div class="font-size-12 color-default marginTop5">{{ item.lastTime }}</div>
            </el-col>
            <el-col :span="14" class="textRight">
              <div class="marginTop15 custom-button-block">
                <el-button size="mini" type="success" @click="update($event, item)">修改</el-button>
                <el-button size="mini" type="danger" @click="del($event, item)">删除</el-button>
                <el-button size="mini" type="warning" @click="download($event, item)">下载</el-button>
                <el-button size="mini" @click="copy($event, item)">克隆</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>

    <el-drawer
      custom-class="drawer-block"
      :visible.sync="drawerAdd"
      size="500px"
      :show-close="false"
      direction="rtl"
      @closed="closeDrawer">

      <div slot="title">
        <div class="block-opr-header">
        <el-row>
          <el-col :span="4">
            <el-button size="mini" @click="cancel">关闭</el-button>
          </el-col>
          <el-col :span="16">
            <div class="font-size-15 fontBold textCenter">
              Ilight配置设置
            </div>
          </el-col>
          <el-col :span="4" class="textRight">
            <el-button size="mini" type="success" @click="save">保存</el-button>
          </el-col>
        </el-row>
        </div>
      </div>

      <div>
        <el-form ref="form" :model="formConfig" label-width="150px">
          <el-form-item label="文件名称" v-if="edit == 0">
            <el-input v-model="fileName" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="厂商名称">
            <el-input v-model="formConfig.厂商名称" class="width300" @input="changePName"></el-input>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input v-model="formConfig.产品型号" class="width300" @input="changeGModel"></el-input>
          </el-form-item>
          <el-form-item label="硬件制造日期">
            <el-date-picker
              style="width: 300px"
              v-model="createTime"
              type="week"
              format="yyyy 第 WW 周"
              placeholder="选择周"
              value-format="yyyy-MM-dd"
              :picker-options="{'firstDayOfWeek': 1}">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="产品出厂日期">
            <el-date-picker
              style="width: 300px"
              v-model="goodsTime"
              type="week"
              format="yyyy 第 WW 周"
              value-format="yyyy-MM-dd"
              placeholder="选择周"
              :picker-options="{'firstDayOfWeek': 1}">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="射频大功率">
            <el-radio-group v-model="formConfig.射频大功率">
              <el-radio label="NO"></el-radio>
              <el-radio label="YES"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="禁止联网">
            <el-radio-group v-model="formConfig.禁止联网">
              <el-radio label="NO"></el-radio>
              <el-radio label="YES"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="输出平均电压">
            <el-input v-model="formConfig.输出平均电压" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="硬件支持最大电流">
            <el-input v-model="formConfig.硬件支持最大电流" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="厂商限制最大电流">
            <el-input v-model="formConfig.厂商限制最大电流" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="缺省选择最大电流">
            <el-input v-model="formConfig.缺省选择最大电流" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="灯光模型">
            <el-radio-group v-model="formConfig.灯光模型">
              <el-radio label="无模型调光"></el-radio>
              <el-radio label="单路调光"></el-radio>
              <el-radio label="冷暖调光"></el-radio>
              <el-radio label="RGB调光"></el-radio>
              <el-radio label="冷暖或RGB调光"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="PWM通道数量">
            <el-select v-model="formConfig.PWM通道数量" class="width300" placeholder="请选择" @change="changePwm">
              <el-option
                v-for="item in 5"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="PWM通道1" v-if="formConfig.PWM通道数量 >= 1">
            <el-radio-group v-model="formConfig.PWM通道1">
              <el-radio label="暖光"></el-radio>
              <el-radio label="冷光"></el-radio>
              <el-radio label="红光"></el-radio>
              <el-radio label="绿光"></el-radio>
              <el-radio label="蓝光"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="PWM通道2" v-if="formConfig.PWM通道数量 >= 2">
            <el-radio-group v-model="formConfig.PWM通道2">
              <el-radio label="暖光"></el-radio>
              <el-radio label="冷光"></el-radio>
              <el-radio label="红光"></el-radio>
              <el-radio label="绿光"></el-radio>
              <el-radio label="蓝光"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="PWM通道3" v-if="formConfig.PWM通道数量 >= 3">
            <el-radio-group v-model="formConfig.PWM通道3">
              <el-radio label="暖光"></el-radio>
              <el-radio label="冷光"></el-radio>
              <el-radio label="红光"></el-radio>
              <el-radio label="绿光"></el-radio>
              <el-radio label="蓝光"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="PWM通道4" v-if="formConfig.PWM通道数量 >= 4">
            <el-radio-group v-model="formConfig.PWM通道4">
              <el-radio label="暖光"></el-radio>
              <el-radio label="冷光"></el-radio>
              <el-radio label="红光"></el-radio>
              <el-radio label="绿光"></el-radio>
              <el-radio label="蓝光"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="PWM通道5" v-if="formConfig.PWM通道数量 >= 5">
            <el-radio-group v-model="formConfig.PWM通道5">
              <el-radio label="暖光"></el-radio>
              <el-radio label="冷光"></el-radio>
              <el-radio label="红光"></el-radio>
              <el-radio label="绿光"></el-radio>
              <el-radio label="蓝光"></el-radio>
              <el-radio label="禁用"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="PWM最低支持频率">
            <el-input v-model="formConfig.PWM最低支持频率" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="PWM最高支持频率">
            <el-input v-model="formConfig.PWM最高支持频率" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="缺省PWM最低频率">
            <el-input v-model="formConfig.缺省PWM最低频率" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="缺省PWM最高频率">
            <el-input v-model="formConfig.缺省PWM最高频率" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="上电灯光模式">
            <el-radio-group v-model="formConfig.上电灯光模式" @change="changeLightModel">
              <el-radio label="强制开灯"></el-radio>
              <el-radio label="记忆开灯"></el-radio>
              <el-radio label="强制关灯"></el-radio>
              <el-radio label="强制开灯并指定亮度和色温"></el-radio>
              <el-radio label="强制开灯并指定亮度和色彩"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="上电指定亮度" v-if="formConfig.上电灯光模式 =='强制开灯并指定亮度和色温' || formConfig.上电灯光模式 =='强制开灯并指定亮度和色彩'">
            <el-input v-model="formConfig.上电指定亮度" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="上电指定色温" v-if="formConfig.上电灯光模式 =='强制开灯并指定亮度和色温'">
            <el-input v-model="formConfig.上电指定色温" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="上电指定色彩" v-if="formConfig.上电灯光模式 =='强制开灯并指定亮度和色彩'">
            <el-input v-model="formConfig.上电指定色彩" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="开灯渐变时间">
            <el-input v-model="formConfig.开灯渐变时间" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="关灯渐变时间">
            <el-input v-model="formConfig.关灯渐变时间" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="缺省最低亮度">
            <el-input v-model="formConfig.缺省最低亮度" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="缺省最高亮度">
            <el-input v-model="formConfig.缺省最高亮度" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="缺省最低色温">
            <el-input v-model="formConfig.缺省最低色温" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="缺省最高色温">
            <el-input v-model="formConfig.缺省最高色温" class="width300"></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data(){
    return {
      drawerAdd: false,
      data: [],
      edit: 0,
      mainStyle: {
        'height': 0,
        'overflow-y': 'auto'
      },
      fileName: '',
      createTime: '',
      goodsTime: '',
      formConfig: {
        '厂商名称': 'netmoon',
        '产品型号': 'ILight-X1',
        '硬件制造日期': '',
        '产品出厂日期': '',
        '射频大功率': 'NO',
        "禁止联网" : "NO",
        '输出平均电压': 36,
        '硬件支持最大电流': 300,
        '厂商限制最大电流': 250,
        '缺省选择最大电流': 150,
        '灯光模型': '冷暖调光',
        'PWM通道数量': 2,
        'PWM通道1': '暖光',
        'PWM通道2': '冷光',
        'PWM通道3': '红光',
        'PWM通道4': '绿光',
        'PWM通道5': '蓝光',
        'PWM最低支持频率': 100,
        'PWM最高支持频率': 16000,
        '缺省PWM最低频率': 1600,
        '缺省PWM最高频率': 4000,
        '上电灯光模式': '强制开灯',
        '上电指定亮度': 0.8,
        '上电指定色温': 4000,
        '上电指定色彩': 16777215,
        '开灯渐变时间': 5000,
        '关灯渐变时间': 5000,
        '缺省最低亮度': 0.1,
        '缺省最高亮度': 1,
        '缺省最低色温': 2700,
        '缺省最高色温': 6500
      }
    }
  },
  mounted() {
    if (process.client){
      this.mainStyle.height = window.innerHeight - 70 + 'px';
    }
  },
  created() {
    this.init();
  },
  methods: {
    init(){
      this.$axios.get('/proxy/firmware/test/list.php').then(res => {
        this.data = res.data.data;
      });
    },
    changeGModel(data){
      this.fileName = this.formConfig.厂商名称 + "-" + data + "-" + this.$moment().format("yyyy-MM-DD");
    },
    changePName(data){
      this.fileName = data + "-" + this.formConfig.产品型号 + "-" + this.$moment().format("yyyy-MM-DD");
    },
    add(){
      this.edit = 0;
      this.fileName = this.formConfig.厂商名称 + "-" + this.formConfig.产品型号 + "-" + this.$moment().format("yyyy-MM-DD");
      let year = this.$moment().format("yyyy");
      let week = this.$moment().format("W");
      this.goodsTime = this.$moment(this.$moment().year(year).week(week)).format('YYYY-MM-DD');
      this.createTime= this.$moment(this.$moment().year(year).week(week)).format('YYYY-MM-DD');
      this.drawerAdd = true;
    },
    update(event, item){
      this.edit = 1;
      this.fileName = item.fileName;
      this.$axios.get('/proxy/firmware/test/data.php?file_name=' + item.fileName).then(res => {
        this.formConfig = JSON.parse(res.data.data);
        let year1 = '20' + this.formConfig.硬件制造日期.substring(0,2);
        let year2 = '20' + this.formConfig.产品出厂日期.substring(0,2);
        let createTime = this.$moment(this.$moment().year(parseInt(year1)).week(parseInt(this.formConfig.硬件制造日期.substring(2,4)))).format('YYYY-MM-DD');
        let goodsTime = this.$moment(this.$moment().year(parseInt(year2)).week(parseInt(this.formConfig.产品出厂日期.substring(2,4)))).format('YYYY-MM-DD');
        this.createTime = createTime;
        this.goodsTime = goodsTime;
      });
      //this.fileName = this.formConfig.厂商名称 + "-" + this.formConfig.产品型号 + "-" + this.$moment().format("yyyy-MM-DD");
      this.drawerAdd = true;
    },
    del(event, item){
      let params = {
        action: 'del',
        file_name: item.fileName
      };
      params = this.$qs.stringify(params);
      this.$axios.post('/proxy/firmware/test/action.php', params).then(res => {
        if (res.data.code == 200){
          this.init();
        }else{
          this.$message({
            message: res.data.desc,
            type: 'info'
          });
        }
      });
    },
    copy(event, item){
      let _self = this;
      this.$prompt(
        '',
        '请输入文件名',
        {
          closeOnClickModal: false,
          showClose: false,
          inputValue: item.fileName,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              let params = {
                action: 'clone',
                file_name: item.fileName,
                new_file_name: instance.inputValue
              };
              params = this.$qs.stringify(params);
              _self.$axios.post('/proxy/firmware/test/action.php', params).then(res => {
                if (res.data.code == 200){
                  _self.init();
                  done();
                }else{
                  _self.$message({
                    message: res.data.desc,
                    type: 'info'
                  });
                }
              });
            }else{
              done();
            }
          }
      }).then(({ value }) => {

      }).catch(() => {

      });
    },
    download(event, item){
      window.open('/proxy/firmware/test/download.php?file_name=' + item.fileName, "_self");
    },
    cancel(){
      this.drawerAdd = false;
    },
    save(){
      let goodsTime = this.$moment(this.goodsTime).format("yyyyWW");
      let createTime = this.$moment(this.createTime).format("yyyyWW");
      this.formConfig.硬件制造日期 = createTime.substring(2);
      this.formConfig.产品出厂日期 = goodsTime.substring(2);
      let fileName = this.fileName;
      if (this.fileName == ''){
        fileName = this.formConfig.厂商名称 + "-" + this.formConfig.产品型号 + "-" + this.$moment().format("yyyy-MM-DD");
      }
      let params = {
        action: this.edit == 0 ? 'add' : 'edit',
        file_name: fileName,
        data: JSON.stringify(this.formConfig)
      };

      if (this.edit == 0){
        params = {
          action: 'add',
          file_name: fileName,
          data: JSON.stringify(this.formConfig)
        };
      }else if (this.edit == 1){
        params = {
          action: 'edit',
          file_name: this.fileName,
          data: JSON.stringify(this.formConfig)
        };
      }
      params = this.$qs.stringify(params);
      this.$axios.post('/proxy/firmware/test/action.php', params).then(res => {
        if (res.data.code == 200){
          this.init();
          this.drawerAdd = false;
        }else{
          this.$message({
            message: res.data.desc,
            type: 'info'
          });
        }
      });
    },
    changeLightModel(data){
      if (data == '强制开灯并指定亮度和色温'){
        this.formConfig.上电指定亮度 = 0.8;
        this.formConfig.上电指定色彩 = 0;
        this.formConfig.上电指定色温 = 4000;
      }else if (data == '强制开灯并指定亮度和色彩'){
        this.formConfig.上电指定亮度 = 0.8;
        this.formConfig.上电指定色温 = 0;
        this.formConfig.上电指定色彩 = 16777215;
      }else {
        this.formConfig.上电指定亮度 = 0;
        this.formConfig.上电指定色温 = 0;
        this.formConfig.上电指定色温 = 0;
      }
    },
    changePwm(data){
      if (data == 1){
        this.formConfig.PWM通道1 = '暖光';
        this.formConfig.PWM通道2 = '禁用';
        this.formConfig.PWM通道3 = '禁用';
        this.formConfig.PWM通道4 = '禁用';
        this.formConfig.PWM通道5 = '禁用';
      }else if (data == 2){
        this.formConfig.PWM通道1 = '暖光';
        this.formConfig.PWM通道2 = '冷光';
        this.formConfig.PWM通道3 = '禁用';
        this.formConfig.PWM通道4 = '禁用';
        this.formConfig.PWM通道5 = '禁用';
      }else if (data == 3){
        this.formConfig.PWM通道1 = '暖光';
        this.formConfig.PWM通道2 = '冷光';
        this.formConfig.PWM通道3 = '红光';
        this.formConfig.PWM通道4 = '禁用';
        this.formConfig.PWM通道5 = '禁用';
      }else if (data == 4){
        this.formConfig.PWM通道1 = '暖光';
        this.formConfig.PWM通道2 = '冷光';
        this.formConfig.PWM通道3 = '红光';
        this.formConfig.PWM通道4 = '绿光';
        this.formConfig.PWM通道5 = '禁用';
      }else if (data == 5){
        this.formConfig.PWM通道1 = '暖光';
        this.formConfig.PWM通道2 = '冷光';
        this.formConfig.PWM通道3 = '红光';
        this.formConfig.PWM通道4 = '绿光';
        this.formConfig.PWM通道5 = '蓝光';
      }
    },
    closeDrawer(event){
      if (!event){
        this.createTime = '';
        this.goodsTime = '';
        this.formConfig = {
          '厂商名称': 'netmoon',
          '产品型号': 'ILight-X1',
          '硬件制造日期': '',
          '产品出厂日期': '',
          '射频大功率': 'NO',
          '输出平均电压': 36,
          '硬件支持最大电流': 300,
          '厂商限制最大电流': 250,
          '缺省选择最大电流': 150,
          '灯光模型': '冷暖调光',
          'PWM通道数量': 2,
          'PWM通道1': '暖光',
          'PWM通道2': '冷光',
          'PWM通道3': '红光',
          'PWM通道4': '绿光',
          'PWM通道5': '蓝光',
          'PWM最低支持频率': 100,
          'PWM最高支持频率': 16000,
          '缺省PWM最低频率': 1600,
          '缺省PWM最高频率': 4000,
          '上电灯光模式': '强制开灯',
          '上电指定亮度': 0.8,
          '上电指定色温': 4000,
          '上电指定色彩': 16777215,
          '开灯渐变时间': 5000,
          '关灯渐变时间': 5000,
          '缺省最低亮度': 0.1,
          '缺省最高亮度': 1,
          '缺省最低色温': 2700,
          '缺省最高色温': 6500
        };
      }
    }
  }
}
</script>

<style scoped>
.mian-block{
  width: 60%;
  margin: 0 auto;
  background: #F2F6FC;
}
.main-block-title{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background: #595959;
  height: 45px;
  line-height: 45px;
}
.main-block-list{
  margin-top: 0px;
  border-radius: 5px;
}
.main-block-list-item{
  height: 50px;
  background: #E4E7ED;
  border-radius: 5px;
  padding: 0px 10px;
  color: #606266;
  font-size: 12px;
}
.main-block-add{
  float: right;
  padding-right: 10px;
  position: relative;
  top: 5px;
}
</style>
