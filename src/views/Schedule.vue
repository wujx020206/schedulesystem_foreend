<template>
  <div class="card">
    <div class="card-header">
      <div class="el-select-center" v-if="value">
      <el-select v-model="store1" clearable placeholder="请选择门店排班表"
                 style="width: 300px; height: 60px;">
        <el-option
          v-for="item in storeOptions1"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      </div>
      <div class="el-select-center" v-else>
        <el-select v-model="store2" clearable placeholder="请选择门店排班表"
                   style="width: 300px; height: 60px;">
          <el-option
            v-for="item in storeOptions2"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <div class="container">
        <el-switch
          v-model="value"
          active-text="按周查看"
          inactive-text="按日查看"
          style="margin-right: 80px;">
        </el-switch>
        <div v-if="value">
        <el-button :disabled="currentPage === 1" @click="currentPage--"
                   icon="el-icon-arrow-left" style="border: none;" circle></el-button>
        <el-button-group>
          <el-button v-for="(date, index) in dates" :key="index" :type="currentPage === index+1 ? 'primary' : ''" @click="currentPage = index+1">{{ date }}</el-button>
        </el-button-group>
        <el-button :disabled="currentPage === totalPage" @click="currentPage++"
                   style="border: none;" circle><i class="el-icon-arrow-right el-icon--right"></i></el-button>
      </div></div>
      <div style="margin-top: 60px;" class="container" v-if="value">
        <el-select v-model="select2" clearable placeholder="请选择分组方式" style="margin-left: -12px;">
          <el-option
            v-for="item in options2"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <div class="buttons">
        <el-button type="primary" plain>删除</el-button>
        <el-button type="primary" plain>编辑</el-button>
        </div>
      </div>
      <div style="margin-top: 40px;" class="container" v-else>
        <el-select v-model="select3" clearable placeholder="请选择分组方式" style="margin-left: -12px;">
          <el-option
            v-for="item in options3"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <div class="buttons">
          <el-button type="primary" plain>删除</el-button>
          <el-button type="primary" plain>编辑</el-button>
        </div>
      </div>
    </div>
    <!-- 排班表-->
    <div class="card-body" v-if="value">
    <el-table :data="tableData">
      <el-table-column prop="time" label="时间段"></el-table-column>
      <el-table-column v-for="day in 7" :key="day" :label="weekDays[day-1]+ ' ' +formatDate(getDayDate(day+1))">
        <template slot-scope="scope">
          <div class="schedule-item" v-if="scope.row.schedule[day-1]">
            {{scope.row.schedule[day-1].start}} - {{scope.row.schedule[day-1].end}}
            <div class="name">{{scope.row.schedule[day-1].name}}</div>
            <div class="position">{{scope.row.schedule[day-1].position}}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <div class="card-body" v-else>
      <el-calendar v-model="dateValue"/>
    </div>
  </div>
</template>

<script>
import scheduleApi from "@/api/schedule";
import storeApi from "@/api/store";
import moment from 'moment'

export default {
  data() {
    return {
      dateValue:new Date(),
      storeOptions1: [],
      storeOptions2: [],
      options2: ['按岗位分组','按技能分组','按员工分组'],
      options3: ['按岗位分组','按技能分组','按员工分组'],
      value: true,
      store1:'',
      store2:'',
      select2:'',
      select3:'',
      currentPage:2,
      pageSize: 1,
      total: 3,
      weekDays: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      startDate: new Date('2023-04-10'),
      tableData: [
        { time: '9:00-9:30', schedule: [
            null, { start: '9:00', end: '18:00',name:'mt',position:'员工' }, { start: '9:00', end: '18:00',name:'张三' },
            { start: '9:00', end: '18:00',name:'张三' }, { start: '9:00', end: '18:00',name:'张三' },
            null, null
          ] },
        { time: '9:30-10:00', schedule: [
            null, { start: '8:30', end: '17:30',name:'张三' }, { start: '8:30', end: '17:30',name:'张三' },
            { start: '8:30', end: '17:30',name:'ljh' }, { start: '8:30', end: '17:30',name:'张三' },
            null, null
          ] },
        { time: '10:00-10:30', schedule: [
            { start: '12:00', end: '21:00',name:'张三' }, null, null, null,
            { start: '12:00', end: '21:00',name:'张三' }, null, null
          ] },
        {
          time:'10:30-11:00',schedule: []
        },
        {
          time:'11:00-11:30',schedule: []
        },
        {
          time:'11:30-12:00',schedule: []
        },
        {
          time:'12:00-12:30',schedule: []
        },
        {
          time:'12:30-13:00',schedule: []
        },
        {
          time:'13:00-13:30',schedule: []
        },
        {
          time:'13:30-14:00',schedule: []
        },
        {
          time:'14:00-14:30',schedule: []
        },
        {
          time:'14:30-15:00',schedule: []
        },
        {
          time:'15:00-15:30',schedule: []
        },
        {
          time:'15:30-16:00',schedule: []
        },
        {
          time:'16:00-16:30',schedule: []
        },
        {
          time:'16:30-17:00',schedule: []
        },
        {
          time:'17:00-17:30',schedule: []
        },
        {
          time:'17:30-18:00',schedule: []
        },
        {
          time:'18:00-18:30',schedule: []
        },
        {
          time:'18:30-19:00',schedule: []
        },
        {
          time:'19:00-19:30',schedule: []
        },
        {
          time:'19:30-20:00',schedule: []
        },
        {
          time:'20:00-20:30',schedule: []
        },
        {
          time:'20:30-21:00',schedule: []
        },
      ],
    }
  },
  created() {
    storeApi.get().then(re=>{
      re.data.list.forEach(element=>{
        this.storeOptions1.push(element.name)
        this.storeOptions2.push(element.name)
      },
      re=>{
        console.log("门店管理数据请求失败");
      })
    })
  },
  methods: {
    formatDate(date) {
      return `${date.getMonth() + 1}月${date.getDate()}日`
    },
    getDayDate(day) {
      const date = new Date(this.startDate)
      date.setDate(date.getDate() + day - 2)
      return date
    },
    previousWeek() {
      this.startDate.setDate(this.startDate.getDate() - 7)
    },
    nextWeek() {
      this.startDate.setDate(this.startDate.getDate() + 7)
    },
    async getTableData(selectedValue) {
      const storeId = await storeApi.specific(selectedValue).then(re => {
        return re.data.id
      })
      const date = moment('2023-04-17').format('YYYY-MM-DD')
      const data = await scheduleApi.getByDay(storeId, '2023-03-28').then(re => {
        return re.data.list;
      });
      console.log(data)
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    dates() {
      let currentDate = new Date('2023-04-10');
      let currentDateEnd=new Date('2023-04-16');
      let prevWeek = new Date('2023-04-03');
      let preWeekEnd=new Date('2023-04-09');
      let nextWeek = new Date('2023-04-17');
      let nextWeekEnd = new Date('2023-04-23');
      return [
        this.formatDate(prevWeek)+'-'+this.formatDate(preWeekEnd),
        this.formatDate(currentDate)+'-'+this.formatDate(currentDateEnd),
        this.formatDate(nextWeek)+'-'+this.formatDate(nextWeekEnd),
      ];
    }
  },
  watch:{
    store1(newValue){
      if(newValue){
        this.getTableData(newValue)
      }
    }
  }
}
</script>

<style scoped>
.schedule-item {
  background-color: #409EFF;
  color: #fff;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
}
.el-select-center{
  text-align:center;
}
.container {
  display: flex;
  align-items: center;
}
.buttons {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
