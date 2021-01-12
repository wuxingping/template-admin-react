import React, { useState, useEffect } from "react";
import Sider from "./Sider";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import { request } from "../../template/commonApi/request";
import { generate } from "../../utils/tools";
import { getUserAuthority } from "utils";
import TestContext from "./context";
import "css/layout.css";
import { useHistory } from "react-router-dom";
import routersTree from '../../routers';
//递归面包屑导航
let routers_bread = {};
//递归路由过滤
const filterRouterAuthority = (userAuthority, routers, path) => {
  let newRouter = [];
  routers.forEach((item) => {
    if (userAuthority.includes(item.code)) {
      item.component = item.path.replace("/", "");
      //零时储存，不更改原始路由
      let temp = { ...item };
      if (path) {
        temp.path = path + temp.path;
      }
      if (temp.children) {
        temp.children = filterRouterAuthority(
          userAuthority,
          temp.children,
          temp.path
        );
      }
      newRouter.push(temp);
    }
  });
  return newRouter;
};

function generateBreadCrumb(routers) {
  routers.forEach((item) => {
    let arr = [...arguments];
    arr = arr[1];
    arr = arr ? [...arr, item] : [item];
      routers_bread[item.path] = {
        bread: [
          ...arr.map((item_arguments) => {return {path:item_arguments.path,name:item_arguments.name}})        
        ],
        path: [
          ...arr
            .slice(0, arr.length - 1)
            .map((item_arguments) => item_arguments.path),
        ],
        currentMenu: item,
      };
      if (item.children) {
        generateBreadCrumb(item.children, arr);
      }
  });
  return routers_bread;
}

async function getMenus(
  setRouters,
  setBreadCrumb,
  setOpenKeys,
  setCurrentMenu,
  history
) {
  let res = await request({
    url: "/admin/authMenu/allList",
    method: "post",
  });
  if (res.code !== "0") return;
  let keys = { id: "id", parentId: "parentId", name: "name" };
  let data = res.data;
  let userAuthority = getUserAuthority();
  //所有人添加首页权限
  if (!userAuthority.includes("shouye")) {
    userAuthority.unshift("shouye");
  } else {
    userAuthority = userAuthority.filter((item) => item !== "shouye");
    userAuthority.unshift("shouye");
  }
  let parentIds = [];
  data.map((item) => {
    if (userAuthority.includes(item.code) && item.parentId !== 0) {
      parentIds.push(item.parentId);
    }
  });
  //子菜单的父菜单(一级菜单)添加上去
  data.map((item) => {
    if (parentIds.includes(item.id)) {
      userAuthority.push(item.code);
    }
  });
  let generateRouters = generate(data, 0, keys);
  let routers = filterRouterAuthority(
    userAuthority,
    generateRouters
  );
  let breadCrumb = generateBreadCrumb(routers);
  setData(routers,breadCrumb,history,setRouters,setBreadCrumb,setOpenKeys,setCurrentMenu);
}
const setData = (routers,breadCrumb,history,setRouters,setBreadCrumb,setOpenKeys,setCurrentMenu)=>{
  if (breadCrumb && Object.keys(breadCrumb).length > 0) {
    setRouters(routers);
    setBreadCrumb(breadCrumb);   
    setOpenKeys(breadCrumb[history.location.pathname].path);
    setCurrentMenu(breadCrumb[history.location.pathname].currentMenu);
  }
}

const toggleCollapsed = (
  collapsed,
  setCollapsed,
  openKeys,
  setOpenKeys,
  tempOpenKeys,
  setTempOpenKeys
) => {
  if (!collapsed) {
    setTempOpenKeys(openKeys);
    onOpenChange(setOpenKeys,[]);
  } else {
    setOpenKeys(tempOpenKeys);
  }
  setCollapsed(!collapsed);
};

function onOpenChange(setOpenKeys, openKeys){
  setOpenKeys(openKeys);
};

const onClickMenu = (
  selectedKeys,
  setCurrentMenu,
  setSelectedKeys,
  history,
  item
) => {
  let path = item.path;
  setCurrentMenu(item);
  if (selectedKeys !== path) {
    history.push(path);
    setSelectedKeys(path);
  }
};
function Layout(props) {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState(history.location.pathname);
  const [routers, setRouters] = useState([]);
  const [breadCrumb, setBreadCrumb] = useState([]);
  const [currentMenu, setCurrentMenu] = useState({});
  const [tempOpenKeys, setTempOpenKeys] = useState([]);
  useEffect(() => {
    //getMenus(setRouters, setBreadCrumb, setOpenKeys, setCurrentMenu, history);
    let userAuthority = getUserAuthority();
    let breadCrumb = generateBreadCrumb(routersTree);
    let newRouters = filterRouterAuthority(
      userAuthority,
      routersTree
    );
    setData(newRouters,breadCrumb,history,setRouters,setBreadCrumb,setOpenKeys,setCurrentMenu);
  },[]);
  return (
    <TestContext.Provider value={currentMenu}>
      <div className="layout">
        <Sider
          collapsed={collapsed}
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onOpenChange={onOpenChange.bind(this, setOpenKeys)}
          onClickMenu={onClickMenu.bind(
            this,
            selectedKeys,
            setCurrentMenu,
            setSelectedKeys,
            history
          )}
          routers={routers}
        />
        <div
          className={collapsed ? "layout-right layout-switch" : "layout-right"}
        >
          <Header
            toggleCollapsed={toggleCollapsed.bind(
              this,
              collapsed,
              setCollapsed,
              openKeys,
              setOpenKeys,
              tempOpenKeys,
              setTempOpenKeys
            )}
            onOpenChange={onOpenChange.bind(this, setOpenKeys)}
            collapsed={collapsed}
            selectedKeys={selectedKeys}
            bread_crumb={breadCrumb}
          />
          <Content routers={routers} />
          <Footer/>
        </div>
      </div>
    </TestContext.Provider>
  );
}
export default Layout;
