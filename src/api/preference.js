//员工偏好api
import {get,put} from '@/utils/request'
export default {
  get: ()=>get('/preference_url/staff/preferences'),//查询所有员工偏好
  getByType: type=>get('/preference_url/staff/preferences/'+type+'/preferences'),//查询某方面偏好
  edit: (staffId,preferenceId,query)=>put('/preference_url/staff/'+staffId+'/preferences/'+preferenceId+'/preference',query)//修改员工偏好
}
