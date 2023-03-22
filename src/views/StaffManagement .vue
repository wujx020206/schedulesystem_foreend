<template>
  <div class="card">
    <div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
    </div>
    <div class="Button">
      <el-row>
        <button type="button" class="btn btn-success" style="margin-right:12%">新增</button>
        <button type="button" class="btn btn-info">查询</button>
      </el-row>
    </div>

    <div class="table-responsive">
      <table class="table align-items-center mb-0">
        <thead>
          <tr>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">员工</th>
            <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">职位</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">联系电话</th>
            <th class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">所属门店</th>
            <th class="text-secondary opacity-7"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg" class="avatar avatar-sm me-3">
                </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-xs">John Michael</h6>
                <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0">Manager</p>
            <p class="text-xs text-secondary mb-0">Organization</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm badge-success">Online</span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
          </td>
          <td class="align-middle">
            <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
              修改     
            </a>
            <div>
              <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user">
                删除
              </a>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-3.jpg" class="avatar avatar-sm me-3">
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-xs">Alexa Liras</h6>
                <p class="text-xs text-secondary mb-0">alexa@creative-tim.com</p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0">Programator</p>
            <p class="text-xs text-secondary mb-0">Developer</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm badge-secondary">Offline</span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">11/01/19</span>
          </td>
          <td class="align-middle">
            <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
              修改     
            </a>
            <div>
              <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user">
                删除
              </a>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-4.jpg" class="avatar avatar-sm me-3">
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-xs">Laurent Perrier</h6>
                <p class="text-xs text-secondary mb-0">laurent@creative-tim.com</p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0">Executive</p>
            <p class="text-xs text-secondary mb-0">Projects</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm badge-success">Online</span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">19/09/17</span>
          </td>
          <td class="align-middle">
            <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
              修改     
            </a>
            <div>
              <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user">
                删除
              </a>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-3.jpg" class="avatar avatar-sm me-3">
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-xs">Michael Levi</h6>
                <p class="text-xs text-secondary mb-0">michael@creative-tim.com</p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0">Programator</p>
            <p class="text-xs text-secondary mb-0">Developer</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm badge-success">Online</span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">24/12/08</span>
          </td>
          <td class="align-middle">
            <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
              修改     
            </a>
            <div>
              <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user">
                删除
              </a>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-2.jpg" class="avatar avatar-sm me-3">
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-xs">Richard Gran</h6>
                <p class="text-xs text-secondary mb-0">richard@creative-tim.com</p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0">Manager</p>
            <p class="text-xs text-secondary mb-0">Executive</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm badge-secondary">Offline</span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">04/10/21</span>
          </td>
          <td class="align-middle">
            <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
              修改     
            </a>
            <div>
              <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user">
                删除
              </a>
            </div>
          </td>
        </tr>

        <tr>
          <td>
            <div class="d-flex px-2 py-1">
              <div>
                <img src="https://demos.creative-tim.com/soft-ui-design-system-pro/assets/img/team-4.jpg" class="avatar avatar-sm me-3">
              </div>
              <div class="d-flex flex-column justify-content-center">
                <h6 class="mb-0 text-xs">Miriam Eric</h6>
                <p class="text-xs text-secondary mb-0">miriam@creative-tim.com</p>
              </div>
            </div>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0">Programtor</p>
            <p class="text-xs text-secondary mb-0">Developer</p>
          </td>
          <td class="align-middle text-center text-sm">
            <span class="badge badge-sm badge-secondary">Offline</span>
          </td>
          <td class="align-middle text-center">
            <span class="text-secondary text-xs font-weight-bold">14/09/20</span>
          </td>
          <td class="align-middle">
            <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Edit user">
              修改     
            </a>
            <div>
              <a href="#!" class="text-secondary font-weight-bold text-xs" data-toggle="tooltip" data-original-title="Delete user">
                删除
              </a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '门店1'
        }, {
          value: '选项2',
          label: '门店2'
        }, {
          value: '选项3',
          label: '门店3'
        }],
        value: '选择门店'
      }
    },
    data() {
    return {
      input: ''
      }
    }
  }
</script>

<style>
  
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .card .Button button{
    height: 38px;
    width: 16%;
  }

</style>
