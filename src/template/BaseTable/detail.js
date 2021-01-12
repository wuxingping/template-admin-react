/**
 * Created by Lenovo on 2020/6/20.
 */
import React,{useState} from 'react';
import { RenderModal } from '../component';
import {
    Form,
    Button
} from 'antd' 
function DetailView(props){
    let modalList = props.modalList;
    let {option, title} = props;     
    const [refresh,setRefresh] = useState(false);
    return (
        <div>
            <Form  labelAlign="right"
                   labelCol={{ span: 6 }}
                   wrapperCol={{ span: 14 }}
            >
                <div className="cm-flex cm-jc-sa">
                    <div className="cm-flex-column">
                        {modalList.map((item, index) => {
                            if (item.renderType !== "Editor") {
                                if(item.updateRenderType){
                                    item.renderType = item.updateRenderType
                                }
                                return <Form.Item label={item.label} 
                                required={item.require}                                  
                            
                                key={index} style={{display: "flex"}}>
                                    {RenderModal(item, option,setRefresh)}
                                </Form.Item>
                            }
                        })}
                        {title !== '查看' ?
                            <Button
                                style={{alignSelf:"center"}}
                                onClick={props.submit}
                                type="primary"
                            >
                                提交
                            </Button> : null
                        }
                    </div>
                    <div>
                        {modalList.map((item, index) => {
                            if (item.renderType === "Editor") {
                                return <div>{RenderModal(item, option,setRefresh)}</div>
                            }
                        })}
                    </div>
                </div>
            </Form>
        </div>
    )
}
export default DetailView;