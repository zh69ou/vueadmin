import {GET,JPOST,POST} from './online.js'
import qs from 'qs'

/**
 * 登录
 * @Author zhou69.1@qq.com 2020-09-24
 */
export const SendLogin = (params={})=>{
	return JPOST('/pmtapi/base_Account/login?'+qs.stringify(params),{})
}