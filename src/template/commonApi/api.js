import {request} from './request'
import {dealWithQueryData,dealWithEditData,dealWithDelData,dealWithExportData} from './dealWithData';

//新增
function addAPI(item,modalList,record,cb) {
    dealWithEditData(item,modalList,record,(info)=>{
        debugger
        doWork.call(this,info,()=>{
            if(cb){
                cb()
            }
        });
    });
}
//删除
async function delAPI(item,modalList,record,cb) {
    doWork(dealWithDelData(item,modalList,record), ()=>{
        if(cb){
            cb();
        }
    });
}
//更新
function editAPI(item,modalList,record,cb) {
    dealWithEditData(item,modalList,record,(info)=>{
        doWork(info,()=>{
            if(cb){
                cb()
            }
        });
    });
}
//查询-获取列表
async function getListAPI (item,modalList,record,initData,cb){
    doWork(dealWithQueryData(item,modalList,record,initData),(res)=>{
        if (!res.data) return
        let dataSource = [],count = 0;
        if(res.data.count){
            count = res.data.count;
        }
        if (Array.isArray(res.data)) {
            dataSource = res.data;
        } else {
            dataSource = res.data[item.extraField];
        }
        if(cb){
            cb({dataSource, count});
        }
    });
}
async function doWork(apiInfo,cb) {
    let data = {data:apiInfo.data};
    if(apiInfo.method === 'get' && apiInfo.data){
        data = {params:apiInfo.data};
    }
    let res = await request({
        url: apiInfo.url,
        method: apiInfo.method,
        ...data
    });
    if (res.code !== '0') return;
    if(cb){
        cb(res);
    }
}
//导出
async function exportAPI (item,modalList,record,cb){
    doWork(dealWithExportData(item,modalList,record),(res)=>{
        if(cb){
            cb(res);
        }
    });
}
export {
    addAPI,
    delAPI,
    editAPI,
    getListAPI,
    exportAPI
}