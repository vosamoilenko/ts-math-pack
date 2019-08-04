import { Tupel, Point, Vector } from '../src/components'

describe('test tupel, vector and point operations', () => {
  // Scenario: A tuple with w=1.0 is a point
  // Given a ← tuple(4.3, -4.2, 3.1, 1.0)
  // Then a.x = 4.3
  // And a.y = -4.2
  // And a.z = 3.1
  // And a.w = 1.0
  // And a is a point
  // And a is not a vector
  it('should A tuple with w=1.0 is a point', () => {
    const tupel = new Tupel(4.3, -4.2, 3.1, 1.0)
    expect(tupel).toEqual(new Tupel(4.3, -4.2, 3.1, 1.0))
    expect(tupel.isPoint).toBe(true)
    expect(tupel.isVector).toBe(false)
  })

  // Scenario: A tuple with w=0 is a vector
  // Given a ← tuple(4.3, -4.2, 3.1, 0.0)
  // Then a.x = 4.3
  // And a.y = -4.2
  // And a.z = 3.1
  // And a.w = 0.0
  // And a is not a point
  // And a is a vector
  it('should A tuple with w=0 is a vector', () => {
    const tupel = new Tupel(4.3, -4.2, 3.1, 0.0)
    expect(tupel).toEqual(new Tupel(4.3, -4.2, 3.1, 0.0))
    expect(tupel.isPoint).toBe(false)
    expect(tupel.isVector).toBe(true)
  })

  // Scenario: point() creates tuples with w=1
  // Given p ← point(4, -4, 3)
  // Then p = tuple(4, -4, 3, 1)
  it('should point() creates tuples with w=1', () => {
    const p = new Point(4, -4, 3)
    expect(p).toEqual(new Tupel(4, -4, 3, 1))
  })

  // Scenario: vector() creates tuples with w=0
  // Given v ← vector(4, -4, 3)
  // Then v = tuple(4, -4, 3, 0)
  it('should vector() creates tuples with w=0', () => {
    const v = new Vector(4, -4, 3)
    expect(v).toEqual(new Tupel(4, -4, 3, 0))
  })

  // Scenario: Adding two tuples
  // Given a1 ← tuple(3, -2, 5, 1)
  // And a2 ← tuple(-2, 3, 1, 0)
  // Then a1 + a2 = tuple(1, 1, 6, 1)
  it('should Adding two tuples', () => {
    const a = new Tupel(3, -2, 5, 1)
    const b = new Tupel(-2, 3, 1, 0)
    expect(a.add(b)).toEqual(new Tupel(1, 1, 6, 1))
  })

  // Scenario: Adding point and vector
  it('should Adding point and vector', () => {
    const a = new Point(1, 1, 1)
    const b = new Vector(1, 1, 1)
    expect(a.add(b)).toEqual(new Point(2, 2, 2))
  })

  // Scenario: Subtracting two points
  // Given p1 ← point(3, 2, 1)
  // And p2 ← point(5, 6, 7)
  // Then p1 - p2 = vector(-2, -4, -6)
  it('should Subtracting two points', () => {
    const a = new Point(3, 2, 1)
    const b = new Point(5, 6, 7)
    expect(a.minus(b)).toEqual(new Vector(-2, -4, -6))
  })

  // Scenario: Subtracting a vector from a point
  // Given p ← point(3, 2, 1)
  // And v ← vector(5, 6, 7)
  // Then p - v = point(-2, -4, -6)
  it('should Subtracting a vector from a point', () => {
    const a = new Point(3, 2, 1)
    const b = new Vector(5, 6, 7)
    expect(a.minus(b)).toEqual(new Point(-2, -4, -6))
  })

  // Scenario: Subtracting two vectors
  // Given v1 ← vector(3, 2, 1)
  // And v2 ← vector(5, 6, 7)
  // Then v1 - v2 = vector(-2, -4, -6)
  it('should Subtracting two vectors', () => {
    const a = new Vector(3, 2, 1)
    const b = new Vector(5, 6, 7)
    expect(a.minus(b)).toEqual(new Vector(-2, -4, -6))
  })

  // Scenario: Subtracting a vector from the zero vector
  // Given zero ← vector(0, 0, 0)
  // And v ← vector(1, -2, 3)
  // Then zero - v = vector(-1, 2, -3)
  it('should Subtracting a vector from the zero vector', () => {
    const a = new Vector(1, -2, 3)
    const b = new Vector(0, 0, 0)
    debugger
    expect(b.minus(a)).toEqual(new Vector(-1, 2, -3))
  })

  // Scenario: Negating a tuple
  // Given a ← tuple(1, -2, 3, -4)
  // Then -a = tuple(-1, 2, -3, 4)
  it('should Negating a tuple', () => {
    const t = new Tupel(1, -2, 3, -4)
    expect(Tupel.negate(t)).toEqual(new Tupel(-1, 2, -3, 4))
  })

  // Scenario: Multiplying a tuple by a scalar
  // Given a ← tuple(1, -2, 3, -4)
  // Then a * 3.5 = tuple(3.5, -7, 10.5, -14)
  // Then a * 0.5 = tuple(0.5, -1, 1.5, -2)
  it('should Multiplying a tuple by a scalar', () => {
    const t = new Tupel(1, -2, 3, -4)
    expect(t.multiply(3.5)).toEqual(new Tupel(3.5, -7, 10.5, -14))
    expect(t.multiply(0.5)).toEqual(new Tupel(0.5, -1, 1.5, -2))
  })

  // Scenario: Dividing a tuple by a scalar
  // Given a ← tuple(1, -2, 3, -4)
  // Then a / 2 = tuple(0.5, -1, 1.5, -2)
  it('should Dividing a tuple by a scalar', () => {
    const t = new Tupel(1, -2, 3, -4)
    expect(t.divide(2)).toEqual(new Tupel(0.5, -1, 1.5, -2))
  })

  // Scenario: Computing the magnitude of vectors
  // Given v1 ← vector(1, 0, 0)
  // Given v2 ← vector(1, 1, 0)
  // Given v3 ← vector(1, 0, 1)
  // Given v4 ← vector(1, 2, 3)
  // Given v5 ← vector(-1, -2, -3)
  // Then magnitude = 1
  // Then magnitude = 1
  // Then magnitude = 1
  // Then magnitude = sqrt(14)
  // Then magnitude = sqrt(14)
  it('should Computing the magnitude of vector(1, 0, 0)', () => {
    const v1 = new Vector(1, 0, 0)
    const v2 = new Vector(1, 1, 0)
    const v3 = new Vector(1, 0, 1)
    const v4 = new Vector(1, 2, 3)
    const v5 = new Vector(-1, -2, -3)
    expect(v1.length).toBe(1)
    expect(v2.length).toBeCloseTo(1.41, 2)
    expect(v3.length).toBeCloseTo(1.41, 2)
    expect(v4.length).toBe(Math.sqrt(14))
    expect(v5.length).toBe(Math.sqrt(14))
  })

  // Scenario : Normalizing vectors
  // Given v ← vector(4, 0, 0)
  // Then normalize(v) = vector(1, 0, 0)
  // Given v ← vector(1, 2, 3)
  // Then normalize(v) = approximately vector(0.26726, 0.53452, 0.80178)
  // Given v ← vector(1, 2, 3)
  // When norm ← normalize(v)
  // Then magnitude(norm) = 1
  it('should Normalizing vectors', () => {
    const v1 = new Vector(4, 0, 0)
    const v2 = new Vector(1, 2, 3)

    expect(v1.normalize).toEqual(new Vector(1, 0, 0))
    expect(v2.normalize.equal(new Vector(0.26726, 0.53452, 0.80178))).toEqual(
      true,
    )
    expect(v2.normalize.length).toBe(1)
  })

  // Scenario: The dot product of two tuples
  // Given a ← vector(1, 2, 3)
  // And b ← vector(2, 3, 4)
  // Then dot(a, b) = 20
  it('should The dot product of two tuples', () => {
    const a = new Vector(1, 2, 3)
    const b = new Vector(2, 3, 4)
    expect(Tupel.dot(a, b)).toBe(20)
  })

  //Scenario: The cross product of two vectors
  //Given a ← vector(1, 2, 3)
  //And b ← vector(2, 3, 4)
  //Then cross(a, b) = vector(-1, 2, -1)
  //And cross(b, a) = vector(1, -2, 1)
  it('should The cross product of two vectors', () => {
    const a = new Vector(1, 2, 3)
    const b = new Vector(2, 3, 4)
    expect(Tupel.cross(a, b)).toEqual(new Vector(-1, 2, -1))
    expect(Tupel.cross(b, a)).toEqual(new Vector(1, -2, 1))
  })
})
