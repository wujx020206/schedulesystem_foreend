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
            <el-table-column label="员工编号" property="id"></el-table-column>
            <el-table-column label="员工名" property="name"></el-table-column>
            <el-table-column label="偏好类别" property="type"></el-table-column>
            <el-table-column label="偏好值" property="value"></el-table-column>
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
            新增偏好
          </p-button>
          </div>
        </div>
      </div>
      <el-dialog title="新增偏好" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="员工编号" prop="id" style="width: 45%;">
            <el-input v-model.number="ruleForm.id"></el-input>
          </el-form-item>
          <el-form-item label="员工名称" prop="name" style="width: 45%;">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="偏好类别" prop="type" style="width: 45%;">
            <el-input v-model="ruleForm.type"></el-input>
          </el-form-item>
          <el-form-item label="偏好值" prop="value" style="width: 45%;">
            <el-input v-model="ruleForm.value"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
      <el-dialog title="删除偏好" :visible.sync="deleteDialogFormVisible">
        <el-descriptions title="">
          <el-descriptions-item label="提示信息">是否确定删除该偏好？</el-descriptions-item>
        </el-descriptions>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item>
            <el-button style="margin-left: 70%;" @click="submitDeleteForm">确定</el-button>
            <el-button type="primary" @click="closeDeleteForm">取消</el-button>
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
        updateDialogFormVisible: false,
        deleteDialogFormVisible: false,
        input: '',
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
        title: "偏好管理",
        tableColumns: ["Id", "Name", "Type", "Value"],
        tableData: [
          {
            id: "1",
            name: "wjx",
            type: "工作日偏好",
            value: "3"
          },
          {
            id: "2",
            name: "ymt",
            type: "班次时长偏好",
            value: "2"
          },
          {
            id: "3",
            name: "lmf",
            type: "没有偏好",
            value: "null"
          }
        ],
        ruleForm: {
          id: '',
          name: '',
          type:'',
          value: ''
        },
        rules: {
          id: [
            { required:true, validator: checkId, trigger: 'blur' },
          ],
          name:[
            {required:true,message:'请输入门店名称',trigger:'blur'}
          ],
          type: [
            { required: true, message: '请输入规则类型', trigger: 'blur' }
          ],
          value: [
            { required: true, message: '请输入规则值', trigger: 'blur' }
          ]
        },
        formLabelWidth: '120px',

      }
    },
    methods: {
      handleEdit(row) {
        this.updateDialogFormVisible=true
      },
      handleDelete(row) {
        this.deleteDialogFormVisible=true
      },
      handleAdd() {
        this.dialogFormVisible=true
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
      },
      submitUpdateForm() {
          
      },
      closeDeleteForm() {
        this.deleteDialogFormVisible=false
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
  .el-descriptions__body{
    margin-left: 10%;
  }
</style>