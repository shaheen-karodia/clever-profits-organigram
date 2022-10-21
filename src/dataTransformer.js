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
  return holdings.map((h) => holidingToEdgeMapper(h));
};

export const holidingToEdgeMapper = (holding) => {
  const sourceId = holding.fromEntityId;
  const targetId = holding.toEntityId;

  const edge = {
    id: holding.id,
    source: sourceId,
    target: targetId,
    animated: false,
    label: `${holding.percentageHoldings} %`,
    labelStyle: { fill: "black", fontWeight: 700 },
    type: "floating",
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "black",
      width: 15,
      height: 15,
    },
  };
  return edge;
};
