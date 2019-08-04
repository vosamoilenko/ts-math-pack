import { Tupel } from './Tupel'

export class Point extends Tupel {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 1.0)
  }
}
