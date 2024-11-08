import { describe, expect, it } from "vitest";

import RectangularDrain from "./rectangular-drain";

describe("Rectangular Drain", () => {
  const data = [
    new RectangularDrain(0.6, 0.6, 1.0, 0.225, 0.05, 0.225),
    new RectangularDrain(1.5, 1.5, 1.0, 0.15, 0.05, 0.225),
  ];

  it.each(
    [0.83, 1.65].map((expectedResult, index) => {
      const drain = data[index]!;

      return {
        value: drain.drainDepth,
        expectedResult,
        name: `${drain.width} x ${drain.depth}`,
      };
    }),
  )("Calculates drain depth [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [1.05, 1.8].map((expectedResult, index) => {
      const drain = data[index]!;

      return {
        value: drain.drainWidth,
        expectedResult,
        name: `${drain.width} x ${drain.depth}`,
      };
    }),
  )("Calculates drain width [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [1.5, 2.25].map((expectedResult, index) => {
      const drain = data[index]!;

      return {
        value: drain.excavationWidth,
        expectedResult,
        name: `${drain.width} x ${drain.depth}`,
      };
    }),
  )("Calculates excavation width [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [0.88, 1.7].map((expectedResult, index) => {
      const drain = data[index]!;

      return {
        value: drain.excavationDepth,
        expectedResult,
        name: `${drain.width} x ${drain.depth}`,
      };
    }),
  )("Calculates excavation depth [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [1.313, 3.825].map((expectedResult, index) => {
      const drain = data[index]!;

      return {
        value: drain.getVolumeOfExcavation(),
        expectedResult,
        name: `${drain.width} x ${drain.depth}`,
      };
    }),
  )("Calculates volume of excavation [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.001);
  });

  it.each(
    [0.075, 0.113].map((expectedResult, index) => {
      const drain = data[index]!;

      return {
        value: drain.getVolumeofBlinding(),
        expectedResult,
        name: `${drain.width} x ${drain.depth}`,
      };
    }),
  )("Calculates volume of blinding [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.001);
  });

  it.each(
    [2.85, 6.3].map((expectedResult, index) => {
      const drain = data[index]!;

      return {
        value: drain.getAreaofFormwork(),
        expectedResult,
        name: `${drain.width} x ${drain.depth}`,
      };
    }),
  )("Calculates area of form-work [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.001);
  });

  it.each(
    [0.51, 0.72].map((expectedResult, index) => {
      const drain = data[index]!;

      return {
        value: drain.getVolumeOfConcrete(),
        expectedResult,
        name: `${drain.width} x ${drain.depth}`,
      };
    }),
  )("Calculates volume of concrete [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });
});
