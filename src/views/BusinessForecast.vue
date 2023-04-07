<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="col-sm-10" style="display: flex">
            <el-select v-model="store" clearable placeholder="请选择要查看的门店" style="margin-right: 10px" @clear="clearSelection">
              <el-option v-for="item in options" :value="item" :label="item" :key="item"></el-option>
            </el-select>
            <el-date-picker
              v-model="selectedDate"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
        </div>
      </div>
        <div class="card-body table-responsive table-full-width">
          <el-table :row-class-name="tableRowClassName"
                    :data="filteredData">
            <el-table-column label="日期" property="date"></el-table-column>
            <el-table-column label="开始时间" property="beginTime"></el-table-column>
            <el-table-column label="结束时间" property="endTime"></el-table-column>
            <el-table-column label="预测顾客流量" property="num"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import { FormGroupInput as FGInput } from "@/components";
import storeApi from "@/api/store";
import forecastApi from '@/api/forecast'

export default {
  components: {
    PaperTable,
    FGInput
  },
  data() {
    return {
      selectedDate: '',
      store: '',
      tableData: [],
      options: [],
    }
  },
  created() {
    storeApi.get().then(re=>{
      const list=re.data.list
      list.forEach(element=>{
        this.options.push(element.name)
      },
      re=>{
        console.log("门店管理数据请求失败")
      })
    })
  },
  methods: {
    tableRowClassName ({row, rowIndex}) {
      return ''
    },
    async getTableData(selectedValue){
      const storeId=await storeApi.specific(selectedValue).then(re=>{
        return re.data.id
      })
      const data=await forecastApi.getByStore(storeId).then(re=>{
        return re.data.list
      })
      this.tableData=data
    },
    clearSelection() {
      this.tableData = [];
    },
  },
  watch:{
    store(newValue){
      if(newValue)
        this.getTableData(newValue)
    }
  },
  computed:{
    filteredData(){
      if(this.selectedDate){
        let startDate = this.selectedDate[0]
        let endDate = this.selectedDate[1]
        return  this.tableData.filter(item => {
          let dateTimeString1=item.date+' '+item.beginTime
          const timestamp1 = Date.parse(dateTimeString1)
          const date1 = new Date(timestamp1)
          let dateTimeString2=item.date+' '+item.endTime
          const timestamp2 = Date.parse(dateTimeString2)
          const date2 = new Date(timestamp2)
          return date1>=startDate && date2<=endDate
        })
      }
      return this.tableData
    }
  }
};
</script>

<style>
  .el-select-width{
    margin-left: 0px;
  }
</style>
