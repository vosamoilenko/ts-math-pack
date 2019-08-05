import { XYZW } from '../types'
import { EPSILON } from '../constants/math'

export class Tupel implements XYZW {
  x: number
  y: number
  z: number
  w: number

  constructor(x: number, y: number, z: number, w: number) {
    this.x = x
    this.y = y
    this.z = z
    this.w = w
  }

  get isVector() {
    return this.w === 0.0
  }

  get isPoint() {
    return !this.isVector
  }

  get normalize() {
    const x = this.x / this.length
    const y = this.y / this.length
    const z = this.z / this.length
    const w = this.w / this.length
    const normalized = new Tupel(x, y, z, w)
    return normalized
  }

  get length() {
    const l = Math.sqrt(
      this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w,
    )
    return l
  }

  add(tupel: Tupel): Tupel {
    const x = this.x + tupel.x
    const y = this.y + tupel.y
    const z = this.z + tupel.z
    const w = this.w + tupel.w
    const result = new Tupel(x, y, z, w)
    return result
  }

  minus(tupel: Tupel): Tupel {
    const x = this.x - tupel.x
    const y = this.y - tupel.y
    const z = this.z - tupel.z
    const w = this.w - tupel.w
    const result = new Tupel(x, y, z, w)
    return result
  }

  hadamardProduct(tupel: Tupel): Tupel {
    const x = this.x * tupel.x
    const y = this.y * tupel.y
    const z = this.z * tupel.z
    const w = this.w * tupel.w
    const res = new Tupel(x, y, z, w)
    return res
  }

  multiply(scalar: number): Tupel {
    const x = this.x * scalar
    const y = this.y * scalar
    const z = this.z * scalar
    const w = this.w * scalar
    const result = new Tupel(x, y, z, w)
    return result
  }

  divide(scalar: number): Tupel {
    const x = this.x / scalar
    const y = this.y / scalar
    const z = this.z / scalar
    const w = this.w / scalar
    const result = new Tupel(x, y, z, w)
    return result
  }

  equal(tupel: Tupel): boolean {
    const diff = this.minus(tupel)
    const isEqual = diff.x < EPSILON && diff.y < EPSILON && diff.z < EPSILON && diff.w < EPSILON
    return isEqual
  }

  static negate(tupel: Tupel): Tupel {
    const n = new Tupel(-tupel.x, -tupel.y, -tupel.z, -tupel.w)
    return n
  }

  static dot(a: Tupel, b: Tupel): number {
    const product = a.hadamardProduct(b)
    const dot = product.x + product.y + product.z + product.w
    return dot
  }

  static cross(a: Tupel, b: Tupel): Tupel {
    const x = a.y * b.z - a.z * b.y
    const y = a.z * b.x - a.x * b.z
    const z = a.x * b.y - a.y * b.x
    const cross = new Tupel(x, y, z, 0.0)
    return cross
  }
}
