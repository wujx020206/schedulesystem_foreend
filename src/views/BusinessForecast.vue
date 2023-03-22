<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="col-sm-6">
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
            <button type="button" class="btn btn-info" style="margin-bottom: 2.5px; margin-left:4px">查询</button>
        </div>
      </div>
        <div class="card-body table-responsive table-full-width">
          <el-table :row-class-name="tableRowClassName"
                    :data="tableData">
            <el-table-column label="日期" property="date"></el-table-column>
            <el-table-column label="开始时间" property="beginTime"></el-table-column>
            <el-table-column label="结束时间" property="endTime"></el-table-column>
            <el-table-column label="预测顾客流量" property="data"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import { FormGroupInput as FGInput } from "@/components";
export default {
  components: {
    PaperTable,
    FGInput
  },
    data() {
      return {
        value1: [new Date(2023, 2, 13, 8, 0), new Date(2023, 2, 19, 8, 0)],
        value2: '',
        title: "门店管理",
        tableColumns: ["Date", "BeginTime", "EndTime", "Data"],
        tableData: [
          {
            date: "2023-3-22",
            beginTime: "8:00",
            endTime: "8:30",
            data: "0"
          },
          {
            date: "2023-3-22",
            beginTime: "8:30",
            endTime: "9:00",
            data: "0.1"
          },
          {
            date: "2023-3-22",
            beginTime: "9:00",
            endTime: "9:30",
            data: "1.3"
          },
          {
            date: "2023-3-22",
            beginTime: "9:30",
            endTime: "10:00",
            data: "5.7"
          },
          {
            date: "2023-3-22",
            beginTime: "10:00",
            endTime: "10:30",
            data: "11.1"
          },
          {
            date: "2023-3-22",
            beginTime: "10:30",
            endTime: "11:00",
            data: "13.4"
          },
          {
            date: "2023-3-22",
            beginTime: "11:00",
            endTime: "11:30",
            data: "13.3"
          }
        ],
      }
    },
    methods: {
      tableRowClassName ({row, rowIndex}) {
        return ''
      }
    }
};
</script>

<style>
  .el-select-width{
    margin-left: 0px;
  }
</style>