import React from "react";
import { Modal, message, Button } from "antd";
import { addAPI, getListAPI,editAPI} from "../commonApi";
import DragTable from "../DragTable/index";
import BaseTable from "../BaseTable";
import { useState, useRef } from "react";
import {PlusOutlined} from '@ant-design/icons';
function onExpand(newChildActions,props,setActions,setCurrentId, expanded, record) {
  let {parentIdField,modalList } = props;
  let field = modalList[0].field;
  newChildActions.map((item)=>{
      let data = item.data;
      data[parentIdField] = record[field];
  })  
  if (expanded) {  
    setActions(newChildActions);
    setCurrentId(record[field]);
  }
}
function getDataSource(newChildActions,childModalList, cb) { 
  let queryAction = newChildActions.filter((item) => item.status === "query")[0];
  getListAPI(queryAction, childModalList, {}, "", (state) => {
    if (cb) {
      cb(state.dataSource);
    }
  });
}
function insertColumn(
  newChildActions,childModalList,
  setShowSelectionColumn,
  setSelectedRowKeys,
  setDisabledKeys
) {
  setShowSelectionColumn(true);
  getDataSource(newChildActions,childModalList, (expandData) => {
    if (expandData && expandData.length > 0) {
      let selectedRowKeys = [];
      expandData.map((item) => {
        selectedRowKeys.push(item.columnId);
      });
      setDisabledKeys(selectedRowKeys);
      setSelectedRowKeys(selectedRowKeys);
    } else {
      setDisabledKeys([]);
      setSelectedRowKeys([]);
    }
  });
}

function onSelectChange(setSelectedRowKeys, selectedRowKeys) {
  setSelectedRowKeys(selectedRowKeys);
}

async function addColumns(
  newChildActions,childModalList,
  selectedRowKeys,
  setShowSelectionColumn, 
  dragTable
) {
  let childAction = newChildActions.filter(
    (item) => item.status === "insert"
  )[0];
  addAPI(
    childAction,
    childModalList,
    { columnIdList: selectedRowKeys },
    () => {
      getDataSource(newChildActions,childModalList, (dataSource)=>{
        let setDataSource = dragTable.current.setDataSource;
        setDataSource(dataSource);
        setShowSelectionColumn(false);
        message.success("添加成功");
      });
    }
  );
}
function checkBox(disabledKeys, record) {
  return {
    disabled: disabledKeys.includes(record.id),
  };
}

function onExpandedRowsChange(setExpandedRowKeys, expandedRows) {
  if (expandedRows.length > 1) {
    let id = expandedRows.pop();
    setExpandedRowKeys([id]);
  } else {
    setExpandedRowKeys(expandedRows);
  }
}
function sortSuccess( newChildActions,childModalList,columnIdList){
  let action = newChildActions.filter((item) => item.status === "sort")[0]; 
  let option = {columnIdList};
  editAPI(action, childModalList, option);
}
function TreeTable(props) {
  let {
    modalList,
    actions,
    insertActions,
    childActions,
    childModalList,
    isInsert,
    isSort,
    insertTitle,
    insertModalList
  } = props;
  const [showSelectionColumn, setShowSelectionColumn] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [disabledKeys, setDisabledKeys] = useState([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState([]);
  const [currentId,setCurrentId] = useState("");
  const [newChildActions,setActions] = useState(childActions);
  const dragTable = useRef();
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange.bind(this, setSelectedRowKeys),
    getCheckboxProps: checkBox.bind(this, disabledKeys),
  };
  const expandedRowRender = (row) => {
    let { modalList } = props;
    let field = modalList[0].field;
    if(row[field] === currentId){
      return (
        <div>
          {isSort? (
            <DragTable
              actions={newChildActions}
              modalList={childModalList}                       
              ref={dragTable}
              sortSuccess={sortSuccess.bind(this, newChildActions,childModalList)}
            />
          ) : (
            <BaseTable
              actions={newChildActions}
              pagination={false}
              modalList={childModalList}                     
              ref={dragTable}
            />
          )}
          {isInsert ? (
            <div className="cm-cursor-p" style={{ color: "#1790FF" }}>
              <Button
                icon={<PlusOutlined/>}
                block          
                primary                     
                type="dashed"
                size="large"
                onClick={() =>
                  insertColumn(
                    newChildActions,
                    childModalList,
                    setShowSelectionColumn,
                    setSelectedRowKeys,              
                    setDisabledKeys
                  )
                }
              >
                插入
              </Button>
            </div>
          ) : null}
        </div>
      );
    }
  };
  return (
    <div>
      <BaseTable
        actions={actions}
        modalList={modalList}
        onExpand={onExpand.bind(this, newChildActions,props,setActions,setCurrentId)}
        expandedRowRender={expandedRowRender}
        onExpandedRowsChange={onExpandedRowsChange.bind(
          this,
          setExpandedRowKeys
        )}
        expandedRowKeys={expandedRowKeys}
      />
      <Modal
        bodyStyle={{ padding: 0 }}
        style={{ minWidth: "800px" }}
        title={insertTitle}
        visible={showSelectionColumn}
        onOk={() =>
          addColumns(
            newChildActions,childModalList,
            selectedRowKeys,
            setShowSelectionColumn,           
            dragTable
          )
        }
        onCancel={() => setShowSelectionColumn(false)}
      >
        <BaseTable
          actions={insertActions}
          rowSelection={rowSelection}
          modalList={insertModalList}
          expandedRowKeys={expandedRowKeys}
        />
      </Modal>
    </div>
  );
}
export default React.forwardRef(TreeTable);
