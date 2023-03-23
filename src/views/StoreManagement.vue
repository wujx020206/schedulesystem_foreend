<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h4 class="title">门店管理</h4>
            <div class="col-sm-6">
              <el-select
                class="select-default"
                v-model="pagination.perPage"
                placeholder="Per page">
                <el-option
                  class="select-default"
                  v-for="item in pagination.perPageOptions"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <p-button style="margin-left: 5px;margin-bottom: 0.7%;" type="default">查询</p-button>
            </div>
        </div>
        <div class="card-body table-responsive table-full-width">
          <el-table :row-class-name="tableRowClassName"
                    :data="tableData">
            <el-table-column label="门店编号" property="id" width="100px"></el-table-column>
            <el-table-column label="门店名称" property="name"></el-table-column>
            <el-table-column label="所在城市" property="country"></el-table-column>
            <el-table-column label="所在地区" property="city"></el-table-column>
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
          <div style="margin-top: 10px">
          <p-button block type="success" @click.native="handleAdd">
            <i class="ti-plus"/>
            新增门店
          </p-button>
          </div>
        </div>
      </div>
      <el-dialog title="新增门店" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="门店编号" prop="id" style="width: 45%;">
            <el-input v-model.number="ruleForm.id"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" prop="name" style="width: 45%;">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="所在城市" prop="city">
            <el-select v-model="ruleForm.city" placeholder="请选择所在城市">
              <el-option label="Nige" value="shanghai"></el-option>
              <el-option label="Curaçao" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所在区域" prop="region">
            <el-select v-model="ruleForm.region" placeholder="请选择所在区域">
              <el-option label="Nige" value="city1"></el-option>
              <el-option label="Curaçao" value="city2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
      var checkId = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入门店编号'));
        }
        setTimeout( ()=>{
          if(!Number.isInteger(value))
            callback(new Error('请输入数字值'));
          else {
            callback();
          }
        },500);
      };
      return {
        dialogFormVisible: false,
        title: "门店管理",
        tableColumns: ["Id", "Name", "Salary", "Country", "City"],
        tableData: [
          {
            id: 1,
            name: "Dakota Rice",
            salary: "$36.738",
            country: "Niger",
            city: "Oud-Turnhout"
          },
          {
            id: 2,
            name: "Minerva Hooper",
            salary: "$23,789",
            country: "Curaçao",
            city: "Sinaai-Waas"
          },
          {
            id: 3,
            name: "Sage Rodriguez",
            salary: "$56,142",
            country: "Netherlands",
            city: "Baileux"
          },
          {
            id: 4,
            name: "Philip Chaney",
            salary: "$38,735",
            country: "Korea, South",
            city: "Overland Park"
          },
          {
            id: 5,
            name: "Doris Greene",
            salary: "$63,542",
            country: "Malawi",
            city: "Feldkirchen in Kärnten"
          }
        ],
        pagination: {
          perPage: 5,
          currentPage: 1,
          perPageOptions: [5, 10, 25, 50],
        },
        ruleForm: {
          id: '',
          name: '',
          city:'',
          region: ''
        },
        rules: {
          id: [
            { required:true, validator: checkId, trigger: 'blur' },
          ],
          name:[
            {required:true,message:'请输入门店名称',trigger:'blur'}
          ],
          city: [
            { required: true, message: '请选择所在城市', trigger: 'change' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ]
        },
        formLabelWidth: '120px',
      }
    },
    methods: {
      handleEdit(row) {
        console.log(`You want to edit row with id: ${row.id}`)
      },
      handleAdd() {
        this.dialogFormVisible=true
      },
      handleDelete(row) {
        console.log(`You want to delete row with id: ${row.id}`)
      },
      tableRowClassName ({row, rowIndex}) {
        if (rowIndex%8 === 0) {
          return 'table-warning'
        } else if (rowIndex%8 === 2) {
          return 'table-info'
        } else if (rowIndex%8 === 4) {
          return 'table-danger'
        } else if (rowIndex%8 === 6) {
          return 'table-success'
        }
        return ''
      },
      submitForm() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            alert('submit!');
            this.dialogFormVisible=false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
    }
};
</script>

<style>
</style>
