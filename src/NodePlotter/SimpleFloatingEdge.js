import { useCallback } from "react";
import { useStore, SmoothStepEdge } from "react-flow-renderer";

import { getEdgeParams } from "./utils.js";

function SimpleFloatingEdge(props) {
  const { source, target, ...rest } = props;

  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );

  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(
    sourceNode,
    targetNode
  );

  return (
    <SmoothStepEdge
      {...rest}
      sourceX={sx}
      sourceY={sy}
      targetX={tx}
      targetY={ty}
      sourcePosition={sourcePos}
      targetPosition={targetPos}
    />
  );
}

export default SimpleFloatingEdge;
