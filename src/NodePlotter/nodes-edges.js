import { MarkerType } from "react-flow-renderer";

const position = { x: 0, y: 0 };

const labelStyle = { fill: "red", fontWeight: 700 };

export const initialNodes = [
  {
    id: "1",
    data: { label: "1. JJ" },
    position,
    type: "person"
  },
  {
    id: "2",
    data: { label: "2. SK" },
    position,
    type: "person"
  },
  {
    id: "3",
    data: { label: "3. TFG Holding LTD" },
    position,
    type: "company"
  },
  {
    id: "4",
    data: { label: "4. KJ Manor Pty LTD" },
    position,
    type: "company"
  },
  {
    id: "5",
    data: { label: "5. Onyx Pty LTD" },
    position,
    type: "company"
  }
];

export const initialEdges = [
  {
    id: "e14",
    source: "1",
    target: "4",
    animated: false,
    label: "50%",
    labelStyle,
    type: "floating",
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: "e15",
    source: "1",
    target: "5",
    animated: false,
    label: "20%",
    labelStyle,

    type: "floating",
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: "e23",
    source: "2",
    target: "3",

    animated: false,
    label: "10%",
    labelStyle,
    type: "floating",
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: "e24",
    source: "2",
    target: "4",

    animated: false,
    label: "50%",
    labelStyle,
    type: "floating",
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: "e45",
    source: "4",
    target: "5",

    animated: false,
    label: "80%",
    labelStyle,
    type: "floating",
    markerEnd: { type: MarkerType.ArrowClosed }
  },
  {
    id: "e53",
    source: "5",
    target: "3",

    animated: false,
    label: "5%",
    labelStyle,
    type: "floating",
    markerEnd: { type: MarkerType.ArrowClosed }
  }
];
