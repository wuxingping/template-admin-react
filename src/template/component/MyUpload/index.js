import React, { useState } from "react";
import { Modal, Upload } from "antd";

import { getToken, BASE_URL } from "utils";
import {PlusOutlined} from '@ant-design/icons';
//图片
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
const  handlePreview = async (setPreviewVisible,setPreviewImage,file) => {
  if (!file.url && !file.preview) {
    file.preview = await getBase64(file.originFileObj);
  }
  setPreviewVisible(true);
  setPreviewImage(file.url || file.preview)
}
const  closeModal =(setPreviewVisible)=> {
  setPreviewVisible(false);
}
function MyUpload(props){
  const [previewImage,setPreviewImage] = useState("");
  const [previewVisible,setPreviewVisible] = useState(false);
  let {
    fileList,
    style,
    disabled,
    url,
    directory,
    multiple,
    listType,
    maxCount = 1,
    onChange
  } = props;
  const uploadButton = (
    <div>
      <PlusOutlined/>
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  return (
    <div className="clearfix" style={style}>
      <Upload
        headers={{ Token: getToken() }}
        action={url ? BASE_URL + url : `${BASE_URL}/admin/file/upload`}
        accept="image/png"        
        fileList={fileList||[]}
        directory={directory}
        multiple={multiple}
        listType={listType || "picture-card"}
        onPreview={handlePreview.bind(this,setPreviewVisible,setPreviewImage)}
        disabled={disabled}
        onChange={onChange}
        maxCount={maxCount}
      >
        {fileList && fileList.length >= maxCount ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={closeModal.bind(this,setPreviewVisible)}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </div>
  );
}
export { MyUpload };
