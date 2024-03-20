import { Line } from "@ant-design/charts";
import React from "react";
import { data } from "./data";

export const HistoryLine: React.FC<any> = (props) => {
  const config = {
    data,
    xField: "date",
    yField: "value",
    colorField: "type",
    axis: {
      y: {
        labelFormatter: (v) =>
          `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s}`),
      },
    },
    scale: { color: { range: ["#30BF78", "#F4664A", "#FAAD14"] } },
    style: {
      lineWidth: 2,
      lineDash: (data) => {
        if (data[0].type === "register") return [4, 4];
      },
      opacity: (data) => {
        if (data[0].type !== "register") return 0.5;
      },
    },
  };

  return <Line {...config} />;
};
