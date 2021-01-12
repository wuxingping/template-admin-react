import React from "react";
import {
  Input,
  Radio,
  Select,
  InputNumber,
  ConfigProvider,
  DatePicker,
  Cascader,
  Switch,
  Tree
} from "antd";
import {request } from "../../commonApi";
import { MyUpload} from "../MyUpload";
import { ContactChoose} from "../ContactChoose";
import JoditEditor from 'jodit-react'
import generateData from "./data/generateData.json";
import provinceData from "./data/provinceData.json";
import moment from "moment";
import zh_CN from "antd/lib/locale-provider/zh_CN";
import "moment/locale/zh-cn";
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TextArea } = Input;
const dateFormat = "YYYY-MM-DD";
// https://xdsoft.net/jodit/doc/options/width/
const config = {
  width: 350,
  height: 500,
  "uploader": {
    "insertImageAsBase64URI": true,
  }
}
function RenderModal(item, record,setRefresh) {
  let valueField = item.field;
  let renderType = item.updateRenderType||item.renderType;
  record = record || {};
  let disabled = false;
  if (!item.updateWritable) {
    disabled = !item.updateWritable;
  }
  if (item.writable) {
    disabled = !item.writable;
  }
  if (item.isLook) {
    disabled = item.isLook;
  }
  if (renderType === "Radio" || renderType === "Tag") {    
    if(!record[valueField]&&item.defaultValue!=undefined){
      record[valueField] = item.defaultValue;
    }
    return (
      <Radio.Group
        onChange={(val) => onChangeTargetVal(val, item, record,setRefresh)}
        value={Number(record[valueField])}
        defaultValue={item.defaultValue}
        disabled={disabled}
      >
        {item.radioOptions.map((item1) => {
          return (
            <Radio key={item1.key} value={Number(item1.key)}>
              {item1.label}
            </Radio>
          );
        })}
      </Radio.Group>
    );
  }
  if (renderType === "Switch") {
    return (
      <Switch
        checked={!!record[item.field]}
        disabled={disabled}
        onChange={(val) => onChangeVal( val, item, record,setRefresh)}
      />
    );
  }
  if (renderType == "Upload") {
    if (record[valueField] && !Array.isArray(record[valueField])) {
      record[valueField] = [
        {
          uid: "-1",
          url: record[valueField],
          status: "done",
          response: { data: record[valueField] },
        },
      ];
    }
      return (
        <MyUpload
          fileList={record[valueField]}
          disabled={disabled}
          url={item.url}
          directory={item.directory}
          multiple={item.multiple}
          listType={item.listType}
          maxCount={item.maxCount}
          onChange={(val) => onChangeUpload(val, item,record,setRefresh)}
          style={{ flex: 1, paddingLeft: "20px" }}
        />
      );
    }
  if (renderType === "Picker") {
    if (disabled) {
      return (
        <div style={{ width: "220px" }}>
          <ConfigProvider locale={zh_CN}>
            <DatePicker
              disabled={disabled}
              value={moment(record[valueField])}
              onChange={(val) => onChangeDate.call(this, val, item)}
              format={item.format || dateFormat}
            />
          </ConfigProvider>
        </div>
      );
    } else {
      return (
        <div style={{ width: "220px" }}>
          <ConfigProvider locale={zh_CN}>
            <RangePicker
              disabled={disabled}
              value={record[valueField]}
              onChange={(val) => onChangeDate.call(this, val, item)}
              format={item.format || dateFormat}
            />
          </ConfigProvider>
        </div>
      );
    }
  }
  if (renderType === "Editor") {    
    return (
      <JoditEditor value={record[valueField]} onBlur={(val) => onChangeEditor(val, item,record,setRefresh)} config={config} />
    );
  }
  if (renderType === "District") {
    let options = generateData;
    if (item.format === "province") {
      options = provinceData;
    }
    return (
      <Cascader
        changeOnSelect={true}
        options={options}
        disabled={disabled}
        onChange={(val) => changeDistrict.call(this, val, item)}
        placeholder="请选择"
        value={
          typeof record[valueField] === "string"
            ? [record[valueField]]
            : record[valueField]
        }
      />
    );
  }
  if (renderType === "InputNumber") {
    return (
      <InputNumber
        placeholder={item.placeholder}
        maxLength={item.maxLength}
        value={record[valueField]}
        disabled={disabled}
        onChange={(val) => onChangeVal(val, item, record,setRefresh)}
      />
    );
  }
  if (renderType === "Textarea") {
    return (
      <TextArea
        rows={item.rows || 4}
        placeholder={item.placeholder}
        maxLength={item.maxLength}
        style={{ width: item.width || 180 }}
        value={record[valueField]}
        onChange={(val) => onChangeTargetVal(val, item, record,setRefresh)}
      />
    );
  }
  if (renderType === "Choose") {   
    return (
      <ContactChoose
        value={record[valueField]}
        disabled={disabled}
        onChange={(val, id) => onChangeContact(val, id, item,record,setRefresh)}
      />
    );
  }
  if (renderType === "ChooseMultiple") {
    return (
      <ContactChoose
        multiple={true}
        disabled={disabled}
        value={record[item.field]}
        onChange={(val, id) =>
          onChangeContactMultiple(val, id, item,record,setRefresh)
        }
      />
    );
  }
  if(renderType === "Tree"){
   return <Tree
      checkable
      onCheck={(val)=>onCheckVal(val, item, record,setRefresh)}
      checkedKeys={record[item.field]}  
      treeData={item.options}
    />
  }
  if (renderType === "Select") {
    let value = {
      key: record[valueField] || "",
      label: record[valueField] || "",
    };
    if (!item.localOptions) {
      item.options = item.options || [];
    } else {
      item.options = item.localOptions;
    }
    return (
      <Select
        style={{ width: item.width || 180 }}
        labelInValue={true}
        disabled={disabled}
        onFocus={() => onFocus(item,record,setRefresh)}
        onChange={(val, opt) => onChangeSelect(val, item, record,setRefresh)}
        value={value}
      >
        {item.options.map((item1, index) => {
          return (
            <Option key={index} value={item1.key}>
              {item1.label}
            </Option>
          );
        })}
      </Select>
    );
  }
  if (renderType === "SelectMultiple") {
    if (!item.localOptions) {
      item.options = item.options || [];
    } else {
      item.options = item.localOptions;
    }
    if(record[valueField] && record[valueField].length>0){
      record[valueField] = record[valueField].map((item1)=>{
          if(!item1.key){
              return {key:item1[item.keyValueField[0]],label:item1[item.keyValueField[1]]}
          }else {
              return item1
          }
      })
  }
    return (
      <Select
        style={{ width: item.width || 180 }}
        disabled={disabled}
        mode="multiple"
        labelInValue={true}
        tokenSeparators={[',']}
        onFocus={() => onFocus(item,record,setRefresh)}
        onChange={(val) =>
          onChangeSelectMultiple(val, item,record,setRefresh)
        }
        value={record[valueField] || []}
      >
        {item.options.map((item1, index) => {
          return (
            <Option key={index} value={item1.key} item={item1}>
              {item1.label}
            </Option>
          );
        })}
      </Select>
    );
  }
  if (renderType === "MultipleField") {
    return (
      <div>
        {item.field &&
          item.field.map((item1, index) => {
            return (
              <span key={index}>
                {record[item1.key]}
                <span>
                  {item.field.length - 1 !== index ? item.splitKey : ""}
                </span>
              </span>
            );
          })}
      </div>
    );
  }
  return (
    <Input
      placeholder={item.placeholder}
      style={{ width: item.width || 180 }}
      maxLength={item.maxLength}
      value={record[valueField]}
      disabled={disabled}
      onChange={(val) => onChangeInput(val, item, record,setRefresh)}
    />
  );
}
async function onFocus(item,record,setRefresh) { 
  if (!item.localOptions) {
    item.options = [];
    let { url, method, data, extraField } = item.sourceApi;
    for (let i in data) {
      if (record[i]) {
        data[i] = record[i];
      }
    }
    let res = await request({
      url,
      method,
      data,
    });
    if (res.code !== "0") return;
    let result = res.data;
    if (extraField) {
      result = result[extraField];
    }
    if (result.length > 0) {
      result.map((item1) => {
        if (item.defaultOption) {
          item.options.push(item.defaultOption);
        }
        item.options.push({
          key: item1[item.keyValueField[0]],
          label: item1[item.keyValueField[1]],
        });
      });
    }
    setRefresh(refresh=>!refresh);
  }
}
//改变日期
function onChangeDate(val, item) {
  this.setState({
    [item.field]: val,
  });
  if (val.length === 0) {
    item.updateField.map((item1) => {
      this.setState({
        [item1]: "",
      });
    });
  } else {
    let startTime = moment(val[0]).format(item.format || dateFormat);
    let endTime = moment(val[1]).format(item.format || dateFormat);
    this.setState({
      [item.updateField[0]]: startTime,
      [item.updateField[1]]: endTime,
    });
  }
}
//改变区域
function changeDistrict(val, item) {
  this.setState({
    [item.field]: val,
  });
  if (val.length === 0) {
    item.updateField.map((item1) => {
      this.setState({
        [item1]: "",
      });
    });
  } else {
    val.map((item1, index) => {
      this.setState({
        [item.updateField[index]]: item1,
      });
    });
  }
}
function onChangeTargetVal(val, item, record,setRefresh) {
    record[item.field]=val.target.value;
    record[item.updateField]=val.target.value;
    setRefresh(refresh=>!refresh)
}
function onCheckVal(val, item, record,setRefresh){
  record[item.field]=val;
    record[item.updateField]=val;
    setRefresh(refresh=>!refresh)
}
function onChangeSelectMultiple(val, item,record,setRefresh) {  
    record[item.field] = val;
    record[item.updateField] = val;
    setRefresh(refresh=>!refresh);
}
function onChangeSelect(val, item, record,setRefresh) {
  if (item.format === "entry") {
    record[[item.keyValueField[0]]] = val.key;
    record[[item.keyValueField[1]]] = val.label;
  } else {
    if (item.field) {
      record[item.field] = val.label;
    }
    if (item.updateField) {
      record[item.updateField] = val.key;
    }
    if (item.searchField) {
      record[item.searchField] = val.key;
    }
  }
  setRefresh(refresh=>!refresh);
  if (item.callback) {
    item.callback(val.key, this);
  }
}
function onChangeContactMultiple(val, id, item,record,setRefresh) {
  record[item.field] = val;
  record[item.updateField] = val;
  setRefresh(refresh=>!refresh);
}
function onChangeInput(val, item, record,setRefresh) {
  record[item.field] = val.target.value;
  record[item.updateField] = val.target.value;
  setRefresh(refresh=>!refresh);
}
function onChangeContact(val, id, item,record,setRefresh) {
  record[item.field] = val;
  record[item.updateField] = id;
  setRefresh(refresh=>!refresh);
}
function onChangeVal(val, item, record,setRefresh) {
    record[item.field]=val;
    record[item.updateField]=val;
    setRefresh(refresh=>!refresh)
}
function onChangeUpload(val, item, record,setRefresh) {
    if(item.defaultValue){
      item.defaultValue = "";
    }
    record[item.field]=val.fileList;
    record[item.updateField]=val.fileList;
    setRefresh(refresh=>!refresh)
}
function onChangeEditor(val, item,record,setRefresh) {
  //编辑器的内容会自动更新，不需要setRefresh更新。
    record[item.field]=val.target.innerHTML;
    record[item.updateField]=val.target.innerHTML;
    //setRefresh(refresh=>!refresh)
}
export { RenderModal };
