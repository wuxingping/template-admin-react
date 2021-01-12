//token权限配置
const NAME = "USER_NAME";
const AUTHORITY = "USER_AUTHORITY";
const TOKEN = "TAG_DING_TOKEN";
//token权限配置
const TAG_DING_USER = "TAG_DING_USER";
const TAG_DING_JS = "TAG_DING_JS";
// 获取 USER_NAME
const getUserName = () => sessionStorage.getItem(NAME);

// 设置 USER_NAME
const setUserName = (value) => sessionStorage.setItem(NAME, value);

// 删除 USER_NAME
const removeUserName = () => sessionStorage.removeItem(NAME);

// 获取 USER_AUTHORITY
const getUserAuthority = () => JSON.parse(sessionStorage.getItem(AUTHORITY));

// 设置 USER_NAME

const setUserAuthority = (value) => sessionStorage.setItem(AUTHORITY, JSON.stringify(value));

// 删除 USER_NAME
const removeUserAuthority = () => sessionStorage.removeItem(AUTHORITY);

// 获取 token
const getToken = () => sessionStorage.getItem(TOKEN);

// 设置 token
const setToken = (value) => sessionStorage.setItem(TOKEN, value);

// 删除 token
const removeToken = () => sessionStorage.removeItem(TOKEN);

// 是否登录（有权限）
const isAuth = () => !!getToken();


// 获取 token
const getDingUser = () => JSON.parse(sessionStorage.getItem(TAG_DING_USER));

// 设置 DingUser
const setDingUser = (value) => sessionStorage.setItem(TAG_DING_USER, JSON.stringify(value));

// 删除 DingUser
const removeDingUser = () => sessionStorage.removeItem(TAG_DING_USER);


//获取前端api授权
const getDingJs = () => JSON.parse(sessionStorage.getItem(TAG_DING_JS));
const setDingJs = (value) => sessionStorage.setItem(TAG_DING_JS, JSON.stringify(value));
const removeDingJs = () => sessionStorage.removeItem(TAG_DING_JS);
export {
  getUserName,
  setUserName,
  removeUserName,
  getUserAuthority,
  setUserAuthority,
  removeUserAuthority,
  getToken,
  setToken,
  removeToken,
  isAuth,
  getDingUser,
  setDingUser,
  removeDingUser,
  setDingJs,
  getDingJs,
  removeDingJs
};
