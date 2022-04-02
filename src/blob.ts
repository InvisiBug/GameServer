import { Vector } from "p5";

export class Blob {
  id;
  pos;
  r;

  constructor(id: string, pos: Vector, r: number) {
    this.id = id;
    this.pos = pos;
    this.r = r;
  }
}
