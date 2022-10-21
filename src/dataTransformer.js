import { MarkerType } from "react-flow-renderer";
import _ from "lodash";

const position = { x: 0, y: 0 };

export const getNodes = (entities) => {
  return entities.map((e) => entityToNodeMapper(e));
};

export const entityToNodeMapper = (entity) => {
  const node = {
    id: entity.id,
    data: entityDataToNodeDataMapper(entity),
    position,
    type: entity.entityTypeId,
  };
  return node;
};

export const entityDataToNodeDataMapper = (entity) => {
  return { label: entity.entityName, passthrough: entity.passthrough };
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
      label: `${h.percentageHoldings} %`,
      labelStyle: { fill: "black", fontWeight: 700 },
      type: "floating",
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "black",
        width: 15,
        height: 15,
      },
    };
  });
};
