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

export const SCorpNode = memo(({ data }) => {
  return (
    <>
      Trapezoid: SCorp Node
      {data.label}
      <Handle type="source" position="top" id="a" />
      <Handle type="source" position="right" id="b" />
      <Handle type="source" position="bottom" id="c" />
      <Handle type="source" position="left" id="d" />
    </>
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
