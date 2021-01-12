import {
    message
} from 'antd'
import { reduce } from 'lodash';
function dealWithQueryData(item,modalList,record,initData){
    modalList = modalList.filter((item1)=>item1.searchField);
    let data = {pageCount:1,pageSize:10};
    if(initData.pageCount && initData.pageSize){
        data.pageCount = initData.pageCount;
        data.pageSize = initData.pageSize;
    }
    if(item&&item.data){        
        for(let i in item.data){
            data[i] = item.data[i];
            //动态重新赋值
            if(record[i]||record[i]===0){
                data[i] = record[i];
            }   
        }
    }  
    if(modalList.length>0){
        modalList.map((item1)=>{
            if(Array.isArray(item1.searchField)){
                item1.searchField.map((item2)=>{
                    if(record[item2]||record[item2] == 0){
                        data[item2]=record[item2]
                    }else {
                        data[item2]="";
                    }
                })
            }else {
                if(record[item1.searchField]||record[item1.searchField] == 0){
                    data[item1.searchField]=record[item1.searchField]
                }else {
                    data[item1.searchField]="";
                }
            }
        });
    }
    return {url:item.url,extraField:item.extraField,method:item.method,data}
}
function dealWithEditData(item,modalList,record,cb){    
    let data=  {},dataKeys = modalList.filter((item1)=>item1.isUpdate);
    if(item.data){
      if(Array.isArray(item.data)){
        item.data.map((item1)=>{
            data[item1.updateField]=record[item1.updateField]
        })
      }else{
        for(let i in item.data){
            data[i] = item.data[i];
            //动态重新赋值
            if(record[i]||record[i]===0){
                data[i] = record[i];
            }           
        }
      }
    }
    if(item.extraField){
       let attachment = JSON.parse(item.extraField);
       for(let i in attachment){
           data[i] = attachment[i];
       }
    }
    for(let i = 0;i<dataKeys.length;i++){
        let temp = dataKeys[i];
        if(Array.isArray(temp.updateField)){
            if(temp.field === 'extraField'){
                let fixField = {};
                temp.localOptions.map((item1)=>{
                    fixField[item1.field] = item1.key
                })
                data[temp.field] = fixField;
            }else {
                for(let j = 0;j<temp.updateField.length;j++){
                    let field = temp.updateField[j];
                    let val = record[field];
                    if (temp.require && (!val && val!== 0) || (temp.require &&(Array.isArray(val) && val.length === 0))) {
                        message.error(temp.label+"不能为空");
                        return
                    }
                    data[field] = val;
                }
            }
        }else {
            let val = record[temp.updateField];
            //初始化 updateField 没有值的时候取 field
            if(!val){
                val = record[temp.field];
            }
            if (temp.require && (!val && val!== 0) || (temp.require &&(Array.isArray(val) && val.length === 0))) {
                message.error(temp.label+"不能为空");
                return
            }
           let renderType = temp.updateRenderType||temp.renderType;
        //处理特殊数据格式(取值和传值不一样时)
        if(renderType === "Select" && temp.format === 'entry'){
            data[temp.keyValueField[0]] = record[temp.keyValueField[0]];
            data[temp.keyValueField[1]] = record[temp.keyValueField[1]];
        }else if(renderType === "SelectMultiple"){            
            if(temp.format === 'entry'){
                data[temp.updateField] =  val.map((item1)=>{
                    return {[temp.keyValueField[0]]:item1.key,[temp.keyValueField[1]]:item1.label}
                })
                }else {
                        data[temp.updateField] =  val.map((item1)=>{
                            return item1.key
                        })
                }
        }else if(renderType === "ChooseMultiple"){
            if(temp.format === 'entry'){
                data[temp.updateField] =  val
            }else {
                data[temp.updateField] =  val.map((item1)=>{
                    return item1[temp.keyValueField[0]]
                })
            }
        }else if(renderType === "Upload"){            
            if(Array.isArray(val)&&val.length>0){
                if(val.length>1){
                    let urlList = [];
                    val.map((item1)=>{
                        urlList.push(item1.response.data);
                    })
                    data[temp.updateField] = urlList;
                }else{
                    data[temp.updateField] = val[0].response.data;
                }
            }
        } else {
            data[temp.updateField] = val;
        }
        }
    }
    if(cb){
        cb({url:item.url,method:item.method,data});
    }
}
function dealWithDelData(item,modalList,record){
    var data = {};
    if(item.data){
        for(let i in item.data){
            data[i] = item.data[i];
            //动态重新赋值
            if(record[i]||record[i]===0){
                data[i] = record[i];
            }           
        }
    }else{
        let field = modalList[0].field;
        //let updateField = modalList[0].updateField;
        data[field] = record[field];      
    } 
    return {url:item.url,method:item.method,data}
}
function dealWithExportData(item,modalList,record) {
    let data = {};
    if(item.data){
        for(let i in item.data){
            data[i] = item.data[i];
        }
    }
    modalList.map((item)=>{
        if(record[item]){
            data[item]=record[item]
        }else {
            data[item]="";
        }
    });
    return {url:item.url,method:item.method,data}
}
export {dealWithQueryData,dealWithEditData,dealWithExportData,dealWithDelData};