import React, { memo } from "react";
import { Handle } from "react-flow-renderer";
import icon from "./person-icon.png";

export const PartnershipNode = memo(({ data }) => {
  return (
    <>
      Partnership: Triangle
      {data.label}
      <Handle type="source" position="top" id="a" />
      <Handle type="source" position="right" id="b" />
      <Handle type="source" position="bottom" id="c" />
      <Handle type="source" position="left" id="d" />
    </>
  );
});

export const LLCNode = memo(({ data }) => {
  return (
    <>
      RECTANGLE: LLC
      {data.label}
      <Handle type="source" position="top" id="a" />
      <Handle type="source" position="right" id="b" />
      <Handle type="source" position="bottom" id="c" />
      <Handle type="source" position="left" id="d" />
    </>
  );
});

export const TrustNode = memo(({ data }) => {
  return (
    <>
      Pentagon: Trust
      {data.label}
      <Handle type="source" position="top" id="a" />
      <Handle type="source" position="right" id="b" />
      <Handle type="source" position="bottom" id="c" />
      <Handle type="source" position="left" id="d" />
    </>
  );
});

// TODO: this is a parallelogram not a trapezoid
export const SCorpNode = memo(({ data }) => {
  return (
    <div style={{ position: "relative" }}>
      <Handle type="source" position="top" id="a" />
      <Handle type="source" position="right" id="b" />
      <Handle type="source" position="bottom" id="c" />
      <Handle type="source" position="left" id="d" />
      <svg
        width="150"
        height="70"
        style={{ display: "block", overflow: "visible" }}
      >
        <path
          d="M0,70 L37.5,0 L150,0 L112.5,70 z"
          fill="#668de3"
          strokeWidth="2"
          stroke="#fff"
        ></path>
      </svg>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontWeight: "bold",
            color: "white",
            fontSize: "12px",
          }}
        >
          {data.label}
        </div>
      </div>
    </div>
  );
});

export const IndividualNode = memo(({ data }) => {
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
