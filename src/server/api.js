import service from './index';

export const getAxiosData = async options => await service('post','?a=b',options);

//注意  在main.js中接收这个暴露时 需要稍微包裹一下 避免变量污染的问题
// 如下：
// import service from '本文件的路径'
// Vue.prototype.$api = service

// 之后在vue组件中 就这样调用例如：   this.$api.getAxiosData(options)
