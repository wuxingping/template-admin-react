import React from "react";
import TreeTable from "../../../../template/TreeTable/index";
const modalList = [
  {
    label: "ID",
    field: "id",
    renderType: "Input",
    visible: false,
    writable: true,
    isUpdate: true,
    updateField: "id",
  },
  {
    label: "期刊名称",
    field: "periodicalName",
    renderType: "Input",
    require: true,
    visible: true,
    isUpdate: true,
    updateField: "periodicalName",
    updateWritable: true,
    updateVisible: true,
  },
  {
    label: "主编",
    field: "majorEditor",
    renderType: "Input",
    require: true,
    visible: true,
    isUpdate: true,
    updateField: "majorEditor",
    updateWritable: true,
    updateVisible: true,
  },
  {
    label: "编辑",
    field: "editors",
    renderType: "Input",
    require: true,
    visible: true,
    isUpdate: true,
    width:150,
    updateField: "editors",
    updateWritable: true,
    updateVisible: true,
  },
  {
    label: "图片",
    field: "picUrl",
    renderType: "Upload",
    visible: true,
    isUpdate: true,
    updateField: "picUrl",
    updateWritable: true,
    updateVisible: true,
  },
  {
    label: "是否显示",
    field: "isShow",
    require: true,
    renderType: "Switch",
    visible: true,
    radioOptions: [
      { label: "是", key: 1 },
      { label: "否", key: 0 },
    ],
    defaultValue: 0,
    isUpdate: true,
    updateField: "isShow",
    updateWritable: true,
    updateVisible: true,
    updateRenderType: "Radio",
    sourceApi: { url: "/admin/weeksPeriodical/updateShow", method: "post" },
  },
];
const actions = [
  {
    status: "update",
    name: "编辑",
    url: "/admin/weeksPeriodical/update",
    method: "post",
    showColumn: true,
  },
  {
    status: "preview",
    name: "预览",
    url: "",
    method: "",
    linkField: "pageUrl",
    showColumn: true,
  },
  {
    status: "add",
    name: "新增",
    url: "/admin/weeksPeriodical/add",
    method: "post",
    showColumn: false,
  },
  {
    status: "query",
    name: "查询",
    url: "/admin/weeksPeriodical/listByPage",
    extraField: "list",
    method: "post",
    showColumn: false,
  },
];
const childModalList = [
  {
    label: "栏目ID",
    field: "columnId",
    renderType: "Input",
    visible: true,
    writable: true,
  },
  {
    label: "栏目名称",
    field: "columnName",
    renderType: "Input",
    require: true,
    visible: true,
  },
  {
    label: "栏目描述",
    field: "description",
    renderType: "Input",
    require: true,
    visible: true,
  },
];
const childActions = [
  {
    status: "del",
    name: "删除",
    url: "/admin/weeksPeriodicalColumn/delColumn",
    method: "post",
    showColumn: true,
    data: {
      periodicalId: "",
      columnId: "",
    },
  },
  {
    status: "sort",
    name: "排序",
    url: "/admin/weeksPeriodicalColumn/sort",
    method: "post",
    showColumn: false,
    data: {
      periodicalId: "",
      columnIdList: "",
    },
  },
  {
    status: "query",
    name: "查询",
    url: "/admin/weeksPeriodicalColumn/columnList",
    extraField: "list",
    method: "post",
    showColumn: false,
    data: {
      periodicalId: "",
    },
  },
  {
    status: "insert",
    name: "插入",
    url: "/admin/weeksPeriodicalColumn/addColumn",
    method: "post",
    showColumn: false,
    data: {
      periodicalId: "",
      columnIdList: [],
    },
  },
];
const insertModalList = [
  { label: "ID", field: "id", renderType: "Input", visible: true },
  {
    label: "栏目名称",
    field: "columnName",
    renderType: "Input",
    require: true,
    visible: true,
    width: 250,
  },
  {
    label: "栏目描述",
    field: "description",
    renderType: "Input",
    require: true,
    visible: true,
    width: 350,
  },
  {
    label: "栏目图片",
    field: "picUrl",
    renderType: "Upload",
    require: true,
    visible: true,
    width: 250,
  },
];
const insertActions = [
  {
    status: "query",
    name: "查询",
    url: "/admin/weeksColumn/allList",
    method: "get",
    showColumn: false,
  },
];
function Periodical() {
  return (
    <TreeTable
      actions={actions}
      modalList={modalList}
      childActions={childActions}
      childModalList={childModalList}
      insertActions={insertActions}
      insertModalList={insertModalList}
      isInsert={true}
      isSort={true}
      insertTitle="选择栏目"
      parentIdField="periodicalId"
    />
  );
}
export default Periodical;
