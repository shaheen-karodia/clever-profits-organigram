import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import icon from "./person-icon.png";
export default memo(({ data }) => {
  return (
    <>
      <div className="person-wrapper">
        <img src={icon} alt="" width={40} />
        {data.label}
      </div>

      <Handle type="source" position="top" id="a" />
      <Handle type="source" position="right" id="b" />
      <Handle type="source" position="bottom" id="c" />
      <Handle type="source" position="left" id="d" />
    </>
  );
});
