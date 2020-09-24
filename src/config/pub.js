import qs from 'qs'
import {Dialog,Toast} from 'vant'
/**
 * 字符串是否在数组中
 * @Author zhou69.1@qq.com 2020-06-18
 * @param      str        字符串
 * @param      arr        数组
 */
export const isInArray = (str,arr)=>{
	if(arr.indexOf(str)>=0){
		return true
	}else{
		return false
	}
}
/**
 * 缓存数据
 * @Author zhou69.1@qq.com   2020-06-18
 * @param  name       名称
 * @param  obj        需要保存的数据
 */
export const setData=(name,obj)=>{
	let str = ""
	if(typeof(obj)=="string"||typeof(obj)=="number"){
		str = obj
	}else{
		str = qs.stringify(obj)
	}
	try{
		window.localStorage.setItem(name, str)
		return true
	}catch(err){
		return false
	}
}

/**
 * 获取缓存数据
 * @Author zhou69.1@qq.com 2020-06-18
 * @param    name       缓存名称
 */
export const getData=(name)=>{
	let str = window.localStorage.getItem(name)
	if(str){
		var pattern = /^[a-z0-9]*=.*$/;
        if(pattern.test(str)){
        	return qs.parse(str)
        }else{
        	return str
        }
	}else{
		return null
	}
}
/**
 * 删除缓存数据
 * @Author zhou69.1@qq.com 2020-06-18
 * @param     name       缓存名称
 */
export const delData=(name)=>{
	try{
		window.localStorage.removeItem(name)
		return true
	}catch(err){
		return false
	}
}

/**
 * 弹出提示框
 * @Author zhou69.1@qq.com 2020-06-18
 * @param        msg        提示内容
 * @param        title      标题
 */
export const alertMsg=(msg='',title='')=>{
  let obj = {
    message:msg?msg:'服务器忙稍后再试'
  }
  if(title){
    obj.title = title
  }
  // return Dialog.alert(obj)
  return new Promise((resolve,reject)=>{
    let msgbox = Toast(obj.message)
    let time = 2;
    try{
      let rt = setInterval(()=>{
        time--
        if(time<=0){
          clearInterval(rt)
          msgbox.clear()
          resolve()
        }
      },1000)
    }catch(e){
      reject(e)
    }
  })
}

/**
 * 确定框
 * @Author zhou69.1@qq.com 2020-07-15
 */
export const confMsg=(msg,title='')=>{
	let obj = {
		message:msg
	}
	if(title){
		obj.title = title
	}
	return Dialog.confirm(obj)
}
