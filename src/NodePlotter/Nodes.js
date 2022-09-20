import React, { memo } from "react";
import { Handle } from "react-flow-renderer";

// ********* Helpers ******** //

const svgStyleObj = { display: "block", overflow: "visible" };

const DataLabel = ({ label }) => (
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
      {label}
    </div>
  </div>
);

// ************************************************** //
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
    <div style={{ position: "relative" }}>
      <Handle type="source" position="top" id="a" />
      <Handle type="source" position="right" id="b" />
      <Handle type="source" position="bottom" id="c" />
      <Handle type="source" position="left" id="d" />

      <svg width="130" height="50" style={svgStyleObj}>
        <path
          d="M0,0 L120,0  L130,25 L120,50 L0,50 z"
          fill="#784be8"
          stroke-width="0"
          stroke="#fff"
        ></path>
      </svg>
      <DataLabel label={data.label} />
    </div>
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
      <svg width="150" height="70" style={svgStyleObj}>
        <path
          d="M0,70 L37.5,0 L150,0 L112.5,70 z"
          fill="#668de3"
          strokeWidth="2"
          stroke="#fff"
        ></path>
      </svg>
      <DataLabel label={data.label} />
    </div>
  );
});

export const IndividualNode = memo(({ data }) => {
  return (
    <div style={{ position: "relative" }}>
      <Handle type="source" position="top" id="a" />
      <Handle type="source" position="right" id="b" />
      <Handle type="source" position="bottom" id="c" />
      <Handle type="source" position="left" id="d" />

      <svg width="150" height="50" style={svgStyleObj}>
        <ellipse
          cx="75"
          cy="25"
          rx="75"
          ry="25"
          fill="#ff0072"
          strokeWidth="0"
          stroke="#fff"
        ></ellipse>
      </svg>
      <DataLabel label={data.label} />
    </div>
  );
});
