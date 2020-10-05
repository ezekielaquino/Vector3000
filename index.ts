export interface Coords {
  x: number
  y: number
}

export interface GetVector {
  p1: Coords
  p2: Coords
}

export interface GetAngle {
  p1: Coords
  p2: Coords
  isRadians?: boolean
}

export interface GetMidpoint {
  p1: Coords
  p2: Coords
}

export interface ExtendPointByVector {
  point: Coords
  vector: Coords
  distance: number
}

export interface GetIntersection {
  lineA: Coords[]
  lineB: Coords[]
}

export interface ReflectPointThruLine {
  origin: Coords
  line: Coords[]
}

export interface GetPerpendicularPoint {
  point: Coords
  angle: number
  distance: number
}

export interface GetDistance {
  p1: Coords;
  p2: Coords;
}

export function getVector(args: GetVector): Coords {
  const {
    p1,
    p2,
  } = args;
  const x = p1.x - p2.x;
  const y = p1.y - p2.y;

  return {
    x,
    y,
  };
}

export function getAngle(args: GetAngle): number {
  const {
    p1,
    p2,
    isRadians,
  } = args;

  return Math.atan2(
    p2.y - p1.y,
    p2.x - p1.x,
  ) * (isRadians ? 1 : 180 / Math.PI);
}

export function getMidpoint(args: GetMidpoint): Coords {
  const {
    p1,
    p2,
  } = args;

  const x = (p2.x + p1.x) / 2;
  const y = (p2.y + p1.y) / 2;

  return {
    x,
    y,
  };
}

export function extendPointByVector(args: ExtendPointByVector): Coords {
  const {
    point,
    vector,
    distance,
  } = args;
  const x = point.x + (vector.x * distance);
  const y = point.y + (vector.y * distance);

  return {
    x,
    y,
  };
}

// Paul Bourke
export function getIntersection(args: GetIntersection): Coords | undefined {
  const {
    lineA,
    lineB,
  } = args;
  const [ p1, p2 ] = lineA;
  const [ p3, p4 ] = lineB;
  const denominator = (p4.y - p3.y) * (p2.x - p1.x) - (p4.x - p3.x) * (p2.y - p1.y);
  const ua = ((p4.x - p3.x) * (p1.y - p3.y) - (p4.y - p3.y) * (p1.x - p3.x)) / denominator;
  const ub = ((p2.x - p1.x) * (p1.y - p3.y) - (p2.y - p1.y) * (p1.x - p3.x)) / denominator;

  if (
    (p1.x === p2.x && p1.y === p2.y) || 
    (p3.x === p4.x && p3.y === p4.y)
  ) {
    return undefined;
  }

  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return undefined;
  }

  return {
    x: p1.x + ua * (p2.x - p1.x),
    y: p1.y + ua * (p2.y - p1.y),
  };
}

export function reflectPointThruLine(args: ReflectPointThruLine): Coords {
  const {
    origin,
    line,
  } = args;
  const [ p1, p2 ] = line;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.y;
  const a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
  const b = 2 * dx * dy / (dx * dx + dy * dy);
  const x = a * (origin.x - p1.x) + b * (origin.y - p1.y) + p1.x; 
  const y = b * (origin.x - p1.x) - a * (origin.y - p1.y) + p1.y;

  return {
    x,
    y,
  };
}

export function getPerpendicularPoint(args: GetPerpendicularPoint): Coords {
  const {
    point,
    angle,
    distance,
  } = args;
  const x = point.x + Math.sin(angle) * distance;
  const y =  point.y + Math.cos(angle) * distance;

  return {
    x,
    y,
  };
}

export function add(pointA: Coords, pointB: Coords): Coords {
  return {
    x: pointB.x + pointA.x,
    y: pointB.y + pointA.y,
  };
}

export function subtract(pointA: Coords, pointB: Coords): Coords {
  return {
    x: pointB.x - pointA.x,
    y: pointB.y - pointA.y,
  };
}

export function multiply(pointA: Coords, pointB: Coords): Coords {
  return {
    x: pointB.x * pointA.x,
    y: pointB.y * pointA.y,
  };
}

export function divide(pointA: Coords, pointB: Coords): Coords {
  return {
    x: pointB.x / pointA.x,
    y: pointB.y / pointA.y,
  };
}

export function getDistance(args: GetDistance): number {
  const { p1, p2 } = args;
  return Math.hypot(p2.x - p1.x, p2.y - p1.y);
}