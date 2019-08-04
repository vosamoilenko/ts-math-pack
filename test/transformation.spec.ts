import { Matrix, Point, Vector } from '../src/components'

describe('test transformation', () => {
  // Scenario: Multiplying by a translation matrix
  // Given transform ← translation(5, -3, 2)
  // And p ← point(-3, 4, 5)
  // Then transform * p = point(2, 1, 7)
  it('Multiplying by a translation matrix', () => {
    const t = Matrix.translationMatrix(5, -3, 2)
    const p = new Point(-3, 4, 5)
    expect(t.multiplyTupel(p)).toEqual(new Point(2, 1, 7))
  })

  // Scenario: Multiplying by the inverse of a translation matrix
  // Given transform ← translation(5, -3, 2)
  // And inv ← inverse(transform)
  // And p ← point(-3, 4, 5)
  // Then inv * p = point(-8, 7, 3)
  it('Multiplying by the inverse of a translation matrix', () => {
    const t = Matrix.inverse(Matrix.translationMatrix(5, -3, 2))
    const p = new Point(-3, 4, 5)
    expect(t.multiplyTupel(p)).toEqual(new Point(-8, 7, 3))
  })

  // Scenario: Translation does not affect vectors
  // Given transform ← translation(5, -3, 2)
  // And v ← vector(-3, 4, 5)
  // Then transform * v = v
  it('Translation does not affect vectors', () => {
    const t = Matrix.translationMatrix(5, -3, 2)
    const v = new Vector(-3, 4, 5)
    expect(t.multiplyTupel(v)).toEqual(v)
  })

  // SCALING
  // Scenario: A scaling matrix applied to a point Given transform ← scaling(2, 3, 4)
  // And p ← point(-4, 6, 8)
  // Then transform * p = point(-8, 18, 32)
  it('A scaling matrix applied to a point Given transform ← scaling(2, 3, 4)', () => {
    const t = Matrix.scalingMatrix(2, 3, 4)
    const p = new Point(-4, 6, 8)
    expect(t.multiplyTupel(p)).toEqual(new Point(-8, 18, 32))
  })

  // Scenario: A scaling matrix applied to a vector Given transform ← scaling(2, 3, 4)
  // And v ← vector(-4, 6, 8)
  // Then transform * v = vector(-8, 18, 32)
  it('A scaling matrix applied to a vector Given transform ← scaling(2, 3, 4)', () => {
    const t = Matrix.scalingMatrix(2, 3, 4)
    const p = new Vector(-4, 6, 8)
    expect(t.multiplyTupel(p)).toEqual(new Vector(-8, 18, 32))
  })

  // Scenario: Multiplying by the inverse of a scaling matrix Given transform ← scaling(2, 3, 4)
  // And inv ← inverse(transform)
  // And v ← vector(-4, 6, 8)
  // Then inv * v = vector(-2, 2, 2)
  it('Multiplying by the inverse of a scaling matrix Given transform ← scaling(2, 3, 4)', () => {
    const t = Matrix.inverse(Matrix.scalingMatrix(2, 3, 4))
    const p = new Vector(-4, 6, 8)
    expect(t.multiplyTupel(p)).toEqual(new Vector(-2, 2, 2))
  })

  // Scenario: Reflection is scaling by a negative value
  // Given transform ← scaling(-1, 1, 1)
  // And p ← point(2, 3, 4)
  // Then transform * p = point(-2, 3, 4)
  it('Reflection is scaling by a negative value)', () => {
    const t = Matrix.scalingMatrix(-1, 1, 1)
    const p = new Point(2, 3, 4)
    expect(t.multiplyTupel(p)).toEqual(new Point(-2, 3, 4))
  })

  // ROTATION X
  // Scenario: Rotating a point around the x axis
  // Given p ← point(0, 1, 0)
  // And half_quarter ← rotation_x(π / 4)
  // And full_quarter ← rotation_x(π / 2)
  // Then half_quarter * p = point(0, √2/2, √2/2)
  // And full_quarter * p = point(0, 0, 1)
  it('Rotating a point around the x axis', () => {
    const p = new Point(0, 1, 0)
    const hq = Matrix.rotationXMatrix(Math.PI / 4)
    const fq = Matrix.rotationXMatrix(Math.PI / 2)
    expect(
      hq
        .multiplyTupel(p)
        .equal(new Point(0, Math.sqrt(2) / 2.0, Math.sqrt(2) / 2.0)),
    ).toEqual(true)
    expect(fq.multiplyTupel(p).equal(new Point(0, 0, 1))).toEqual(true)
  })

  // Scenario: The inverse of an x-rotation rotates in the opposite direction
  // Given p ← point(0, 1, 0)
  // And half_quarter ← rotation_x(π / 4)
  // And inv ← inverse(half_quarter)
  // Then inv * p = point(0, √2/2, -√2/2)
  it('The inverse of an x-rotation rotates in the opposite direction Given p ← point(0, 1, 0)', () => {
    const p = new Point(0, 1, 0)
    const hq = Matrix.rotationXMatrix(Math.PI / 4)
    const inv = Matrix.inverse(hq)
    expect(
      inv
        .multiplyTupel(p)
        .equal(new Point(0, Math.sqrt(2) / 2.0, -Math.sqrt(2) / 2.0)),
    ).toBe(true)
  })

  // ROTATION Y
  // Scenario: Rotating a point around the y axis Given p ← point(0, 0, 1)
  // And half_quarter ← rotation_y(π / 4)
  // And full_quarter ← rotation_y(π / 2)
  // Then half_quarter * p = point(√2/2, 0, √2/2)
  // And full_quarter * p = point(1, 0, 0)
  it('Rotating a point around the y axis Given p ← point(0, 0, 1)', () => {
    const p = new Point(0, 0, 1)
    const hq = Matrix.rotationYMatrix(Math.PI / 4)
    const fq = Matrix.rotationYMatrix(Math.PI / 2)

    expect(
      hq
        .multiplyTupel(p)
        .equal(new Point(Math.sqrt(2) / 2.0, 0, Math.sqrt(2) / 2.0)),
    ).toEqual(true)
    expect(fq.multiplyTupel(p).equal(new Point(1, 0, 0))).toEqual(true)
  })

  // ROTATION Z
  // Scenario: Rotating a point around the z axis
  // Given p ← point(0, 1, 0)
  // And half_quarter ← rotation_z(π / 4)
  // And full_quarter ← rotation_z(π / 2)
  // Then half_quarter * p = point(-√2/2, √2/2, 0)
  // And full_quarter * p = point(-1, 0, 0)
  it('Rotating a point around the z axis Given p ← point(0, 1, 0)', () => {
    const p = new Point(0, 1, 0)
    const hq = Matrix.rotationZMatrix(Math.PI / 4)
    const fq = Matrix.rotationZMatrix(Math.PI / 2)
    expect(
      hq
        .multiplyTupel(p)
        .equal(new Point(-Math.sqrt(2) / 2.0, Math.sqrt(2) / 2.0, 0)),
    ).toEqual(true)
    expect(fq.multiplyTupel(p).equal(new Point(-1, 0, 0))).toEqual(true)
  })

  // SHEARING
  // Scenario: A shearing transformation moves x in proportion to y
  // Given transform ← shearing(1, 0, 0, 0, 0, 0)
  // And p ← point(2, 3, 4)
  // Then transform * p = point(5, 3, 4)
  it('A shearing transformation moves x in proportion to y', () => {
    const t = Matrix.shearingMatrix(1, 0, 0, 0, 0, 0)
    const p = new Point(2, 3, 4)
    expect(t.multiplyTupel(p)).toEqual(new Point(5, 3, 4))
  })

  // Scenario: A shearing transformation moves x in proportion to z Given transform ← shearing(0, 1, 0, 0, 0, 0)
  // And p ← point(2, 3, 4)
  // Then transform * p = point(6, 3, 4)
  it('A shearing transformation moves x in proportion to z Given transform ← shearing(0, 1, 0, 0, 0, 0)', () => {
    const t = Matrix.shearingMatrix(0, 1, 0, 0, 0, 0)
    const p = new Point(2, 3, 4)
    expect(t.multiplyTupel(p)).toEqual(new Point(6, 3, 4))
  })
  // Scenario: A shearing transformation moves y in proportion to x Given transform ← shearing(0, 0, 1, 0, 0, 0)
  // And p ← point(2, 3, 4)
  // Then transform * p = point(2, 5, 4)
  it('A shearing transformation moves y in proportion to x Given transform ← shearing(0, 0, 1, 0, 0, 0)', () => {
    const t = Matrix.shearingMatrix(0, 0, 1, 0, 0, 0)
    const p = new Point(2, 3, 4)
    expect(t.multiplyTupel(p)).toEqual(new Point(2, 5, 4))
  })

  // Scenario: A shearing transformation moves y in proportion to z Given transform ← shearing(0, 0, 0, 1, 0, 0)
  // And p ← point(2, 3, 4)
  // Then transform * p = point(2, 7, 4)
  it('A shearing transformation moves y in proportion to z Given transform ← shearing(0, 0, 0, 1, 0, 0)', () => {
    const t = Matrix.shearingMatrix(0, 0, 0, 1, 0, 0)
    const p = new Point(2, 3, 4)
    expect(t.multiplyTupel(p)).toEqual(new Point(2, 7, 4))
  })

  // Scenario: A shearing transformation moves z in proportion to x Given transform ← shearing(0, 0, 0, 0, 1, 0)
  // And p ← point(2, 3, 4)
  // Then transform * p = point(2, 3, 6)
  it('A shearing transformation moves z in proportion to x Given transform ← shearing(0, 0, 0, 0, 1, 0)', () => {
    const t = Matrix.shearingMatrix(0, 0, 0, 0, 1, 0)
    const p = new Point(2, 3, 4)
    expect(t.multiplyTupel(p)).toEqual(new Point(2, 3, 6))
  })

  // Scenario: A shearing transformation moves z in proportion to y Given transform ← shearing(0, 0, 0, 0, 0, 1)
  // And p ← point(2, 3, 4)
  // Then transform * p = point(2, 3, 7)
  it('A shearing transformation moves z in proportion to y Given transform ← shearing(0, 0, 0, 0, 0, 1)', () => {
    const t = Matrix.shearingMatrix(0, 0, 0, 0, 0, 1)
    const p = new Point(2, 3, 4)
    expect(t.multiplyTupel(p)).toEqual(new Point(2, 3, 7))
  })

  // CHAINING TRANSFORMATION
  // Scenario: Individual transformations are applied in sequence Given p ← point(1, 0, 1)
  // And A ← rotation_x(π / 2)
  // And B ← scaling(5, 5, 5)
  // And C ← translation(10, 5, 7)
  //   # apply rotation first
  // When p2 ← A * p
  // Then p2 = point(1, -1, 0) # then apply scaling
  // When p3 ← B * p2
  // Then p3 = point(5, -5, 0) # then apply translation
  // When p4 ← C * p3
  // Then p4 = point(15, 0, 7)
  it('Individual transformations are applied in sequence Given p ← point(1, 0, 1)', () => {
    const p = new Point(1, 0, 1)
    const a = Matrix.rotationXMatrix(Math.PI / 2.0)
    const b = Matrix.scalingMatrix(5, 5, 5)
    const c = Matrix.translationMatrix(10, 5, 7)

    const p1 = a.multiplyTupel(p)
    const p2 = b.multiplyTupel(p1)
    const p3 = c.multiplyTupel(p2)
    expect(p1.equal(new Point(1, -1, 0))).toEqual(true)
    expect(p2.equal(new Point(5, -5, 0))).toEqual(true)
    expect(p3.equal(new Point(15, 0, 7))).toEqual(true)
  })

  // Scenario: Chained transformations must be applied in reverse order Given p ← point(1, 0, 1)
  // And A ← rotation_x(π / 2)
  // And B ← scaling(5, 5, 5)
  // And C ← translation(10, 5, 7)
  // When T ← C * B * A
  // Then T * p = point(15, 0, 7)
  it('Chained transformations must be applied in reverse order Given p ← point(1, 0, 1)', () => {
    const p = new Point(1, 0, 1)
    const a = Matrix.rotationXMatrix(Math.PI / 2.0)
    const b = Matrix.scalingMatrix(5, 5, 5)
    const c = Matrix.translationMatrix(10, 5, 7)

    const p1 = a.multiplyTupel(p)
    const p2 = b.multiplyTupel(p1)
    const p3 = c.multiplyTupel(p2)
    expect(p1.equal(new Point(1, -1, 0))).toEqual(true)
    expect(p2.equal(new Point(5, -5, 0))).toEqual(true)
    expect(p3.equal(new Point(15, 0, 7))).toEqual(true)
  })
})
