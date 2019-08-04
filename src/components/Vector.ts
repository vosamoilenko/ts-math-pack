import { Tupel } from './Tupel'

export class Vector extends Tupel {
  constructor(x: number, y: number, z: number) {
    super(x, y, z, 0.0)
  }
}