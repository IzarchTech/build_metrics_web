import Blinding from "@/interfaces/blinding";
import Concrete from "@/interfaces/concrete";
import Excavation from "@/interfaces/excavation";
import Formwork from "@/interfaces/formwork";

/**
 * Rectangular drain
 */
class RectangularDrain implements Excavation, Blinding, Formwork, Concrete {
  /**
   * Drain width
   */
  width: number;

  /**
   * Drain depth
   */
  depth: number;

  /**
   * Span
   */
  span: number;

  /**
   * Drain thickness
   */
  thickness: number;

  /**
   * Blinding thickness
   */
  blindingThickness: number;

  /**
   * Working allowance
   */
  workingAllowance: number;

  /**
   * Overall depth of the drain
   */
  drainDepth: number;

  /**
   * Overall width of the drain
   */
  drainWidth: number;

  /**
   * Excavation depth
   */
  excavationDepth: number;

  /**
   * Excavation width
   */
  excavationWidth: number;

  /**
   * Default constructor
   *
   * @param width Width of the drain
   * @param depth Depth of the drain
   * @param span Span
   * @param thickness Thickness of the drain
   * @param blindingThickness Blinding thickness
   * @param workingAllowance Working allowance
   */
  constructor(
    width: number,
    depth: number,
    span: number,
    thickness: number,
    blindingThickness: number,
    workingAllowance = 0,
  ) {
    if (width <= 0.0) throw new Error("width should be greater than 0.0");

    if (depth <= 0.0) throw new Error("depth should be greater than 0.0");

    if (span <= 0.0) throw new Error("span should be greater than 0.0");

    if (thickness <= 0.0)
      throw new Error("thickness should be greater than 0.0");

    this.width = width;
    this.depth = depth;
    this.span = span;
    this.thickness = thickness;
    this.blindingThickness = blindingThickness;
    this.workingAllowance = workingAllowance;

    const drainDepth = depth + thickness;
    const drainWidth = 2 * thickness + width;

    this.drainDepth = drainDepth;
    this.drainWidth = drainWidth;

    this.excavationDepth = drainDepth + blindingThickness;
    this.excavationWidth = 2 * workingAllowance + drainWidth;
  }

  /**
   * @inheritdoc
   */
  getAreaofFormwork(): number {
    // return 2 * Span * (Depth + DrainDepth);
    return 2 * this.span * (this.depth + this.drainDepth);
  }

  /**
   * @inheritdoc
   */
  getVolumeofBlinding(): number {
    return this.excavationWidth * this.blindingThickness * this.span;
  }

  /**
   * @inheritdoc
   */
  getVolumeOfExcavation(): number {
    return this.excavationWidth * this.excavationDepth * this.span;
  }

  /**
   * @inheritdoc
   */
  getVolumeOfConcrete(): number {
    return (2 * this.drainDepth + this.width) * this.span * this.thickness;
  }
}

export default RectangularDrain;
