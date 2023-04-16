<template>
  <div class="card">
    <div class="card-header">
      <div class="el-select-center" v-if="value">
      <el-select v-model="store1" clearable placeholder="请选择门店排班表" @clear="clearSelection"
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
        <el-select v-model="select1" placeholder="请选择">
          <el-option-group
            v-for="group in options"
            :key="group.label"
            :label="group.label">
            <el-option
              v-for="item in group.options"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-option-group>
        </el-select>
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
      </div>
    </div>
    <!-- 排班表-->
    <div class="card-body" v-if="value">
    <el-table :data="newData">
      <el-table-column prop="time" label="时间段"></el-table-column>
      <el-table-column label="周一" prop="mon">
        <template slot-scope="scope">
          <div v-if="scope.row.mon">
            <div v-for="(item, index) in scope.row.mon">
              <div class="schedule-item" :style="{ backgroundColor: item.color}" v-if="item.name">
                {{item.start}}-{{item.end}}
              <div class="name">{{item.name}}</div>
              <div class="position">{{item.position}}</div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周二" prop="tues">
        <template slot-scope="scope">
          <div v-if="scope.row.tues">
            <div v-for="(item, index) in scope.row.tues">
              <div class="schedule-item" :style="{ backgroundColor: item.color}" v-if="item.name">
                {{item.start}}-{{item.end}}
              <div class="name">{{item.name}}</div>
              <div class="position">{{item.position}}</div>
              </div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周三" prop="wed">
        <template slot-scope="scope">
          <div v-if="scope.row.wed">
            <div v-for="(item, index) in scope.row.wed">
              <div class="schedule-item" :style="{ backgroundColor: item.color}" v-if="item.name">
                {{item.start}}-{{item.end}}
              <div class="name">{{item.name}}</div>
              <div class="position">{{item.position}}</div></div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周四" prop="thurs">
        <template slot-scope="scope">
          <div v-if="scope.row.thurs">
            <div v-for="(item, index) in scope.row.thurs">
              <div class="schedule-item" :style="{ backgroundColor: item.color}" v-if="item.name">
                {{item.start}}-{{item.end}}
              <div class="name">{{item.name}}</div>
              <div class="position">{{item.position}}</div></div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周五" prop="fri">
        <template slot-scope="scope">
          <div v-if="scope.row.fri">
            <div v-for="(item, index) in scope.row.fri">
              <div class="schedule-item" :style="{ backgroundColor: item.color}" v-if="item.name">
                {{item.start}}-{{item.end}}
              <div class="name">{{item.name}}</div>
              <div class="position">{{item.position}}</div></div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周六" prop="sat">
        <template slot-scope="scope">
          <div v-if="scope.row.sat">
            <div v-for="(item, index) in scope.row.sat">
              <div class="schedule-item" :style="{ backgroundColor: item.color}" v-if="item.name">
                {{item.start}}-{{item.end}}
              <div class="name">{{item.name}}</div>
              <div class="position">{{item.position}}</div></div>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="周日" prop="sun">
        <template slot-scope="scope">
          <div v-if="scope.row.sun">
            <div v-for="(item, index) in scope.row.sun">
              <div class="schedule-item" :style="{ backgroundColor: item.color}" v-if="item.name">
                {{item.start}}-{{item.end}}
              <div class="name">{{item.name}}</div>
              <div class="position">{{item.position}}</div></div>
            </div>
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
      options: [{
        label: '按岗位分组',
        options: []
      }, {
        label: '按员工分组',
        options: []
      }],
      options3: ['按岗位分组','按技能分组','按员工分组'],
      value: true,
      store1:'',
      store2:'',
      select1:'',
      select3:'',
      currentPage:2,
      pageSize: 1,
      total: 3,
      tableData: [
        {
          time:'08:00-08:30', mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '08:30-09:00', mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '09:00-09:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '09:30-10:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '10:00-10:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'10:30-11:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'11:00-11:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'11:30-12:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'12:00-12:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'12:30-13:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'13:00-13:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'13:30-14:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'14:00-14:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'14:30-15:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'15:00-15:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'15:30-16:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'16:00-16:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'16:30-17:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'17:00-17:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'17:30-18:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'18:00-18:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'18:30-19:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'19:00-19:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'19:30-20:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'20:00-20:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'20:30-21:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'21:00-21:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '21:30-22:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '22:00-22:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '22:30-23:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'23:00-23:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        }
      ],
      newData: [
        {
          time:'08:00-08:30', mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '08:30-09:00', mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '09:00-09:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '09:30-10:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '10:00-10:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'10:30-11:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'11:00-11:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'11:30-12:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'12:00-12:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'12:30-13:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'13:00-13:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'13:30-14:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'14:00-14:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'14:30-15:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'15:00-15:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'15:30-16:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'16:00-16:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'16:30-17:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'17:00-17:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'17:30-18:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'18:00-18:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'18:30-19:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'19:00-19:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'19:30-20:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'20:00-20:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'20:30-21:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'21:00-21:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '21:30-22:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '22:00-22:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '22:30-23:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'23:00-23:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        }
      ],
      colors: ["#9383ef", "#d29be0","#FFC0CB", "#FFA07A", "#77c27a", "#87CEFA", ],
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
    clearSelection() {
      this.tableData = [
        {
          time:'08:00-08:30', mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '08:30-09:00', mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '09:00-09:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '09:30-10:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '10:00-10:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'10:30-11:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'11:00-11:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'11:30-12:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'12:00-12:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'12:30-13:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'13:00-13:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'13:30-14:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'14:00-14:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'14:30-15:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'15:00-15:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'15:30-16:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'16:00-16:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'16:30-17:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'17:00-17:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'17:30-18:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'18:00-18:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'18:30-19:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'19:00-19:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'19:30-20:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'20:00-20:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'20:30-21:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'21:00-21:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '21:30-22:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '22:00-22:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '22:30-23:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'23:00-23:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        }
      ]
      this.newData=[
        {
          time:'08:00-08:30', mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '08:30-09:00', mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '09:00-09:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '09:30-10:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '10:00-10:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'10:30-11:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'11:00-11:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'11:30-12:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'12:00-12:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'12:30-13:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'13:00-13:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'13:30-14:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'14:00-14:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'14:30-15:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'15:00-15:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'15:30-16:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'16:00-16:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'16:30-17:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'17:00-17:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'17:30-18:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'18:00-18:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'18:30-19:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'19:00-19:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'19:30-20:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'20:00-20:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'20:30-21:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'21:00-21:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '21:30-22:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '22:00-22:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time: '22:30-23:00',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        },
        {
          time:'23:00-23:30',mon: [], tues:[], wed:[], thurs:[], fri:[], sat:[], sun:[]
        }
      ]
    },
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
      const data = await scheduleApi.getByWeek(storeId, '2023-04-03').then(re => {
        return re.data.list;
      });
      //console.log(data)
      /*
      for(var i=0;i<data.length;i++){
        if(data[i].startTime.substring(0, 10)==='2023-03-27'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].mon.push(query)
            if(!this.options[0].options.includes(data[i].staff.position)&&data[i].staff.position)
              this.options[0].options.push(data[i].staff.position)
            if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
              this.options[1].options.push(data[i].staff.name)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-03-28'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].tues.push(query)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-03-29'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].wed.push(query)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-03-30'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].thurs.push(query)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-03-31'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].fri.push(query)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-04-01'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].sat.push(query)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-04-02'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].sun.push(query)
            index+=1
          }
        }
      }

       */
      for(var i=0;i<data.length;i++){
        if(data[i].startTime.substring(0, 10)==='2023-04-03'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].mon.push(query)
            if(!this.options[0].options.includes(data[i].staff.position)&&data[i].staff.position)
              this.options[0].options.push(data[i].staff.position)
            if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
              this.options[1].options.push(data[i].staff.name)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-04-04'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].tues.push(query)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-04-05'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].wed.push(query)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-04-06'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].thurs.push(query)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-04-07'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].fri.push(query)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-04-08'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].sat.push(query)
            index+=1
          }
        }
        else if(data[i].startTime.substring(0, 10)==='2023-04-09'){
          var startTime = data[i].startTime.substring(11, 16)
          var endTime = data[i].endTime.substring(11, 16)
          var index=0
          switch (startTime){
            case '08:00':index=0;break;
            case '08:30':index=1;break;
            case '09:00':index=2;break;
            case '09:30':index=3;break;
            case '10:00':index=4;break;
            case '10:30':index=5;break;
            case '11:00':index=6;break;
            case '11:30':index=7;break;
            case '12:00':index=8;break;
            case '12:30':index=9;break;
            case '13:00':index=10;break;
            case '13:30':index=11;break;
            case '14:00':index=12;break;
            case '14:30':index=13;break;
            case '15:00':index=14;break;
            case '15:30':index=15;break;
            case '16:00':index=16;break;
            case '16:30':index=17;break;
            case '17:00':index=18;break;
            case '17:30':index=19;break;
            case '18:00':index=20;break;
            case '18:30':index=21;break;
            case '19:00':index=22;break;
            case '19:30':index=23;break;
            case '20:00':index=24;break;
            case '20:30':index=25;break;
            case '21:00':index=26;break;
            case '21:30':index=27;break;
            case '22:00':index=28;break;
            case '22:30':index=29;break;
            case '23:00':index=30;break;
          }
          while(startTime!==endTime){
            let temp=startTime
            let timeObject = moment(startTime, 'HH:mm');
            timeObject.add(30, 'minutes');
            startTime = timeObject.format('HH:mm');
            const query={
              start:temp,
              end:startTime,
              name:data[i].staff.name,
              position:data[i].staff.position,
              color:this.colors[Math.floor(Math.random() * this.colors.length)]
            }
            this.tableData[index].sun.push(query)
            index+=1
          }
        }
      }
      this.newData=this.tableData
    }
  },
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    dates() {
      let currentDate = new Date('2023-04-03');
      let currentDateEnd=new Date('2023-04-09');
      let prevWeek = new Date('2023-03-27');
      let preWeekEnd=new Date('2023-04-02');
      let nextWeek = new Date('2023-04-10');
      let nextWeekEnd = new Date('2023-04-16');
      return [
        this.formatDate(prevWeek)+'-'+this.formatDate(preWeekEnd),
        this.formatDate(currentDate)+'-'+this.formatDate(currentDateEnd),
        this.formatDate(nextWeek)+'-'+this.formatDate(nextWeekEnd),
      ];
    },
  },
  watch:{
    store1(newValue){
      if(newValue){
        this.clearSelection()
        this.getTableData(newValue)
      }
    }
  },
}
</script>

<style scoped>
.schedule-item {
  color: #ffffff;
  padding: 5px;
  border-radius: 5px;
  text-align: center;
  margin-bottom: 5px;
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
