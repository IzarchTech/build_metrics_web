import { describe, expect, it } from "vitest";

import RectangularColumn from "./rectangular-column";

describe("Rectanngular Column", () => {
  const data = [
    new RectangularColumn(0.225, 0.225, 3.8),
    new RectangularColumn(0.9, 0.45, 3.8),
  ];

  it.each(
    [0.19, 1.54].map((expectedResult, index) => {
      const column = data[index]!;

      return {
        value: column.getVolumeOfConcrete(),
        expectedResult,
        name: `${column.width} x ${column.breadth} x ${column.height}`,
      };
    }),
  )("Calculates volume of concrete [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [3.42, 10.2].map((expectedResult, index) => {
      const column = data[index]!;

      return {
        value: column.getAreaofFormwork(),
        expectedResult,
        name: `${column.width} x ${column.breadth} x ${column.height}`,
      };
    }),
  )("Calculates area of form-worke [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });
});
