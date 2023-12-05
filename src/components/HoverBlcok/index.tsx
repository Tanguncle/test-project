/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Iprops } from "./types";

import "./index.less";

const HoverBlcok: React.FC<Iprops> = (props) => {
  return (
    <>
      <div className="grid-container">
        <div className="grid-item">
          <div className="item">1</div>
        </div>
        <div className="grid-item">
          <div className="item">1</div>
        </div>
      </div>
    </>
  );
};

export default HoverBlcok;
