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
      <div class="container">
        <el-switch
          v-model="value"
          active-text="按周查看"
          inactive-text="按日查看"
          style="margin-right: 80px;">
        </el-switch>
        <div v-if="value">
          <el-button :disabled="currentPage === 1" @click="previousPage"
                     icon="el-icon-arrow-left" style="border: none;" circle></el-button>
          <el-button-group>
            <el-button v-for="(item, index) in displayedDateRanges" :key="index"
                       :type="currentPage === item.page? 'primary' : ''"
                       @click="changePage(item.page)">
              {{ item.monday }} - {{ item.sunday }}
            </el-button>
          </el-button-group>
          <el-button :disabled="currentPage === totalPage" @click="nextPage"
                     style="border: none;" circle><i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </div>
      </div>
      <div style="margin-top: 40px;" class="container" v-if="value">
        <el-select v-model="select1" clearable placeholder="请选择要查看的排班">
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
        <el-select v-model="store2" clearable placeholder="请选择门店排班表" @clear="clearSelection1">
          <el-option
            v-for="item in storeOptions2"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="selectedDate"
          type="date"
          placeholder="选择日期" style="margin-left: 12px;"
          @change="clearSelection1">
        </el-date-picker>
        <el-select v-model="select3" clearable placeholder="请选择要查看的排班" style="margin-left: 12px;">
          <el-option-group
            v-for="group in options1"
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
    </div>
    <!-- 排班表-->
    <div class="card-body" v-if="value">
      <el-table :data="filteredData">
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
      <el-table :data="filteredData1">
        <el-table-column label="排班时间段" prop="time"></el-table-column>
        <el-table-column label="员工" prop="name"></el-table-column>
        <el-table-column label="职位" prop="position"></el-table-column>
        <el-table-column label="操作" property="操作">
          <template slot-scope="{row}">
            <p-button type="info" icon @click.native="handleEdit(row)">
              <i class="ti ti-pencil-alt"></i>
            </p-button>
            <p-button style="margin-left: 5px;" type="danger" icon @click.native="handleDelete(row)">
              <i class="ti ti-close"></i>
            </p-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="修改排班" :visible.sync="updateDialogFormVisible">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="员工姓名" prop="name" style="width: 45%;">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitUpdateForm">立即修改</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import scheduleApi from "@/api/schedule";
import storeApi from "@/api/store";
import staffApi from "@/api/staff";
import moment from "moment";
import ruleApi from "@/api/rule";

export default {
  data() {
    return {
      mondayAndSunday:[],
      dates:[],
      updateDialogFormVisible: false,
      row:'',
      ruleForm: {
        name:''
      },
      rules: {
        name:[
          {required:true,message:'请输入员工姓名',trigger:'blur'}
        ],
      },
      dateValue:new Date(),
      storeOptions1: [],
      storeOptions2: [],
      options: [
        {
          label: '按岗位分组',
          options: []
        },
        {
          label: '按员工分组',
          options: []
        },
        {
          label: '按技能分组',
          options: []
        }
      ],
      options1: [
        {
          label: '按岗位分组',
          options: []
        },
        {
          label: '按员工分组',
          options: []
        },
        {
          label: '按技能分组',
          options: []
        }
      ],
      value: true,
      selectedDate:'',
      store1:'',
      store2:'',
      select1:'',
      select3:'',
      currentPage:8,
      pageSize: 3,
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
      dayTable:[],
      newTable:[],
      staffId:'',
      colors: ["rgba(147, 131, 239, 0.5)", "rgba(255, 192, 203, 0.5)", "rgba(119, 194, 122, 0.5)", "rgba(135, 206, 250, 0.5)"],
    }
  },
  async created() {
    storeApi.get().then(re => {
      re.data.list.forEach(element => {
          this.storeOptions1.push(element.name)
          this.storeOptions2.push(element.name)
        },
        re => {
          console.log("门店管理数据请求失败");
        })
    })
    this.getMondayAndSunday()
  },
  methods: {
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    handleEdit(row) {
      this.updateDialogFormVisible=true
      this.row=row
    },
    submitUpdateForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const storeId = await storeApi.specific(this.store2).then(re => {
            return re.data.id
          })
          const re = await staffApi.getId(this.row.name)
          this.staffId = re.data.list[0]
          let year = this.selectedDate.getFullYear();
          let month = String(this.selectedDate.getMonth() + 1).padStart(2, '0')
          let day = String(this.selectedDate.getDate()).padStart(2, '0')
          let start = year + '-' + month + '-'+day +' '+this.row.time.substring(0,5)+':00'
          let end = year + '-' + month + '-'+day + ' '+this.row.time.substring(6,11)+':00'
          const id=await scheduleApi.getId(storeId,this.staffId,start,end).then(re=>{
            return re.data
          })
          scheduleApi.edit(storeId,id,this.ruleForm.name).then(re=>{
              if (re.errmsg === '成功'){
                this.$message.success('修改排班成功')
                this.updateDialogFormVisible = false
                this.row.name=this.ruleForm.name
                const option=this.options[1].options.filter(item=>item!==this.row.name)
                option.push(this.ruleForm.name)
                this.options[1].options=option
                this.$refs.ruleForm.resetFields()
              } else {
                this.$message.error('修改排班失败！')
              }
            },
            re => {
              console.log("门店管理数据请求失败")
            })
        }
      })
    },
    async handleDelete(row){
      const confirmResult=await this.$confirm('是否确定删除该排班？','提示',{
        confirmButtonText:'确定',
        cancelButtonClass:'取消',
        type:'warning'
      }).catch(err=>err)

      if(confirmResult==='cancel'){
        this.$message.info('已经取消删除')
      }else {
        const storeId = await storeApi.specific(this.store2).then(re => {
          return re.data.id
        })
        const re = await staffApi.getId(row.name)
        this.staffId = re.data.list[0]
        let year = this.selectedDate.getFullYear();
        let month = String(this.selectedDate.getMonth() + 1).padStart(2, '0')
        let day = String(this.selectedDate.getDate()).padStart(2, '0')
        let start = year + '-' + month + '-'+day +' '+row.time.substring(0,5)+':00'
        let end = year + '-' + month + '-'+day + ' '+row.time.substring(6,11)+':00'
        const id=await scheduleApi.getId(storeId,this.staffId,start,end).then(re=>{
          return re.data
        })
        scheduleApi.del(storeId,id).then(re=>{
          if(re.errmsg==='成功'){
            const rowIndex = this.newTable.indexOf(row)
            this.newTable.splice(rowIndex,1)
            this.$message.success('删除该排班成功')
            const name=row.name
            this.options[1].options=this.options[1].options.filter(item=>item!==name)
            if(this.options[1].options===name)
              this.options[1].options=''
            const position=row.position
            let isSame = this.newTable.some(row => row.position.includes(position))
            if(!isSame) {
              if(position.includes('（')){
                const arr = position.split('（')
                const p = arr[0]
                this.options[0].options = this.options[0].options.filter(item => item !== p)
                const index = position.indexOf('（')
                const subStr = position.substring(index + 1, position.length - 1)
                this.options[2].options = this.options[2].options.filter(item => item !== subStr)
              }
              else if(!position.includes('（')){
                this.options[0].options = this.options[0].options.filter(item => item !== position)
              }
            }
          }else{
            this.$message.error('删除排班失败！')
          }
        })
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.clearSelection()
        this.store1=''
      }
    },
    changePage(page) {
      this.currentPage = page
      this.clearSelection()
      this.store1=''
    },
    nextPage() {
      if (this.currentPage < this.totalPage) {
        this.currentPage++
        this.clearSelection()
        this.store1=''
      }
    },
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
      this.options=[
        {
          label: '按岗位分组',
          options: []
        },
        {
          label: '按员工分组',
          options: []
        },
        {
          label: '按技能分组',
          options: []
        }
      ]
    },
    clearSelection1(){
      this.dayTable=[]
      this.newTable=[]
      this.options1=[
        {
          label: '按岗位分组',
          options: []
        },
        {
          label: '按员工分组',
          options: []
        },
        {
          label: '按技能分组',
          options: []
        }
      ]
    },
    formatDate(date) {
      return `${date.getMonth() + 1}月${date.getDate()}日`
    },
    async getTableData(selectedValue) {
      const storeId = await storeApi.specific(selectedValue).then(re => {
        return re.data.id
      })
      var data=''
      switch (this.currentPage) {
        case 1:
          data = await scheduleApi.getByWeek(storeId, '2023-03-27').then(re => {
            return re.data.list
          })
          break;
        case 2:
          data = await scheduleApi.getByWeek(storeId, '2023-04-03').then(re => {
            return re.data.list
          })
          break;
        case 3:
          data = await scheduleApi.getByWeek(storeId, '2023-04-10').then(re => {
            return re.data.list
          })
          break;
      }
      switch (this.currentPage){
        case 1:
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
                index+=1
              }
            }
          }
          break;
        case 2:
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
                index+=1
              }
            }
          }
          break;
        case 3:
          for(var i=0;i<data.length;i++){
            if(data[i].startTime.substring(0, 10)==='2023-04-10'){
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
                index+=1
              }
            }
            else if(data[i].startTime.substring(0, 10)==='2023-04-11'){
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
                index+=1
              }
            }
            else if(data[i].startTime.substring(0, 10)==='2023-04-12'){
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
                index+=1
              }
            }
            else if(data[i].startTime.substring(0, 10)==='2023-04-13'){
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
                index+=1
              }
            }
            else if(data[i].startTime.substring(0, 10)==='2023-04-14'){
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
                index+=1
              }
            }
            else if(data[i].startTime.substring(0, 10)==='2023-04-15'){
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
                index+=1
              }
            }
            else if(data[i].startTime.substring(0, 10)==='2023-04-16'){
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
                if(data[i].staff.position){
                  if(data[i].staff.position.includes('（')){
                    const arr = data[i].staff.position.split('（')
                    const position = arr[0]
                    if(!this.options[0].options.includes(position))
                      this.options[0].options.push(position)
                    const index = data[i].staff.position.indexOf('（')
                    const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
                    if(!this.options[2].options.includes(subStr))
                      this.options[2].options.push(subStr)
                  }
                  else if(!data[i].staff.position.includes('（')){
                    if(!this.options[0].options.includes(data[i].staff.position))
                      this.options[0].options.push(data[i].staff.position)
                  }
                }
                if(!this.options[1].options.includes(data[i].staff.name)&&data[i].staff.name)
                  this.options[1].options.push(data[i].staff.name)
                index+=1
              }
            }
          }
          break;
      }
      this.newData=this.tableData
    },
    async getDayTable(){
      const storeId = await storeApi.specific(this.store2).then(re => {
        return re.data.id
      })
      let year = this.selectedDate.getFullYear();
      let month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
      let day = String(this.selectedDate.getDate()).padStart(2, '0');
      let formattedDate = year + '-' + month + '-' + day;
      const data = await scheduleApi.getByDay(storeId, formattedDate).then(re => {
        return re.data.list
      })
      for(var i=0;i<data.length;i++) {
        var startTime = data[i].startTime.substring(11, 16)
        var endTime = data[i].endTime.substring(11, 16)
        const query = {
          time: startTime + '-' + endTime,
          name:data[i].staff.name,
          position:data[i].staff.position
        }
        this.dayTable.push(query)
        if(data[i].staff.position){
          if(data[i].staff.position.includes('（')){
            const arr = data[i].staff.position.split('（')
            const position = arr[0]
            if(!this.options1[0].options.includes(position))
              this.options1[0].options.push(position)
            const index = data[i].staff.position.indexOf('（')
            const subStr = data[i].staff.position.substring(index + 1, data[i].staff.position.length - 1)
            if(!this.options1[2].options.includes(subStr))
              this.options1[2].options.push(subStr)
          }
          else if(!data[i].staff.position.includes('（')){
            if(!this.options1[0].options.includes(data[i].staff.position))
              this.options1[0].options.push(data[i].staff.position)
          }
        }
        if(!this.options1[1].options.includes(data[i].staff.name)&&data[i].staff.name)
          this.options1[1].options.push(data[i].staff.name)
      }
      this.newTable=this.dayTable
    },
    getMondayAndSunday() {
      const today = new Date()
      const todayOfWeek = today.getDay()
      const daysToMonday = todayOfWeek - 1
      const daysToSunday = 7 - todayOfWeek
      for (let i = -7; i <= 7; i++) {
        const monday = new Date(today);
        monday.setDate(today.getDate() - daysToMonday + (i * 7));

        const sunday = new Date(today);
        sunday.setDate(today.getDate() + daysToSunday + (i * 7));

        this.dates.push({
          monday: this.formatDate(monday),
          sunday: this.formatDate(sunday)
        })
      }
      for (let i = 0; i <= this.dates.length; i++) {
        this.mondayAndSunday.push({
          monday: this.dates[i].monday,
          sunday: this.dates[i].sunday
        })
      }
    },
  },
  computed: {
    totalPage() {
      return 15
    },
    displayedDateRanges() {
      const currentPageGroup = Math.ceil(this.currentPage / this.pageSize)
      const startPage = (currentPageGroup - 1) * this.pageSize + 1
      const endPage = startPage + this.pageSize - 1
      return this.mondayAndSunday.slice(startPage - 1, endPage).map((range, index) => {
        return { ...range, page: startPage + index }
      })
    },
    filteredData(){
      if(this.select1){
        if(this.options[0].options.includes(this.select1)||this.options[2].options.includes(this.select1)){
          return this.newData.filter(item => {
            return ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'].some(day => {
              return item[day].some(schedule => {
                if(schedule.position)
                  return schedule.position.includes(this.select1)
              })
            })
          }).map(item => {
            return {
              time: item.time,
              mon: item.mon.filter(schedule => {
                if(schedule.position)
                  return schedule.position.includes(this.select1)
              } ),
              tues: item.tues.filter(schedule => {
                if(schedule.position)
                  return schedule.position.includes(this.select1)
              } ),
              wed: item.wed.filter(schedule => {
                if(schedule.position)
                  return schedule.position.includes(this.select1)
              } ),
              sat: item.sat.filter(schedule => {
                if(schedule.position)
                  return schedule.position.includes(this.select1)
              } ),
              thurs: item.thurs.filter(schedule => {
                if(schedule.position)
                  return schedule.position.includes(this.select1)
              } ),
              fri: item.fri.filter(schedule => {
                if(schedule.position)
                  return schedule.position.includes(this.select1)
              } ),
              sun: item.sun.filter(schedule => {
                if(schedule.position)
                  return schedule.position.includes(this.select1)
              } ),
            }
          })
        }
        return this.newData.filter(item => {
          return ['mon', 'tues', 'wed', 'thurs', 'fri', 'sat', 'sun'].some(day => {
            return item[day].some(schedule => {
              return schedule.name === this.select1
            })
          })
        }).map(item => {
          return {
            time: item.time,
            mon: item.mon.filter(schedule => schedule.name === this.select1),
            tues: item.tues.filter(schedule => schedule.name === this.select1),
            wed: item.wed.filter(schedule => schedule.name === this.select1),
            sat: item.sat.filter(schedule => schedule.name === this.select1),
            thurs: item.thurs.filter(schedule => schedule.name === this.select1),
            fri: item.fri.filter(schedule => schedule.name === this.select1),
            sun: item.sun.filter(schedule => schedule.name === this.select1),
          }
        })
      }
      return this.newData
    },
    bothSelected() {
      return this.store2 && this.selectedDate
    },
    filteredData1(){
      if(this.select3){
        if(this.options1[0].options.includes(this.select3)||this.options1[2].options.includes(this.select3)){
          return this.newTable.filter(item => {
            return item.position.includes(this.select3)
          })
        }
        return this.newTable.filter(item => {
          return item.name === this.select3
        })
      }
      return this.newTable
    },
    visibleDates() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.mondayAndSunday.slice(startIndex, endIndex);
    },
  },
  watch:{
    store1(newValue){
      if(newValue){
        this.clearSelection()
        this.getTableData(newValue)
      }
    },
    store2: function(){
      if (this.bothSelected) {
        this.getDayTable()
      }
    },
    selectedDate: function() {
      if (this.bothSelected) {
        this.getDayTable()
      }
    }
  },
  mounted() {
    this.pageArray = this.mondayAndSunday.map(({monday, sunday}) => {
      // 使用 Moment.js 进行日期格式化，格式化后的字符串可以按需要进行调整
      return `${moment(monday).format('YYYY/MM/DD')} - ${moment(sunday).format('YYYY/MM/DD')}`;
    })
    console.log(this.pageArray)
  }
}
</script>

<style scoped>
.schedule-item {
  color: #3b3a3a;
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
