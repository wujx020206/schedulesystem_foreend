<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <div class="col-sm-6">
            <div class="zhujian">
              <el-input v-model="input" clearable placeholder="请输入员工姓名" style="margin-right: 4px;"></el-input>
              <el-select v-model="select" placeholder="请选择" clearable>
                <el-option
                  v-for="item in options"
                  :key="item"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
            </div>
          </div>
      </div>
        <div class="card-body table-responsive table-full-width">
          <el-table :row-class-name="tableRowClassName"
                    :data="filteredData">
            <el-table-column label="员工" prop="name"></el-table-column>
            <el-table-column label="职位" prop="position"> </el-table-column>
            <el-table-column label="联系电话" prop="phone"></el-table-column>
            <el-table-column label="电子邮箱" prop="email"></el-table-column>
            <el-table-column label="所属门店" prop="shopName"></el-table-column>
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
          <el-form-item label="联系电话" prop="phone" style="width: 45%;">
            <el-input v-model="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email" style="width: 45%;">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" prop="shopName">
            <el-select v-model="ruleForm.shopName" placeholder="请选择所在门店">
              <el-option v-for="item in storeOptions" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="修改员工" :visible.sync="updateDialogFormVisible">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="员工姓名" prop="name2" style="width: 45%;">
            <el-input v-model="ruleForm2.name2"></el-input>
          </el-form-item>
          <el-form-item label="员工职位" prop="position2" style="width: 45%;">
            <el-input v-model="ruleForm2.position2"></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="phone2" style="width: 45%;">
            <el-input v-model="ruleForm2.phone2"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email2" style="width: 45%;">
            <el-input v-model="ruleForm2.email2"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" prop="shopName2">
            <el-select v-model="ruleForm2.shopName2" placeholder="请选择所在门店">
              <el-option v-for="item in storeOptions" :label="item" :value="item"/>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitUpdateForm">立即修改</el-button>
            <el-button @click="resetForm2">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { PaperTable } from "@/components";
import { FormGroupInput as FGInput } from "@/components";
import staffApi from "@/api/staff";
import storeApi from '@/api/store'
import Vue from "vue";

export default {
  components: {
    PaperTable,
    FGInput
  },
  data() {
    return {
      dialogFormVisible: false,
      updateDialogFormVisible: false,
      title: "员工管理",
      tableData: [],
      ruleForm: {
        name: '',
        position: '',
        phone:'',
        shopName: '',
        email: ''
      },
      rules: {
        name:[
          {required:true,message:'请输入员工姓名',trigger:'blur'}
        ],
        position:[
          {required:true,message:'请输入员工职位',trigger:'blur'}
        ],
        phone:[
          {required:true,message:'请输入员工联系电话',trigger:'blur'}
        ],
        email:[
          {required:true,message:'请输入员工电子邮件',trigger:'blur'}
        ],
        shopName: [
          {required: true, message: '请选择所在店铺', trigger: 'change'}
        ]
      },
      ruleForm2: {
        name2: '',
        position2: '',
        phone2:'',
        shopName2: '',
        email2: ''
      },
      rules2: {
        name2:[
          {required:true,message:'请输入员工姓名',trigger:'blur'}
        ],
        position2:[
          {required:true,message:'请输入员工职位',trigger:'blur'}
        ],
        phone2:[
          {required:true,message:'请输入员工联系电话',trigger:'blur'}
        ],
        email2:[
          {required:true,message:'请输入员工电子邮件',trigger:'blur'}
        ],
        shopName2: [
          {required: true, message: '请选择所在店铺', trigger: 'change'}
        ]
      },
      formLabelWidth: '120px',
      options: [],
      storeOptions: [],
      input:'',
      select:'',
      storeId:'',
      staffId:'',
      row:'',
      }
  },
  created() {
    staffApi.get().then(re=>{
        this.tableData=re.data.list
        const options1=[]
        this.tableData.forEach(element=>{
          options1.push(element.shopName)
        })
        const set1=new Set(options1)
        this.options=Array.from(set1)
      },
      re=>{
        console.log("员工管理数据请求失败");
      })
    storeApi.get().then(re=>{
        re.data.list.forEach(element=>{
          this.storeOptions.push(element.name)
        })
      },
      re=>{
        console.log("门店管理数据请求失败");
      })
  },
  methods: {
    updateTable(){
      staffApi.get().then(re=>{
          this.tableData=re.data.list
        },
        re=>{
          console.log("员工管理数据请求失败");
        })
    },
    handleEdit(row) {
      this.updateDialogFormVisible=true
      this.row=row
    },
    async handleDelete(row) {
      const confirmResult=await this.$confirm('是否确定删除该员工？','提示',{
        confirmButtonText:'确定',
        cancelButtonClass:'取消',
        type:'warning'
      }).catch(err=>err)

      if(confirmResult==='cancel'){
        this.$message.info('已经取消删除')
      }else {
        const re = await staffApi.getId(row.name)
        this.staffId=re.data.list[0]
        staffApi.del(this.staffId).then(re=>{
          if(re.errmsg==='成功'){
            const rowIndex = this.tableData.indexOf(row)
            this.tableData.splice(rowIndex,1)
            this.$message.success('删除该员工成功')
          }else{
            this.$message.error('删除员工失败！')
          }
        })
      }
    },
    handleAdd() {
      this.dialogFormVisible=true
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
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const re = await storeApi.specific(this.ruleForm.shopName)
          this.storeId=re.data.id
          const query = {
            name: this.ruleForm.name,
            position: this.ruleForm.position,
            phone: this.ruleForm.phone,
            email: this.ruleForm.email,
            storeId: this.storeId
          }
          staffApi.add(query).then(re => {
            if (re.errmsg === '创建成功') {
              this.$message.success('新增员工成功')
              this.dialogFormVisible = false
              this.updateTable()
              if (!this.options.includes(this.ruleForm.shopName))
                this.options.push(this.ruleForm.shopName)
              this.$refs.ruleForm.resetFields()
            } else {
              this.$message.error('新增员工失败！')
            }
          })
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    resetForm2() {
      this.$refs.ruleForm2.resetFields();
    },
    submitUpdateForm() {
      this.$refs.ruleForm2.validate(async (valid) => {
        if (valid) {
          const re = await staffApi.getId(this.row.name)
          this.staffId=re.data.list[0]
          const re2 = await storeApi.specific(this.ruleForm2.shopName2)
          this.storeId=re2.data.id
          const query ={
            name:this.ruleForm2.name2,
            position:this.ruleForm2.position2,
            phone:this.ruleForm2.phone2,
            email:this.ruleForm2.email2,
            storeId:this.storeId
          }
          staffApi.edit(this.staffId,query).then(re=>{
            if(re.errmsg==='成功'){
              this.$message.success('修改员工成功')
              this.updateDialogFormVisible=false
              this.updateTable()
              const rowIndex = this.tableData.indexOf(this.row)
              Vue.set(this.options,rowIndex,this.ruleForm2.shopName2)
              this.$refs.ruleForm2.resetFields();
            }
            else {
              this.$message.error('修改员工失败！')
            }
          })
        }
      })
    },
  },
  computed:{
    filteredData(){
      if(!this.input&&this.select){
        return this.tableData.filter(item=>item.shopName===this.select)
      }
      else if(this.input&&!this.select){
        return this.tableData.filter(item => {
           return item.name.toLowerCase().includes(this.input.toLowerCase())
        })
      }
      else if(this.input&&this.select){
        const table=this.tableData.filter(item=>item.shopName===this.select)
        return table.filter(item=>{
          return item.name.toLowerCase().includes(this.input.toLowerCase())
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
