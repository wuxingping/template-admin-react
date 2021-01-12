/**
 * Created by Lenovo on 2020/6/20.
 */
import React from 'react';
import { RenderModal } from '../component';
import {
    Modal,
    Form
} from 'antd' 
function ModalBox(props){
    let {modalList,visible, title,option,onOk,onCancel,setRefresh,labelCol,wrapperCol} = props;     
    return (
        <Modal
          title={title}
          visible={visible}
          onOk={onOk}
          onCancel={onCancel}
        >
          <Form
            labelAlign="right"
            labelCol={{ span: labelCol||8 }}
            wrapperCol={{ span: wrapperCol||16 }}
          >
            {modalList.map((item, index) => {             
              return (
                <Form.Item
                  required={item.require}
                  label={item.label}
                  key={index}
                  help={item.help}
                >
                  {RenderModal(item, option,setRefresh)}
                </Form.Item>
              );
            })}
          </Form>
        </Modal>
    )
}
export default ModalBox;