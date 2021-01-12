import dd from "dingtalk-jsapi";
import { message } from "antd";
import {
  setToken,
  setDingUser,
  request,
  setUserName,
  setUserAuthority,
  setDingJs,
  getDingJs,
  AGENT_ID,CORP_ID
} from "utils";
import moment from 'moment'
const dateFormat = 'YYYYMMDD';
const dingLogin = (callback) => {
  dd.runtime.permission.requestAuthCode({
    corpId:CORP_ID,
    onSuccess: async (result) => {
      let res = await request({
        url: "/api/login",
        method: "post",
        data: {
          code: result.code,
        },
      });

      if (res.code === "0") {       
        let { authorityCodeList, username, token} = res.data;
        //message.success(JSON.stringify(authorityCodeList));//["lbgl","lmgl","qkgl","qkyl","wzgl","wzkgl"]
        //存储用户名
        setUserName(username);
        //存储token       
        setToken(token);
        //保存权限      
        setUserAuthority(authorityCodeList);
        //存储调用钉钉接口需要的参数
        setDingUser(res.data);       
        //回调页面跳转
        if(callback){
          callback();
        }
      } else {
        message.error("登陆失败，请检查");
      }
    },
    onFail: function (err) {
      message.error(
        "获取code失败，请联系开发人员。错误信息 " + JSON.stringify(err)
      );
    },
  });
};
const getApiTicket =async (callback)=>{
  const { location } = window;
  let url = location.origin + location.pathname
  let res = await request({
    url: "/api/getJsTicketInfo",
    method: "post",
    data: {
      url,
      agentId:AGENT_ID
    },
  });
  if (res.code === "0") {       
    setDingJs(res.data);       
    if(callback){
      callback();
    }
  } else {
    message.error("鉴权失败失败，错误信息："+res.msg);
  }
}
//打开新连接
let openLink = url => {
  if (process.env.NODE_ENV === 'development') {
    message.error('该功能需在钉钉中使用')
    return
  }
  dd.biz.util.openLink({
    url: url, //要打开链接的地址
    onSuccess: function(result) {
      /**/
    },
    onFail: function(err) {}
  })
}

const getApi = () => {
  const jsApiList = ['biz.contact.choose', 'biz.contact.departmentsPicker']

  const dingJs = getDingJs() || {}
  const { timeStamp, nonceStr, signature } = dingJs
  dd.config({
    agentId:AGENT_ID,
    corpId:CORP_ID,
    timeStamp,
    nonceStr,
    signature,
    jsApiList
  })

  return dd
}

//调用钉钉导出文件
let downloadFile = (url, title, date_time) => {
  if (process.env.NODE_ENV === 'development') {
    message.error('该功能需在钉钉中使用')
    return
  }
  let fileName = `${title}.xls`;
  if(date_time&&date_time.length>0){
      let startTime = moment(date_time[0]).format(dateFormat)
      let endTime = moment(date_time[1]).format(dateFormat)
      if (date_time instanceof Array) {
          if (date_time[0]) {
              fileName = `${title}${startTime}-${endTime}.xls`
          } else {
              fileName = `${title}.xls`
          }
      } else {
          fileName = `${title}${moment(date_time).format(dateFormat)}.xls`
      }
  }
  dd.biz.util.downloadFile({
      url, // 要下载的文件的url
    name: fileName, // 定义下载文件名字
    onProgress(msg) {
      // 文件下载进度回调
    },
    onSuccess(result) {},
    onFail() {}
  })
}
export { dingLogin,getApiTicket,getApi,openLink, downloadFile};
