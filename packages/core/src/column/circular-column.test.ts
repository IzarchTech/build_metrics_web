import { describe, expect, it } from "vitest";
import CircularColumn from "./circular-column";

describe("Circular Column", () => {
  describe("Using radius", () => {
    const data = [new CircularColumn(0.3, 3.8), new CircularColumn(0.45, 3.1)];

    it.each(
      [1.07, 1.97].map((expectedResult, index) => {
        const column = data[index]!;

        return {
          value: column.getVolumeOfConcrete(),
          expectedResult,
          name: `r = ${column.radius}, h = ${column.height}`,
        };
      }),
    )("Calculates volume of concrete [$name]", ({ value, expectedResult }) => {
      expect(value).approximately(expectedResult, 0.01);
    });

    it.each(
      [7.16, 8.77].map((expectedResult, index) => {
        const column = data[index]!;

        return {
          value: column.getAreaofFormwork(),
          expectedResult,
          name: `r = ${column.radius}, h = ${column.height}`,
        };
      }),
    )("Calculates area of form-work [$name]", ({ value, expectedResult }) => {
      expect(value).approximately(expectedResult, 0.01);
    });
  });

  describe("Using diameter", () => {
    const data = [
      CircularColumn.createWithDiameter(0.6, 3.8),
      CircularColumn.createWithDiameter(0.9, 3.1),
    ];

    it.each(
      [1.07, 1.97].map((expectedResult, index) => {
        const column = data[index]!;

        return {
          value: column.getVolumeOfConcrete(),
          expectedResult,
          name: `r = ${column.radius}, h = ${column.height}`,
        };
      }),
    )("Calculates volume of concrete [$name]", ({ value, expectedResult }) => {
      expect(value).approximately(expectedResult, 0.01);
    });

    it.each(
      [7.16, 8.77].map((expectedResult, index) => {
        const column = data[index]!;

        return {
          value: column.getAreaofFormwork(),
          expectedResult,
          name: `r = ${column.radius}, h = ${column.height}`,
        };
      }),
    )("Calculates area of form-work [$name]", ({ value, expectedResult }) => {
      expect(value).approximately(expectedResult, 0.01);
    });
  });
});
