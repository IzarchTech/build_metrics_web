import Concrete from "@/interfaces/concrete";
import Formwork from "@/interfaces/formwork";

/**
 * Rectangular beam
 */
class RectangularBeam implements Formwork, Concrete {
  /**
   * Width of the beam
   */
  width: number;

  /**
   * Depth of the beam
   */
  depth: number;

  /**
   * Span of the beam
   */
  span: number;

  /**
   * Default constructor
   *
   * @param width Width of the beam
   * @param depth Depth of the beam
   * @param span Span of the beam
   */
  constructor(width: number, depth: number, span: number) {
    if (width <= 0.0) throw new Error("width should be greater than 0.0");
    if (depth <= 0.0) throw new Error("depth should be greater than 0.0");
    if (span <= 0.0) throw new Error("span should be greater than 0.0");

    this.depth = depth;
    this.width = width;
    this.span = span;
  }

  /**
   * @inheritdoc
   */
  getVolumeOfConcrete(): number {
    return this.width * this.depth * this.span;
  }

  /**
   * @inheritdoc
   */
  getAreaofFormwork(): number {
    return this.span * (2 * this.depth + this.width);
  }
}

export default RectangularBeam;
