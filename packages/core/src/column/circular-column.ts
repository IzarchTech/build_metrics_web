import Concrete from "@/interfaces/concrete";
import Formwork from "@/interfaces/formwork";

/**
 * Circular column
 */
class CircularColumn implements Formwork, Concrete {
  radius: number;
  height: number;

  /**
   * Default constructor
   * @param radius Radius of the column
   * @param height Height of the column
   */
  constructor(radius: number, height: number) {
    if (height <= 0.0) throw new Error("height should be greater than 0.0");
    if (radius <= 0.0) throw new Error("radius should be greater than 0.0");

    this.radius = radius;
    this.height = height;
  }

  /**
   * @inheritdoc
   */
  getVolumeOfConcrete(): number {
    return Math.PI * Math.pow(this.radius, 2) * this.height;
  }

  /**
   * @description Lateral area only
   * @inheritdoc
   */
  getAreaofFormwork(): number {
    // Lateral area only
    return 2 * Math.PI * this.radius * this.height;
  }

  /**
   * Create circular column with diameter
   *
   * @param height Height of the column
   * @param diameter Diameter of the column
   * @returns Circular column with diameter
   */
  static createCircularColumnWithDiameter(
    height: number,
    diameter: number,
  ): CircularColumn {
    if (diameter <= 0.0)
      throw new Error("diameter should not be less than 0.0");
    return new CircularColumn(diameter / 2, height);
  }
}

export default CircularColumn;
