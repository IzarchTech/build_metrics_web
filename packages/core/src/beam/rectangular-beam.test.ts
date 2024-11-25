import { describe, expect, it } from "vitest";

import RectangularBeam from "./rectangular-beam";

describe("Rectangular beam", () => {
  const data = [
    new RectangularBeam(0.225, 0.225, 1.0),
    new RectangularBeam(1.2, 1.3, 1.0),
  ];

  it.each(
    [0.05, 1.56].map((expectedResult, index) => {
      const beam = data[index]!;

      return {
        value: beam.getVolumeOfConcrete(),
        expectedResult,
        name: `Beam - ${beam.width} x ${beam.depth}`,
      };
    }),
  )("Calculates volume of concrete [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });

  it.each(
    [0.68, 3.8].map((expectedResult, index) => {
      const beam = data[index]!;

      return {
        value: beam.getAreaofFormwork(),
        expectedResult,
        name: `Beam - ${beam.width} x ${beam.depth}`,
      };
    }),
  )("Calculates area of form-work [$name]", ({ value, expectedResult }) => {
    expect(value).approximately(expectedResult, 0.01);
  });
});
