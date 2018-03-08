import axios from 'axios'
import qs from 'qs'
// this file was wrote by liubin,his blog is https://coffeeteame.github.io
//axios不支持jsonp请求,这个需要自己封装
axios.jsonp = (url) => {
  if(!url){
    console.error('axios.jsonp 至少需要一个url参数!')
    return;
  }
  return new Promise((resolve,reject) => {
    window.jsonCallBack = (result)=>{
      resolve(result)
    }
    var JSONP=document.createElement("script");
    JSONP.type="text/javascript";
    JSONP.src=url+"&callback=jsonCallBack";
    document.getElementsByTagName("head")[0].appendChild(JSONP);
    setTimeout(() => {
      document.getElementsByTagName("head")[0].removeChild(JSONP)
    },500)
  })
}

// 登录后一段时间不操作判断为超时，重新登录
function loginTimeOut(data) {
  if(data.ret===401 || data.ret===402){
    console.log('请求401')
    location.href = `your-url`

  }else if(data.ret===400){
    console.log('请求400')
  }
}

/**
 * 暴露的核心方法
 * 主要options参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://api,uuacb.com
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params data   {object}  post方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * 其他更多拓展参看axios自行拓展
 * 注意：options中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在options中带入
 */


export default (method,url,options) => {
  return new Promise((resolve,reject) => {
    typeof options !== 'object' && (options = {})
    let _option = options;
    _option = {
      method:method,
      url:url,
      baseURL:'your-base-url',
      timeout: 90000,
      params:null,
      data:null,
      headers: null,
      withCredentials:false,
      validateStatus:(status)=>{
        return status >= 200 && status < 300;
      },
      ..._option,
    }
    if(method.toLowerCase() === 'jsonp'){
      console.log(url)
      axios.jsonp(url).then(res => {
        resolve(res)
      },error => {
        reject(error)
      })
    }else{
      // add token for login
      if(!window.TOKEN && url.indexOf('Passport.Login')=== -1){
        console.error('token无效')
        return;
      };
      if(!_option.data){
        _option.data = {}
      }
      if(!_option.params){
        _option.params = {}
      }
      if(method){
        method = method.toLowerCase()
        if(method === 'get'){
          _option.params['token'] = window.TOKEN
        }else{
          _option.data['token'] = window.TOKEN
        }
      }
      _option.data = qs.stringify(_option.data)
      axios.request(_option).then(res => {
        loginTimeOut(res.data)
        resolve(typeof res.data === 'object' ? res.data : JSON.parse(res.data))
      },error => {
        if(error.response){
          loginTimeOut(error.response)
          reject(error.response.data)
        }else{
          reject(error)
        }
      })
    }
  })
}
