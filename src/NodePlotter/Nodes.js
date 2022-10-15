import React, { memo } from "react";
import { Handle } from "react-flow-renderer";

// ********* Helpers ******** //

const svgStyleObj = { display: "block", overflow: "visible" };

const PassThroughCommonStyles = {
  fill: "#fff",
  strokeWidth: "0",
  stroke: "#fff",
  opacity: "0.7",
};

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

//  TRIANGLE
export const PartnershipNode = memo(({ data }) => {
  const { label, passthrough } = data;
  return (
    <Wrapper label={label}>
      <svg width="100" height="70" style={svgStyleObj}>
        <path
          d="M0,70 L50,0 L100,70 z"
          fill="#ff6700"
          strokeWidth="0"
          stroke="#fff"
        ></path>
        {passthrough && (
          <path
            d="M 87.566 56.805 Q 87.972 56.101 88.379 56.805 L 94.341 67.138 Q 94.747 67.842 93.934 67.842 L 82.01 67.842 Q 81.197 67.842 81.604 67.138 Z"
            {...PassThroughCommonStyles}
          ></path>
        )}
      </svg>
    </Wrapper>
  );
});

//RECTANGLE
export const LLCNode = memo(({ data }) => {
  const { label, passthrough } = data;
  return (
    <Wrapper label={label}>
      <svg width="120" height="50" style={svgStyleObj}>
        <path
          d="M0,0 L120,0 L120,50 L0,50 z"
          fill="#784be8"
          strokeWidth="0"
          stroke="#fff"
        ></path>
        {passthrough && (
          <path
            d="M 110.305 35.896 Q 110.711 35.192 111.118 35.896 L 117.08 46.229 Q 117.486 46.933 116.673 46.933 L 104.749 46.933 Q 103.936 46.933 104.343 46.229 Z"
            {...PassThroughCommonStyles}
          ></path>
        )}
      </svg>
    </Wrapper>
  );
});

//PENTAGON
export const TrustNode = memo(({ data }) => {
  const { label, passthrough } = data;
  return (
    <Wrapper label={label}>
      <svg width="70" height="70" style={svgStyleObj}>
        <path
          d="M 35 0 L 70 26.737 L 56.631 70 L 13.369 70 L 0 26.737 L 35 0 Z"
          fill="#6ede87"
          strokeWidth="0"
          stroke="#fff"
        ></path>
        {passthrough && (
          <path
            d="M 48.302 56.693 Q 48.708 55.989 49.115 56.693 L 55.077 67.026 Q 55.483 67.73 54.67 67.73 L 42.746 67.73 Q 41.933 67.73 42.34 67.026 Z"
            {...PassThroughCommonStyles}
          ></path>
        )}
      </svg>
    </Wrapper>
  );
});

//TRAPEZOID
export const SCorpNode = memo(({ data }) => {
  const { label, passthrough } = data;
  return (
    <Wrapper label={label}>
      <svg width="150" height="70" style={svgStyleObj}>
        <path
          d="M 0 70 L 30 0 L 120 0 L 150 70 L 0 70 Z"
          fill="#668de3"
          strokeWidth="0"
          stroke="#fff"
        ></path>
        {passthrough && (
          <path
            d="M 139.976 56.939 Q 140.382 56.235 140.789 56.939 L 146.751 67.272 Q 147.157 67.976 146.344 67.976 L 134.42 67.976 Q 133.607 67.976 134.014 67.272 Z"
            {...PassThroughCommonStyles}
          ></path>
        )}
      </svg>
    </Wrapper>
  );
});

//CIRCLE
export const IndividualNode = memo(({ data }) => {
  const { label, passthrough } = data;
  return (
    <Wrapper label={label}>
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
        {passthrough && (
          <path
            d="M 139.435 18.682 Q 139.841 17.978 140.248 18.682 L 146.21 29.015 Q 146.616 29.719 145.803 29.719 L 133.879 29.719 Q 133.066 29.719 133.473 29.015 Z"
            {...PassThroughCommonStyles}
          ></path>
        )}
      </svg>
    </Wrapper>
  );
});
