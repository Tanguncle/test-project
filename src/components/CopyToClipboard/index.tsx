/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { CopyOutlined } from "@ant-design/icons";
import { Button, message } from "antd";

export const CopyToClipboard: React.FC<
  React.PropsWithChildren<{
    buildCopyData: () => string | Promise<String>;
    disabled?: boolean;
    isshowIcon?: boolean;
    title?: string | React.ReactNode;
  }>
> = (props) => {
  const { isshowIcon = true, title = "复制" } = props;
  const isThisComp = useRef(false);

  const pasteDataToClipboard = (
    event: any,
    clipboardData: any,
    data: string
  ) => {
    clipboardData.setData("text/plain", data);
    message.destroy();
    event.preventDefault();
    message.success("复制成功");
    isThisComp.current = false;
  };
  useEffect(() => {
    const onCopy = async (event: any) => {
      if (!isThisComp.current) return;

      if (event.clipboardData || event.originalEvent) {
        message.loading("处理数据中...");
        const clipboardData =
          event.clipboardData || event.originalEvent.clipboardData;
        const copyData = props.buildCopyData();
        if (typeof copyData === "object") {
          const res = await copyData;
          pasteDataToClipboard(event, clipboardData, res as string);
          // copyData.then(res => {
          //   pasteDataToClipboard(event, clipboardData, res as string);
          // });
        }
        if (typeof copyData === "string") {
          pasteDataToClipboard(event, clipboardData, copyData as string);
        }
      }
    };

    document.addEventListener("copy", onCopy);

    return () => {
      document.removeEventListener("copy", onCopy);
    };
  }, [props.buildCopyData]);
  return props.children ? (
    <div
      onClick={() => {
        isThisComp.current = true;
        document.execCommand("copy", false, "123");
      }}
    >
      {props.children}
    </div>
  ) : (
    <Button
      type="link"
      disabled={props.disabled}
      icon={isshowIcon ? <CopyOutlined /> : null}
      onClick={() => {
        isThisComp.current = true;
        document.execCommand("copy", false, "123");
      }}
    >
      {title}
    </Button>
  );
};
