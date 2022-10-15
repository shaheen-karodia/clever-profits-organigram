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
        color: "black",
        fontSize: "12px",
      }}
    >
      {label}
    </div>
  </div>
);

const Wrapper = ({ children, label }) => (
  <div style={{ position: "relative" }}>
    <Handle type="source" position="top" id="a" />
    <Handle type="source" position="right" id="b" />
    <Handle type="source" position="bottom" id="c" />
    <Handle type="source" position="left" id="d" />
    {children}
    <DataLabel label={label} />
  </div>
);

// ************************************************** //
export const PartnershipNode = memo(({ data }) => {
  return (
    <Wrapper label={data.label}>
      <svg width="100" height="70" style={svgStyleObj}>
        <path
          d="M0,70 L50,0 L100,70 z"
          fill="#ff6700"
          strokeWidth="0"
          stroke="#fff"
        ></path>
      </svg>
    </Wrapper>
  );
});

//RECTANGLE
export const LLCNode = memo(({ data }) => {
  return (
    <Wrapper label={data.label}>
      <svg width="120" height="50" style={svgStyleObj}>
        <path
          d="M0,0 L120,0 L120,50 L0,50 z"
          fill="#784be8"
          strokeWidth="0"
          stroke="#fff"
        ></path>
      </svg>
    </Wrapper>
  );
});

//PENTAGON
export const TrustNode = memo(({ data }) => {
  return (
    <Wrapper label={data.label}>
      <svg width="70" height="70" style={svgStyleObj}>
        <path
          d="M 35 0 L 70 26.737 L 56.631 70 L 13.369 70 L 0 26.737 L 35 0 Z"
          fill="#6ede87"
          strokeWidth="2"
          stroke="#fff"
        ></path>
      </svg>
    </Wrapper>
  );
});

//TRAPEZOID
export const SCorpNode = memo(({ data }) => {
  return (
    <Wrapper label={data.label}>
      <svg width="150" height="70" style={svgStyleObj}>
        <path
          d="M 0 70 L 30 0 L 120 0 L 150 70 L 0 70 Z"
          fill="#668de3"
          strokeWidth="2"
          stroke="#fff"
        ></path>
      </svg>
    </Wrapper>
  );
});

//CIRCLE
export const IndividualNode = memo(({ data }) => {
  return (
    <Wrapper label={data.label}>
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
    </Wrapper>
  );
});
