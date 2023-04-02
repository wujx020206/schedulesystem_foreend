<template>
  <div class="row">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">
          <h4 class="title">门店管理</h4>
            <div class="col-sm-6">
              <el-select
                class="select-default"
                v-model="value" clearable
                placeholder="请选择要查询的门店">
                <el-option
                  class="select-default"
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
          <el-form-item label="占地面积" prop="size" style="width: 45%;">
            <el-input v-model.number="ruleForm.size" placeholder="请输入内容" type="number" oninput="if(value<0)value=0"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" prop="name" style="width: 45%;">
            <el-input v-model="ruleForm.name" placeholder="请输入内容" type="text"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" prop="address">
            <el-input v-model="ruleForm.address" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="修改门店" :visible.sync="updateDialogFormVisible">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="占地面积" prop="size2" style="width: 45%;">
            <el-input v-model.number="ruleForm2.size2" placeholder="请输入内容" type="number" oninput="if(value<0)value=0"></el-input>
          </el-form-item>
          <el-form-item label="门店名称" prop="name2" style="width: 45%;">
            <el-input v-model="ruleForm2.name2" placeholder="请输入内容" type="text"></el-input>
          </el-form-item>
          <el-form-item label="门店地址" prop="address2">
            <el-input v-model="ruleForm2.address2" placeholder="请输入内容"></el-input>
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
        title: '门店管理',
        tableData: [],
        value:'',
        options:[],
        ruleForm: {
          size: '',
          name: '',
          address: ''
        },
        rules: {
          size: [
            { required:true,message:'请输入门店占地面积', trigger: 'blur' },
          ],
          name:[
            {required:true,message:'请输入门店名称',trigger:'blur'}
          ],
          address: [
            { required: true, message: '请输入门店地址', trigger: 'blur' }
          ]
        },
        formLabelWidth: '120px',
        ruleForm2: {
          size2: '',
          name2: '',
          address2: ''
        },
        rules2: {
          size2: [
            { required:true,message:'请输入门店占地面积', trigger: 'blur' },
          ],
          name2:[
            {required:true,message:'请输入门店名称',trigger:'blur'}
          ],
          address2: [
            { required: true, message: '请输入门店地址', trigger: 'blur' }
          ]
        },
        row:'',
      }
    },
  methods: {
      //获取后端数据
      init(){
        storeApi.get().then(re => {
            this.tableData=re.data.list
            this.tableData.forEach(element=>{
              this.options.push(element.name)
            })
        },
        re=>{
          console.log("门店管理数据请求失败");
        })
      },
      updateTable(){
        storeApi.get().then(re => {
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
      async handleDelete(row) {
        const confirmResult=await this.$confirm('是否确定删除该门店？','提示',{
          confirmButtonText:'确定',
          cancelButtonClass:'取消',
          type:'warning'
        }).catch(err=>err)

        if(confirmResult==='cancel'){
          this.$message.info('已经取消删除')
        }else{
        storeApi.del(row.id).then(re=>{
          if(re.errmsg==='成功'){
            const rowIndex = this.tableData.indexOf(row)
            this.tableData.splice(rowIndex,1)
            this.$message.success('删除该门店成功')
            const selectedValue=row.name
            console.log(selectedValue)
            this.options=this.options.filter(item=>item!==selectedValue)
            if(this.options===selectedValue){
              this.options=''
            }
          }else{
            this.$message.error('删除门店失败！')
          }
        })}
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
            const query={
              size:this.ruleForm.size,
              name:this.ruleForm.name,
              address:this.ruleForm.address
            }
            storeApi.add(query).then(re=>{
              if(re.errmsg==='创建成功'){
                this.$message.success('新增门店成功')
                this.dialogFormVisible=false
                this.updateTable()
                this.options.push(this.ruleForm.name)
                this.$refs.ruleForm.resetFields();
              }
              else {
                this.$message.error('新增门店失败！')
              }
            })
          }
        });
      },
      submitUpdateForm() {
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            const query={
              size:this.ruleForm2.size2,
              name:this.ruleForm2.name2,
              address:this.ruleForm2.address2
            }
            storeApi.edit(this.row.id,query).then(re=>{
              if(re.errmsg==='成功'){
                this.$message.success('修改门店成功')
                this.updateDialogFormVisible=false
                this.updateTable()
                const rowIndex = this.tableData.indexOf(this.row)
                Vue.set(this.options,rowIndex,this.ruleForm2.name2)
                this.$refs.ruleForm2.resetFields();
              }
              else {
                this.$message.error('修改门店失败！')
              }
            })
          }
        });
      },
      resetForm() {
        this.$refs.ruleForm.resetFields();
      },
      resetForm2() {
        this.$refs.ruleForm2.resetFields();
      }
    },
  mounted() {
    this.init()
    this.updateTable()
  },
  computed:{
    filteredData(){
      const value=this.value
      if(!value){
        return this.tableData
      }
      return this.tableData.filter(item=>item.name===value)
    }
  },
};
</script>

<style>
.el-descriptions__body{
    margin-left: 10%;
  }
</style>
