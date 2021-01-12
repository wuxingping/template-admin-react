import React, { useEffect, useState, useImperativeHandle, useRef } from "react";
import { Table, Modal, message } from "antd";
import DetailView from "./detail";
import SearchByCondition from "./searchByCondition";
import dealWithColumns from "./dealWithColumns";
import { delAPI, addAPI, editAPI, getListAPI,request } from "../commonApi";
import { generate} from "../../utils/tools";
import ModalBox from "./modalBox";
import copy from 'copy-to-clipboard';
import {
  EditOutlined,
  CopyOutlined,
  PlusOutlined,
  DeleteOutlined,
  InstagramOutlined
} from '@ant-design/icons';
let { confirm } = Modal;
function evaluateList(setDataSource, props,setCount) {
  if (props.queryData) {
    getList(setCount,setDataSource, props, props.queryData);
  } else {
    getList(setCount,setDataSource, props, {});
  }
}
function dealWithData(treeData, keys) {
  return generate(treeData,  keys["topId"],  keys);
}
function getList(setCount,setDataSource, props, record, initData = "") {
  let { actions, modalList } = props; 
  let action = actions.filter((item) => item.status === "query")[0];
  getListAPI(action, modalList, record, initData, (state) => {
    if (props.isTreeTable) {
      setDataSource(dealWithData(state.dataSource, props.keys));
    } else {
      setDataSource(state.dataSource);
      if(setCount){
        setCount(state.count);
      }
    }   
  });
}
function summary(count) {
  return (
    <div style={{ marginLeft: "25px", color: "#1890ff" }}>
      一共【{count}】条数据
    </div>
  );
}
//页码改变
function onChangePage(queryOption,props,setCount,setDataSource, setCurrent, pageSize, current) {
  let option = queryOption.current.option||{}; 
  setCurrent(current);
  getList(setCount,setDataSource, props, option, { pageCount: current, pageSize }, current);
}
//打开添加模态框
function openAddModal(
  props,
  setShowDetail,
  setShowModal,
  setTitle,
  setOption,
  item,
  record
) {
  const { showDetail } = props;
 
  if (showDetail) {
    setShowDetail(true);
  } else {
    setShowModal(true);
  }
  var keys = Object.keys(record);
  //判断record不是空对象
  if (keys && keys.length>0) {
    setTitle("插入");
    if (item.data && Array.isArray(item.data)) {
      item.data.map((item1) => {
        let field = item1.field;
        let updateField = item1.updateField;
        setOption((data) => {
          data[updateField] = record[field];         
          return JSON.parse(JSON.stringify(data));
        });
      });
    }
  } else {
    setTitle("新增");
    setOption({});
  }
}
function lookDetail(setShowDetail, setOption, item,record) {
  setShowDetail(true);
  setOption((data) => {
    for (let i in record) {
      data[i] = record[i];
    }
    return JSON.parse(JSON.stringify(data));
  });
}
//打开编辑模态框
function openEditModal(
  props,
  setShowDetail,
  setShowModal,
  setTitle,
  setOption,
  item,
  record
) {
  const { editCB, showDetail } = props;
  if (editCB) {
    editCB(record, item, this);
  }
  setTitle("编辑");
  if (showDetail) {
    setShowDetail(true);
  } else {
    setShowModal(true);
  }
  setOption((data) => {
    for (let i in record) {
      data[i] = record[i];
    }
    return JSON.parse(JSON.stringify(data));
  });
}
//删除

function delRecord(props, setDataSource,setCount, item,record) {
  const { modalList, delData } = props;
  confirm({
    title: "Are you sure delete this task?",
    content: "Some descriptions",
    okText: "Yes",
    okType: "danger",
    cancelText: "No",
    onOk: () => {
      delAPI(item, modalList, { ...record, ...delData }, () => {
        message.success("删除成功");
        evaluateList(setDataSource, props,setCount);
      });
    },
    onCancel() {},
  });
}
function submit(
  title,
  option,
  showDetail,
  current,
  props,
  setCurrent,
  pageSize,
  setShowDetail,
  setShowModal,
  setDataSource,
  setCount
) {
  const { actions, modalList } = props;
  let action = {};
  if (title === "新增") {
    action = actions.filter((item) => item.status === "add")[0];
    addAPI(action, modalList, option, () => {
      setShowDetail(false);
      setShowModal(false);
      setCurrent(1);
      evaluateList(setDataSource, props,setCount);
      message.success("添加成功");
    });
  } else if (title === "插入") {
    action = actions.filter((item) => item.status === "insert")[0];
    editAPI(action, modalList, option, () => {
      setShowModal(false);
      if (showDetail) {
        setShowDetail(false);
        getList(setCount,setDataSource, props, {}, { pageCount:current, pageSize }, current);
      } else {
        getList(setCount,setDataSource, props, {}, { pageCount:current, pageSize }, current);
      }
      message.success("插入成功");
    });
  }else if (title === "编辑") {
    action = actions.filter((item) => item.status === "update")[0];
    editAPI(action, modalList, option, () => {
      setShowModal(false);
      if (showDetail) {
        setShowDetail(false);
        getList(setCount,setDataSource, props, {}, { pageCount:current, pageSize }, current);
      } else {
        getList(setCount,setDataSource, props, {}, { pageCount:current, pageSize }, current);
      }
      message.success("编辑成功");
    });
  }
}

function dealWithActions(modalList, actions) {
  let isSearch = false;
  for (let i of modalList) {
    if (i.isSearch) {
      isSearch = i.isSearch;
    }
  }
  if (isSearch) {
    return actions;
  } else {
    return actions.filter(
      (item) => item.status !== "query" && !item.showColumn
    );
  }
}
function goBack(setCount,setShowDetail, setDataSource, props) {
  setShowDetail(false);
  getList(setCount,setDataSource, props, {});
}
function coppyRecord(item,record){
  copy(record[item['linkField']]);
  message.success('复制成功');
}
function openPage(item,record){
  window.open(record[item['linkField']]);
}
function dealWithList(
  operateList,
  props,
  setShowDetail,
  setShowModal,
  setTitle,
  setOption,
  setDataSource,
  setCount
) {
  operateList.map((item) => {
    if (item.status === "update") {
      item.type = "primary";
      item.icon = <EditOutlined />;
      item.do = openEditModal.bind(
        this,
        props,
        setShowDetail,
        setShowModal,
        setTitle,
        setOption
      );
    } else if (item.status === "del") {
      item.type = "danger";
      item.icon = <DeleteOutlined />;
      item.do = delRecord.bind(this, props, setDataSource,setCount);
    } else if (item.status === "copy") {
      item.type = "";
      item.icon = <CopyOutlined />;
      item.do = coppyRecord.bind(this);
    } else if (item.status === "preview") {
      item.type = "dashed";
      item.icon = <InstagramOutlined />;
      item.do = openPage.bind(this);
    }    
    else if (item.status === "insert") {
      item.type = "primary";
      item.icon = <PlusOutlined/>;
      item.do = openAddModal.bind(
        this,
        props,
        setShowDetail,
        setShowModal,
        setTitle,
        setOption
      );
    } else {
      item.type = "primary";
      item.icon = "folder-open";
      item.do = lookDetail.bind(this, setShowDetail, setOption);
    }
  });
  return operateList;
}
async function getDataForOptions (item,setRefresh){
   let {url,method,data} = item.sourceApi;
   let res = await request({
    url,
    method,
    ...data
});
if (res.code !== '0') return;
let result = res.data;
result = result.map((item)=>{
    return {
            title:item.name,
            key:item.id,
            ...item
    }
});
result = generate(result,  0, { id: "id", parentId: "parentId", name: "name"});
item.options = result;
setRefresh(refresh=>!refresh)
}
function BaseTable(props, ref) {
  let pageCount = 1,
    pageSize = 10;
  let [title, setTitle] = useState("");
  let [dataSource, setDataSource] = useState([]);
  let [showDetail, setShowDetail] = useState(false);
  let [showModal, setShowModal] = useState(false);
  let [count, setCount] = useState(0);
  let [current, setCurrent] = useState(1);
  let [option, setOption] = useState({});
  let [refresh, setRefresh] = useState(0);
  let queryOption = useRef(null);
  let {
    modalList,
    actions,
    rowSelection,
    components,
    onRow,
    pagination,
    onExpand,
    expandedRowRender,
    onExpandedRowsChange,
    expandedRowKeys,
    defaultExpandedRowKeys,
    labelCol,
    wrapperCol    
  } = props;
  let columns = [];
  let columnsList = modalList.filter((item) => item.visible);
  let columnsUpdateList = modalList.filter(
    (item) => item.isUpdate && item.updateVisible
  );
  let actionsColumn = actions.filter((item) => item.showColumn);
  let actionsQuery = dealWithActions(modalList, actions);
  if (modalList.length > 0) {
    columns = dealWithColumns(
      columnsList,
      dealWithList(
        actionsColumn,
        props,
        setShowDetail,
        setShowModal,
        setTitle,
        setOption,
        setDataSource,
        setCount
      ),
      setRefresh
    );
  };
  useEffect(() => {
    evaluateList(setDataSource, props,setCount);
    let needRequest = modalList.some(item=>item.doApi);
    if(needRequest){
      let item = modalList.filter(item=>item.doApi)[0];
      getDataForOptions(item,setRefresh)
    }    
  }, []);
  useImperativeHandle(ref, () => ({
    dataSource,
    setDataSource,
  }));
  return (
    <div className="cm-bc-white">
      {showDetail ? (
        <div className="cm-p-02">
          <div
            onClick={() => goBack(setCount,setShowDetail, setDataSource, props)}
            className="cm-flex cm-ai-bl cm-cursor-p cm-border-bottom-ddd cm-ptb-01 cm-c-666"
          >            
            <span className="cm-mr-01 cm-img-01">&lt;</span>
            <span>返回</span>
          </div>
          <div className="cm-c-333 cm-fw-bold cm-fs-020 cm-mtb-01">{title}</div>
          <DetailView
            option={option}
            title={title}
            modalList={columnsUpdateList}
            submit={() =>
              submit(
                title,
                option,
                showDetail,
                current,
                props,
                setCurrent,
                pageSize,
                setShowDetail,
                setShowModal,
                setDataSource,
                setCount
              )
            }
          />
        </div>
      ) : (
        <div className="cm-p-02">
          <div className="cm-flex cm-mb-02 cm-jc-sb">
            <SearchByCondition
              actions={actionsQuery}
              modalList={modalList}
              option={option}
              ref={queryOption}
              setCurrent={setCurrent}
              getList={getList.bind(this, setCount,setDataSource, props)}
              openAddModal={openAddModal.bind(
                this,
                props,
                setShowDetail,
                setShowModal,
                setTitle,
                setOption
              )}
            />
          </div>
          {expandedRowKeys ? (
            <Table
              columns={columns}
              rowSelection={rowSelection}
              dataSource={dataSource}
              components={components}
              onExpand={onExpand}
              expandedRowRender={expandedRowRender}
              expandedRowKeys={expandedRowKeys || []}
              defaultExpandedRowKeys={defaultExpandedRowKeys || []}
              onExpandedRowsChange={onExpandedRowsChange}
              onRow={onRow}
              rowKey={(record) => record[modalList[0].field]}
              footer={() => (count ? summary(count) : null)}
              pagination={
                pagination === false
                  ? pagination
                  : {
                      current: current,
                      onChange: onChangePage.bind(
                        this,
                        queryOption,
                        props,
                        setCount,                       
                        setDataSource,                       
                        setCurrent,
                        pageSize                     
                      ),
                      total: count,
                    }
              }
            />
          ) : (
            <Table
              columns={columns}
              rowSelection={rowSelection}
              dataSource={dataSource}
              components={components}
              onExpand={onExpand}
              expandedRowRender={expandedRowRender}
              onExpandedRowsChange={onExpandedRowsChange}
              onRow={onRow}
              rowKey={(record) => record[modalList[0].field]}
              footer={() => (count ? summary(count) : null)}
              pagination={
                pagination === false
                  ? pagination
                  : {
                      current: current,
                      onChange: onChangePage.bind(
                        this,
                        queryOption,
                        props,
                        setCount,                       
                        setDataSource,                       
                        setCurrent,
                        pageSize      
                      ),
                      total: count,
                    }
              }
            />
          )}
        </div>
      )}
     <ModalBox
        title={title}
        visible={showModal}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
        onOk={() =>
          submit(
            title,
            option,
            showDetail,
            current,
            props,
            setCurrent,
            pageSize,
            setShowDetail,
            setShowModal,
            setDataSource
          )
        }
        option={option}
        onCancel={() => setShowModal(false)}
        setRefresh={setRefresh}
        modalList={columnsUpdateList}
      />        
    </div>
  );
}

export default React.forwardRef(BaseTable);
