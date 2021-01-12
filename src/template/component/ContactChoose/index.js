import React,{useState,useEffect} from "react";
import { Button, message } from "antd";

import { getApi,CORP_ID } from "utils";

let dd = {};

// class ContactChoose extends React.Component {
//   state = {
//     value: [],
//   };
//   //初始化
//   componentDidMount() {
//     this.setState({
//       value: this.props.value,
//     });
//     dd = getApi();
//   }
//   componentWillReceiveProps(nextProps) {
//     this.setState({
//       value: nextProps.value,
//     });
//   }

//   //钉钉选人
//   choose = () => {
//     if (process.env.NODE_ENV === "development") {
//       message.error("该功能需在钉钉中使用");
//       return;
//     }
//     dd.biz.contact.choose({
//       multiple: this.props.multiple || false, //是否多选： true多选 false单选； 默认true
//       users: [], //默认选中的用户列表，员工userid；成功回调中应包含该信息
//       corpId, //企业id
//       max: 10, //人数限制，当multiple为true才生效，可选范围1-1500
//       onSuccess: (data) => {
//         if (this.props.multiple) {
//           let values = this.state.value || [];
//           let ids = [];
//           data.map((item) => {
//             values.push({ userName: item.name, userId: item.emplId });
//             ids.push(item.emplId);
//           });
//           this.setState({
//             value: values,
//           });
//           console.log(ids);
//           this.props.onChange(values, ids);
//         } else {
//           this.setState({
//             value: data[0].name,
//           });
//           this.props.onChange(data[0].name, data[0].emplId, this.props.my_key);
//         }
//       },
//       onFail: function (error) {},
//     });
//     dd.error(function (error) {
//       message.error("配置config失败: " + JSON.stringify(error));
//     });
//   };

//   //清空负责人
//   toEmpty = (index) => {
//     let value = "";
//     if (index === 0 || index) {
//       value = this.state.value.filter((item, index1) => index1 !== index);
//       let ids = value.map((item) => {
//         return item.userId;
//       });
//       this.props.onChange(value, ids);
//     } else {
//       this.props.onChange("", "");
//     }
//     this.setState({
//       value,
//     });
//   };
//   diffRender() {
//     let { value } = this.state;
//     let { multiple } = this.props;
//     if (multiple) {
//       if (Array.isArray(value)) {
//         if (value.length > 0) {
//           return (
//             <div>
//               <div
//                 style={{
//                   border: "1px solid #ddd",
//                   borderRadius: "0.05rem",
//                   padding: "0.05rem",
//                   lineHeight: "32px",
//                 }}
//               >
//                 {value.map((item, index) => {
//                   return (
//                     <span
//                       key={index}
//                       onClick={() => this.toEmpty(index)}
//                       style={{
//                         cursor: "pointer",
//                         background: "rgba(0,0,0,0.04)",
//                         borderRadius: "2px",
//                         marginRight: "0.05rem",
//                         padding: "0.05rem",
//                       }}
//                     >
//                       {item.userName} X
//                     </span>
//                   );
//                 })}
//               </div>
//               <Button
//                 style={{ width: 100, border: "1px dashed #ddd" }}
//                 onClick={() => this.choose()}
//               >
//                 + 添加
//               </Button>
//             </div>
//           );
//         } else {
//           return (
//             <Button
//               style={{ width: 100, border: "1px dashed #ddd" }}
//               onClick={() => this.choose()}
//             >
//               + 添加
//             </Button>
//           );
//         }
//       } else {
//         console.warn("选择多人时value值为{userId,userName}格式的数组");
//       }
//     } else {
//       if (Array.isArray(value) && value.length > 0) {
//         console.warn("选择多人时请设置属性multiple为true");
//         return (
//           <Button style={{ width: 100 }} onClick={() => this.choose()}>
//             请选择
//           </Button>
//         );
//       } else {
//         if (value && value.toString()) {
//           return (
//             <Button style={{ width: 100 }} onClick={() => this.toEmpty()}>
//               <span
//                 style={{
//                   background: "rgba(0,0,0,0.04)",
//                   borderRadius: "2px",
//                   width: "100%",
//                 }}
//               >
//                 {value} X
//               </span>
//             </Button>
//           );
//         } else {
//           return (
//             <Button style={{ width: 100 }} onClick={() => this.choose()}>
//               请选择
//             </Button>
//           );
//         }
//       }
//     }
//   }
//   render() {
//     return <div>{this.diffRender()}</div>;
//   }
// }

  //钉钉选人
 const choose = (props,value,setValue) => {
    if (process.env.NODE_ENV === "development") {
      message.error("该功能需在钉钉中使用");
      return;
    }
    dd.biz.contact.choose({
      multiple: props.multiple || false, //是否多选： true多选 false单选； 默认true
      users: [], //默认选中的用户列表，员工userid；成功回调中应包含该信息
      corpId:CORP_ID, //企业id
      max: 10, //人数限制，当multiple为true才生效，可选范围1-1500
      onSuccess: (data) => {
        if (props.multiple) {
          let values = value || [];
          let ids = [];
          data.map((item) => {
            values.push({ userName: item.name, userId: item.emplId });
            ids.push(item.emplId);
          });
          setValue(values);        
          console.log(ids);
          props.onChange(values, ids);
        } else {         
          setValue(data[0].name);   
          props.onChange(data[0].name, data[0].emplId, props.my_key);
        }
      },
      onFail: function (error) {},
    });
    dd.error(function (error) {
      message.error("配置config失败: " + JSON.stringify(error));
    });
  };

  //清空负责人
const  toEmpty = (props,value,setValue,index) => {
    let newValue = "";
    if (index === 0 || index) {
      newValue = value.filter((item, index1) => index1 !== index);
      let ids = value.map((item) => {
        return item.userId;
      });
      props.onChange(newValue, ids);
    } else {
      props.onChange("", "");
    }
    setValue(newValue);
  };
 const diffRender = (props,value,setValue)=> {   
    let { multiple } = props;
    if (multiple) {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          return (
            <div>
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "0.05rem",
                  padding: "0.05rem",
                  lineHeight: "32px",
                }}
              >
                {value.map((item, index) => {
                  return (
                    <span
                      key={index}
                      onClick={() => toEmpty(props,value,setValue,index)}
                      style={{
                        cursor: "pointer",
                        background: "rgba(0,0,0,0.04)",
                        borderRadius: "2px",
                        marginRight: "0.05rem",
                        padding: "0.05rem",
                      }}
                    >
                      {item.userName} X
                    </span>
                  );
                })}
              </div>
              <Button
                style={{ width: 100, border: "1px dashed #ddd" }}
                onClick={() => choose(props,value,setValue)}
              >
                + 添加
              </Button>
            </div>
          );
        } else {
          return (
            <Button
              style={{ width: 100, border: "1px dashed #ddd" }}
              onClick={() => choose(props,value,setValue)}
            >
              + 添加
            </Button>
          );
        }
      } else {
        console.warn("选择多人时value值为{userId,userName}格式的数组");
      }
    } else {
      if (Array.isArray(value) && value.length > 0) {
        console.warn("选择多人时请设置属性multiple为true");
        return (
          <Button style={{ width: 100 }} onClick={() => choose(props,value,setValue)}>
            请选择
          </Button>
        );
      } else {
        if (value && value.toString()) {
          return (
            <Button style={{ width: 100 }} onClick={() => toEmpty(props,value,setValue)}>
              <span
                style={{
                  background: "rgba(0,0,0,0.04)",
                  borderRadius: "2px",
                  width: "100%",
                }}
              >
                {value} X
              </span>
            </Button>
          );
        } else {
          return (
            <Button style={{ width: 100 }} onClick={() => choose(props,value,setValue)}>
              请选择
            </Button>
          );
        }
      }
    }
  }
function ContactChoose(props){
  const [value,setValue] = useState(props.value||[]);
  useEffect(()=>{
    dd = getApi();
  },[])
  return <div>{diffRender(props,value,setValue)}</div>;
}
export { ContactChoose };
