<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="col-sm-6">
            <div class="zhujian">
              <el-input v-model="input" placeholder="请输入内容" style="margin-right: 4px;"></el-input>
              <el-select v-model="value" placeholder="请选择">
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
            <el-table-column label="员工" property="name"></el-table-column>
            <el-table-column label="职位" property="position"> </el-table-column>   
            <el-table-column label="联系电话" property="phonenumber"></el-table-column>
            <el-table-column label="所属门店" property="storename"></el-table-column>
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
        spanArr: [],
        value1: [new Date(2023, 2, 13, 8, 0), new Date(2023, 2, 19, 8, 0)],
        value2: '',
        title: "门店管理",
        tableColumns: ["name", "position", "phonenumber", "storename"],
        tableData: [
          {
            name: "Lily",
            position: "manager",
            phonenumber: "123456",
            storename: "La marine",
          },
          {
            name: "Bob",
            position: "asistant manager",
            phonenumber: "123488",
            storename: "La marine",
          },
          {
            name: "Lin",
            position: "cashier",
            phonenumber: "888888",
            storename: "Noma",
          },
          {
            name: "W",
            position: "cashier",
            phonenumber: "8788888",
            storename: "Noma",
          },
          {
            name: "Xoe",
            position: "guider",
            phonenumber: "884326",
            storename: "Noma",
          },
          {
            name: "BBi",
            position: "guider",
            phonenumber: "7468794",
            storename: "X",
          },
          {
            name: "Sb",
            position: "cashier",
            phonenumber: "8465488",
            storename: "Noma",
          },

        ],
      }
    },

  methods: {
    tableRowClassName ({row, rowIndex}) {
        if (rowIndex%8 === 0) {
          return 'table-success'
        } else if (rowIndex%8 === 2) {
          return 'table-info'
        } else if (rowIndex%8 === 4) {
          return 'table-danger'
        } else if (rowIndex%8 === 6) {
          return 'table-warning'
        }
        return ''
      },
  }

};
</script>

<style>
  .el-select-width{
    margin-left: 0px;
  }
  .zhujian{
    display: flex;
    justify-content: center;
  }
  .zhujian .el-button--success{ 
    background: #68B3C8;
    border-color: #68B3C8;
    }
</style>