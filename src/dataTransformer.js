import { MarkerType } from "react-flow-renderer";
import mapKeys from "lodash.mapkeys";
const position = { x: 0, y: 0 };

export const getNodes = (entities) => {
  return entities.map((e) => {
    return {
      id: e.id,
      data: { label: e.entityName, passthrough: e.passthrough },
      position,
      type: e.entityTypeId,
    };
  });
};

export const getEdges = (holdings) => {
  return holdings.map((h) => {
    const sourceId = h.fromEntityId;
    const targetId = h.toEntityId;
    return {
      id: `edge-${sourceId}${targetId}`,
      source: sourceId,
      target: targetId,
      animated: false,
      label: "50%",
      labelStyle: { fill: "red", fontWeight: 700 },
      type: "floating",
      markerEnd: { type: MarkerType.ArrowClosed },
    };
  });
};
