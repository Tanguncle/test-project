import { Gauge } from "@ant-design/plots";
import React from "react";
import "./index.less";
export const DashBoard: React.FC<any> = (props) => {
  console.log(props);
  const config = {
    autoFit: true,
    height: 300,
    data: {
      target: 159,
      total: 400,
      name: "score",
      thresholds: [100, 200, 400],
    },
    legend: false,
    scale: {
      color: {
        range: ["#F4664A", "#FAAD14", "green"],
      },
    },
    style: {
      textContent: (target, total) =>
        `得分：${target}\n占比：${(target / total) * 100}%`,
    },
  };
  return <Gauge {...config} />;
};
