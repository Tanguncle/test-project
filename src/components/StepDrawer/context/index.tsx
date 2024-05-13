import { createContext, useState } from "react";

// 创建一个上下文对象
export const DataContext = createContext(null);
export const DataDispatcher = createContext(null);

// 创建一个上下文提供者组件
const DataProvider = ({ children }) => {
  const [data, setData] = useState({}); // 这里存储你的数据，可以是任何类型的对象

  return (
    <DataContext.Provider value={data}>
      <DataDispatcher.Provider value={setData}>
        {children}
      </DataDispatcher.Provider>
    </DataContext.Provider>
  );
};

export default DataProvider;
