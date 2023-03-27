//门店管理api
import {post, get, put, del} from '@/utils/request'

export default {
  get:() => get('/store/stores'),//查询所有门店信息
  specific: id => get('/store/'+id+'/store'),//查询特定门店信息
  add: query => post('/store/store',query),//新增门店
  edit: id => put('/store/'+id+'/store'),//修改门店信息
  del: id => del('/store/'+id+'/store')//删除门店信息
}
