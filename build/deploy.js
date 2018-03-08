/*
*  created by liubin on 20170804
*  本脚本属于尝试性脚本
*  用途:将所有静态资源文件部署到阿里云
*  命令：npm run deploy (请务必在npm run build命令执行之后)
*/

//文件操作类
var express = require('express');
var app = express();
var fs = require('fs');
var path = require("path");

var co = require('co');
var OSS = require('ali-oss');

// 配置以下CDN密码地址用户名等，目前密码地址为刘斌设置的密码和地址
// region,accessKeyId,accessKeySecret,bucket
var client = new OSS({
  // region: 'oss-cn-hangzhou',
  // accessKeyId: 'L8uqOCnxwSlQBsKB',
  // accessKeySecret: 'mBZItsvM6QjPx0jIXixZpdSwLXu6NM',
  // bucket: 'czk-mgsite'
});

// 以下为通用方法--------

//删除某个指定文件，需要指定路径如：static/js/delete.txt
deleteFile = (path) => {
  co(function* () {
    var result = yield client.delete(path);
    console.log(result);
  }).catch(err => {
    console.log(err);
  });
}

//获取所有需要上传的文件路径集合
let fileList = [];
pathItems = (root) => {
  var dirList = fs.readdirSync(root);
  dirList.forEach((item) => {
    if(fs.statSync(root + '/' + item).isDirectory()){
      pathItems(root + '/' + item);
    }else{
      fileList.push(root + '/' + item);
    }
  });
}


//循环上传
let count = 0;
uploadFiles = (localPath,cdnPath,index) => {
  co(function* () {
    var stream = fs.createReadStream(localPath);
    var result = yield client.putStream(cdnPath, stream);
    console.log(`上传成功:${localPath} ==> ${cdnPath},当前序列:${index}`);
    count ++
    if(count === fileList.length){console.log(`上传全部执行完成,文件共${count}个文件`)}
  }).catch(function (err) {
    console.log(`上传失败：${localPath}`,err);
  });
}

//执行上传
actionsUpload = (list) => {
  if(!list || !list.length){
    console.log(`上传列表为空`)
    return false
  } else {
    list.forEach((item,index) => {
      uploadFiles(item,'/p-static/' + item.split('dist/')[1], index + 1)
    })
  }
}

pathItems(path.resolve(__dirname,'../dist/static'));
console.log(`本次部署需要上传的文件共:${fileList.length}个`);
actionsUpload(fileList)



