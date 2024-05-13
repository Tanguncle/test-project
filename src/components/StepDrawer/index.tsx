import { Button, Drawer, Space } from "antd";
import React from "react";
import DataProvider from "./context";
import { MyComponentRef, StepList } from "./StepList";

import "./index.less";
interface Iprops {
  [x: string]: any;
}
const StepDrawer: React.FC<Iprops> = (props) => {
  console.log(props);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [stepInfo, setStepInfo] = React.useState({});
  const stepRef = React.useRef<MyComponentRef>(null);
  console.log("%c Line:15 🍏 stepRef", "color:#ed9ec7", stepRef);
  return (
    <DataProvider>
      <div>
        <Button onClick={() => setDrawerOpen(true)}>打开抽屉</Button>
        <Button onClick={() => setDrawerOpen(true)}>打开抽屉2</Button>
        <Drawer
          title="Basic Drawer"
          width="65%"
          placement="right"
          destroyOnClose
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          footer={
            <>
              <Space style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button size="large" onClick={() => setDrawerOpen(false)}>
                  取消
                </Button>
                <Button size="large" onClick={() => stepRef.current.goback()}>
                  上一步
                </Button>
                <Button size="large" onClick={() => stepRef.current.goahead()}>
                  下一步
                </Button>
                <Button size="large" type="primary">
                  提交
                </Button>
              </Space>
            </>
          }
        >
          <StepList
            setStepInfo={(params) => setStepInfo(params)}
            aa="123"
            ref={stepRef}
          />
        </Drawer>
      </div>
    </DataProvider>
  );
};

export default React.memo(StepDrawer);
