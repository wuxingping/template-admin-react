import React from "react";
import { Breadcrumb, message } from "antd";
import { request } from "template/commonApi";
import {
  getUserName,
  removeToken,
  removeUserName,
  removeUserAuthority,
} from "utils";
import {
  MenuFoldOutlined,LogoutOutlined
} from '@ant-design/icons';
import user from "../../../assets/layout/user.png";
import {useHistory} from "react-router-dom";
async function handle_logout(history){
  let res = await request({
    url: "/admin/logout",
    method: "post",
  });
  if (res.code !== "0") {
    message.error("退出登陆失败,原因：" + res.msg);
    return;
  }
  removeToken();
  removeUserName();
  removeUserAuthority();
  history.push("/login");
};
function Header(props){
  const {
    toggleCollapsed,
    collapsed,
    selectedKeys,
    bread_crumb,
    onClickMenu,
    onOpenChange
  } = props;
  const history = useHistory();
  console.log(bread_crumb);
  let bread = bread_crumb[selectedKeys] && bread_crumb[selectedKeys].bread;
  let currentMenu = bread_crumb[selectedKeys] && bread_crumb[selectedKeys].currentMenu;
  return (
    <div>
      <div className={collapsed?"header header-switch":"header"}>
        <div className="cm-flex cm-flex-1 cm-ai-c cm-h-100">            
          <MenuFoldOutlined className="cm-mr-02 cm-cursor" onClick={toggleCollapsed}/>        
          <Breadcrumb>
            {bread &&
              bread.map((item, index) => (
                <Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>
              ))}
          </Breadcrumb>
        </div>
        <div className="header-user">
          <img src={user} className="cm-img-025"/>
          <span className="cm-ml-01">{getUserName()}</span>
          <ul className="header-logout">             
              <li onClick={()=>handle_logout(history)} className="header-logout-li">                
                <LogoutOutlined className="cm-mr-01"/>
                <span>退出登录</span>
              </li>
          </ul>
        </div>
      </div>
      <div style={{ height: "50px" }}></div>
    </div>
  );
}
export default Header;
