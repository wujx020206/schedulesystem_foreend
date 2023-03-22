<template>
  <div id="customizedCalendar">
    <el-calendar
        :first-day-of-week=7
        v-model="value">
      <template
          slot="dateCell"
          slot-scope="{date, data}">
        <div slot="reference" class="div-Calendar" @click="clickCalendar(data)" style="position: relative;z-index: 10">
          <p>{{ data.day.split('-').slice(2).join('-') }}</p>
        </div>
        <div v-if="data.isSelected" id="selectP"></div>
      </template>
    </el-calendar>
    <div id="button">
      <el-button @click="skip('preYear')" type="primary" round size="mini"><i class="el-icon-arrow-left"></i>年
      </el-button>
      <el-button @click="skip('preMonth')" type="warning" round size="mini"><i class="el-icon-arrow-left"></i>月
      </el-button>
      <el-button @click="skip('preDay')" type="success" round size="mini"><i class="el-icon-arrow-left"></i>日
      </el-button>
      <el-button @click="skip('today')" type="info" round size="mini">今天</el-button>
      <el-button @click="skip('postDay')" type="success" round size="mini">日<i class="el-icon-arrow-right"></i>
      </el-button>
      <el-button @click="skip('postMonth')" type="warning" round size="mini">月<i class="el-icon-arrow-right"></i>
      </el-button>
      <el-button @click="skip('postYear')" type="primary" round size="mini">年<i class="el-icon-arrow-right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import PubSub from 'pubsub-js'

export default {
  name: "Calendar",
  data() {
    return {
      value: new Date()
    }
  },
  computed: {
    selectDate() {
      return moment(this.value).format("YYYY-MM-DD");
    }
  },
  methods: {
    skip(flag) {
      if (flag === 'preYear') this.value = new Date(this.value.setFullYear(this.value.getFullYear() - 1));
      else if (flag === 'preMonth') this.value = new Date(this.value.setMonth(this.value.getMonth() - 1));
      else if (flag === 'preDay') this.value = new Date(this.value.setDate(this.value.getDate() - 1));
      else if (flag === 'today') this.value = new Date();
      else if (flag === 'postDay') this.value = new Date(this.value.setDate(this.value.getDate() + 1));
      else if (flag === 'postMonth') this.value = new Date(this.value.setMonth(this.value.getMonth() + 1));
      else if (flag === 'postYear') this.value = new Date(this.value.setFullYear(this.value.getFullYear() + 1));
    },
    clickCalendar(data) {
      console.log(data)
      PubSub.publish("uploadWarningResultWarningTime", data.day);
    }
  }
}
</script>

<style lang="scss" scoped>
#customizedCalendar {
  margin-left: 10.5%;
  width: 80%;
  height: 100%;
  border-radius: 10%;
  #button {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #selectP { //选中后圆圈颜色
    width: 30px;
    height: 30px;
    background-color: #ACC8CE;
    position: absolute;
    border-radius: 50%;
    opacity: 0.6;
  }

  ::v-deep .el-calendar__header {
    // 修改头部背景颜色
    background-color: #C5D1D4;
    padding: 3px 5px;
    border: none;
    display: flex;
    justify-content: center;

    .el-calendar__button-group {
      // 隐藏原生按钮
      display: none;
    }

    .el-calendar__title {
      // 修改头部标题的字体颜色
      color: white !important;
      font-size: 18px;
      font-weight: bolder;
    }
  }

  ::v-deep .el-calendar__body {
    // 修改主题部分
    padding: 0;
  }

  ::v-deep .el-calendar-table {
    thead {
      th {
        // 修改头部星期部分
        padding: 0;
        background-color: #C5D1D4;
        color: white;
        text-align: center;
      }
    }

    .is-selected {
      .el-calendar-day {
        p {
          // 选中日期颜色
          color: rgb(0, 0, 0);
        }
      }
    }

    .el-calendar-day {
      // 每天的小块样式设置
      padding: 0;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center; //文本居中
      p {
        // 所有日期颜色
        color: black;
        z-index: 1;
        user-select: none;
        display: flex;
        margin-top: 80%;
      }
    }
  }

  ::v-deep .el-calendar-table__row {
    .prev, .next {
      // 修改非本月
      .el-calendar-day {
        p {
          color: #f0d9d5;
        }
      }
    }

    td {
      // 修改每一个日期td标签
      &:first-child, &:last-child {
        background-color: #f5f5f5;
      }
    }
  }

  button {
    padding: 3px 10px;
  }
  .el-button--success{ //日按钮
    background: #B4D9E1;
    border-color: #B4D9E1;
  }
  .el-button--warning{ //月按钮
    background: #98C6D0;
    border-color: #98C6D0;
  }
  .el-button--primary{ //年按钮
    background: #80B1BA;
    border-color: #80B1BA;
  }
  .el-button--info{ //今天按钮
    background: #C7E8EF;
    border-color: #C7E8EF;
  }
}

</style>
