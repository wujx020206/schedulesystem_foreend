<template>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="col-sm-6">
              <div class="Box">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in storeoptions"
                    :key="item.storevalue"
                    :label="item.storelabel"
                    :value="item.storevalue">
                  </el-option>
                </el-select>
                <el-select v-model="value" placeholder="请选择" style="margin-left: 4px;">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button type="success" style="margin-left: 4px; margin-bottom: auto;">查询</el-button>
                
              </div>
          </div>
        </div>
          <div class="card-body table-responsive table-full-width">
            <el-table :row-class-name="tableRowClassName"
                      :data="tableData">
              <el-table-column label="门店" property="id"></el-table-column>
              <el-table-column label="大类" property="type1"></el-table-column>
              <el-table-column label="小类" property="type2"></el-table-column>
              <el-table-column label="规则内容" property="value"></el-table-column>
              <el-table-column label="操作" property="操作">
                <template slot-scope="scope">
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
          storeoptions: [{
            storevalue: '选项1',
            storelabel: '门店1'
          }, {
            storevalue: '选项2',
            storelabel: '门店2'
          }, {
            storevalue: '选项3',
            storelabel: '门店3'
          }],
          options: [{
            value: '选项1',
            label: '工作日偏好'
          }, {
            value: '选项2',
            label: '工作时间偏好'
          }, {
            value: '选项3',
            label: '班次时长偏好'
          }],
          value: '',
          value1: [new Date(2023, 2, 13, 8, 0), new Date(2023, 2, 19, 8, 0)],
          value2: '',
          title: "门店管理",
          tableColumns: ["Id", "Name", "Type", "Value"],
          tableData: [
            {
              id: "门店1",
              type1: "固定规则",
              type2: "工作日开店规则",
              value: "8点"
            },
            {
              id: "门店1",
              type1: "固定规则",
              type2: "工作日关店规则",
              value: "21点"
            },
            {
              id: "门店2",
              type1: "自定义规则",
              type2: "收尾工作人数",
              value: "2点"
            }
          ],
        }
      },
      methods: {
        handleEdit(row) {
          console.log(`You want to edit row with id: ${row.id}`)
        },
        handleDelete(row) {
          console.log(`You want to delete row with id: ${row.id}`)
        },
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
    .Box{
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: baseline;
    }
    .Box .el-button--success{ 
    background: #68B3C8;
    border-color: #68B3C8;
    }
    .Box .el-button--info{
      background-color: #28a745;
      border-color: #28a745;
    }

  </style>