import { describe, expect, it } from "vitest";

import BoxCulvert from "./box-culvert";

describe("Box Culvert", () => {
  const data = [
    new BoxCulvert(0.9, 0.9, 1.0, 0.15, 0.05, 1, 0.225),
    new BoxCulvert(0.9, 0.9, 1.0, 0.15, 0.05, 3, 0.225),
  ];

  it.each(
    [1.2, 3.3].map((expectedResult, index) => {
      const culvert = data[index]!;

      return {
        value: culvert.culvertWidth,
        expectedResult,
        name: `${culvert.width} x ${culvert.depth} x ${culvert.span}`,
      };
    }),
  )("Calculates culvert width [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [1.2, 1.2].map((expectedResult, index) => {
      const culvert = data[index]!;

      return {
        value: culvert.culvertDepth,
        expectedResult,
        name: `${culvert.width} x ${culvert.depth} x ${culvert.span}`,
      };
    }),
  )("Calculates culvert depth [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [1.25, 1.25].map((expectedResult, index) => {
      const culvert = data[index]!;

      return {
        value: culvert.excavationDepth,
        expectedResult,
        name: `${culvert.width} x ${culvert.depth} x ${culvert.span}`,
      };
    }),
  )("Calculates excavation depth [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [1.65, 3.75].map((expectedResult, index) => {
      const culvert = data[index]!;

      return {
        value: culvert.excavationWidth,
        expectedResult,
        name: `${culvert.width} x ${culvert.depth} x ${culvert.span}`,
      };
    }),
  )("Calculates excavation width [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [0.63, 1.53].map((expectedResult, index) => {
      const culvert = data[index]!;

      return {
        value: culvert.getVolumeOfConcrete(),
        expectedResult,
        name: `${culvert.width} x ${culvert.depth} x ${culvert.span}`,
      };
    }),
  )("Calculates volume of concrete [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [2.06, 4.69].map((expectedResult, index) => {
      const culvert = data[index]!;

      return {
        value: culvert.getVolumeOfExcavation(),
        expectedResult,
        name: `${culvert.width} x ${culvert.depth} x ${culvert.span}`,
      };
    }),
  )("Calculates volume of excavation [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [0.08, 0.19].map((expectedResult, index) => {
      const culvert = data[index]!;

      return {
        value: culvert.getVolumeofBlinding(),
        expectedResult,
        name: `${culvert.width} x ${culvert.depth} x ${culvert.span}`,
      };
    }),
  )("Calculates volume of blinding [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });
});
