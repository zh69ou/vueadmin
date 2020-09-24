import axios from 'axios'
import qs from 'qs'
import {UserKey,taskId} from '~/config/params.js'
import {getData,delData} from '~/config/pub.js'
let bconfig = process.env.BaseConfig
const quest = (config)=>{
	let obj = {
		method:"get",
		baseURL:bconfig['BaseUrl'],
		url:"",
		timeout: 30000,
		data:{},
		params:{},
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		},
		responseType: 'json',
		responseEncoding: 'utf8',
		transformRequest: [(data, headers)=>{
			return data;
		}],
		transformResponse: [function (data) {
			return data;
		}],
	}
	if(config.method){
		obj.method=config.method
	}
	if(config.data){
		if(obj.method.toLowerCase()=='get'){
			obj.params = config.data
		}else{
			obj.data = config.data
		}
	}
	let uinfo = getData(UserKey)
	if(uinfo){
		obj.headers.Authorization  = uinfo
	}
	if(config.url){
		obj.url = config.url
	}
	if(config.headers){
		obj.headers = config.headers
	}
	if(config.responseType){
		obj.responseType = config.responseType
	}
	return new Promise((resolve,reject)=>{
		axios(obj).then((res)=>{
			if(config.key){
				if(res.code==0 || res.status == 200){
					resolve(res.data)
				}else{
					reject(res)
				}
			}else{
				resolve(res.data)
			}
		}).catch((err)=>{
			if(err.response){
				reject(err.response)
			}else{
				reject(err)
			}
		})
	})
}

const ChangeData = (data)=>{
	// let Id = getData(taskId)
	// if(Id){
	// 	data.taskId = Id
	// }
	return data
}

export const GET = (url,data={},key=true)=>{
	return quest({
		url:url,
		data:ChangeData(data),
		key:key
	})
}

export const POST = (url,data={},key=true)=>{
	return quest({
		method:'post',
		url:url,
		data:qs.stringify(ChangeData(data)),
		key:key
	})
}

export const JPOST = (url,data={},key=true)=>{
	return quest({
		method:'post',
		url:url,
		data:JSON.stringify(ChangeData(data)),
		headers:{
			'Content-Type':'application/json;charset=UTF-8',
		},
		key:key
	})
}

export const PULL = (url,data={},key=true)=>{
	data = ChangeData(data)
	let fd = new FormData()
	for(let k in data){
		fd.append(k,data[k])
	}
	return quest({
		method:'post',
		url:url,
		data:fd,
		key:key,
		headers:{
			'Content-Type': 'multipart/form-data'
		}
	})
}
