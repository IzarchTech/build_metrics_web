import Concrete from "@/interfaces/concrete";
import Formwork from "@/interfaces/formwork";

/**
 * Rectangular column
 */
class RectangularColumn implements Formwork, Concrete {
  /**
   * Width of the column
   */
  width: number;

  /**
   * Breadth of the column
   */
  breadth: number;

  /**
   * Height of the column
   */
  height: number;

  /**
   * Default constructor
   *
   * @param width Width of the column
   * @param breadth Breadth of the column
   * @param height Height of the column
   */
  constructor(width: number, breadth: number, height: number) {
    if (width <= 0.0) throw new Error("width should be greater than 0.0");
    if (breadth <= 0.0) throw new Error("breadth should be greater than 0.0");
    if (height <= 0.0) throw new Error("height should be greater than 0.0");

    this.width = width;
    this.breadth = breadth;
    this.height = height;
  }

  /**
   * @inheritdoc
   */
  getVolumeOfConcrete(): number {
    return this.width * this.breadth * this.height;
  }

  /**
   * @inheritdoc
   */
  getAreaofFormwork(): number {
    return 2 * this.height * (this.width + this.breadth);
  }
}

export default RectangularColumn;
