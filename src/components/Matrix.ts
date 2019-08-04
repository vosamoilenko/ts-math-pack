import { EPSILON } from '../constants/math'
import { Point } from './Point'
import { Tupel, Vector } from '.'
import { XOR } from 'ts-xor'
export class Matrix {
  rows: number
  columns: number
  _m: number[][]

  constructor(rows: number, cols: number, values?: number[][]) {
    this.rows = rows
    this.columns = cols

    this._m = values
      ? values
      : Array(this.rows)
          .fill(null)
          .map(() => Array(this.columns))
  }

  get dimensions() {
    return { rows: this.rows, columns: this.columns }
  }

  at(y: number, x: number) {
    const value = this._m[y][x]
    return value
  }

  equal(m: Matrix): boolean {
    if (JSON.stringify(this.dimensions) !== JSON.stringify(m.dimensions)) {
      return false
    }
    for (let y = 0; y < this.dimensions.rows; y++) {
      for (let x = 0; x < this.dimensions.columns; x++) {
        const a = this.at(y, x)
        const b = m.at(y, x)
        const diff = a - b
        if (Math.abs(diff) > EPSILON) {
          return false
        }
      }
    }
    return true
  }

  insert(y: number, x: number, value: number) {
    this._m[y][x] = value
  }
  multiplyMatrix(m: Matrix): Matrix {
    if (this.columns !== m.rows) {
      console.error('Unable to multiply matricies')
      throw 'Unable to multiply matricies'
    }

    const out = new Matrix(this.rows, m.columns)
    for (let y = 0; y < out.rows; y++) {
      for (let x = 0; x < out.columns; x++) {
        let resultValue = 0
        let row: number[] = []
        let column: number[] = []

        row = this._m[y]

        for (let i = 0; i < m.rows; i++) {
          column.push(m.at(i, x))
        }

        for (let i = 0; i < row.length; i++) {
          resultValue += row[i] * column[i]
        }
        out.insert(y, x, resultValue)
      }
    }
    return out
  }

  multiplyTupel(target: Tupel | Point | Vector): Point | Vector {
    const out = []
    for (let idx = 0; idx < 4; idx++) {
      const [x, y, z, w] = this._m[idx]
      const row = new Tupel(x, y, z, w)
      const dot = Tupel.dot(row, target)

      out.push(dot)
    }

    if (target instanceof Point) {
      const point = new Point(out[0], out[1], out[2])
      return point
    } else if (target instanceof Vector) {
      const vector = new Vector(out[0], out[1], out[2])
      return vector
    }
  }

  multiply(target: Matrix): XOR<Matrix, Point> {
    const result = this.multiplyMatrix(target)

    return result
  }

  static divide(m: Matrix, scalar: number): Matrix {
    const values = m._m.map(row => row.map(item => item / scalar))
    const result = new Matrix(m.rows, m.columns, values)
    return result
  }

  static identity(): Matrix {
    const identity = new Matrix(4, 4, [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ])
    return identity
  }

  static transpose(m: Matrix): Matrix {
    const out = new Matrix(m.columns, m.rows)

    for (let y = 0; y < m.rows; y++) {
      for (let x = 0; x < m.columns; x++) {
        out.insert(x, y, m.at(y, x))
      }
    }
    return out
  }

  static submatrix(row: number, column: number, m: Matrix): Matrix {
    const out = Matrix.copy(m)
    out._m = out._m.slice()
    out.rows -= 1
    out.columns -= 1

    out._m = out._m.map((cols: number[]) =>
      cols.filter((el: number, idx: number) => idx !== column),
    )
    out._m = out._m.filter((rows: number[], idx: number) => idx !== row)
    return out
  }

  static copy(m: Matrix): Matrix {
    const matrix = new Matrix(m.rows, m.columns)

    for (let y = 0; y < m.rows; y++) {
      for (let x = 0; x < m.columns; x++) {
        matrix.insert(y, x, m.at(y, x))
      }
    }
    return matrix
  }

  static minor(row: number, column: number, m: Matrix): number {
    const sub = Matrix.submatrix(row, column, m)
    const determinant = Matrix.determinant(sub)
    return determinant
  }

  static cofactor(row: number, column: number, m: Matrix): number {
    // https://stackoverflow.com/a/3114161
    return (row + column) % 2 == 0
      ? Matrix.minor(row, column, m)
      : Matrix.minor(row, column, m) * -1
  }

  static determinant(m: Matrix): number {
    let out = 0

    if (m.rows == 2 && m.columns == 2) {
      return m.at(0, 0) * m.at(1, 1) - m.at(1, 0) * m.at(0, 1)
    }

    for (let i = 0; i < m.columns; i++) {
      const value = m.at(0, i)
      const cofactor = Matrix.cofactor(0, i, m)
      out += value * cofactor
    }
    return out
  }

  static isInvertable(m: Matrix): boolean {
    return Matrix.determinant(m) !== 0
  }

  static inverse(m: Matrix): Matrix {
    let cofactorMatrix = new Matrix(m.rows, m.columns)

    for (let y = 0; y < m.rows; y++) {
      for (let x = 0; x < m.columns; x++) {
        cofactorMatrix.insert(y, x, Matrix.cofactor(y, x, m))
      }
    }

    cofactorMatrix = Matrix.transpose(cofactorMatrix)
    const res = Matrix.divide(cofactorMatrix, Matrix.determinant(m))
    return res
  }

  static translationMatrix(x: number, y: number, z: number): Matrix {
    return new Matrix(4, 4, [
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1],
    ])
  }

  static scalingMatrix(x: number, y: number, z: number): Matrix {
    return new Matrix(4, 4, [
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1],
    ])
  }

  static rotationXMatrix(rad: number): Matrix {
    return new Matrix(4, 4, [
      [1, 0, 0, 0],
      [0, Math.cos(rad), -Math.sin(rad), 0],
      [0, Math.sin(rad), Math.cos(rad), 0],
      [0, 0, 0, 1],
    ])
  }

  static rotationYMatrix(rad: number): Matrix {
    return new Matrix(4, 4, [
      [Math.cos(rad), 0, Math.sin(rad), 0],
      [1, 0, 0, 0],
      [-Math.sin(rad), 0, Math.cos(rad), 0],
      [0, 0, 0, 1],
    ])
  }

  static rotationZMatrix(rad: number): Matrix {
    return new Matrix(4, 4, [
      [Math.cos(rad), -Math.sin(rad), 0, 0],
      [Math.sin(rad), Math.cos(rad), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1],
    ])
  }

  static shearingMatrix(
    Xy: number,
    Xz: number,
    Yx: number,
    Yz: number,
    Zx: number,
    Zy: number,
  ) {
    return new Matrix(4, 4, [
      [1, Xy, Xz, 0],
      [Yx, 1, Yz, 0],
      [Zx, Zy, 1, 0],
      [0, 0, 0, 1],
    ])
  }
}
