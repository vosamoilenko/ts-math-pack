import { Matrix, Point, Vector } from '../src/components'

describe('test matrix', () => {
  it('should A tuple with w=1.0 is a point', () => {
    const f: Matrix = new Matrix(2, 3)
  })
  // Scenario: Constructing and inspecting a 4x4 matrix
  // Given the following 4x4 matrix M:
  //|   1  |   2  |   3  |   4  |
  //|  5.5 |  6.5 |  7.5 |  8.5 |
  //|   9  |  10  |  11  |  12  |
  //| 13.5 | 14.5 | 15.5 | 16.5 |
  // Then M[0,0] = 1
  // And M[0,3] = 4
  // And M[1,0] = 5.5
  // And M[1,2] = 7.5
  // And M[2,2] = 11
  // And M[3,0] = 13.5
  // And M[3,2] = 15.5
  it('Constructing and inspecting a 4x4 matrix', () => {
    const m = new Matrix(4, 4, [
      [1, 2, 3, 4],
      [5.5, 6.5, 7.5, 8.5],
      [9, 10, 11, 12],
      [13.5, 14.5, 15.5, 16.5],
    ])
    expect(m.at(0, 0)).toBe(1)
    expect(m.at(0, 3)).toBe(4)
    expect(m.at(1, 0)).toBe(5.5)
    expect(m.at(1, 2)).toBe(7.5)
    expect(m.at(2, 2)).toBe(11)
    expect(m.at(3, 0)).toBe(13.5)
    expect(m.at(3, 2)).toBe(15.5)
  })
  //Scenario: A 2x2 matrix ought to be representable
  //Given the following 2x2 matrix M:
  //| -3 | 5 |
  //| 1 | -2 |
  //Then M[0,0] = -3
  //And M[0,1] = 5
  // And M[1,0] = 1
  //And M[1,1] = -2
  it('A 2x2 matrix ought to be representable', () => {
    const m = new Matrix(2, 2, [[-3, 5], [1, -2]])
    expect(m.at(0, 0)).toBe(-3)
    expect(m.at(0, 1)).toBe(5)
    expect(m.at(1, 0)).toBe(1)
    expect(m.at(1, 1)).toBe(-2)
  })

  //Scenario: A 3x3 matrix ought to be representable
  // Given the following 3x3 matrix M:
  //|-3| 5| 0|
  //| 1|-2|-7|
  //| 0| 1| 1|
  //Then M[0,0] = -3
  //And M[1,1] = -2
  // And M[2,2] = 1
  it('A 3x3 matrix ought to be representable', () => {
    const m = new Matrix(3, 3, [[-3, 5, 0], [1, -2, 7], [0, 1, 1]])
    expect(m.at(0, 0)).toBe(-3)
    expect(m.at(1, 1)).toBe(-2)
    expect(m.at(2, 2)).toBe(1)
  })

  //Scenario: Matrix equality with identical matrices
  //Given the following matrix A:
  //|1|2|3|4|
  //|5|6|7|8|
  //|9|8|7|6|
  //|5|4|3|2|
  //And the following matrix B:
  //|1|2|3|4|
  //|5|6|7|8|
  //|9|8|7|6|
  //|5|4|3|2|
  //Then A = B
  it('Matrix equality with identical matrices', () => {
    const m1 = new Matrix(4, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2],
    ])
    const m2 = new Matrix(4, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2],
    ])

    expect(m1.equal(m2)).toBe(true)
  })

  //Scenario: Matrix equality with different matrices
  //Given the following matrix A:
  //|1|2|3|4|
  //|5|6|7|8|
  //|9|8|7|6|
  //|5|4|3|2|
  //And the following matrix B:
  //|2|2|3|4|
  //|5|6|7|8|
  //|9|8|7|6|
  //|5|4|3|2|
  //Then A != B
  it('Matrix equality with different matrices', () => {
    const m1 = new Matrix(4, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2],
    ])
    const m2 = new Matrix(4, 4, [
      [2, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2],
    ])
    expect(m1.equal(m2)).toBe(false)
  })

  //Scenario: Multiplying two matrices Given the following matrix A:
  //|1|2|3|4|
  //|5|6|7|8|
  //|9|8|7|6|
  //|5|4|3|2|
  //And the following matrix B:
  //|-2|1|2| 3|
  //| 3|2|1|-1|
  //| 4|3|6| 5|
  //| 1|2|7| 8|
  //Then A * B is the following 4x4 matrix:
  //|20| 22| 50| 48|
  //|44| 54|114|108|
  //|40| 58|110|102|
  //|16| 26| 46| 42|
  it('Multiplying two matrices Given the following matrix A', () => {
    const m1 = new Matrix(4, 4, [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 8, 7, 6],
      [5, 4, 3, 2],
    ])
    const m2 = new Matrix(4, 4, [
      [-2, 1, 2, 3],
      [3, 2, 1, -1],
      [4, 3, 6, 5],
      [1, 2, 7, 8],
    ])
    const expected = new Matrix(4, 4, [
      [20, 22, 50, 48],
      [44, 54, 114, 108],
      [40, 58, 110, 102],
      [16, 26, 46, 42],
    ])
    expect(m1.multiply(m2)).toEqual(expected)
  })

  // Scenario : A matrix multiplied by a tuple
  // Given the following matrix A :
  // | 1 | 2 | 3 | 4 |
  // | 2 | 4 | 4 | 2 |
  // | 8 | 6 | 4 | 1 |
  // | 0 | 0 | 0 | 1 |
  // And b ← tuple(1, 2, 3, 1)
  // Then A *b = tuple(18, 24, 33, 1)
  it('A matrix multiplied by a tuple', () => {
    const m = new Matrix(4, 4, [
      [1, 2, 3, 4],
      [2, 4, 4, 2],
      [8, 6, 4, 1],
      [0, 0, 0, 1],
    ])
    const t = new Point(1, 2, 3)
    const point = m.multiplyTupel(t)
    expect(point).toEqual(new Point(18, 24, 33))
  })

  it('A matrix multiplied by a vector', () => {
    const m = new Matrix(4, 4, [
      [1, 2, 3, 4],
      [2, 4, 4, 2],
      [8, 6, 4, 1],
      [0, 0, 0, 1],
    ])
    const t = new Vector(1, 2, 3)
    const vector = m.multiplyTupel(t)
    expect(vector).toEqual(new Vector(14, 22, 32))
  })

  //Scenario: Multiplying a matrix by the identity matrix
  //Given the following matrix A:
  //| 0 | 1 |  2 |  4 |
  //| 1 | 2 |  4 |  8 |
  //| 2 | 4 |  8 | 16 |
  //| 4 | 8 | 16 | 32 |
  //Then A * identity_matrix = A
  //Scenario: Multiplying the identity matrix by a tuple
  //Given a ← tuple(1, 2, 3, 4)
  //Then identity_matrix * a = a
  it('Multiplying a matrix by the identity matrix', () => {
    const m = new Matrix(4, 4, [
      [0, 1, 2, 4],
      [1, 2, 4, 8],
      [2, 4, 8, 16],
      [4, 8, 16, 32],
    ])
    expect(m.multiply(Matrix.identity())).toEqual(m)
  })

  // Scenario : Transposing a matrix
  // Given the following matrix A :
  // | 0 | 9 | 3 | 0 |
  // | 9 | 8 | 0 | 8 |
  // | 1 | 8 | 5 | 3 |
  // | 0 | 0 | 5 | 8 |
  // Then transpose(A) is the following matrix :
  // | 0 | 9 | 1 | 0 |
  // | 9 | 8 | 8 | 0 |
  // | 3 | 0 | 5 | 5 |
  // | 0 | 8 | 3 | 8 |
  it('Transposing a matrix', () => {
    const m = new Matrix(4, 4, [
      [0, 9, 3, 0],
      [9, 8, 0, 8],
      [1, 8, 5, 3],
      [0, 0, 5, 8],
    ])
    const t = new Matrix(4, 4, [
      [0, 9, 1, 0],
      [9, 8, 8, 0],
      [3, 0, 5, 5],
      [0, 8, 3, 8],
    ])
    expect(Matrix.transpose(m)).toEqual(t)
  })

  //Scenario: Transposing the identity matrix
  //Given A ← transpose(identity_matrix)
  //Then A = identity_matrix
  it('Transposing the identity matrix', () => {
    expect(Matrix.transpose(Matrix.identity())).toEqual(Matrix.identity())
  })

  //Scenario: Calculating the determinant of a 2x2 matrix
  //Given the following 2x2 matrix A:
  //| 1|5|
  //| -3 | 2 |
  //Then determinant(A) = 17
  it('Calculating the identity of 2x2 matrix', () => {
    const m = new Matrix(2, 2, [[1, 5], [-3, 2]])
    expect(Matrix.determinant(m)).toBe(17)
  })

  //Scenario: A submatrix of a 3x3 matrix is a 2x2 matrix
  //Given the following 3x3 matrix A:
  //| 1|5| 0|
  //|-3|2| 7|
  //| 0|6|-3|
  //Then submatrix(A, 0, 2) is the following 2x2 matrix:
  //| -3 | 2 |
  //|  0 | 6 |
  it('A submatrix of a 3x3 matrix is a 2x2 matrix', () => {
    const m = new Matrix(3, 3, [[1, 5, 0], [-3, 2, 7], [0, 6, -3]])
    const out = new Matrix(2, 2, [[-3, 2], [0, 6]])
    const sub = Matrix.submatrix(0, 2, m)
    expect(sub).toEqual(out)
  })

  //Scenario: A submatrix of a 4x4 matrix is a 3x3 matrix
  //Given the following 4x4 matrix A:
  //|-6| 1| 1| 6|
  //|-8| 5| 8| 6|
  //|-1| 0| 8| 2|
  //|-7| 1|-1| 1|
  //Then submatrix(A, 2, 1) is the following 3x3 matrix:
  //| -6 |  1 | 6 |
  //| -8 |  8 | 6 |
  //| -7 | -1 | 1 |
  it('A submatrix of a 4x4 matrix is a 3x3 matrix', () => {
    const m = new Matrix(4, 4, [
      [-6, 1, 1, 6],
      [-8, 5, 8, 6],
      [-1, 0, 8, 2],
      [-7, 1, -1, 1],
    ])
    const out = new Matrix(3, 3, [[-6, 1, 6], [-8, 8, 6], [-7, -1, 1]])
    const sub = Matrix.submatrix(2, 1, m)
    expect(sub).toEqual(out)
  })

  //Scenario: Calculating a minor of a 3x3 matrix
  //Given the following 3x3 matrix A:
  //| 3| 5| 0|
  //| 2|-1|-7|
  //| 6|-1| 5|
  //And B ← submatrix(A, 1, 0)
  //Then determinant(B) = 25
  //And minor(A, 1, 0) = 25
  it('Calculating a minor of a 3x3 matrixx', () => {
    const m = new Matrix(3, 3, [[3, 5, 0], [2, -1, -7], [6, -1, 5]])
    const b = Matrix.submatrix(1, 0, m)
    const mi = Matrix.minor(1, 0, m)
    expect(Matrix.determinant(b)).toBe(25)
    expect(mi).toBe(25)
  })

  //Scenario: Calculating a cofactor of a 3x3 matrix
  // Given the following 3x3 matrix A:
  //| 3 |  5 | 0 |
  //| 2 | -1 | -7|
  //| 6 | -1 | 5 |
  //Then minor(A, 0, 0) = -12
  //And cofactor(A, 0, 0) = -12
  //And minor(A, 1, 0) = 25
  //And cofactor(A, 1, 0) = -25
  it('Calculating a cofactor of a 3x3 matrix', () => {
    const m = new Matrix(3, 3, [[3, 5, 0], [2, -1, -7], [6, -1, 5]])
    expect(Matrix.minor(0, 0, m)).toBe(-12)
    expect(Matrix.cofactor(0, 0, m)).toBe(-12)
    expect(Matrix.minor(1, 0, m)).toBe(25)
    expect(Matrix.cofactor(1, 0, m)).toBe(-25)
  })

  //Scenario: Calculating the determinant of a 3x3 matrix
  //Given the following 3x3 matrix A:
  //|1 | 2| 6|
  //|-5| 8|-4|
  //|2 | 6| 4|
  //Then cofactor(A, 0, 0) = 56
  //And cofactor(A, 0, 1) = 12
  //And cofactor(A, 0, 2) = -46
  //And determinant(A) = -196
  it('Calculating the determinant of a 3x3 matrix', () => {
    const m = new Matrix(3, 3, [[1, 2, 6], [-5, 8, -4], [2, 6, 4]])
    expect(Matrix.cofactor(0, 0, m)).toBe(56)
    expect(Matrix.cofactor(0, 1, m)).toBe(12)
    expect(Matrix.cofactor(0, 2, m)).toBe(-46)
    expect(Matrix.determinant(m)).toBe(-196)
  })

  //Scenario: Calculating the determinant of a 4x4 matrix
  //Given the following 4x4 matrix A:
  //|-2|-8| 3| 5|
  //|-3| 1| 7| 3|
  //| 1| 2|-9| 6|
  //|-6| 7| 7|-9|
  //Then cofactor(A, 0, 0) = 690
  //And cofactor(A, 0, 1) = 447
  //And cofactor(A, 0, 2) = 210
  //And cofactor(A, 0, 3) = 51
  //And determinant(A) = -4071
  it('Calculating the determinant of a 4x4 matrix', () => {
    const m = new Matrix(4, 4, [
      [-2, -8, 3, 5],
      [-3, 1, 7, 3],
      [1, 2, -9, 6],
      [-6, 7, 7, -9],
    ])
    expect(Matrix.cofactor(0, 0, m)).toBe(690)
    expect(Matrix.cofactor(0, 1, m)).toBe(447)
    expect(Matrix.cofactor(0, 2, m)).toBe(210)
    expect(Matrix.cofactor(0, 3, m)).toBe(51)
    expect(Matrix.determinant(m)).toBe(-4071)
  })

  // Scenario: Testing an invertible matrix for invertibility
  // Given the following 4x4 matrix A:
  // |6|4|4|4|
  // |5|5|7|6|
  // | 4|-9| 3|-7|
  // | 9| 1| 7|-6|
  // Then determinant(A) = -2120
  // And A is invertible
  it('Testing an invertible matrix for invertibility', () => {
    const m = new Matrix(4, 4, [
      [6, 4, 4, 4],
      [5, 5, 7, 6],
      [4, -9, 3, -7],
      [9, 1, 7, -6],
    ])
    expect(Matrix.determinant(m)).toBe(-2120)
    expect(Matrix.isInvertable(m)).toBe(true)
  })

  // Scenario: Testing a noninvertible matrix for invertibility
  // Given the following 4x4 matrix A:
  // |-4| 2|-2|-3|
  // |9|6|2|6|
  // | 0|-5| 1|-5|
  // |0|0|0|0|
  // Then determinant(A) = 0
  // And A is not invertible
  it('Testing a noninvertible matrix for invertibility', () => {
    const m = new Matrix(4, 4, [
      [-4, 2, -2, -3],
      [9, 6, 2, 6],
      [0, -5, 1, -5],
      [0, 0, 0, 0],
    ])
    expect(Matrix.determinant(m)).toBe(0)
    expect(Matrix.isInvertable(m)).toBe(false)
  })

  // Scenario: Calculating the inverse of a matrix
  // Given the following 4x4 matrix A:
  // |-5| 2| 6|-8|
  // | 1|-5| 1| 8|
  // | 7| 7|-6|-7|
  // | 1|-3| 7| 4|
  // And B ← inverse(A)
  // Then determinant(A) = 532
  // And cofactor(A, 2, 3) = -160
  // And B[3,2] = -160/532
  // And cofactor(A, 3, 2) = 105
  // And B[2,3] = 105/532
  // And B is the following 4x4 matrix:
  // | 0.21805 | 0.45113 | 0.24060 | -0.04511 |
  // | -0.80827 | -1.45677 | -0.44361 | 0.52068 |
  // | -0.07895 | -0.22368 | -0.05263 | 0.19737 |
  // | -0.52256 | -0.81391 | -0.30075 | 0.30639 |
  it('Calculating the inverse of a matrix', () => {
    const m = new Matrix(4, 4, [
      [-5, 2, 6, -8],
      [1, -5, 1, 8],
      [7, 7, -6, -7],
      [1, -3, 7, 4],
    ])
    const inv = new Matrix(4, 4, [
      [0.21805, 0.45113, 0.2406, -0.04511],
      [-0.80827, -1.45677, -0.44361, 0.52068],
      [-0.07895, -0.22368, -0.05263, 0.19737],
      [-0.52256, -0.81391, -0.30075, 0.30639],
    ])
    const mInverse = Matrix.inverse(m)
    expect(mInverse.equal(inv)).toEqual(true)
  })

  // Scenario: Calculating the inverse of another matrix
  // Given the following 4x4 matrix A:
  // | 8|-5| 9| 2|
  // |7|5|6|1|
  // |-6| 0| 9| 6|
  // |-3| 0|-9|-4|
  // Then inverse(A) is the following 4x4 matrix:
  // | -0.15385 | -0.15385 | -0.28205 | -0.53846 |
  // | -0.07692 | 0.12308 | 0.02564 | 0.03077 |
  // | 0.35897 | 0.35897 | 0.43590 | 0.92308 |
  // | -0.69231 | -0.69231 | -0.76923 | -1.92308 |
  it('Calculating the inverse of another matrix', () => {
    const m = new Matrix(4, 4, [
      [8, -5, 9, 2],
      [7, 5, 6, 1],
      [-6, 0, 9, 6],
      [-3, 0, -9, -4],
    ])
    const inv = new Matrix(4, 4, [
      [-0.15385, -0.15385, -0.28205, -0.53846],
      [-0.07692, 0.12308, 0.02564, 0.03077],
      [0.35897, 0.35897, 0.4359, 0.92308],
      [-0.69231, -0.69231, -0.76923, -1.92308],
    ])
    const mInverse = Matrix.inverse(m)
    expect(mInverse.equal(inv)).toEqual(true)
  })

  // Scenario: Calculating the inverse of a third matrix
  // Given the following 4x4 matrix A:
  // |9|3|0|9|
  // | -5 | -2 | -6 | -3 |
  // |-4| 9| 6| 4|
  // |-7| 6| 6| 2|
  // Then inverse(A) is the following 4x4 matrix:
  // | -0.04074 | -0.07778 | 0.14444 | -0.22222 |
  // | -0.07778 | 0.03333 | 0.36667 | -0.33333 |
  // | -0.02901 | -0.14630 | -0.10926 | 0.12963 |
  // | 0.17778 | 0.06667 | -0.26667 | 0.33333 |
  it('Calculating the inverse of a third matrix', () => {
    const m = new Matrix(4, 4, [
      [9, 3, 0, 9],
      [-5, -2, -6, -3],
      [-4, 9, 6, 4],
      [-7, 6, 6, 2],
    ])
    const inv = new Matrix(4, 4, [
      [-0.04074, -0.07778, 0.14444, -0.22222],
      [-0.07778, 0.03333, 0.36667, -0.33333],
      [-0.02901, -0.1463, -0.10926, 0.12963],
      [0.17778, 0.06667, -0.26667, 0.33333],
    ])
    const mInverse = Matrix.inverse(m)
    expect(mInverse.equal(inv)).toEqual(true)
  })

  // Scenario: Multiplying a product by its inverse
  // Given the following 4x4 matrix A:
  // | 3|-9| 7| 3|
  // | 3|-8| 2|-9|
  // |-4| 4| 4| 1|
  // |-6| 5|-1| 1|
  // And the following 4x4 matrix B:
  // |8|2|2|2|
  // | 3|-1| 7| 0|
  // |7|0|5|4|
  // | 6|-2| 0| 5|
  // And C ← A * B
  // Then C * inverse(B) = A
  it('Multiplying a product by its inverse', () => {
    const a = new Matrix(4, 4, [
      [3, -9, 7, 3],
      [3, -8, 2, -9],
      [-4, 4, 4, 1],
      [-6, 5, -1, 1],
    ])
    const b = new Matrix(4, 4, [
      [8, 2, 2, 2],
      [3, -1, 7, 0],
      [7, 0, 5, 4],
      [6, -2, 0, 5],
    ])

    const c = a.multiply(b)
    const bInverse = Matrix.inverse(b)
    expect(c.multiply(bInverse).equal(a)).toEqual(true)
  })
})
