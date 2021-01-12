import React, { useState } from "react";
import { Button } from "antd";
import { setToken, getApiTicket, dingLogin, setUserAuthority } from "utils";
import logo from "assets/layout/logo.png";
import "css/layout.css";
import Footer from "page/Layout/Footer";
import { useHistory } from "react-router-dom";
const enterLoading = (setLoading,history) => {
  const TEST_TOKEN = process.env.REACT_APP_TEST_TOKEN;
  const TEST_USER_AUTHORITY = process.env.REACT_APP_TEST_USER_AUTHORITY;
  setLoading(true);
  if (TEST_TOKEN) {
    setUserAuthority(JSON.parse(TEST_USER_AUTHORITY));
    setToken(TEST_TOKEN);
    history.push("/home");
  } else {
    //调钉钉登陆接口
    dingLogin(() => {
      history.push("/home");
    });
    getApiTicket();
  }
};
function Login(){
  const [loading,setLoading] = useState(false);
  const history = useHistory();
  return (
    <div>
      <div className="login-bg">
        <div className="cm-flex-inline-block">
          <div className="cm-flex cm-ai-c cm-pt-10">
            <img src={logo} alt="" className="cm-img-04" />
            <span className="cm-c-333 cm-fw-bold cm-fs-030 cm-ml-01">
              CMS 内容管理系统
            </span>
          </div>
          <div className="cm-fs-014 cm-c-999 cm-tx-c cm-mt-02">
            直接点击登录按钮，使用钉钉用户自动登录
          </div>
          <div className="cm-pt-10">
            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={enterLoading.bind(this,setLoading,history)}
            >
              登录
            </Button>
          </div>
        </div>          
      </div>
      <Footer from="login"/>
    </div>
  );
}
export default Login