//排班表api
import {get} from '@/utils/request'
export default {
  getByDay:(storeId,date)=>get('/schedule_url/schedule/'+storeId+'/day/'+date+'/day'),
  getByDayAndSkill:(storeId,date,skill)=>get('/schedule_url/schedule/'+storeId+'/day/'+date+'/skill/'+skill+'/day'),
  getByDayAndPosition:(storeId,date,position)=>get('/schedule_url/schedule/'+storeId+'/day/'+date+'/position/'+position+'/day'),
  getByDayAndStaffId:(storeId,date,staffId)=>get('/schedule_url/schedule/'+storeId+'/day/'+date+'/skill/'+staffId+'/day'),
  getByWeek:(storeId,date)=>get('/schedule_url/schedule/'+storeId+'/week/'+date+'/week'),
  getByWeekAndSkill:(storeId,date,skill)=>get('/schedule_url/schedule/'+storeId+'/week/'+date+'/skill/'+skill+'/week'),
  getByWeekAndPosition:(storeId,date,position)=>get('/schedule_url/schedule/'+storeId+'/week/'+date+'/position/'+position+'/week'),
  getByWeekAndStaffId:(storeId,date,staffId)=>get('/schedule_url/schedule/'+storeId+'/week/'+date+'/staff/'+staffId+'/week"')
}
