import React, { useState } from "react";
import "./index.less";

interface Iprops {}
const CardInfo: React.FC<Iprops> = (props) => {
  const [data, setData] = useState([
    "Data 1",
    "Data 2",
    "Data 3",
    "Data 4",
    "Data 5",
    "Data 6",
    // Add more data here
  ]);

  return (
    <div className="data-cards-container">
      {data.map((item, index) => (
        <div className="data-card" key={index}>
          {item}
          <br />
          {index % 2 === 0 ? index : null}
        </div>
      ))}
    </div>
  );
};

export default CardInfo;
