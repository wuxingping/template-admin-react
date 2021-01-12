/**
 * Created by Lenovo on 2020/6/20.
 */
import React, { useState,useImperativeHandle} from "react";
import { BASE_URL,getToken,downloadFile } from "utils";
import { Button, Form, Upload, message } from "antd";
import { RenderModal } from "../component";
import "moment/locale/zh-cn";
import { exportAPI } from "../commonApi";
function onChangeImport(info) {
  if (info.file.status !== "uploading") {
    console.log(info.file, info.fileList);
  }
  if (info.file.status === "done") {
    message.success("文件导入成功");
    queryFinish.bind(this);
  } else if (info.file.status === "error") {
    message.error("文件导入失败");
  }
}
function exportFinish(item, record,modalList) {
  exportAPI(item, modalList, record, (res) => {
    //掉钉钉接口
    //变量拼接的命名
    if (Array.isArray(item.title.field)) {
      var timeRange = [];
      item.title.field.map((item) => {
        timeRange.push(record[item]);
      });
      downloadFile(res.result, item.title.text, timeRange);
    } else {
      downloadFile(res.result, item.title.text);
    }
  });
}
function queryFinish(props,item, record) {
  let { getList,setCurrent } = props;
  setCurrent(1);
  getList(record);
}
function resetFinish(props, setOption) {
  let { getList,setCurrent } = props;
  setCurrent(1);
  getList({});
  setOption({});
}
function dealWithList(operateList, props, setOption) {
  let { openAddModal } = props;
  let actions = [];
  operateList.map((item) => {
    if (item.status === "add") {
      item.type = "primary";
      item.do = openAddModal;
      actions.push(item);
    }
    if (item.status === "query") {
      item.type = "dashed";
      //点查询时当前页数为1
      item.do = queryFinish.bind(this, props);
      actions.push(item);
      //如果有查询，自动添加重置
      actions.push({
        type: "danger",
        name: "重置",
        do: resetFinish.bind(this, props, setOption),
      });
    }
    if (item.status === "import") {
      actions.push(item);
    }
    if (item.status === "export") {
      item.type = "dashed";
      item.do = exportFinish.bind(props.modalList);
      actions.push(item);
    }
  });
  return actions;
}
function SearchByCondition(props,ref) {
  let modalList = props.modalList.filter((item) => item.isSearch);
  let headers = { DING_TOKEN: getToken() };
  const [option, setOption] = useState({});
  const [refresh,setRefresh] = useState(false);
  let actions = dealWithList(props.actions, props, setOption); //处理不同的button按钮样式
  useImperativeHandle(ref, () => ({
    option
  }));
  return (
    <div>
      {modalList.length > 0 ? (
        <div className="cm-mb-01">
          <Form layout="inline">
            {modalList.map((item, index) => {
              return (
                <Form.Item label={item.label} key={index}>
                  {RenderModal(item, option,setRefresh)}
                </Form.Item>
              );
            })}
          </Form>
        </div>
      ) : null}
      {actions.map((item, index) => {
        if (item.status === "import") {
          return (
            <Upload
              key={index}
              name="file"
              showUploadList={false}
              action={BASE_URL + item.url}
              accept="excel"
              headers={headers}
              onChange={(info) => onChangeImport(info)}
            >
              <Button style={{ background: "#52C41A", color: "#fff" }}>
                导入
              </Button>
            </Upload>
          );
        } else {
          return (
            <Button
              type={item.type}
              key={index}
              className="cm-mr-01"
              onClick={() => item.do(item, option)}
            >
              {item.name}
            </Button>
          );
        }
      })}
    </div>
  );
}
export default React.forwardRef(SearchByCondition);
