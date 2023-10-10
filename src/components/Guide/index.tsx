/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Button, Popover } from "antd";
import { useSetState } from "ahooks";
import { Iprops } from "./types";

import "./index.less";

const Guide: React.FC<Iprops> = (props) => {
  const [state, setState] = useSetState({
    currentState: props.steps[0],
    currentStep: 0,
    isClosed: !!props.isClosed,
    whiteSpaceRadius: props.whiteSpaceRadius || 4,
    // 白块距离屏幕左侧
    whiteInScreenLeft: 0,
    // 白块距离屏幕上侧
    whiteInScreenTop: 0,
    // 白块距离屏幕右侧
    whiteInScreenRight: 0,
    // 白块距离屏幕下侧
    whiteInScreenBottom: 0,
    // 白块的宽度
    whiteWidth: 0,
    // 白块的高度
    whiteHeight: 0,
    // 白边的宽度
    whitePadding: props.whitePadding || 8,
  });

  useEffect(() => {
    const curStepPath =
      props.steps[state.currentStep]?.nodePath.current.getBoundingClientRect();
    console.log("%c Line:26 🥚 curStepPath", "color:#465975", curStepPath);
    setState({
      currentState: props.steps[state.currentStep],
      whiteHeight: curStepPath.height + state.whitePadding,
      whiteWidth: curStepPath.width + state.whitePadding,
      whiteInScreenLeft: curStepPath.left - state.whitePadding / 2,
      whiteInScreenTop: curStepPath.top - state.whitePadding / 2,
      whiteInScreenRight: curStepPath.right - state.whitePadding / 2,
      whiteInScreenBottom: curStepPath.bottom - state.whitePadding / 2,
    });
  }, [state.currentStep]);
  const content = (
    <div className="step_guide_content">
      <div className="desc">{state.currentState.desc}</div>
      <div className="action">
        <ul>
          {props.steps.map((_, index) => (
            <li
              style={
                state.currentStep === index ? { backgroundColor: "red" } : null
              }
            />
          ))}
        </ul>
        <div className="button_area">
          {state.currentStep !== 0 && (
            <Button
              size="small"
              onClick={() =>
                setState((pre) => ({ currentStep: pre.currentStep - 1 }))
              }
            >
              上一步
            </Button>
          )}
          {state.currentStep !== props.steps.length - 1 && (
            <Button
              size="small"
              onClick={() => {
                setState((pre) => ({ currentStep: 1 + pre.currentStep }));
              }}
            >
              下一步
            </Button>
          )}
          <Button
            type="primary"
            size="small"
            onClick={() => {
              setState({ isClosed: true });
              if (props.onFnished) props.onFnished();
            }}
          >
            完成
          </Button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      {!state.isClosed && (
        <div className="guide_wrap">
          <svg className="guide_svg">
            <defs>
              <mask id="mask-area">
                <rect
                  x="0"
                  y="0"
                  width="100vw"
                  height="100vh"
                  fill="white"
                ></rect>
                <Popover
                  content={content}
                  open
                  placement={state.currentState.placement}
                >
                  <rect
                    x={state.whiteInScreenLeft}
                    y={state.whiteInScreenTop}
                    rx={state.whiteSpaceRadius}
                    width={state.whiteWidth}
                    height={state.whiteHeight}
                    fill="black"
                  ></rect>
                </Popover>
              </mask>
            </defs>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="rgba(0,0,0,0.5)"
              mask="url(#mask-area)"
            ></rect>
            <rect
              fill="transparent"
              pointer-events="auto"
              x="0"
              y="0"
              width="100%"
              height={state.whiteInScreenTop}
            ></rect>
            <rect
              fill="transparent"
              pointer-events="auto"
              x="0"
              y="0"
              width={state.whiteInScreenLeft}
              height="100%"
            ></rect>
            <rect
              fill="transparent"
              pointer-events="auto"
              x="0"
              y="280.21875"
              width="100%"
              height={state.whiteInScreenBottom}
            ></rect>
            <rect
              fill="transparent"
              pointer-events="auto"
              x="484.0625"
              y="0"
              width={state.whiteInScreenRight}
              height="100%"
            ></rect>
          </svg>
        </div>
      )}
    </>
  );
};

export default Guide;
