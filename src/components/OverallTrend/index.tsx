import React from "react";
import SingleTrendBlock from "./components/SingleTrendBlock";

import "./index.less";
import { mockData } from "./mock";

interface Iprops {
  [x: string]: any;
}

const OverallTrend: React.FC<Iprops> = (props) => {
  console.log(props);
  return (
    <div className="overall-trend-container">
      <div>
        整体趋势 <span>Tips</span>
      </div>
      <div>
        趋势解读<span>整体趋势....</span>
      </div>
      <div className="overall-trend-items">
        {mockData?.map((item) => (
          <div className="overall-trend-item">
            <SingleTrendBlock singleInfo={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverallTrend;
