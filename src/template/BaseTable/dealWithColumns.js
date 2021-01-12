import React from "react";
import { Button, Tag, Popover, Switch, message } from "antd";
import { request } from "../commonApi";
import moment from "moment";
import "moment/locale/zh-cn";
const dateFormat = "YYYY-MM-DD";
let count = 1;
function dealWithColumns(columns, operateList, setRefresh) {
  var newCol = [];
  columns.map((item) => {
    let render = (text) => {
      if (item.label === "序号") {
        return <span>{count++}</span>;
      }
      if (Array.isArray(text) && item.keyValueField) {
        return (
          <div>
            {text.map((item1, index) => {
              return (
                <span key={index}>{item1[item.keyValueField[1]]}&nbsp;</span>
              );
            })}
          </div>
        );
      } else {
        return <span>{text}</span>;
      }
    };
    let renderType = item.renderType;
    if (renderType === "Upload") {
      render = (text) => (
        <img src={text} style={{ width: "160px", height: "90px" }} alt="" />
      );
    }
    if (renderType === "Radio" && Array.isArray(item.radioOptions)) {
      render = (text) => <div>{getName(item.radioOptions, Number(text))}</div>;
    } else if (renderType === "Tag") {
      render = (text) => getTag(item.radioOptions, Number(text));
    } else if (renderType === "Popover") {
      render = (text, record) => (
        <Popover content={record[item.linkField]} title="Link">
          <Tag color="blue">
            <a href={record[item.linkField]}>{record[item.field]}</a>
          </Tag>
        </Popover>
      );
    } else if (renderType === "Switch") {
      render = (text, record) => (
        <Switch
          checked={!!record[item.field]}
          onChange={(isShow) =>
            updateBannerStatus(isShow, record, item, setRefresh)
          }
        />
      );
    } else if (renderType === "Picker") {
      render = (text, record) => moment(text).format(item.format || dateFormat);
    } else if (renderType === "MultipleField") {
      render = (text, record) => {    
          console.log(record[item.field]);    
        return (
          <div>
            {record[item.field] && Array.isArray(record[item.field])&&record[item.field].map((item1, index) => {
                return (
                  <span key={index}>
                    {item1[item.keyValueField[1]]}
                    <span>
                      {record[item.field].length - 1 !== index ? item.splitKey : " "}
                    </span>
                  </span>
                );
              })}
          </div>
        );
      };
    }
    newCol.push({
      title: item.label,
      dataIndex: item.field,
      key: item.field,
      width: item.width,
      render,
    });
  });
  if (operateList && operateList.length && operateList.length > 0) {
    newCol.push({
      title: "操作",
      dataIndex: "button",
      render: (text, record) =>
        operateList.map((item, index) => {
          if (item.status === "copy") {
            let text = record[item.linkField];
            return (
              <Popover content={record[item.linkField]} title="Link">
                <Button
                  type={item.type}
                  icon={item.icon}
                  key={index}
                  className="cm-mr-02 btn"
                  onClick={() => item.do(item, record)}
                >
                  {item.name}
                </Button>
              </Popover>
            );
          } else {
            return (
              <Button
                type={item.type}
                icon={item.icon}
                key={index}
                className="cm-mr-02"
                onClick={() => item.do(item, record)}
              >
                {item.name}
              </Button>
            );
          }
        }),
    });
  }
  count = 1;
  return newCol;
}
async function updateBannerStatus(isShow, record, item, setRefresh) {
  let { id } = record;
  let { url, method } = item.sourceApi;
  //为了让编辑之后的弹框数据更新,所以重新赋值
  record.isShow = Number(isShow);
  isShow = Number(isShow);
  let res = await request({
    url,
    method,
    data: {
      isShow,
      id,
    },
  });
  if (res.code !== "0") return;
  setRefresh((refresh) => !refresh);
  //message.success(isShow === 1 ? '启用成功' : '禁用成功')
}
function getName(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item.key == val) {
      return item.label;
    }
  }
}
function getTag(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item.key == val) {
      return <Tag color={item.color}>{item.label}</Tag>;
    }
  }
}
export default dealWithColumns;
