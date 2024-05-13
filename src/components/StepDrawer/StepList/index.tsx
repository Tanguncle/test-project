import { Button, Steps } from "antd";
import React, { ForwardedRef, forwardRef } from "react";
import { useStepData } from "../context/useStepData";
import "./index.less";
interface Iprops {
  setStepInfo: (params: any) => void;
  aa: string;
}

export interface MyComponentRef {
  // 这里可以定义 ref 对象中包含的方法
  goahead: () => void;
  goback: () => void;
}
const steps = [
  {
    title: "First",
    content: "First-content",
  },
  {
    title: "Second",
    content: "Second-content",
  },
  {
    title: "Last",
    content: "Last-content",
  },
];
export const StepList = forwardRef<MyComponentRef, Iprops>(
  (props, ref: ForwardedRef<MyComponentRef>) => {
    console.log("%c Line:24 🍣 props", "color:#ea7e5c", props);
    const { setStepInfo } = props;
    const [current, setCurrent] = React.useState(0);
    const items = steps.map((item) => ({ key: item.title, title: item.title }));
    const { stepData, updateStepData } = useStepData();
    console.log("%c Line:26 🍯 stepData", "color:#4fff4B", stepData);

    React.useEffect(() => {
      setStepInfo({
        current,
        ...steps[current],
      });
    }, [current]);

    React.useEffect(() => {
      updateStepData({});
    }, []);

    console.log(props);
    React.useImperativeHandle(ref, () => {
      return {
        goahead: () => setCurrent((pre) => pre + 1),
        goback: () => setCurrent((pre) => pre - 1),
      };
    });
    return (
      <div>
        <Steps current={current} items={items} />
        <div className="step-content">
          <Button
            onClick={() =>
              updateStepData({
                ...stepData,
                [`step${current}`]: steps[current],
              })
            }
          >
            更新数据
          </Button>
          {stepData?.[`step${current}`]?.content}
        </div>
      </div>
    );
  }
);

// export default StepList;
