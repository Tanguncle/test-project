import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload, message } from "antd";
import React from "react";

interface CustomUploadProps {
  id?: string;
  onChange?: (value: string) => void;
  value?: string;
  onDownload?: () => void;
}

const CustomUpload: React.FC<CustomUploadProps> = ({
  onChange,
  onDownload,
  value,
}) => {
  const uploadProps: UploadProps = {
    accept: ".xlsx,.xls",
    maxCount: 1,
    showUploadList: true,
    beforeUpload: (file) => {
      const isExcel = /\.(xlsx|xls)$/.test(file.name.toLowerCase());
      if (!isExcel) {
        message.error("只能上传 Excel 文件！");
        return Upload.LIST_IGNORE;
      }
      setTimeout(() => {
        onChange?.("mock-file-response");
      }, 1000);
      return false;
    },
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
      }}
    >
      <Upload
        {...uploadProps}
        fileList={
          value ? [{ uid: "1", name: "已上传文件.xlsx", status: "done" }] : []
        }
      >
        <Button icon={<UploadOutlined />} style={{ height: "100%" }}>
          上传SKU
        </Button>
      </Upload>
      <Button onClick={onDownload} type="link" style={{ height: "100%" }}>
        下载模板
      </Button>
    </div>
  );
};

export default React.memo(CustomUpload);
