import React from "react";

import { useSetState } from "ahooks";
import { Divider } from "antd";
import classNames from "classnames";
import { OperateMapping } from "./constant";
import "./index.less";
import OverListView from "./OverListView";
import TinyArea from "./TinyArea";
import { OperateType } from "./type";

interface Iprops {
  singleInfo: any;
}

const SingleTrendBlock: React.FC<Iprops> = (props) => {
  const { singleInfo } = props;
  const [state, setState] = useSetState({
    currentKey: Object.keys(OperateMapping)[0],
  });
  return (
    <div className="single-trend-container">
      <div className="header">
        <div className="title">{singleInfo.title}</div>
        <div className="operate-container">
          {Object.keys(OperateMapping).map((item, index) => {
            return (
              <>
                <span
                  className={classNames("operate-item", {
                    "current-active": item === state.currentKey,
                  })}
                  onClick={() => setState({ currentKey: item })}
                >
                  {OperateMapping[item]}
                </span>
                {index + 1 !== Object.keys(OperateMapping).length && (
                  <Divider type="vertical" />
                )}
              </>
            );
          })}
        </div>
      </div>
      <div className="content">
        {state.currentKey === OperateType.OVERVIEW && (
          <TinyArea tinyInfo={singleInfo} />
        )}
        {state.currentKey === OperateType.DISTRIBUTION && <OverListView />}
      </div>
    </div>
  );
};

export default SingleTrendBlock;
