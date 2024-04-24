import { useMouse } from "ahooks";
import classNames from "classnames";
import React from "react";
import "./index.less";

export const HoverDiabled: React.FC<any> = (props) => {
  console.log(props);
  const [safeHover, setSafeHover] = React.useState(true);
  const unSafeDomClassName = ["test", "child-one"];
  const container = React.useRef(null);
  const mouse = useMouse(container.current);
  console.log("%c Line:12 🍋 mouse", "color:#42b983", mouse);
  React.useEffect(() => {
    container.current.addEventListener("mouseover", (event) => {
      console.log(
        "%c Line:13 🥓 event.target.classNames",
        "color:#7f2b82",
        event.target.className
      );
      if (
        unSafeDomClassName.some((item) =>
          event.target.className?.includes(item)
        )
      ) {
        setSafeHover(false);
      } else {
        setSafeHover(true);
      }
    });
  }, []);
  return (
    <div
      className={classNames("hover-container", { showHover: safeHover })}
      ref={container}
      style={
        safeHover
          ? ({
              "--offset-left": mouse.elementX + 20 + "px",
              "--offset-top": mouse.elementY + "px",
            } as any)
          : {}
      }
    >
      <div className="child-one test-1">
        <div className="child-two test-2">
          <div className="child-three">
            <div className="child-four">4</div>
          </div>
        </div>
      </div>
      <div className="child-inift">
        <div className="inift-other">
          <div className="test">1</div>
        </div>
      </div>
    </div>
  );
};
export default HoverDiabled;
