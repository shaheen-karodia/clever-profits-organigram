import { MarkerType } from "react-flow-renderer";
import _ from "lodash";

const position = { x: 0, y: 0 };

/**
 * Method used for autoplotting points on the graph
 */
const getNextPositionGenerator = () => {
  let x = 0;
  let y = 0;
  const INCREMENT_X = 200;
  const INCREMENT_Y = 100;

  return () => {
    const position = { x, y };
    x = x + INCREMENT_X;

    if (x > INCREMENT_X * 3) {
      x = 0;
      y += INCREMENT_Y;
    }

    return position;
  };
};

export const getNextPosition = getNextPositionGenerator();

export const createNewNodeFromEntity = (entity) => {
  const node = {
    id: entity.id,
    data: entityDataToNodeDataMapper(entity),
    position: getNextPosition(),
    type: entity.entityTypeId,
  };
  return node;
};

export const entityDataToNodeDataMapper = (entity) => {
  return { label: entity.entityName, passthrough: entity.passthrough };
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
