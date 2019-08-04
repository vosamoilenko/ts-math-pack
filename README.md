# ts-math-pack

Math library

[![Build Status](https://travis-ci.org/vosamoilenko/ts-math-pack.svg?branch=master)](https://travis-ci.org/vosamoilenko/ts-math-pack)
[![npm version](https://badge.fury.io/js/ts-math-pack.svg)](https://badge.fury.io/js/ts-math-pack)
[![Coverage Status](https://coveralls.io/repos/github/vosamoilenko/ts-math-pack/badge.svg?branch=master)](https://coveralls.io/github/vosamoilenko/ts-math-pack?branch=master)
![Last commit](https://badgen.net/github/last-commit/vosamoilenko/ts-math-pack)

[![Licence](https://badgen.net/badge/license/MIT/blue)](LICENCE.md)
[![Downloads per week](https://badgen.net/npm/dy/ts-math-node?color=blue)](https://npm-stat.com/charts.html?package=ts-math-pack&from=2019-08-4)
[![NPM dependent packages](https://badgen.net/npm/dependents/ts-math-pack?color=blue)](https://www.npmjs.com/browse/depended/ts-math-pack)
[![Github stars](https://badgen.net/github/stars/vosamoilenko/ts-math-pack)](https://github.com/vosamoilenko/ts-math-pack/stargazers)

[![Minified and gzipped size](https://badgen.net/bundlephobia/minzip/ts-math-pack?color=orange)](https://bundlephobia.com/result?p=ts-math-pack)
![Dependencies](https://badgen.net/david/dep/maninak/ts-math-pack?color=orange)

# API

## Tupel

### Props

- `x: number`
- `y: number`
- `z: number`
- `w: number`

### Getters

- `isVector: boolean`
- `isPoint: boolean`

### Methods

- `normalize: Tupel`
- `length: number`
- `add(tupel: Tupel): Tupel`
- `minus(tupel: Tupel): Tupel`
- `hadamardProduct(tupel: Tupel): Tupel`
- `multiply(scalar: number): Tupel`
- `divide(scalar: number): Tupel`
- `equal(tupel: Tupel): boolean`

### Methods (static)

- `negate(tupel: Tupel): Tupel`
- `dot(a: Tupel, b: Tupel): number`
- `cross(a: Tupel, b: Tupel): Tupel`

## Vector `extends Tupel`

### Props

- `w: number = 0`

## Point `extends Tupel`

### Props

- `w: number = 1`

## Matrix

### Props

- `rows: number`
- `columns: number`
- `_m: number[][]`

### Getter

- `dimensions: {rows: number;columns: number;}`

### Methods

- `at(y: number, x: number): number`
- `equal(m: Matrix): boolean`
- `insert(y: number, x: number, value: number): void`
- `multiplyMatrix(m: Matrix): Matrix`
- `multiplyTupel(target: Tupel | Point | Vector): Point | Vector`
- `multiply(target: Matrix): XOR<Matrix, Point>`

### Methods (static)

- `divide(m: Matrix, scalar: number): Matrix`
- `transpose(m: Matrix): Matrix`
- `copy(m: Matrix): Matrix`
- `cofactor(row: number, column: number, m: Matrix): number`
- `isInvertable(m: Matrix): boolean`
- `translationMatrix(x: number, y: number, z: number): Matrix`
- `rotationXMatrix(rad: number): Matrix`
- `rotationZMatrix(rad: number): Matrix`
- `identity(): Matrix`
- `submatrix(row: number, column: number, m: Matrix): Matrix`
- `shearingMatrix(Xy: number, Xz: number, Yx: number, Yz: number, Zx: number, Zy: number): Matrix`
- `minor(row: number, column: number, m: Matrix): number`
- `rotationYMatrix(rad: number): Matrix`
- `scalingMatrix(x: number, y: number, z: number): Matrix`
- `inverse(m: Matrix): Matrix`
- `determinant(m: Matrix): number`
