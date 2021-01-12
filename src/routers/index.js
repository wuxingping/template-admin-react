//配置路由
//name名字
//icon小图标
//path路径
//code权限
//children多级嵌套
//lazy按需加载页面

let routersTree = [
  {
    name: "首页",
    icon: "HomeOutlined",
    path: "/home",
    code: "shouye",
  },
  {
    name: "应用管理",
    icon: "AppstoreOutlined",
    path: "/application",  
    code: "yingyongguanli",
    children: [
      {
        name: "微周刊管理",
        path: "/weeklyNews",
        code: "weizhoukanguanli",
        children: [        
          {
            name: "轮播管理",
            path: "/banner",           
            code: "lunboguanli",
          },
          {
            name: "期刊管理",
            path: "/periodical",
            code: "qikanguanli",            
          },
        ],
      },
    ],
  },
];

export default  routersTree;
