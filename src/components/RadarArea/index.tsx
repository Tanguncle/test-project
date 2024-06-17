import { Radar } from "@antv/g2plot";
import React from "react";

import "./index.less";
interface Iprops {
  [x: string]: any;
}
const data = [
  {
    item: "开发设计",
    user: "a",
    score: 70,
  },
  {
    item: "开发设计",
    user: "b",
    score: 30,
  },
  {
    item: "开发发展",
    user: "a",
    score: 60,
  },
  {
    item: "开发发展",
    user: "b",
    score: 70,
  },
  {
    item: "开发标记",
    user: "a",
    score: 50,
  },
  {
    item: "开发标记",
    user: "b",
    score: 60,
  },
  {
    item: "开发用户",
    user: "a",
    score: 40,
  },
  {
    item: "开发用户",
    user: "b",
    score: 50,
  },
  {
    item: "开发测试",
    user: "a",
    score: 60,
  },
  {
    item: "开发测试",
    user: "b",
    score: 70,
  },
  {
    item: "开发语言",
    user: "a",
    score: 70,
  },
  {
    item: "开发语言",
    user: "b",
    score: 50,
  },
];

const RadarArea: React.FC<Iprops> = (props) => {
  React.useEffect(() => {
    console.log("%c Line:114 🍔 props", "color:#b03734", props);
    const radarArea = document.getElementById("radar-container");
    if (!radarArea?.hasChildNodes()) {
      const radarPlot = new Radar("radar-container", {
        data,
        xField: "item",
        yField: "score",
        // width: 458,
        padding: "auto",
        seriesField: "user",
        meta: {
          score: {
            alias: "分数",
            min: 0,
            max: 80,
          },
        },
        xAxis: {
          line: null,
          tickLine: null,
          label: {
            style: {
              fill: "black",
              stroke: "black",
              opacity: 0.6,
              fontSize: 16,
            },
          },
          grid: {
            line: {
              style: {
                lineDash: null,
              },
            },
          },
        },
        yAxis: {
          line: null,
          tickLine: null,
          grid: {
            line: {
              type: "line",
              style: {
                lineDash: null,
              },
            },
          },
        },
        color: ({ user: item }) => {
          if (item === "a") {
            return "red";
          }
          return "yellow";
        },
        legend: {
          position: "top-right",
          itemWidth: 40,
          offsetX: -16,
          marker: {
            symbol: "hyphen",
          },
        },
        tooltip: {
          showCrosshairs: false, // 关闭辅助线
          // 其他 tooltip 配置...
        },
        // 开启面积
        area: {},
        // 开启辅助点
        point: {
          size: 3,
        },
      });
      radarPlot.render();
    }
  }, []);
  return (
    <div className="radar-wrap">
      <div className="header">我是头部</div>
      <div id="radar-container" />
    </div>
  );
};

export default React.memo(RadarArea);
