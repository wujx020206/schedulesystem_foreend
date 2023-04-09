<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="col-sm-6">
              <el-select v-model="value" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
          </div>
      </div>
        <div class="card-body table-responsive table-full-width">
          <el-table :row-class-name="tableRowClassName"
                    :data="filteredData">
            <el-table-column label="员工名" property="staffName"></el-table-column>
            <el-table-column label="偏好类别" property="type"></el-table-column>
            <el-table-column label="偏好值" property="value"></el-table-column>
            <el-table-column label="操作" property="操作">
              <template slot-scope="{row}">
                <p-button type="info" icon @click.native="handleEdit(row)">
                  <i class="ti ti-pencil-alt"></i>
                </p-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <el-dialog title="修改偏好" :visible.sync="updateDialogFormVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="偏好值" prop="value" style="width: 45%;">
            <el-input v-model="ruleForm.value"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpdateForm">立即修改</el-button>
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
import preferenceApi from "@/api/preference";
import staffApi from '@/api/staff'

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
      updateDialogFormVisible: false,
      input: '',
      options: [],
      value: '',
      value2: '',
      title: "偏好管理",
      tableData: [],
      ruleForm: {
        value: ''
      },
      rules: {
        value: [
          { required: true, message: '请输入偏好值', trigger: 'blur' }
        ]
      },
      formLabelWidth: '120px',
      row:'',
      staffId:'',
    }
  },
  created() {
    preferenceApi.get().then(re=>{
      this.tableData=re.data.list
      this.tableData.forEach(item=>{
        switch (item.type){
          case 0:item.type='工作日偏好'
            break
          case 1:item.type='工作时间偏好'
            break
          case 2:item.type='班次时长偏好'
            break
        }
        this.options.push(item.type)
      })
    },
    re=>{
      console.log("员工偏好数据请求失败")
    })
  },
  methods: {
    handleEdit(row) {
      this.updateDialogFormVisible=true
      this.row=row
    },
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex%8 === 0) {
        return 'table-info'
      } else if (rowIndex%8 === 2) {
        return 'table-danger'
      } else if (rowIndex%8 === 4) {
        return 'table-success'
      } else if (rowIndex%8 === 6) {
        return 'table-warning'
      }
      return ''
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    submitUpdateForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const query = {
            value: this.ruleForm.value
          }
          this.staffId = await staffApi.getId(this.row.staffName)
        } else {
          this.$message.error('修改员工偏好失败！')
        }
      });
    },
    closeDeleteForm() {
      this.deleteDialogFormVisible=false
    },
  },
  computed:{
    filteredData(){
      if(!this.value){
        return this.tableData
      }
      return this.tableData.filter(item=>item.type===this.value)
    }
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
  .el-descriptions__body{
    margin-left: 10%;
  }
</style>
