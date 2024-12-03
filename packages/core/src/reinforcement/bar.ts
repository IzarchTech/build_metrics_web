/**
 * Bar size
 *
 * @remarks Unit: mm (millimeter)
 */
export type BarSize = 6 | 8 | 10 | 12 | 16 | 20 | 25 | 32 | 40;

/**
 * Reinforcement bar
 */
class Bar {
  /**
   * Bar size
   */
  barSize: BarSize;

  /**
   * Bar length
   */
  length: number;

  /**
   * Bar weight
   */
  private static readonly barWeight: Record<BarSize, number> = {
    6: 0.222,
    8: 0.395,
    10: 0.616,
    12: 0.888,
    16: 1.579,
    20: 2.466,
    25: 3.854,
    32: 6.313,
    40: 9.864,
  };

  /**
   * Bar size in meters
   */
  private static readonly barSizeInMeters: Record<BarSize, number> = {
    6: 6e-3,
    8: 8e-3,
    10: 10e-3,
    12: 12e-3,
    16: 16e-3,
    20: 20e-3,
    25: 25e-3,
    32: 32e-3,
    40: 40e-3,
  };

  /**
   * Default constructor
   *
   * @param barSize Bar size
   * @param length Bar length
   */
  private constructor(barSize: BarSize, length: number) {
    this.barSize = barSize;
    this.length = length;
  }

  /**
   * Get bar weight
   *
   * @returns weight in kg
   */
  getWeight(): number {
    return this.length * Bar.barWeight[this.barSize];
  }

  /**
   * Create bar with shape code 20
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @returns Bar
   */
  static createShapeCode20(barSize: BarSize, a: number): Bar {
    return new Bar(barSize, a);
  }

  /**
   *  Create bar with shape code 32
   *
   * @param barSize bar size
   * @param a Length of segment a
   * @param h Hook allowance
   * @returns Bar
   */
  static createShapeCode32(barSize: BarSize, a: number, h: number): Bar {
    return new Bar(barSize, a + h);
  }

  /**
   * Create bar with shape code 33
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param h Hook allowance
   * @returns Bar
   */
  static createShapeCode33(barSize: BarSize, a: number, h: number): Bar {
    return new Bar(barSize, a + 2 * h);
  }

  /**
   * Create bar with shape code 34
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param n Bend allowance
   * @returns Bar
   */
  static createShapeCode34(barSize: BarSize, a: number, n: number): Bar {
    return new Bar(barSize, a + n);
  }

  /**
   * Create bar with shape code 35
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param n Bend allowance
   * @returns Bar
   */
  static createShapeCode35(barSize: BarSize, a: number, n: number): Bar {
    return new Bar(barSize, a + 2 * n);
  }

  /**
   * Create bar with shape code 36
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param d Length of segment d
   * @param e Length of segment e
   * @returns Bar
   */
  static createShapeCode36(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
  ): Bar {
    return new Bar(
      barSize,
      a + c + e + 0.57 * (b + d) - Math.PI * Bar.barSizeInMeters[barSize],
    );
  }

  /**
   * Create bar with shape code 37
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param r Radius of band
   * @returns Bar
   */
  static createShapeCode37(
    barSize: BarSize,
    a: number,
    b: number,
    r: number,
  ): Bar {
    return new Bar(barSize, a + b - 0.5 * r - Bar.barSizeInMeters[barSize]);
  }

  /**
   * Create bar with shape code 38
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param r Radius of band
   * @returns Bar
   */
  static createShapeCode38(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    r: number,
  ): Bar {
    return new Bar(
      barSize,
      a + b + c - 2 * (0.5 * r + Bar.barSizeInMeters[barSize]),
    );
  }

  /**
   * Create bar with shape code 39
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @returns Bar
   */
  static createShapeCode39(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
  ): Bar {
    return new Bar(
      barSize,
      a + 0.57 * b + c - 0.5 * Math.PI * Bar.barSizeInMeters[barSize],
    );
  }

  /**
   * Create bar with shape code 41
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param d Length of segment d
   * @returns Bar
   * @throws {Error} If d is less than 2 times the bar size
   */
  static createShapeCode41(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    d: number,
  ): Bar {
    if (d < 2 * Bar.barSizeInMeters[barSize])
      throw new Error(`d must be at least ${2 * Bar.barSizeInMeters[barSize]}`);

    return new Bar(barSize, a + b + c);
  }

  /**
   * Create bar with shape code 42
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param n Bend allowance
   * @returns Bar
   */
  static createShapeCode42(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    n: number,
  ): Bar {
    return new Bar(barSize, a + b + c + n);
  }

  /**
   * Create bar with shape code 43
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param e Length of segment e
   * @returns Bar
   */
  static createShapeCode43(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    e: number,
  ): Bar {
    return new Bar(barSize, a + 2 * b + c + e);
  }

  /**
   * Create bar with shape code 45
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param r Radius of band
   * @returns Bar
   * @throws {Error} If r is less than the bar size
   */
  static createShapeCode45(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    r: number,
  ): Bar {
    // Ensure the radius is at least the size of the bar
    if (r < Bar.barSizeInMeters[barSize])
      throw new Error(`r must be at least ${Bar.barSizeInMeters[barSize]}`);

    return new Bar(barSize, a + b + c - 0.5 * r + Bar.barSizeInMeters[barSize]);
  }

  /**
   * Create bar with shape code 48
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @returns Bar
   */
  static createShapeCode48(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
  ): Bar {
    return new Bar(barSize, a + b + c);
  }

  /**
   * Create bar with shape code 49
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @returns Bar
   */
  static createShapeCode49(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
  ): Bar {
    return new Bar(barSize, a + b + c);
  }

  /**
   * Create bar with shape code 51
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param r Radius of band
   * @returns Bar
   */
  static createShapeCode51(
    barSize: BarSize,
    a: number,
    b: number,
    r: number,
  ): Bar {
    return new Bar(barSize, a + b - 0.5 * r + Bar.barSizeInMeters[barSize]);
  }

  /**
   * Create bar with shape code 52
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param d Length of segment d
   * @param r Radius of band
   * @returns Bar
   */
  static createShapeCode52(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    d: number,
    r: number,
  ): Bar {
    return new Bar(
      barSize,
      a + b + c + d - 3 * (0.5 * r + Bar.barSizeInMeters[barSize]),
    );
  }

  /**
   * Create bar with shape code 53
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param d Length of segment d
   * @param e Length of segment e
   * @param r Radius of band
   * @returns Bar
   */
  static createShapeCode53(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    r: number,
  ): Bar {
    return new Bar(
      barSize,
      a + b + c + d + e - 4 * (0.5 * r + Bar.barSizeInMeters[barSize]),
    );
  }

  /**
   * Create bar with shape code 54
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param r Radius of band
   * @returns Bar
   */
  static createShapeCode54(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    r: number,
  ): Bar {
    return new Bar(
      barSize,
      a + b + c - 2 * (0.5 * r + Bar.barSizeInMeters[barSize]),
    );
  }

  /**
   * Create bar with shape code 58
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param d Length of segment d
   * @param e Length of segment e
   * @param r Radius of band
   * @returns Bar
   */
  static createShapeCode58(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    r: number,
  ): Bar {
    return new Bar(
      barSize,
      a + b + c + d + e - 4 * (0.5 * r + Bar.barSizeInMeters[barSize]),
    );
  }

  /**
   * Create bar with shape code 60
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @returns Bar
   */
  static createShapeCode60(barSize: BarSize, a: number, b: number): Bar {
    return new Bar(barSize, 2 * (a + b) + 20 * Bar.barSizeInMeters[barSize]);
  }

  /**
   * Create bar with shape code 62
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param c Length of segment c
   * @returns Bar
   */
  static createShapeCode62(barSize: BarSize, a: number, c: number): Bar {
    return new Bar(barSize, a + c);
  }

  /**
   * Create bar with shape code 65
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @returns Bar
   */
  static createShapeCode65(barSize: BarSize, a: number): Bar {
    return new Bar(barSize, a);
  }

  /**
   * Create bar with shape code 72
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @returns Bar
   */
  static createShapeCode72(barSize: BarSize, a: number, b: number): Bar {
    return new Bar(barSize, 2 * a + b + 25 * Bar.barSizeInMeters[barSize]);
  }

  /**
   * Create bar with shape code 73
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @returns Bar
   */
  static createShapeCode73(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
  ): Bar {
    return new Bar(barSize, 2 * a + b + c + 10 * Bar.barSizeInMeters[barSize]);
  }

  /**
   * Create bar with shape code 74
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @returns Bar
   */
  static createShapeCode74(barSize: BarSize, a: number, b: number): Bar {
    return new Bar(barSize, 2 * a + 3 * b + 20 * Bar.barSizeInMeters[barSize]);
  }

  /**
   * Create bar with shape code 75
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param d Length of segment d
   * @param e Length of segment e
   * @returns Bar
   */
  static createShapeCode75(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
  ): Bar {
    return new Bar(
      barSize,
      a + b + c + 2 * d + e + 10 * Bar.barSizeInMeters[barSize],
    );
  }

  /**
   * Create bar with shape code 81
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @returns Bar
   */
  static createShapeCode81(barSize: BarSize, a: number, b: number): Bar {
    return new Bar(barSize, 2 * a + 3 * b + 22 * Bar.barSizeInMeters[barSize]);
  }

  /**
   * Create bar with shape code 83
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param d Length of segment d
   * @param r Radius of band
   * @returns Bar
   */
  static createShapeCode83(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    d: number,
    r: number,
  ): Bar {
    return new Bar(
      barSize,
      a + 2 * b + c + d - 4 * (0.5 * r + Bar.barSizeInMeters[barSize]),
    );
  }

  /**
   * Create bar with shape code 85
   *
   * @param barSize Bar size
   * @param a Length of segment a
   * @param b Length of segment b
   * @param c Length of segment c
   * @param d Length of segment d
   * @param r Radius of band
   * @returns Bar
   */
  static createShapeCode85(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
    d: number,
    r: number,
  ): Bar {
    return new Bar(
      barSize,
      a + b + 0.57 * c + d - 0.5 * r - 2.57 * Bar.barSizeInMeters[barSize],
    );
  }

  /**
   * Create bar with shape code 86
   *
   * @param barSize Bar size
   * @param a Internal diameter
   * @param b Pitch of helix
   * @param c Overall height of helix
   * @returns Bar
   * @throws {Error} If b is greater than or equal to a/5
   */
  static createShapeCode86(
    barSize: BarSize,
    a: number,
    b: number,
    c: number,
  ): Bar {
    // Check if b is less than a/5
    if (b < a / 5) {
      // Calculate length using the provided formula
      const length =
        (c / b) * Math.PI * (a + Bar.barSizeInMeters[barSize]) +
        8 * Bar.barSizeInMeters[barSize];
      return new Bar(barSize, length);
    }

    // Throw an error if b is greater than or equal to a/5
    throw new Error("Case where b >= a/5 not implemented");
  }
}

export default Bar;
