<!-- Please remove this file from your project -->
<template>
  <div>
    <el-form ref="form" :model="formConfig" label-width="150px">
      <el-form-item label="文件名称">
        <el-input v-model="fileName" class="width300"></el-input>
      </el-form-item>
      <el-form-item label="厂商名称">
        <el-input v-model="formConfig.厂商名称" class="width300" @input="changePname"></el-input>
      </el-form-item>
      <el-form-item label="产品型号">
        <el-input v-model="formConfig.产品型号" class="width300"></el-input>
      </el-form-item>
      <el-form-item label="硬件制造日期">
        <el-date-picker
          style="width: 300px"
          v-model="createTime"
          type="month"
          format="yyyy-MM"
          placeholder="选择周"
          value-format="yyyy-MM"
          :picker-options="{'firstDayOfWeek': 1}">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="产品出厂日期">
        <el-date-picker
          style="width: 300px"
          v-model="goodsTime"
          type="month"
          format="yyyy-MM"
          value-format="yyyy-MM"
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
      <el-form-item label="恒压输出">
        <el-radio-group v-model="formConfig.恒压输出">
          <el-radio label="NO">恒流输出</el-radio>
          <el-radio label="YES">恒压输出</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="输出平均电压">
        <el-input v-model="formConfig.输出平均电压" class="width300" @input="changeGV"></el-input>
      </el-form-item>
      <el-form-item label="硬件支持最大电流">
        <el-input v-model="formConfig.硬件支持最大电流" class="width300"></el-input>
      </el-form-item>
      <el-form-item label="厂商限制最大电流">
        <el-input v-model="formConfig.厂商限制最大电流" class="width300"></el-input>
      </el-form-item>
      <el-form-item label="缺省选择最大电流">
        <el-input v-model="formConfig.缺省选择最大电流" class="width300" @input="changePMA"></el-input>
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
</template>

<script>
export default {
  name: 'LightForm',
  props: {

  },
  data(){
    return {
      fileName: '',
      oldFileName: '',
      createTime: '',
      goodsTime: '',
      formConfig: {
        '厂商名称': 'netmoon',
        '产品型号': 'ILight-X1',
        '硬件制造日期': '',
        '产品出厂日期': '',
        '射频大功率': 'NO',
        "禁止联网" : "NO",
        "恒压输出" : "NO",
        '输出平均电压': 36,
        '硬件支持最大电流': 300,
        '厂商限制最大电流': 300,
        '缺省选择最大电流': 150,
        '灯光模型': '冷暖调光',
        'PWM通道数量': 2,
        'PWM通道1': '暖光',
        'PWM通道2': '冷光',
        'PWM通道3': '红光',
        'PWM通道4': '绿光',
        'PWM通道5': '蓝光',
        '缺省PWM最低频率': 1600,
        '缺省PWM最高频率': 4000,
        '上电灯光模式': '强制开灯',
        '上电指定亮度': 1,
        '上电指定色温': 4000,
        '上电指定色彩': 16777215,
        '开灯渐变时间': 5000,
        '关灯渐变时间': 4000,
        '缺省最低亮度': 0.0001,
        '缺省最高亮度': 1,
        '缺省最低色温': 2700,
        '缺省最高色温': 6500
      }
    }
  },
  methods: {
    changePname(data){
      let fileName = this.fileName.split('-');
      fileName[0] = data;
      this.fileName = "";
      for (let i = 0; i < fileName.length; i++){
        this.fileName += fileName[i];
        if (fileName.length -1 != i){
          this.fileName += "-";
        }
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
    changeLightModel(data){
      if (data == '强制开灯并指定亮度和色温'){
        this.formConfig.上电指定亮度 = 1;
        this.formConfig.上电指定色彩 = 0;
        this.formConfig.上电指定色温 = 4000;
      }else if (data == '强制开灯并指定亮度和色彩'){
        this.formConfig.上电指定亮度 = 1;
        this.formConfig.上电指定色温 = 0;
        this.formConfig.上电指定色彩 = 16777215;
      }else {
        this.formConfig.上电指定亮度 = 0;
        this.formConfig.上电指定色温 = 0;
        this.formConfig.上电指定色温 = 0;
      }
    },
    changeGV(data){
      let fileName = this.fileName.split('-');
      fileName[1] = data + "V";
      this.fileName = "";
      for (let i = 0; i < fileName.length; i++){
        this.fileName += fileName[i];
        if (fileName.length -1 != i){
          this.fileName += "-";
        }
      }
    },
    changePMA(data){
      let fileName = this.fileName.split('-');
      fileName[2] = data + "mA";
      this.fileName = "";
      for (let i = 0; i < fileName.length; i++){
        this.fileName += fileName[i];
        if (fileName.length -1 != i){
          this.fileName += "-";
        }
      }
    }
  }
}
</script>
