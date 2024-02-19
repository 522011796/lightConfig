<template>
  <div class="mian-block" ref="indexRef">
    <div class="main-block-title">
      <el-row>
        <el-col :span="8">
          <span class="main-block-logout" style="position: relative; top: 8px">
            <el-button size="mini" @click="logout">
              <span>退出</span>
            </el-button>
          </span>
        </el-col>
        <el-col :span="8">
          <div>
            <el-dropdown>
              <span class="el-dropdown-link color-ffffff font-size-15">
                {{ titleName }}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="changeDeviceType($event, 'light')">ILight配置设置</el-dropdown-item>
                <el-dropdown-item @click.native="changeDeviceType($event, 'switch')">ISwitch配置设置</el-dropdown-item>
                <el-dropdown-item @click.native="changeDeviceType($event, 'repeater')">中继器配置设置</el-dropdown-item>
                <el-dropdown-item @click.native="changeDeviceType($event, 'sensor')">传感器配置设置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <div>
              <el-dropdown trigger="click" size="mini">
                <span class="el-dropdown-link color-ffffff">
                  {{ activeName }}<i class="el-icon-caret-bottom"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-for="(item, index) in tabs" :key="index" @click.native="handleChangeTabs($event, item)">{{item}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="textRight">
<!--          <el-dropdown trigger="click" size="mini" split-button type="primary" @click="addPrdu" style="position: relative; top: 8px">-->
<!--            <i class="fa fa-plus" size="mini"></i>-->
<!--            厂商-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <el-dropdown-item v-for="(item, index) in tabs" :key="index" @click.native="handleChangeTabs($event, item)">{{item}}</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </el-dropdown>-->
          <el-button size="mini" type="warning" style="position: relative; top: 8px" @click="addPrdu">
            <i class="fa fa-plus" size="mini"></i>
            厂商
          </el-button>
          <el-button size="mini" type="success" style="position: relative; top: 8px" @click="add">
            <i class="fa fa-plus" size="mini"></i>
            配置
          </el-button>
        </el-col>
      </el-row>


      <span class="main-block-add">
<!--        <el-button size="mini" type="warning" style="position: relative; top: -5px" @click="addPrdu">-->
<!--          <i class="fa fa-plus" size="mini"></i>-->
<!--          厂商-->
<!--        </el-button>-->

      </span>
    </div>
<!--    <div class="mian-tab-block" style="position: relative">-->
<!--      <el-tabs v-if="tabs.length >0" v-model="activeName" @tab-click="handleClick">-->
<!--        <el-tab-pane v-for="(item, index) in tabs" :key="index" v-if="index <= 9" :label="item" :name="item"></el-tab-pane>-->
<!--      </el-tabs>-->
<!--      <el-dropdown trigger="click" style="position: absolute; right: 10px;top: 0px">-->
<!--        <span class="el-dropdown-link font-size-12 color-warning">-->
<!--          更多<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>-->
<!--        </span>-->
<!--        <el-dropdown-menu slot="dropdown">-->
<!--          <el-dropdown-item v-for="(item, index) in tabs" :key="index" v-if="index > 9" @click.native="handleChangeTabs($event, item)">{{item}}</el-dropdown-item>-->
<!--        </el-dropdown-menu>-->
<!--      </el-dropdown>-->
<!--      <div v-else style="height: 40px;"></div>-->
<!--    </div>-->
    <div class="mian-content-block">
      <div class="main-block-list" style="padding: 10px 10px 10px 10px" :style="mainStyle">
        <div v-if="data.length <= 0">
          <el-empty description="暂无数据" style="margin-top: 20%"></el-empty>
        </div>
        <div class="main-block-list-item marginBottom10" v-if="data.length > 0" v-for="(item, index) in data" :key="index">
          <el-row>
            <el-col :span="14" class="textLeft">
              <div class="font-size-12 marginTop10">{{ item.fileName }}</div>
              <div class="font-size-12 color-default marginTop5">{{ item.lastTime }}</div>
            </el-col>
            <el-col :span="10" class="textRight">
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
      size="700px"
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
              {{ titleName }}
            </div>
          </el-col>
          <el-col :span="4" class="textRight">
            <el-button size="mini" type="success" :loading="loading" @click="save">保存</el-button>
          </el-col>
        </el-row>
        </div>
      </div>

      <div>
        <el-form v-if="devType == 'light'" ref="form" :model="formConfig" label-width="140px">
          <el-form-item label="文件名称">
            <el-input v-model="fileName" style="width: 440px" disabled></el-input>
            -
            <el-input v-model="fileNameFixed" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="厂商名称">
<!--            <el-input v-model="formConfig.厂商名称" class="width440" @input="changePname"></el-input>-->
            <el-select :disabled="edit === 1 || edit === 0" v-model="formConfig.厂商名称" class="width440" placeholder="请选择" @change="changePname">
              <el-option
                v-for="(item, index) in tabs"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input v-model="formConfig.产品型号" class="width440" @input="changeMname"></el-input>
          </el-form-item>
          <el-form-item label="硬件制造日期">
            <el-date-picker
              style="width: 440px"
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
              style="width: 440px"
              v-model="goodsTime"
              type="month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              placeholder="选择周"
              :picker-options="{'firstDayOfWeek': 1}"
              @change="changeGoodsTime">
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
            <el-radio-group v-model="formConfig.恒压输出" @change="changePower">
              <el-radio label="NO">恒流输出</el-radio>
              <el-radio label="YES">恒压输出</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="输出平均电压">
            <el-input v-model="formConfig.输出平均电压" class="width440" @input="changeGV"></el-input>
          </el-form-item>
          <el-form-item label="硬件支持最大电流">
            <el-input v-model="formConfig.硬件支持最大电流" class="width440" @input="changeHL"></el-input>
          </el-form-item>
          <el-form-item label="厂商限制最大电流">
            <el-input v-model="formConfig.厂商限制最大电流" class="width440" @input="changePL"></el-input>
          </el-form-item>
          <el-form-item label="缺省选择最大电流">
            <el-input v-model="formConfig.缺省选择最大电流" class="width440" @input="changePMA"></el-input>
          </el-form-item>
          <el-form-item label="灯光模型">
            <el-radio-group v-model="formConfig.灯光模型" @change="changeLightType">
              <el-radio label="无模型调光"></el-radio>
              <el-radio label="单路调光"></el-radio>
              <el-radio label="冷暖调光"></el-radio>
              <el-radio label="RGB调光"></el-radio>
              <el-radio label="冷暖或RGB调光"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="PWM通道数量">
            <el-select v-model="formConfig.PWM通道数量" class="width440" placeholder="请选择" @change="changePwm">
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
            <el-input v-model="formConfig.缺省PWM最低频率" class="width440"></el-input>
          </el-form-item>
          <el-form-item label="缺省PWM最高频率">
            <el-input v-model="formConfig.缺省PWM最高频率" class="width440"></el-input>
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
            <el-input v-model="formConfig.上电指定亮度" class="width440"></el-input>
          </el-form-item>
          <el-form-item label="上电指定色温" v-if="formConfig.上电灯光模式 =='强制开灯并指定亮度和色温'">
            <el-input v-model="formConfig.上电指定色温" class="width440"></el-input>
          </el-form-item>
          <el-form-item label="上电指定色彩" v-if="formConfig.上电灯光模式 =='强制开灯并指定亮度和色彩'">
            <el-input v-model="formConfig.上电指定色彩" class="width440"></el-input>
          </el-form-item>
          <el-form-item label="开灯渐变时间">
            <el-input v-model="formConfig.开灯渐变时间" class="width440"></el-input>
          </el-form-item>
          <el-form-item label="关灯渐变时间">
            <el-input v-model="formConfig.关灯渐变时间" class="width440"></el-input>
          </el-form-item>
          <el-form-item label="缺省最低亮度">
            <el-input v-model="formConfig.缺省最低亮度" class="width440"></el-input>
          </el-form-item>
          <el-form-item label="缺省最高亮度">
            <el-input v-model="formConfig.缺省最高亮度" class="width440"></el-input>
          </el-form-item>
          <el-form-item label="缺省最低色温">
            <el-input v-model="formConfig.缺省最低色温" class="width440"></el-input>
          </el-form-item>
          <el-form-item label="缺省最高色温">
            <el-input v-model="formConfig.缺省最高色温" class="width440"></el-input>
          </el-form-item>
        </el-form>

        <el-form v-if="devType == 'switch'" ref="formSwitch" :model="formSwitch" label-width="150px">
          <el-form-item label="文件名称">
            <el-input v-model="fileName" style="width: 300px" disabled></el-input>
            -
            <el-input v-model="fileNameFixed" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="厂商名称">
<!--            <el-input v-model="formSwitch.厂商名称" class="width300" @input="changePname"></el-input>-->
            <el-select :disabled="edit === 1 || edit === 0" v-model="formSwitch.厂商名称" class="width440" placeholder="请选择" @change="changePname">
              <el-option
                v-for="(item, index) in tabs"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input v-model="formSwitch.产品型号" class="width300" @input="changeMname"></el-input>
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
              :picker-options="{'firstDayOfWeek': 1}"
              @change="changeGoodsTime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="射频大功率">
            <el-radio-group v-model="formSwitch.射频大功率">
              <el-radio label="NO"></el-radio>
              <el-radio label="YES"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="禁止联网">
            <el-radio-group v-model="formSwitch.禁止联网">
              <el-radio label="NO"></el-radio>
              <el-radio label="YES"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="离线语音控制">
            <el-radio-group v-model="formSwitch.离线语音控制">
              <el-radio label="NO">没有</el-radio>
              <el-radio label="YES">有</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="按键数量">
            <el-select v-model="formSwitch.按键数量Bak" class="width300" placeholder="请选择" @change="changeKeyNum">
              <el-option
                v-for="item in formSwitch.按键数量"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="继电器数量">
            <el-select v-model="formSwitch.继电器数量Bak" class="width300" placeholder="请选择" @change="changeSrialNum">
              <el-option
                v-for="item in formSwitch.继电器数量"
                :key="item"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省按键1定义" v-if="formSwitch.按键数量Bak >= 1">
            <el-select v-model="formSwitch.缺省按键1定义" class="width300" placeholder="请选择" @change="changeDefaultKey($event, 1)">
              <el-option label="继电器控制" value="继电器控制"></el-option>
              <el-option label="亮度+" value="亮度+"></el-option>
              <el-option label="亮度-" value="亮度-"></el-option>
              <el-option label="色温+" value="色温+"></el-option>
              <el-option label="色温-" value="色温-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省按键2定义" v-if="formSwitch.按键数量Bak >= 2">
            <el-select v-model="formSwitch.缺省按键2定义" class="width300" placeholder="请选择" @change="changeDefaultKey($event, 2)">
              <el-option label="继电器控制" value="继电器控制"></el-option>
              <el-option label="亮度+" value="亮度+"></el-option>
              <el-option label="亮度-" value="亮度-"></el-option>
              <el-option label="色温+" value="色温+"></el-option>
              <el-option label="色温-" value="色温-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省按键3定义" v-if="formSwitch.按键数量Bak >= 3">
            <el-select v-model="formSwitch.缺省按键3定义" class="width300" placeholder="请选择" @change="changeDefaultKey($event, 3)">
              <el-option label="继电器控制" value="继电器控制"></el-option>
              <el-option label="亮度+" value="亮度+"></el-option>
              <el-option label="亮度-" value="亮度-"></el-option>
              <el-option label="色温+" value="色温+"></el-option>
              <el-option label="色温-" value="色温-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省按键4定义" v-if="formSwitch.按键数量Bak >= 4">
            <el-select v-model="formSwitch.缺省按键4定义" class="width300" placeholder="请选择" @change="changeDefaultKey($event, 4)">
              <el-option label="继电器控制" value="继电器控制"></el-option>
              <el-option label="亮度+" value="亮度+"></el-option>
              <el-option label="亮度-" value="亮度-"></el-option>
              <el-option label="色温+" value="色温+"></el-option>
              <el-option label="色温-" value="色温-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省按键5定义" v-if="formSwitch.按键数量Bak >= 5">
            <el-select v-model="formSwitch.缺省按键5定义" class="width300" placeholder="请选择" @change="changeDefaultKey($event, 5)">
              <el-option label="继电器控制" value="继电器控制"></el-option>
              <el-option label="亮度+" value="亮度+"></el-option>
              <el-option label="亮度-" value="亮度-"></el-option>
              <el-option label="色温+" value="色温+"></el-option>
              <el-option label="色温-" value="色温-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省按键6定义" v-if="formSwitch.按键数量Bak >= 6">
            <el-select v-model="formSwitch.缺省按键6定义" class="width300" placeholder="请选择" @change="changeDefaultKey($event, 6)">
              <el-option label="继电器控制" value="继电器控制"></el-option>
              <el-option label="亮度+" value="亮度+"></el-option>
              <el-option label="亮度-" value="亮度-"></el-option>
              <el-option label="色温+" value="色温+"></el-option>
              <el-option label="色温-" value="色温-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省按键7定义" v-if="formSwitch.按键数量Bak >= 7">
            <el-select v-model="formSwitch.缺省按键7定义" class="width300" placeholder="请选择" @change="changeDefaultKey($event, 7)">
              <el-option label="继电器控制" value="继电器控制"></el-option>
              <el-option label="亮度+" value="亮度+"></el-option>
              <el-option label="亮度-" value="亮度-"></el-option>
              <el-option label="色温+" value="色温+"></el-option>
              <el-option label="色温-" value="色温-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省按键8定义" v-if="formSwitch.按键数量Bak >= 8">
            <el-select v-model="formSwitch.缺省按键8定义" class="width300" placeholder="请选择" @change="changeDefaultKey($event,8)">
              <el-option label="继电器控制" value="继电器控制"></el-option>
              <el-option label="亮度+" value="亮度+"></el-option>
              <el-option label="亮度-" value="亮度-"></el-option>
              <el-option label="色温+" value="色温+"></el-option>
              <el-option label="色温-" value="色温-"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按键1硬件管脚" v-if="formSwitch.按键数量Bak >= 1">
            <el-select v-model="formSwitch.按键1硬件管脚" class="width300" placeholder="请选择" @change="changeGj($event, 1)">
              <el-option v-for="(item, index) in formSwitch.按键数量Bak" :key="index" :label="`管脚${index+1}`" :value="`管脚${index+1}`"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按键2硬件管脚" v-if="formSwitch.按键数量Bak >= 2">
            <el-select v-model="formSwitch.按键2硬件管脚" class="width300" placeholder="请选择" @change="changeGj($event, 2)">
              <el-option v-for="(item, index) in formSwitch.按键数量Bak" :key="index" :label="`管脚${index+1}`" :value="`管脚${index+1}`"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按键3硬件管脚" v-if="formSwitch.按键数量Bak >= 3">
            <el-select v-model="formSwitch.按键3硬件管脚" class="width300" placeholder="请选择" @change="changeGj($event, 3)">
              <el-option v-for="(item, index) in formSwitch.按键数量Bak" :key="index" :label="`管脚${index+1}`" :value="`管脚${index+1}`"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按键4硬件管脚" v-if="formSwitch.按键数量Bak >= 4">
            <el-select v-model="formSwitch.按键4硬件管脚" class="width300" placeholder="请选择" @change="changeGj($event, 4)">
              <el-option v-for="(item, index) in formSwitch.按键数量Bak" :key="index" :label="`管脚${index+1}`" :value="`管脚${index+1}`"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按键5硬件管脚" v-if="formSwitch.按键数量Bak >= 5">
            <el-select v-model="formSwitch.按键5硬件管脚" class="width300" placeholder="请选择" @change="changeGj($event, 5)">
              <el-option v-for="(item, index) in formSwitch.按键数量Bak" :key="index" :label="`管脚${index+1}`" :value="`管脚${index+1}`"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按键6硬件管脚" v-if="formSwitch.按键数量Bak >= 6">
            <el-select v-model="formSwitch.按键6硬件管脚" class="width300" placeholder="请选择" @change="changeGj($event, 6)">
              <el-option v-for="(item, index) in formSwitch.按键数量Bak" :key="index" :label="`管脚${index+1}`" :value="`管脚${index+1}`"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按键7硬件管脚" v-if="formSwitch.按键数量Bak >= 7">
            <el-select v-model="formSwitch.按键7硬件管脚" class="width300" placeholder="请选择" @change="changeGj($event, 7)">
              <el-option v-for="(item, index) in formSwitch.按键数量Bak" :key="index" :label="`管脚${index+1}`" :value="`管脚${index+1}`"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="按键8硬件管脚" v-if="formSwitch.按键数量Bak >= 8">
            <el-select v-model="formSwitch.按键8硬件管脚" class="width300" placeholder="请选择" @change="changeGj($event, 8)">
              <el-option v-for="(item, index) in formSwitch.按键数量Bak" :key="index" :label="`管脚${index+1}`" :value="`管脚${index+1}`"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="缺省继电器1对应按键" v-if="formSwitch.继电器数量Bak >= 1">
            <el-radio-group v-model="formSwitch.缺省继电器1对应按键">
              <el-radio v-for="(item, index) in formSwitch.继电器数量Bak" :key="index" :label="`按键${index+1}`"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="缺省继电器2对应按键" v-if="formSwitch.继电器数量Bak >= 2">
            <el-radio-group v-model="formSwitch.缺省继电器2对应按键">
              <el-radio v-for="(item, index) in formSwitch.继电器数量Bak" :key="index" :label="`按键${index+1}`"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="缺省继电器3对应按键" v-if="formSwitch.继电器数量Bak >= 3">
            <el-radio-group v-model="formSwitch.缺省继电器3对应按键">
              <el-radio v-for="(item, index) in formSwitch.继电器数量Bak" :key="index" :label="`按键${index+1}`"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="缺省继电器4对应按键" v-if="formSwitch.继电器数量Bak >= 4">
            <el-radio-group v-model="formSwitch.缺省继电器4对应按键">
              <el-radio v-for="(item, index) in formSwitch.继电器数量Bak" :key="index" :label="`按键${index+1}`"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="第三方硬件基板">
            <el-select v-model="formSwitch.第三方硬件基板" class="width300" placeholder="请选择" @change="changeSwitchThirdBan($event)">
              <el-option v-for="(item, index) in thirdSwitchBan" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人体感应模块参数">
            <el-input v-model="formSwitch.人体感应模块参数" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="人体感应灵敏度">
            <el-input v-model="formSwitch.人体感应灵敏度" maxlength="3" placeholder="范围:0-100" class="width300"></el-input>
          </el-form-item>
          <el-form-item label="IO扩展芯片I2C地址">
            <el-input v-model="formSwitch.IO扩展芯片I2C地址" maxlength="2" placeholder="范围:0-FF十六进制" class="width300"></el-input>
          </el-form-item>
        </el-form>

        <el-form v-if="devType == 'repeater'" ref="formChange" :model="formChange" label-width="150px">
          <el-form-item label="文件名称">
            <el-input v-model="fileName" style="width: 300px" disabled></el-input>
            -
            <el-input v-model="fileNameFixed" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="厂商名称">
            <!--            <el-input v-model="formSwitch.厂商名称" class="width300" @input="changePname"></el-input>-->
            <el-select :disabled="edit === 1 || edit === 0" v-model="formChange.厂商名称" class="width440" placeholder="请选择" @change="changePname">
              <el-option
                v-for="(item, index) in tabs"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input v-model="formChange.产品型号" class="width300" @input="changeMname"></el-input>
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
              :picker-options="{'firstDayOfWeek': 1}"
              @change="changeGoodsTime">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <el-form v-if="devType == 'sensor'" ref="formChange" :model="formSensor" label-width="150px">
          <el-form-item label="文件名称">
            <el-input v-model="fileName" style="width: 300px" disabled></el-input>
            -
            <el-input v-model="fileNameFixed" style="width: 100px"></el-input>
          </el-form-item>
          <el-form-item label="厂商名称">
            <!--            <el-input v-model="formSwitch.厂商名称" class="width300" @input="changePname"></el-input>-->
            <el-select :disabled="edit === 1 || edit === 0" v-model="formSensor.厂商名称" class="width300" placeholder="请选择" @change="changePname">
              <el-option
                v-for="(item, index) in tabs"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品型号">
            <el-input v-model="formSensor.产品型号" class="width300" @input="changeMname"></el-input>
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
              :picker-options="{'firstDayOfWeek': 1}"
              @change="changeGoodsTime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="射频大功率">
            <el-radio-group v-model="formSensor.射频大功率">
              <el-radio label="NO"></el-radio>
              <el-radio label="YES"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="禁止联网">
            <el-radio-group v-model="formSensor.禁止联网">
              <el-radio label="NO"></el-radio>
              <el-radio label="YES"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="人体移动感应">
            <el-radio-group v-model="formSensor.人体移动感应">
              <el-radio label="NO"></el-radio>
              <el-radio label="YES"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="人体存在感应">
            <el-radio-group v-model="formSensor.人体存在感应">
              <el-radio label="NO"></el-radio>
              <el-radio label="YES"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="光照度感应">
            <el-radio-group v-model="formSensor.光照度感应">
              <el-radio label="NO"></el-radio>
              <el-radio label="YES"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="温湿度感应">
            <el-radio-group v-model="formSensor.温湿度感应">
              <el-radio label="NO"></el-radio>
              <el-radio label="YES"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="第三方硬件基板">
            <el-select v-model="formSensor.第三方硬件基板" class="width300" placeholder="请选择" @change="changeThirdBan">
              <el-option
                v-for="(item, index) in thirdBan"
                :key="index"
                :label="item.label"
                :value="item.label">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>

    <el-dialog
      title="克隆文件"
      :visible.sync="dialogCopy"
      width="500px"
      @close="closeDialog">
      <div>
        <el-input v-model="inputCopyValue" disabled></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogCopy = false">取 消</el-button>
        <el-button size="small" type="primary" @click="copyOk">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog
      custom-class="custom-dialog"
      title="厂商设置"
      :visible.sync="dialogPrdu"
      width="350px"
      :show-close="false"
      @close="closeDialog">
      <div slot="title">
        <div class="font-size-15 fontBold color-333333">厂商设置</div>
      </div>
      <div>
        <div>
          <el-row>
            <el-col :span="6" v-for="(item, index) in tabs" :key="item">
              <el-tag class="moon-ellipsis-class" size="mini" style="width: 70px !important;">{{item}}</el-tag>
            </el-col>
          </el-row>
        </div>
        <div class="marginTop10">
          <el-input v-model="inputPrduValue"></el-input>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogPrdu = false">取 消</el-button>
        <el-button size="small" type="primary" @click="copyPrduOk('add')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import LightForm from "../components/LightForm";
export default {
  name: 'IndexPage',
  components: {LightForm},
  data(){
    return {
      prduName: '',
      activeName: '',
      tabs: [],
      thirdBan: [{label: '麦乐克红外幕帘', value: '麦乐克红外幕帘', text: 'mir_pir'}],
      thirdSwitchBan: [{label: '网月', value: '网月', text: '网月'}],
      drawerAdd: false,
      dialogCopy: false,
      dialogPrdu: false,
      data: [],
      edit: 0,
      devType: 'light',
      loading: false,
      copyStatus: false,
      inputCopyValue: '',
      inputPrduValue: '',
      copyItem: {},
      mainStyle: {
        'height': 0,
        'overflow-y': 'auto'
      },
      titleName: 'ILight配置设置',
      fileName: '',
      fileNameFixed: '',
      fileNameArray: [],
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
      },
      formSwitch: {
        '厂商名称': 'netmoon',
        '产品型号': 'ISwitch-X1',
        '硬件制造日期': '',
        '产品出厂日期': '',
        '射频大功率': 'YES',
        "禁止联网" : "NO",
        "离线语音控制" : "YES",
        '按键数量': 8,
        '继电器数量': 4,
        '按键数量Bak': 8,
        '继电器数量Bak': 4,
        '缺省按键1定义': '继电器控制',
        '缺省按键2定义': '继电器控制',
        '缺省按键3定义': '继电器控制',
        '缺省按键4定义': '继电器控制',
        '缺省按键5定义': '亮度+',
        '缺省按键6定义': '色温+',
        '缺省按键7定义': '亮度-',
        '缺省按键8定义': '色温-',
        '按键1硬件管脚': '管脚1',
        '按键2硬件管脚': '管脚2',
        '按键3硬件管脚': '管脚3',
        '按键4硬件管脚': '管脚4',
        '按键5硬件管脚': '管脚5',
        '按键6硬件管脚': '管脚6',
        '按键7硬件管脚': '管脚7',
        '按键8硬件管脚': '管脚8',
        '缺省继电器1对应按键': '按键1',
        '缺省继电器2对应按键': '按键2',
        '缺省继电器3对应按键': '按键3',
        '缺省继电器4对应按键': '按键4',
        '第三方硬件基板': '网月',
        '人体感应模块参数': '',
        '人体感应灵敏度':'100',
        'IO扩展芯片I2C地址': '0'
      },
      formChange: {
        '厂商名称': 'netmoon',
        '产品型号': 'IRepeater-X1',
        '硬件制造日期': '',
        '产品出厂日期': '',
      },
      formSensor: {
        '厂商名称': 'netmoon',
        '产品型号': 'ISensor-X1',
        '硬件制造日期': '',
        '产品出厂日期': '',
        '射频大功率': 'YES',
        "禁止联网" : "NO",
        '人体移动感应': 'NO',
        '人体存在感应': 'NO',
        '光照度感应': 'NO',
        '温湿度感应': 'NO',
        '第三方硬件基板': '麦乐克红外幕帘',
      }
    }
  },
  mounted() {
    if (process.client){
      this.mainStyle.height = window.innerHeight - 80 + 'px';
    }
  },
  created() {
    this.devType = this.$route.query.devType ? this.$route.query.devType : 'light';
    if (this.devType == "light"){
      this.titleName = "ILight配置设置";
    }else if (this.devType == "switch"){
      this.titleName = "ISwitch配置设置";
    }else if (this.devType == "repeater"){
      this.titleName = "中继器配置设置";
    }else if (this.devType == "sensor"){
      this.titleName = "传感器配置设置";
    }
    this.initConfig();
  },
  methods: {
    async initConfig(){
      await this.getPrdu();
      this.init();
    },
    setFileName(){
      this.fileName = "";
      if (this.devType == "switch"){
        for (let i = 0; i < this.fileNameArray.length; i++){
          if (i == 3){
            this.fileName += "b" + this.fileNameArray[i];
          }else if (i == 4){
            let fileName4 = this.fileNameArray[i].toString();
            this.fileName += "r" + fileName4.replace(/.copy/g, "");
          }else {
            this.fileName += this.fileNameArray[i];
          }
          if (this.fileNameArray.length-1 != i){
            this.fileName += "-";
          }
        }
      }else if (this.devType == "light"){
        let out = "";
        for (let i = 0; i < this.fileNameArray.length; i++){
          if (i == 3){
            if (this.fileNameArray[3] == "YES"){
              out = "cv";
            }else if (this.fileNameArray[3] == "NO"){
              out = "dc";
            }
            this.fileName += out;
          }else if (i == 4){
            this.fileName += this.fileNameArray[i] + "V";
          }else if (i == 5){
            this.fileName += "[" + this.fileNameArray[i];
          }else if (i == 6){
            this.fileName += this.fileNameArray[i];
          }else if (i == 7){
            this.fileName += this.fileNameArray[i] + "]";
          }else if (i == 9){
            this.fileName += "pwm" + this.fileNameArray[i];
          }else {
            this.fileName += this.fileNameArray[i];
          }

          if (this.fileNameArray.length-1 != i){
            this.fileName += "-";
          }
        }
      }else if (this.devType == "repeater"){
        for (let i = 0; i < this.fileNameArray.length; i++){
          this.fileName += this.fileNameArray[i];
          if (this.fileNameArray.length-1 != i){
            this.fileName += "-";
          }
        }
      }else if (this.devType == "sensor"){
        for (let i = 0; i < this.fileNameArray.length; i++){
          this.fileName += this.fileNameArray[i];
          if (this.fileNameArray.length-1 != i){
            this.fileName += "-";
          }
        }
      }
    },
    init(){
      let params = {
        dev_type: this.devType,
        activeName: this.activeName
      };
      this.data = [];
      this.$axios.get('/proxy/list-group-by-manufacturer.php', {params: params}).then(res => {
        if (res.data.code == 200){
          let arr = [];
          for (let item in res.data.data){
            if (item == this.activeName){
              this.data = res.data.data[item];
            }
          }
        }
      });
    },
    async getPrdu(){
      this.prduName = '厂商';
      await this.$axios.get('/proxy/list-manufacturer.php').then(res => {
        if (res.data.code == 200){
          this.tabs = res.data.data;
          let key = 'netmoon';
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i] === key) {
              res.data.data.splice(i, 1);
              break;
            }
          }
          res.data.data.unshift(key);

          if (res.data.data.length > 0){
            this.activeName = res.data.data[0];
            this.prduName = res.data.data[0];
          }else {
            this.tabs = ['netmoon'];
            this.activeName = 'netmoon';
          }
        }
      });
    },
    handleClick(tab, event) {
      this.activeName = tab.name;
      this.init();
    },
    changePname(data){
      this.fileNameArray[0] = data;
      if (this.devType == "light"){
        this.formConfig.厂商名称 = data;
      }else if (this.devType == "light"){
        this.formSwitch.厂商名称 = data;
      }else if (this.devType == "repeater"){
        this.formChange.厂商名称 = data;
      }else if (this.devType == "sensor"){
        this.formSensor.厂商名称 = data;
      }
      this.setFileName();
    },
    changeThirdBan(data){
      this.formSensor.第三方硬件基板 = data;
      if (data == '麦乐克红外幕帘'){
        this.fileNameArray[3] = 'mir_pir';
      }
      this.setFileName();
    },
    changeMname(data){
      this.fileNameArray[1] = data;
      this.setFileName();
    },
    changeGoodsTime(data){
      this.fileNameArray[2] = data;
      this.setFileName();
    },
    changePower(data){
      this.fileNameArray[3] = data;
      this.setFileName();
    },
    changeGV(data){
      this.fileNameArray[4] = data;
      this.setFileName();
    },
    changeDeFL(data){
      this.fileNameArray[5] = data;
      this.setFileName();
    },
    changeHL(data){
      this.fileNameArray[5] = data;
      this.setFileName();
    },
    changePL(data){
      this.fileNameArray[6] = data;
      this.setFileName();
    },
    changePMA(data){
      this.fileNameArray[7] = data;
      this.setFileName();
    },
    handleChangeTabs(event, data){
      this.activeName = data;
      this.init();
    },
    logout(){
      this.$axios.get('/proxy/logout.php').then(res => {
        this.$router.replace({
          path: '/login'
        });
      });
    },
    addPrdu(){
      this.dialogPrdu = true;
    },
    add(){
      if (this.tabs.length == 0){
        this.$message({
          message: "请先添加厂商数据",
          type: 'warning'
        });
        return;
      }

      this.edit = 0;
      let year = this.$moment().format("yyyy");
      let month = this.$moment().format("MM");
      this.goodsTime = this.$moment().format('YYYY-MM');
      this.createTime= this.$moment().format('YYYY-MM');

      if (this.devType == 'light'){
        //this.fileName = this.formConfig.厂商名称 + "-" + this.formConfig.输出平均电压 + "V" + "-" + this.formConfig.缺省选择最大电流 + "mA" + "-";
        this.formConfig.厂商名称 = this.activeName ? this.activeName : 'netmoon';
        this.fileNameArray[0] = this.formConfig.厂商名称;
        this.fileNameArray[1] = this.formConfig.产品型号;
        this.fileNameArray[2] = this.goodsTime;
        this.fileNameArray[3] = this.formConfig.恒压输出;
        this.fileNameArray[4] = this.formConfig.输出平均电压;
        this.fileNameArray[5] = this.formConfig.硬件支持最大电流;
        this.fileNameArray[6] = this.formConfig.厂商限制最大电流;
        this.fileNameArray[7] = this.formConfig.缺省选择最大电流;
        this.fileNameArray[8] = "wc";
        this.fileNameArray[9] = this.formConfig.PWM通道数量;

        this.setFileName();
      }else if (this.devType == 'switch'){
        //this.fileName = this.formSwitch.厂商名称 + "-";
        this.formSwitch.厂商名称 = this.activeName ? this.activeName : 'netmoon';
        this.fileNameArray[0] = this.formSwitch.厂商名称;
        this.fileNameArray[1] = this.formSwitch.产品型号;
        this.fileNameArray[2] = this.goodsTime;
        this.fileNameArray[3] = this.formSwitch.按键数量Bak;
        this.fileNameArray[4] = this.formSwitch.继电器数量Bak;
        this.setFileName();
      }else if (this.devType == 'repeater'){
        this.formChange.厂商名称 = this.activeName ? this.activeName : 'netmoon';
        this.fileNameArray[0] = this.formChange.厂商名称;
        this.fileNameArray[1] = this.formChange.产品型号;
        this.fileNameArray[2] = this.goodsTime;
        this.setFileName();
      }else if (this.devType == 'sensor'){
        this.formSensor.厂商名称 = this.activeName ? this.activeName : 'netmoon';
        this.fileNameArray[0] = this.formSensor.厂商名称;
        this.fileNameArray[1] = this.formSensor.产品型号;
        this.fileNameArray[2] = this.goodsTime;
        if (this.formSensor.第三方硬件基板 == "麦乐克红外幕帘"){
          this.fileNameArray[3] = 'mir_pir';
        }
        this.setFileName();
      }
      //this.fileNameFixed = "file" + parseInt(this.data.length + 1);
      this.drawerAdd = true;
    },
    update(event, item){
      this.edit = 1;
      // if (this.devType == "switch"){
      //   this.fileNameArray[0] = filename[0];
      //   this.fileNameArray[1] = item.厂商型号;
      //   this.fileNameArray[2] = filename[3] + "-" + filename[4];
      //   this.fileNameArray[3] = filename[5].substring(1);
      //   this.fileNameArray[4] = filename[6].substring(1);
      //
      //   this.fileNameFixed = filename[7] == undefined ? "" : filename[7].replace(/.copy/g, "");
      // }
      this.fileName = item.fileName;
      this.oldFileName = item.fileName;
      this.$axios.get('/proxy/data.php?file_name=' + item.fileName + "&dev_type=" + this.devType).then(res => {
        if (this.devType == "light"){
          let filename = item.fileName.split("-");
          this.formConfig = JSON.parse(res.data.data);
          if (this.formConfig['恒压输出'] == undefined){
            this.formConfig['恒压输出'] = 'NO';
          }
          let year1 = '20' + this.formConfig.硬件制造日期.substring(0,2);
          let year2 = '20' + this.formConfig.产品出厂日期.substring(0,2);
          let time1 = year1 +"-"+ this.formConfig.硬件制造日期.substring(2,4);
          let time2 = year2 +"-"+ this.formConfig.产品出厂日期.substring(2,4);
          this.createTime = time1;
          this.goodsTime = time2;

          this.fileNameArray[0] = this.formConfig.厂商名称;
          this.fileNameArray[1] = this.formConfig.产品型号;
          this.fileNameArray[2] = this.goodsTime;
          this.fileNameArray[3] = this.formConfig.恒压输出;
          this.fileNameArray[4] = this.formConfig.输出平均电压;
          this.fileNameArray[5] = this.formConfig.硬件支持最大电流;
          this.fileNameArray[6] = this.formConfig.厂商限制最大电流;
          this.fileNameArray[7] = this.formConfig.缺省选择最大电流;
          let type = "";
          if (this.formConfig.灯光模型 == '无模型调光'){
            type = "null";
          }else if (this.formConfig.灯光模型 == '单路调光'){
            type = "w";
          }else if (this.formConfig.灯光模型 == '冷暖调光'){
            type = "wc";
          }else if (this.formConfig.灯光模型 == 'RGB调光'){
            type = "rgb";
          }else if (this.formConfig.灯光模型 == '冷暖或RGB调光'){
            type = "wc_or_rgb";
          }
          this.fileNameArray[8] = type;
          this.fileNameArray[9] = this.formConfig.PWM通道数量;
          //this.fileNameFixed = filename[12] == undefined ? "" : filename[12].replace(/.copy/g, "");

          if (filename[filename.length - 1].substring(3).replace(/.copy/g, "") != this.formConfig.PWM通道数量){
            this.fileNameFixed = filename[filename.length - 1] == undefined ? "" : filename[filename.length - 1].replace(/.copy/g, "");
          }
        }else if (this.devType == "switch"){
          let filename = item.fileName.split("-");
          this.formSwitch = JSON.parse(res.data.data);
          this.formSwitchTemp = JSON.parse(JSON.stringify(JSON.parse(res.data.data)));
          this.formSwitch['按键数量Bak'] = this.formSwitch.按键数量;
          this.formSwitch['继电器数量Bak'] = this.formSwitch.继电器数量;
          this.formSwitch['按键数量'] = 8;
          this.formSwitch['继电器数量'] = 4;

          this.formSwitch['第三方硬件基板'] = this.formSwitch['第三方硬件基板'] ? this.formSwitch['第三方硬件基板'] : "网月";
          this.$set(this.formSwitch, '人体感应灵敏度', this.formSwitch['人体感应灵敏度'] ? this.formSwitch['人体感应灵敏度'] * 100 : "100");
          this.$set(this.formSwitch, 'IO扩展芯片I2C地址', this.formSwitch['IO扩展芯片I2C地址'] ?  this.convertBase(this.formSwitch['IO扩展芯片I2C地址'], 10, 16) : "0");

          let year1 = '20' + this.formSwitch.硬件制造日期.substring(0,2);
          let year2 = '20' + this.formSwitch.产品出厂日期.substring(0,2);
          let time1 = year1 +"-"+ this.formSwitch.硬件制造日期.substring(2,4);
          let time2 = year2 +"-"+ this.formSwitch.产品出厂日期.substring(2,4);
          this.createTime = time1;
          this.goodsTime = time2;

          this.fileNameArray[0] = this.formSwitch.厂商名称;
          this.fileNameArray[1] = this.formSwitch.产品型号;
          this.fileNameArray[2] = time2;
          this.fileNameArray[3] = this.formSwitch.按键数量Bak;
          this.fileNameArray[4] = this.formSwitch.继电器数量Bak;

          if (filename[filename.length - 1].substring(1).replace(/.copy/g, "") != this.formSwitch.继电器数量Bak){
            this.fileNameFixed = filename[filename.length - 1] == undefined ? "" : filename[filename.length - 1].replace(/.copy/g, "");
          }
        }else if (this.devType == 'repeater'){
          let filename = item.fileName.split("-");
          this.formChange = JSON.parse(res.data.data);

          let year1 = '20' + this.formChange.硬件制造日期.substring(0,2);
          let year2 = '20' + this.formChange.产品出厂日期.substring(0,2);
          let time1 = year1 +"-"+ this.formChange.硬件制造日期.substring(2,4);
          let time2 = year2 +"-"+ this.formChange.产品出厂日期.substring(2,4);
          this.createTime = time1;
          this.goodsTime = time2;

          this.fileNameArray[0] = this.formChange.厂商名称;
          this.fileNameArray[1] = this.formChange.产品型号;
          this.fileNameArray[2] = time2;

          if (filename[filename.length - 1].replace(/.copy/g, "") != this.formChange.产品出厂日期.substring(2,4)){
            this.fileNameFixed = filename[filename.length - 1] == undefined ? "" : filename[filename.length - 1].replace(/.copy/g, "");
          }
        }else if (this.devType == 'sensor'){
          let filename = item.fileName.split("-");
          let fileFixed = "";
          this.formSensor = JSON.parse(res.data.data);

          let year1 = '20' + this.formSensor.硬件制造日期.substring(0,2);
          let year2 = '20' + this.formSensor.产品出厂日期.substring(0,2);
          let time1 = year1 +"-"+ this.formSensor.硬件制造日期.substring(2,4);
          let time2 = year2 +"-"+ this.formSensor.产品出厂日期.substring(2,4);
          this.createTime = time1;
          this.goodsTime = time2;

          if (this.formSensor.第三方硬件基板 == "麦乐克红外幕帘"){
            fileFixed = "mir_pir";
          }

          this.fileNameArray[0] = this.formSensor.厂商名称;
          this.fileNameArray[1] = this.formSensor.产品型号;
          this.fileNameArray[2] = time2;
          this.fileNameArray[3] = fileFixed;

          if (filename[filename.length - 1].replace(/.copy/g, "") != fileFixed){
            this.fileNameFixed = filename[filename.length - 1] == undefined ? "" : filename[filename.length - 1].replace(/.copy/g, "");
          }
        }
        this.setFileName();
      });
      //this.fileName = this.formConfig.厂商名称 + "-" + this.formConfig.产品型号 + "-" + this.$moment().format("yyyy-MM-DD");
      this.drawerAdd = true;
    },
    del(event, item){
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {
          action: 'del',
          dev_type: this.devType,
          file_name: item.fileName
        };
        params = this.$qs.stringify(params);
        this.$axios.post('/proxy/action.php?action=del', params).then(res => {
          if (res.data.code == 200){
            this.init();
          }else{
            this.$message({
              message: res.data.desc,
              type: 'info'
            });
          }
        });
      })
    },
    copy(event, item){
      let _self = this;
      this.copyStatus = true;
      this.inputCopyValue = item.fileName + ".copy";
      this.copyItem = item;
      this.dialogCopy = true;
      // this.$prompt(
      //   '',
      //   '请输入文件名',
      //   {
      //     closeOnClickModal: false,
      //     showClose: false,
      //     inputValue: item.fileName + ".copy",
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     beforeClose: (action, instance, done) => {
      //       if (action === 'confirm') {
      //         let params = {
      //           action: 'clone',
      //           dev_type: this.devType,
      //           file_name: item.fileName,
      //           new_file_name: instance.inputValue
      //         };
      //         params = this.$qs.stringify(params);
      //         _self.$axios.post('/proxy/action.php?action=clone', params).then(res => {
      //           if (res.data.code == 200){
      //             _self.init();
      //             _self.copyStatus = false;
      //             done();
      //           }else{
      //             _self.$message({
      //               message: res.data.desc,
      //               type: 'info'
      //             });
      //           }
      //         });
      //       }else{
      //         _self.copyStatus = false;
      //         done();
      //       }
      //     }
      // }).then(({ value }) => {
      //
      // }).catch(() => {
      //
      // });
    },
    copyPrduOk(type){
      if (this.inputPrduValue == ""){
        this.$message({
          message: "请填写厂商名称",
          type: 'info'
        });
        return;
      }
      let _self = this;
      let params = {
        action: type,
        manufacturer: this.inputPrduValue
      };
      params = this.$qs.stringify(params);
      _self.$axios.post('/proxy/action-manufacturer.php', params).then(res => {
        if (res.data.code == 200){
          _self.init();
          _self.getPrdu();
          _self.dialogPrdu = false;
        }else{
          _self.$message({
            message: res.data.desc,
            type: 'info'
          });
        }
      });
    },
    copyOk(){
      let _self = this;
      let params = {
        action: 'clone',
        dev_type: this.devType,
        file_name: this.copyItem.fileName,
        new_file_name: this.inputCopyValue
      };
      params = this.$qs.stringify(params);
      _self.$axios.post('/proxy/action.php?action=clone', params).then(res => {
        if (res.data.code == 200){
          _self.init();
          _self.dialogCopy = false;
        }else{
          _self.$message({
            message: res.data.desc,
            type: 'info'
          });
        }
      });
    },
    closeDialog(){
      this.copyItem = {};
      this.inputCopyValue = "";
      this.inputPrduValue = "";
      this.dialogCopy = false;
      this.dialogPrdu = false;
    },
    download(event, item){
      window.open('/proxy/download.php?file_name=' + item.fileName + "&dev_type=" + this.devType, "_self");
    },
    cancel(){
      this.drawerAdd = false;
    },
    save(){
      let params = {};
      let action = "";
      let fileName = this.fileName;
      if (this.fileNameFixed != ""){
        let myReg = /[-]/;
        if(myReg.test(this.fileNameFixed)) {
          this.$message({
            message: "输入文件名后缀不能带有-字符",
            type: 'warning'
          });
          return true;
        }
        fileName += "-" + this.fileNameFixed;
      }

      if (this.devType == "light"){
        this.formConfig.硬件制造日期 = this.createTime.substring(2,4) + this.createTime.substring(5,7);
        this.formConfig.产品出厂日期 = this.goodsTime.substring(2,4) + this.goodsTime.substring(5,7);
        if (this.fileName == ''){
          //fileName = this.formConfig.厂商名称 + "-" + this.formConfig.输出平均电压 + "V" + "-" + this.formConfig.缺省选择最大电流 + "mA"
          this.$message({
            message: "文件名称不能为空！",
            type: 'warning'
          });
          return;
        }

        this.formConfig.输出平均电压 = parseInt(this.formConfig.输出平均电压);
        this.formConfig.硬件支持最大电流 = parseInt(this.formConfig.硬件支持最大电流);
        this.formConfig.厂商限制最大电流 = parseInt(this.formConfig.厂商限制最大电流);
        this.formConfig.缺省选择最大电流 = parseInt(this.formConfig.缺省选择最大电流);
        this.formConfig.PWM通道数量 = parseInt(this.formConfig.PWM通道数量);
        this.formConfig.缺省PWM最低频率 = parseInt(this.formConfig.缺省PWM最低频率);
        this.formConfig.缺省PWM最高频率 = parseInt(this.formConfig.缺省PWM最高频率);
        this.formConfig.上电指定亮度 = parseInt(this.formConfig.上电指定亮度);
        this.formConfig.上电指定色温 = parseInt(this.formConfig.上电指定色温);
        this.formConfig.上电指定色彩 = parseInt(this.formConfig.上电指定色彩);
        this.formConfig.开灯渐变时间 = parseInt(this.formConfig.开灯渐变时间);
        this.formConfig.关灯渐变时间 = parseInt(this.formConfig.关灯渐变时间);
        this.formConfig.缺省最低亮度 = parseFloat(this.formConfig.缺省最低亮度);
        this.formConfig.缺省最低色温 = parseInt(this.formConfig.缺省最低色温);
        this.formConfig.缺省最高色温 = parseInt(this.formConfig.缺省最高色温);
      }else if (this.devType == "switch"){
        this.formSwitch.硬件制造日期 = this.createTime.substring(2,4) + this.createTime.substring(5,7);
        this.formSwitch.产品出厂日期 = this.goodsTime.substring(2,4) + this.goodsTime.substring(5,7);
        let fileName = this.fileName;
        if (this.fileName == ''){
          this.$message({
            message: "文件名称不能为空！",
            type: 'warning'
          });
          return;
          // fileName = this.formSwitch.厂商名称
        }
        if (this.formSwitch.人体感应模块参数 && this.formSwitch.人体感应模块参数 != ""){
          let req = /^[A-Fa-f0-9]+$/;
          if (this.formSwitch.人体感应模块参数.length % 2 != 0){
            this.$message({
              message: "人体感应模块参数填写有误，请确认是否为偶数位",
              type: 'warning'
            });
            return;
          }else if (!req.test(this.formSwitch.人体感应模块参数)){
            this.$message({
              message: "人体感应模块参数必须为16进制！",
              type: 'warning'
            });
            return;
          }
        }
        if (this.formSwitch.人体感应灵敏度 == ""){
          this.$message({
            message: "请填写人体感应灵敏度！",
            type: 'warning'
          });
          return;
        }else if (this.formSwitch.人体感应灵敏度 != ""){
          let req = /^(?:0|[1-9][0-9]?|100)$/;
          if (!req.test(this.formSwitch.人体感应灵敏度)){
            this.$message({
              message: "人体感应灵敏度范围:0-100",
              type: 'warning'
            });
            return;
          }
        }

        if (this.formSwitch.IO扩展芯片I2C地址 == ""){
          this.$message({
            message: "请填写IO扩展芯片I2C地址！",
            type: 'warning'
          });
          return;
        }else if (this.formSwitch.IO扩展芯片I2C地址 != ""){
          let req = /^[A-Fa-f0-9]+$/;
          if (!req.test(this.formSwitch.IO扩展芯片I2C地址)){
            this.$message({
              message: "IO扩展芯片I2C地址为16进制",
              type: 'warning'
            });
            return;
          }
        }

        let bodySersonValue = this.formSwitch.人体感应灵敏度;
        let bodySersonValueTemp = (bodySersonValue/100).toFixed(2);

        let i2cValue = this.formSwitch.IO扩展芯片I2C地址;
        let i2cHexValue = this.convertBase(i2cValue, 16, 10);

        this.formSwitch.按键数量 = parseInt(this.formSwitch.按键数量Bak);
        this.formSwitch.继电器数量 = parseInt(this.formSwitch.继电器数量Bak);
        this.formSwitch.缺省按键1定义 = this.formSwitch.缺省按键1定义;
        this.formSwitch.缺省按键2定义 = this.formSwitch.缺省按键2定义;
        this.formSwitch.缺省按键3定义 = this.formSwitch.缺省按键3定义;
        this.formSwitch.缺省按键4定义 = this.formSwitch.缺省按键4定义;
        this.formSwitch.缺省按键5定义 = this.formSwitch.缺省按键5定义;
        this.formSwitch.缺省按键6定义 = this.formSwitch.缺省按键6定义;
        this.formSwitch.缺省按键7定义 = this.formSwitch.缺省按键7定义;
        this.formSwitch.缺省按键8定义 = this.formSwitch.缺省按键8定义;
        this.formSwitch.按键1硬件管脚 = this.formSwitch.按键1硬件管脚;
        this.formSwitch.按键2硬件管脚 = this.formSwitch.按键2硬件管脚;
        this.formSwitch.按键3硬件管脚 = this.formSwitch.按键3硬件管脚;
        this.formSwitch.按键4硬件管脚 = this.formSwitch.按键4硬件管脚;
        this.formSwitch.按键5硬件管脚 = this.formSwitch.按键5硬件管脚;
        this.formSwitch.按键6硬件管脚 = this.formSwitch.按键6硬件管脚;
        this.formSwitch.按键7硬件管脚 = this.formSwitch.按键7硬件管脚;
        this.formSwitch.按键8硬件管脚 = this.formSwitch.按键8硬件管脚;
        this.formSwitch.缺省继电器1对应按键 = this.formSwitch.缺省继电器1对应按键;
        this.formSwitch.缺省继电器2对应按键 = this.formSwitch.缺省继电器2对应按键;
        this.formSwitch.缺省继电器3对应按键 = this.formSwitch.缺省继电器3对应按键;
        this.formSwitch.缺省继电器4对应按键 = this.formSwitch.缺省继电器4对应按键;
        this.formSwitch.第三方硬件基板 = this.formSwitch.第三方硬件基板;
        this.formSwitch.人体感应模块参数 = this.formSwitch.人体感应模块参数;
        this.formSwitch.人体感应灵敏度 = parseFloat(bodySersonValueTemp);
        this.formSwitch.按键数量Bak = undefined;
        this.formSwitch.继电器数量Bak = undefined;
        this.formSwitch.IO扩展芯片I2C地址 = parseInt(i2cHexValue);
      }else if (this.devType == 'repeater'){
        this.formChange.硬件制造日期 = this.createTime.substring(2,4) + this.createTime.substring(5,7);
        this.formChange.产品出厂日期 = this.goodsTime.substring(2,4) + this.goodsTime.substring(5,7);
        let fileName = this.fileName;
        if (this.fileName == ''){
          this.$message({
            message: "文件名称不能为空！",
            type: 'warning'
          });
          return;
          // fileName = this.formSwitch.厂商名称
        }
      }else if (this.devType == 'sensor'){
        this.formSensor.硬件制造日期 = this.createTime.substring(2,4) + this.createTime.substring(5,7);
        this.formSensor.产品出厂日期 = this.goodsTime.substring(2,4) + this.goodsTime.substring(5,7);
        let fileName = this.fileName;
        if (this.fileName == ''){
          this.$message({
            message: "文件名称不能为空！",
            type: 'warning'
          });
          return;
          // fileName = this.formSwitch.厂商名称
        }
      }

      if (this.edit == 0){
        params = {
          action: 'add',
          dev_type: this.devType,
          file_name: fileName
        };
        action = "add";
      }else if (this.edit == 1){
        params = {
          action: 'rename_edit',
          dev_type: this.devType,
          file_name: this.oldFileName,
          new_file_name: fileName
        };
        action = "rename_edit";
      }
      if (this.devType == 'light'){
        params['data'] = JSON.stringify(this.formConfig);
      }else if (this.devType == 'switch'){
        params['data'] = JSON.stringify(this.formSwitch);
      }else if (this.devType == 'repeater'){
        params['data'] = JSON.stringify(this.formChange);
      }else if (this.devType == 'sensor'){
        params['data'] = JSON.stringify(this.formSensor);
      }
      console.log(params);
      //return;
      params = this.$qs.stringify(params);
      this.loading = true;
      this.$axios.post('/proxy/action.php?action='+action, params).then(res => {
        if (res.data.code == 200){
          this.init();
          this.drawerAdd = false;
        }else{
          this.$message({
            message: res.data.desc,
            type: 'info'
          });
          this.formSwitch = this.formSwitch;
          this.formSwitch.按键数量Bak = parseInt(this.formSwitch.按键数量);
          this.formSwitch.继电器数量Bak = parseInt(this.formSwitch.继电器数量);
          this.formSwitch.IO扩展芯片I2C地址 = this.convertBase(this.formSwitch['IO扩展芯片I2C地址'], 10, 16);
          this.formSwitch.人体感应灵敏度 = this.formSwitch['人体感应灵敏度'] * 100;
        }
        this.loading = false;
      });
    },
    convertBase(number, fromBase, toBase) {
      const decimalNumber = parseInt(number, fromBase);
      return decimalNumber.toString(toBase);
    },
    changeLightType(data){
      let type = "";
      if (data == '无模型调光'){
        type = "null";
      }else if (data == '单路调光'){
        type = "w";
      }else if (data == '冷暖调光'){
        type = "wc";
      }else if (data == 'RGB调光'){
        type = "rgb";
      }else if (data == '冷暖或RGB调光'){
        type = "wc_or_rgb";
      }
      this.fileNameArray[8] = type;
      this.setFileName();
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

      this.fileNameArray[9] = data;
      this.setFileName();
    },
    changeKeyNum(data){
      this.formSwitch.按键数量Bak = data;
      this.fileNameArray[3] = data;
      this.setFileName();
    },
    changeSrialNum(data){
      this.formSwitch.继电器数量Bak = data;
      this.fileNameArray[4] = data;
      this.setFileName();
    },
    changeDefaultKey(data, type){
      if (type == 1){
        this.formSwitch.缺省按键1定义 = data;
      }else if (type == 2){
        this.formSwitch.缺省按键2定义 = data;
      }else if (type == 3){
        this.formSwitch.缺省按键3定义 = data;
      }else if (type == 4){
        this.formSwitch.缺省按键4定义 = data;
      }else if (type == 5){
        this.formSwitch.缺省按键5定义 = data;
      }else if (type == 6){
        this.formSwitch.缺省按键6定义 = data;
      }else if (type == 7){
        this.formSwitch.缺省按键7定义 = data;
      }else if (type == 8){
        this.formSwitch.缺省按键8定义 = data;
      }
    },
    changeGj(data, type){
      if (type == 1){
        this.formSwitch.按键1硬件管脚 = data;
      }else if (type == 2){
        this.formSwitch.按键2硬件管脚 = data;
      }else if (type == 3){
        this.formSwitch.按键3硬件管脚 = data;
      }else if (type == 4){
        this.formSwitch.按键4硬件管脚 = data;
      }else if (type == 5){
        this.formSwitch.按键5硬件管脚 = data;
      }else if (type == 6){
        this.formSwitch.按键6硬件管脚 = data;
      }else if (type == 7){
        this.formSwitch.按键7硬件管脚 = data;
      }else if (type == 8){
        this.formSwitch.按键8硬件管脚 = data;
      }
    },
    changeSwitchThirdBan(data){
      this.formSwitch.第三方硬件基板 = data;
    },
    changeDeviceType(event, type){
      if (type == "light"){
        this.titleName = "ILight配置设置";
      }else if (type == "switch"){
        this.titleName = "ISwitch配置设置";
      }else if (type == 'repeater'){
        this.titleName = "中继器配置设置";
      }else if (type == 'sensor'){
        this.titleName = "传感器配置设置";
      }
      this.devType = type;
      this.$router.push({ query: {devType: type} });
      this.init();
    },
    closeDrawer(event){
      if (!event){
        this.createTime = '';
        this.goodsTime = '';
        this.loading = false;
        this.fileName = "";
        this.fileNameFixed = "";
        this.fileNameArray = [];
        this.formConfig = {
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
        };

        this.formSwitch = {
          '厂商名称': 'netmoon',
          '产品型号': 'ISwitch-X1',
          '硬件制造日期': '',
          '产品出厂日期': '',
          '射频大功率': 'YES',
          "禁止联网" : "NO",
          "离线语音控制" : "YES",
          '按键数量': 8,
          '继电器数量': 4,
          '按键数量Bak': 8,
          '继电器数量Bak': 4,
          '缺省按键1定义': '继电器控制',
          '缺省按键2定义': '继电器控制',
          '缺省按键3定义': '继电器控制',
          '缺省按键4定义': '继电器控制',
          '缺省按键5定义': '亮度+',
          '缺省按键6定义': '色温+',
          '缺省按键7定义': '亮度-',
          '缺省按键8定义': '色温-',
          '按键1硬件管脚': '管脚1',
          '按键2硬件管脚': '管脚2',
          '按键3硬件管脚': '管脚3',
          '按键4硬件管脚': '管脚4',
          '按键5硬件管脚': '管脚5',
          '按键6硬件管脚': '管脚6',
          '按键7硬件管脚': '管脚7',
          '按键8硬件管脚': '管脚8',
          '缺省继电器1对应按键': '按键1',
          '缺省继电器2对应按键': '按键2',
          '缺省继电器3对应按键': '按键3',
          '缺省继电器4对应按键': '按键4',
          '第三方硬件基板': '网月',
          '人体感应模块参数': '',
          '人体感应灵敏度': '100',
          'IO扩展芯片I2C地址': '0'
        }

        this.formChange = {
          '厂商名称': 'netmoon',
          '产品型号': 'IRepeater-X1',
          '硬件制造日期': '',
          '产品出厂日期': '',
        }

        this.formSensor = {
          '厂商名称': 'netmoon',
          '产品型号': 'ISensor-X1',
          '硬件制造日期': '',
          '产品出厂日期': '',
          '射频大功率': 'YES',
          "禁止联网" : "NO",
          '人体移动感应': 'NO',
          '人体存在感应': 'NO',
          '光照度感应': 'NO',
          '温湿度感应': 'NO',
          '第三方硬件基板': '麦乐克红外幕帘',
        };
      }
    }
  },
  watch: {
    '$route': function (to, from) {//监听路由变化,为了浏览器点击后退和前进也能切换菜单选中
      this.$nextTick(() => {
        this.devType = this.$route.query.devType;
        this.init();
      });
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
.mian-tab-block{
  background: #F2F6FC;
  padding: 0px 10px;
  height: 45px;
  line-height: 45px;
}
.mian-content-block{
  width: 100%;
  background: #F2F6FC;
}
.main-block-title{
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  background: #595959;
  height: 50px;
  /*line-height: 50px;*/
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
.main-block-logout{
  float: left;
  padding-left: 0px;
  position: relative;
  top: 0px;
}
</style>
