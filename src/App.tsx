/* eslint-disable */
import React, { useEffect, useRef } from "react";
import { Button } from "antd";
import { CopyToClipboard } from "./components/CopyToClipboard";
import HoverTable from "./components/HoverTable";

import "./App.css";
import Guide from "./components/Guide";
import CollapseTable from "./components/CollapseTable";
import HoverBlcok from "./components/HoverBlcok";

function App() {
  const button1 = useRef(null);
  const button2 = useRef(null);
  const button3 = useRef(null);
  return (
    <div className="App">
      <CopyToClipboard buildCopyData={() => "123"}>
        <Button type="primary">复制--把内容放进剪贴板</Button>
      </CopyToClipboard>
      <hr />
      {/* <div className="wrap_hoverTable" ref={button3}>
        <HoverTable />
      </div>
      <hr />
      <Button ref={button1}>目标按钮</Button>
      <br />
      <Button ref={button2}>目标按钮2</Button> */}
      {/* <Guide
        steps={[
          {
            desc: "我是第一步",
            placement: "left",
            nodePath: button1,
          },
          {
            desc: "我是第2步",
            placement: "top",
            nodePath: button2,
          },
          {
            desc: "我是第3步",
            placement: "bottom",
            nodePath: button3,
          },
        ]}
        isClosed={false}
      /> */}
      {/* <CollapseTable /> */}
      <hr />
      <HoverBlcok />
    </div>
  );
}

export default App;
