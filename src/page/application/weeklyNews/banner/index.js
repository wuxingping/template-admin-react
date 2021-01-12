import React from 'react';
import BaseTable from '../../../../template/BaseTable/index';
const modalList = [
    {label:"ID", field:"id",renderType:"Input",visible:false,writable:true, isUpdate:true,
    updateField:"id",
   },
    {label:"轮播图",field:"picUrl",renderType:"Upload",require:true,visible:true,writable:true,
    isUpdate:true,
    updateField:"picUrl",
    updateWritable:true,
    updateVisible:true,
    },
    {label:"描述",field:"description",renderType:"Input",require:true,visible:true,writable:true,
    isUpdate:true,
    updateField:"description",
    updateWritable:true,
    updateVisible:true,
    },
    {label:"展示期刊",field:"periodicalName",renderType:'Select',require:true,visible:true,writable:true,
    isUpdate:true,
    updateField:"periodicalId",
    updateWritable:true,
    updateVisible:true,
    field:"periodicalName",
    require:true,
    width:250,   
    keyValueField:["periodicalId","periodicalName"],
    sourceApi:{url:"/admin/weeksPeriodical/periodicalList",
        method:"get",
    } 
    },
    {label:"页面路径",field:"pageUrl",renderType:'Input',visible:false,writable:true,
    isUpdate:true,
    updateField:"pageUrl",
    updateWritable:true,
    updateVisible:true,
},
    {label:"排序",field:"sort",renderType:'InputNumber',require:true,visible:true,writable:true,
    isUpdate:true,
    updateField:"sort",
    updateWritable:true,
    updateVisible:true,
},
    {label:"是否显示",field:"isShow",require:true, renderType:'Switch',visible:true,writable:true,
        radioOptions:[{label:'是',key:1},{label:'否',key:0}],
        sourceApi:{url:"/admin/weeksBanner/updateShow",method:"post"},
        isUpdate:true,
        updateField:"isShow",
        updateWritable:true,
        updateVisible:true,
        updateRenderType:"Radio" 
    },
]
const actions = [
    {   status:"update",
        name:'编辑',
        url: "/admin/weeksBanner/update",
        method: 'post',
        showColumn:true
    },
    {  status:"add",
        name:'新增',
        url: "/admin/weeksBanner/add",
        method: 'post',
        showColumn:false
    },
    {  status:"query",
        name:'查询',
        url: "/admin/weeksBanner/listByPage",
        method: 'post',
        extraField:"list",
        showColumn:false
    }
];
function Banner(){
    return  <BaseTable
    actions={actions}
    modalList={modalList}
/>
}
export default Banner;
