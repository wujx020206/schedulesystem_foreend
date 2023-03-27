<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h4 class="title">门店管理</h4>
            <div class="col-sm-6">
              <el-select
                class="select-default"
                v-model="storeId"
                placeholder="请选择要查询的门店">
                <el-option
                  class="select-default"
                  v-for="item in tableData.id"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <el-button type="primary" style="margin-left: 4px; margin-bottom: auto;">查询</el-button>
            </div>
        </div>
        <div class="card-body table-responsive table-full-width">
          <el-table :row-class-name="tableRowClassName"
                    :data="tableData">
            <el-table-column label="门店编号" prop="id" width="100px"></el-table-column>
            <el-table-column label="门店名称" prop="name"></el-table-column>
            <el-table-column label="门店地址" prop="address"></el-table-column>
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
import storeApi from '@/api/store'

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
        title: '门店管理',
        tableData: [],
        storeId:'',
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
      //获取后端数据
      fetchdata(){
        storeApi.get().then(re => {
          this.tableData=re.data;
        },
        re=>{
          console.log("门店管理数据请求失败");
        })
      },
      handleEdit(row) {
        storeApi.edit(row.id).then(re => {
          this.$router.push('/home')
        })
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
    },
  mounted() {
    this.fetchdata()
  }
};
</script>

<style>
</style>
