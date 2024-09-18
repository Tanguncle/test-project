import React from "react";
import "./index.less";
interface Iprops {
  [x: string]: any;
}
const OverListView: React.FC<Iprops> = (props) => {
  console.log(props);
  return <div>OverListView</div>;
};

export default React.memo(OverListView);
