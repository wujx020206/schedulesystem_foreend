<template>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <div class="col-sm-6">
                <el-select v-model="store" placeholder="请选择" clearable>
                  <el-option
                    v-for="item in storeOptions"
                    :key="item"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
                <el-select v-model="type" placeholder="请选择" style="margin-left: 4px;" clearable>
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
              <el-table-column label="门店" property="shopName"></el-table-column>
              <el-table-column label="大类" property="firstType"></el-table-column>
              <el-table-column label="小类" property="secondType"></el-table-column>
              <el-table-column label="规则内容" property="value"></el-table-column>
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
      <el-dialog title="修改规则" :visible.sync="updateDialogFormVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="规则内容" prop="value" style="width: 45%;">
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
  import ruleApi from '@/api/rule'
  import storeApi from '@/api/store'

  export default {
    components: {
      PaperTable,
      FGInput
    },
    data() {
      return {
        updateDialogFormVisible: false,
        storeOptions: [],
        options: [],
        store: '',
        type: '',
        title: "门店管理",
        tableData: [],
        ruleForm: {
          shopName: '',
          firstType: '',
          secondType:'',
          value: '',
        },
        rules: {
          value:[
            {required:true,message:'请输入规则内容',trigger:'blur'}
          ],
        },
        storeId:'',
        row:'',
      }
    },
    created() {
      ruleApi.get().then(re=>{
          this.tableData=re.data.list
          const option1=[],option2=[]
          this.tableData.forEach(element=>{
            option1.push(element.shopName)
            option2.push(element.secondType)
          })
          const set1=new Set(option1)
          const set2=new Set(option2)
          this.storeOptions=Array.from(set1)
          this.options=Array.from(set2)
        },
        re=>{
          console.log("排班规则管理数据请求失败")
        })
    },
    methods: {
      updateTable(){
        ruleApi.get().then(re => {
            this.tableData=re.data.list
          },
          re=>{
            console.log("门店管理数据请求失败");
          })
      },
      handleEdit(row) {
        this.updateDialogFormVisible=true
        this.row=row
      },
      handleAdd() {
      this.dialogFormVisible=true
      },
      tableRowClassName ({row, rowIndex}) {
        return ''
      },
      submitUpdateForm() {
        this.$refs.ruleForm.validate((valid)=>{
          if(valid){
            const query={
              value:this.ruleForm.value
            }
            const type=this.row.firstType+'_'+this.row.secondType
            storeApi.specific(this.row.shopName).then(re=>{
              ruleApi.edit(re.data.id,type,query).then(res=>{
                if(res.errmsg==='成功'){
                  this.$message.success('修改排班规则成功')
                  this.updateDialogFormVisible=false
                  this.updateTable()
                  this.$refs.ruleForm.resetFields();
                }else{
                  this.$message.error('修改排班规则失败！')
                }
              })
            },
            re=>{
              console.log("门店管理数据请求失败")
            })
          }
        })
      },
      closeDeleteForm() {
        this.deleteDialogFormVisible=false
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      }
    },
    computed:{
      filteredData(){
        if(this.store&&!this.type){
          return this.tableData.filter(item=>item.shopName===this.store)
        }
        else if(this.type&&!this.store){
          return this.tableData.filter(item=>item.secondType===this.type)
        }
        else if(this.store&&this.type){
          return this.tableData.filter(item=>
            item.shopName===this.store && item.secondType===this.type
          )
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
    .el-descriptions__body{
    margin-left: 10%;
    }
  </style>
