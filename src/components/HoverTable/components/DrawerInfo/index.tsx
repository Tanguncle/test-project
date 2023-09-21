import { Drawer } from "antd";
import React, { memo } from "react";

import "./index.less";
import CardInfo from "../CardInfo";

interface Iprops {
  drawerShown: boolean;
  setDrawerOpen: (open: boolean) => void;
}

const DrawerInfo: React.FC<Iprops> = (props) => {
  const { drawerShown = false, setDrawerOpen } = props;

  const onClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        width={980}
        destroyOnClose
        onClose={onClose}
        open={drawerShown}
      >
        <CardInfo />
      </Drawer>
    </>
  );
};

export default memo(DrawerInfo);
