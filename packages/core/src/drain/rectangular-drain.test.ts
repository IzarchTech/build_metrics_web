import { describe, expect, it } from "vitest";

import RectangularDrain from "./rectangular-drain";

describe("Rectangular Drain", () => {
  const data = [
    new RectangularDrain(0.6, 0.6, 1.0, 0.225, 0.05, 0.225),
    new RectangularDrain(1.5, 1.5, 1.0, 0.15, 0.05, 0.225),
  ];

  it("Calculates drain depth", () => {
    const expectedResult = [0.83, 1.65];

    data.forEach((drain, idx) => {
      expect(drain.drainDepth).approximately(expectedResult[idx] ?? 0, 0.01);
    });
  });

  it("Calculates drain width", () => {
    const expectedResult = [1.05, 1.8];

    data.forEach((drain, idx) => {
      expect(drain.drainWidth).approximately(expectedResult[idx] ?? 0, 0.01);
    });
  });

  it("Calculates excavation width", () => {
    const expectedResult = [1.5, 2.25];

    data.forEach((drain, idx) => {
      expect(drain.excavationWidth).approximately(
        expectedResult[idx] ?? 0,
        0.01,
      );
    });
  });

  it("Calculates excavation depth", () => {
    const expectedResult = [0.88, 1.7];

    data.forEach((drain, idx) => {
      expect(drain.excavationDepth).approximately(
        expectedResult[idx] ?? 0,
        0.01,
      );
    });
  });

  it("Calculates volume of excavation", () => {
    const expectedResult = [1.313, 3.825];

    data.forEach((drain, idx) => {
      expect(drain.getVolumeOfExcavation()).approximately(
        expectedResult[idx] ?? 0,
        0.001,
      );
    });
  });

  it("Calculates volume of blinding", () => {
    const expectedResult = [0.075, 0.113];

    data.forEach((drain, idx) => {
      expect(drain.getVolumeofBlinding()).approximately(
        expectedResult[idx] ?? 0,
        0.001,
      );
    });
  });

  it("Calculates area of form-work", () => {
    const expectedResult = [2.85, 6.3];

    data.forEach((drain, idx) => {
      expect(drain.getAreaofFormwork()).approximately(
        expectedResult[idx] ?? 0,
        0.001,
      );
    });
  });

  it("Calculates volume of concrete", () => {
    const expectedResult = [0.51, 0.72];

    data.forEach((drain, idx) => {
      expect(drain.getVolumeOfConcrete()).approximately(
        expectedResult[idx] ?? 0,
        0.01,
      );
    });
  });
});
