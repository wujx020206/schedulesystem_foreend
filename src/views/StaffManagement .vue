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
            <el-table-column label="电子邮箱" property="email"></el-table-column>
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
          <div style="margin-top: 10px">
          <p-button block type="success" @click.native="handleAdd">
            <i class="ti-plus"/>
            新增员工
          </p-button>
          </div>
        </div>
      </div>
      <el-dialog title="新增员工" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="员工姓名" prop="name" style="width: 45%;">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="员工职位" prop="position" style="width: 45%;">
            <el-input v-model="ruleForm.position"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phonenumber" style="width: 45%;">
            <el-input v-model="ruleForm.phonenumber"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email" style="width: 45%;">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" prop="storename">
            <el-select v-model="ruleForm.storename" placeholder="请选择所在门店">
              <el-option label="门店1" value="store1"></el-option>
              <el-option label="门店2" value="store2"></el-option>
              <el-option label="门店3" value="store3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="修改员工信息" :visible.sync="updateDialogFormVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="员工职位" prop="position" style="width: 45%;">
            <el-input v-model="ruleForm.position"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phonenumber" style="width: 45%;">
            <el-input v-model="ruleForm.phonenumber"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email" style="width: 45%;">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" prop="storename">
            <el-select v-model="ruleForm.storename" placeholder="请选择所在门店">
              <el-option label="门店1" value="store1"></el-option>
              <el-option label="门店2" value="store2"></el-option>
              <el-option label="门店3" value="store3"></el-option>
            </el-select>
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
export default {
  components: {
    PaperTable,
    FGInput
  },
    data() {
      return {
        dialogFormVisible: false,
        updateDialogFormVisible: false,
        value1: [new Date(2023, 2, 13, 8, 0), new Date(2023, 2, 19, 8, 0)],
        value2: '',
        title: "员工管理",
        tableColumns: ["name", "position", "phonenumber", "storename", "email"],
        tableData: [
          {
            name: "Lily",
            position: "manager",
            phonenumber: "123456",
            storename: "La marine",
            email:"sdadasfsdad@qq.com"
          },
          {
            name: "Bob",
            position: "asistant manager",
            phonenumber: "123488",
            storename: "La marine",
            email:"414dad@qq.com"
          },
          {
            name: "Lin",
            position: "cashier",
            phonenumber: "888888",
            storename: "Noma",
            email:"sdadgad@qq.com"
          },
          {
            name: "W",
            position: "cashier",
            phonenumber: "8788888",
            storename: "Noma",
            email:"sd4567456d@qq.com"
          },
          {
            name: "Xoe",
            position: "guider",
            phonenumber: "884326",
            storename: "Noma",
            email:"sdss4224dad@qq.com"
          },
          {
            name: "BBi",
            position: "guider",
            phonenumber: "7468794",
            storename: "X",
            email:"sp64fsdad@qq.com"
          },
          {
            name: "Sb",
            position: "cashier",
            phonenumber: "8465488",
            storename: "Noma",
            email:"sdadad@qq.com"
          },

        ],
        ruleForm: {
          name: '',
          position: '',
          phonenumber:'',
          storename: '',
          email: ''
        },
        rules: {
          name:[
            {required:true,message:'请输入员工名称',trigger:'blur'}
          ],
          position:[
            {required:true,message:'请输入员工职位',trigger:'blur'}
          ],
          phonenumber:[
            {required:true,message:'请输入员工电话号码',trigger:'blur'}
          ],
          email:[
            {required:true,message:'请输入员工电子邮件',trigger:'blur'}
          ],
          storename: [
            {required: true, message: '请选择所在店铺', trigger: 'change'}
          ]
        },
        formLabelWidth: '120px',
      }
    },

  methods: {
    handleEdit(row) {
        this.updateDialogFormVisible=true
      },
      handleAdd() {
        this.dialogFormVisible=true
      },
      handleDelete(row) {
        console.log(`You want to delete row with id: ${row.id}`)
      },
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