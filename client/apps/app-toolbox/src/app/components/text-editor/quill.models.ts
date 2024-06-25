import { QuillDoc, QuillOperation } from '@kleiolab/lib-sdk-lb4';



export type Ops = QuillDoc['ops']

export type Op = QuillOperation

export interface AttributeMap {
  [key: string]: any;
}
export interface CursorInfo {
  oldRange: { index: number; length: number };
  newRange: { index: number; length: number };
}
export interface DeltaI {
  ops: Op[];
  constructor(ops?: Op[] | { ops: Op[]; });
  insert(arg: string | object, attributes?: AttributeMap): this;
  delete(length: number): this;
  retain(length: number, attributes?: AttributeMap): this;
  push(newOp: Op): this;
  chop(): this;
  filter(predicate: (op: Op, index: number) => boolean): Op[];
  forEach(predicate: (op: Op, index: number) => void): void;
  map<T>(predicate: (op: Op, index: number) => T): T[];
  partition(predicate: (op: Op) => boolean): [Op[], Op[]];
  reduce<T>(predicate: (accum: T, curr: Op, index: number) => T, initialValue: T): T;
  changeLength(): number;
  length(): number;
  slice(start?: number, end?: number): DeltaI;
  compose(other: DeltaI): DeltaI;
  concat(other: DeltaI): DeltaI;
  diff(other: DeltaI, cursor?: number | CursorInfo): DeltaI;
  eachLine(predicate: (line: DeltaI, attributes: AttributeMap, index: number) => boolean | void, newline?: string): void;
  invert(base: DeltaI): DeltaI;
  transform(index: number, priority?: boolean): number;
  transform(other: DeltaI, priority?: boolean): DeltaI;
  transformPosition(index: number, priority?: boolean): number;
}


