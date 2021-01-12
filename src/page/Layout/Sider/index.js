import React from "react";
import { Menu } from "antd";
import * as icon from "@ant-design/icons";
import logoWhite from "assets/layout/logo-white.png";
import logoText from "assets/layout/logo-text.png";
const { SubMenu } = Menu;
const MyIcon = ({ type }) => {
  return icon[type] ? icon[type].render() : null;
};
//递归菜单
function RecursiveMenu(routers, onClickMenu) {
  return routers.map((item) => {
    return item.children ? (
      <SubMenu
        key={item.path}
        title={
          <span className="cm-cursor-p">
            {item.icon ? <MyIcon type={item.icon} /> : null}
            <span>{item.name}</span>
          </span>
        }
      >
        {RecursiveMenu(item.children, onClickMenu)}
      </SubMenu>
    ) : (
      <Menu.Item  onClick={() => onClickMenu(item)} key={item.path}>
        <span className="cm-cursor-p">
        {item.icon ? <MyIcon type={item.icon} /> : null}
          {item.name}
          </span>
      </Menu.Item>
    );
  });
}
function Sider(props) {
  const {
    collapsed,
    openKeys,
    onOpenChange,
    onClickMenu,
    selectedKeys,
    routers,
  } = props;
  return (
    <div className={collapsed ? "sider-switch sider-sider" : "sider-sider"}>
      <div className="sider-logo-layout">        
        <img src={logoWhite} className="sider-logo-white"/> 
        <img src={logoText}  className={collapsed ? "sider-logo-text-none" : "sider-logo-text"} />
      </div>
      <Menu
        selectedKeys={[selectedKeys]}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
      >
        {RecursiveMenu(routers, onClickMenu)}
      </Menu>
    </div>
  );
}

export default Sider;
