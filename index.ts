export interface Coords {
  x: number
  y: number
}

interface GetPerpendicularPoint {
  point: Coords
  angle: number
  distance: number
}

interface GetVector {
  p1: Coords
  p2: Coords
}

interface ExtendPointByVector {
  point: Coords
  vector: Coords
  distance: number
}

interface ReflectPointThruLine {
  origin: Coords
  line: Coords[]
}

interface GetAngle {
  p1: Coords
  p2: Coords
  isRadians?: boolean
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

export function reflectPointThruLine(args: ReflectPointThruLine): Coords {
  const {
    origin,
    line,
  } = args;
  const [ p1, p2 ] = line;
  const dx = p2.x - p1.x;
  const dy = p2.y - p1.x;
  const a = (dx * dx - dy * dy) / (dx * dx + dy * dy);
  const b = 2 * dx * dy / (dx * dx + dy * dy);
  const x = Math.round(a * (origin.x - p1.x) + b * (origin.y - p1.y) + p1.x);
  const y = Math.round(b * (origin.x - p1.x) - a * (origin.y - p1.y) + p1.y);

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