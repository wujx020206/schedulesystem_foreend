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
                <el-select v-model="value2" placeholder="请选择" style="margin-left: 4px;">
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
            <div style="margin-top: 10px">
            <p-button block type="success" @click.native="handleAdd">
              <i class="ti-plus"/>
              新增规则
            </p-button>
            </div>
          </div>
        </div>
        <el-dialog title="新增规则" :visible.sync="dialogFormVisible">
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="门店名称" prop="id">
            <el-select v-model="ruleForm.id" placeholder="请选择所在门店">
              <el-option label="门店1" value="store1"></el-option>
              <el-option label="门店2" value="store2"></el-option>
              <el-option label="门店3" value="store"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="规则大类" prop="type1" style="width: 45%;">
            <el-input v-model="ruleForm.type1"></el-input>
          </el-form-item>
          <el-form-item label="规则小类" prop="type2" style="width: 45%;">
            <el-input v-model="ruleForm.type2"></el-input>
          </el-form-item>
          <el-form-item label="规则内容" prop="value" style="width: 45%;">
            <el-input v-model="ruleForm.value"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm">立即创建</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
      <el-dialog title="修改规则" :visible.sync="updateDialogFormVisible">
        <!-- <el-descriptions title="">
          <el-descriptions-item label="门店">this.$refs.id.value</el-descriptions-item>
          <el-descriptions-item label="规则大类">18100000000</el-descriptions-item>
          <el-descriptions-item label="规则小类">苏州市</el-descriptions-item>
        </el-descriptions> -->
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
      <el-dialog title="删除规则" :visible.sync="deleteDialogFormVisible">
        <el-descriptions title="">
          <el-descriptions-item label="提示信息">是否确定删除该排班规则？</el-descriptions-item>
        </el-descriptions>
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item>
            <el-button @click="submitDeleteForm">确定</el-button>
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
        return {
          dialogFormVisible: false,
          updateDialogFormVisible: false,
          deleteDialogFormVisible: false,
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
          ruleForm: {
          id: '',
          type1: '',
          type2:'',
          value: ''
        },
        rules: {
          id: [
            { required:true, message:'请选择门店', trigger: 'change'},
          ],
          type1:[
            {required:true,message:'请输入规则大类',trigger:'blur'}
          ],
          type2:[
            {required:true,message:'请输入规则小类',trigger:'blur'}
          ],
          value:[
            {required:true,message:'请输入规则值',trigger:'blur'}
          ],
        },
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
        submitUpdateForm() {
          
        },
        closeDeleteForm() {
          this.deleteDialogFormVisible=false
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
