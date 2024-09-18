import classNames from "classnames";
import React from "react";
import "./index.less";
interface Iprops {
  tinyInfo: any;
}
const TinyArea: React.FC<Iprops> = (props) => {
  const { tinyInfo } = props;
  const yesterday = tinyInfo.momRate;
  const week = tinyInfo.qoqRate;

  return (
    <div className="tiny-container">
      <div className="score">{tinyInfo.current}</div>
      <div className="rank">
        <div className="yesterday">
          较昨日
          <span
            className={classNames({
              "data-up": yesterday > 0,
              "data-down": yesterday < 0,
            })}
          >
            {yesterday ?? "--"}
          </span>
        </div>
        <div className="week">
          较上周同期
          <span
            className={classNames({
              "data-up": week > 0,
              "data-down": week < 0,
            })}
          >
            {week ?? "--"}
          </span>
        </div>
      </div>
      <div className="tiny-area">12</div>
    </div>
  );
};

export default React.memo(TinyArea);
