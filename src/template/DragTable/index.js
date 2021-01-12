import React from "react";
import { DndProvider, useDrag, useDrop,createDndContext } from "react-dnd";
import BaseTable from "../BaseTable/index";
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from "immutability-helper";
import { editAPI } from "../commonApi";
import { useRef, useImperativeHandle } from "react";
const type = "DragableBodyRow";
const RNDContext = createDndContext(HTML5Backend);
const DragableBodyRow = ({
  index,
  moveRow,
  className,
  style,
  ...restProps
}) => {
  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: type,
    collect: (monitor) => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
      };
    },
    drop: (item) => {
      moveRow(item.index, index);
    },
  });
  const [, drag] = useDrag({
    item: { type, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drop(drag(ref));
  return (
    <tr
      ref={ref}
      className={`${className}${isOver ? dropClassName : ""}`}
      style={{ cursor: "move", ...style }}
      {...restProps}
    />
  );
};
const components = {
  body: {
    row: DragableBodyRow,
  },
};
const moveRow = (baseTableRef, props, dragIndex, hoverIndex) => {
  let that = baseTableRef.current;
  const { dataSource, setDataSource } = that;
  const dragRow = dataSource[dragIndex];
  let { modalList } = props;
  setDataSource((dataSource) => {
    let newData = update(dataSource, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, dragRow],
      ],
    });
    let columnIdList = [];
    newData.map((item) => {
      columnIdList.push(item[modalList[0].field]);
    });
    const { sortSuccess } = props;
    if (sortSuccess) {
      //自定义调排序接口
      sortSuccess(columnIdList);
    } else {
      //默认调排序接口
      let { actions, modalList } = props;
      let action = actions.filter((item) => item.status === "sort")[0];
      let data = action.data;
      for (let i in data) {
        data[i] = columnIdList;
      }
      editAPI(action, modalList, data);
    }
    return newData;
  });
};
function DragTable(props, ref) {
  let baseTableRef = useRef();
  const { actions, modalList} = props;
  const manager = useRef(RNDContext);
  useImperativeHandle(ref, () => ({
    dataSource: baseTableRef.current.dataSource,
    setDataSource: baseTableRef.current.setDataSource,
  }));
  return (
    <DndProvider manager={manager.current.dragDropManager}>
      <BaseTable
        pagination={false}
        actions={actions}
        modalList={modalList}
        ref={baseTableRef}
        components={components}
        onRow={(record, index) => ({
          index,
          moveRow: moveRow.bind(this, baseTableRef, props),
        })}
      />
    </DndProvider>
  );
}
export default React.forwardRef(DragTable);
