import Blinding from "@/interfaces/blinding";
import Concrete from "@/interfaces/concrete";
import Excavation from "@/interfaces/excavation";
import Formwork from "@/interfaces/formwork";

/**
 * Rectangular culvert
 */
class RectangularCulvert implements Excavation, Blinding, Formwork, Concrete {
  /**
   * Width of the cell
   */
  width: number;

  /**
   * Depth of the cell
   */
  depth: number;

  /**
   * Span of the culvert
   */
  span: number;

  /**
   * Thickness of the culvert
   */
  thickness: number;

  /**
   * Blinding thickness
   */
  blindingThickness: number;

  /**
   * Number of cells
   */
  noOfCells: number;

  /**
   * Working allowance
   */
  workingAllowance: number;

  /**
   * Culvert depth
   */
  culvertDepth: number;

  /**
   * Culvert width
   */
  culvertWidth: number;

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
   * @param width Width of the cell
   * @param depth Depth of the cell
   * @param span Span of the culvert
   * @param thickness Thickness of the culvert
   * @param blindingThickness Blinding thickness
   * @param noOfCells Number of cells
   * @param workingAllowance Working allowance
   */
  constructor(
    width: number,
    depth: number,
    span: number,
    thickness: number,
    blindingThickness: number,
    noOfCells: number = 1,
    workingAllowance: number = 0,
  ) {
    if (width <= 0.0) throw new Error("width should be greater than 0.0");

    if (depth <= 0.0) throw new Error("depth should be greater than 0.0");

    if (span <= 0.0) throw new Error("span should be greater than 0.0");

    if (thickness <= 0.0)
      throw new Error("thickness should be greater than 0.0");

    if (noOfCells < 1) throw new Error("noOfCells should be greater than 0.0");

    this.width = width;
    this.depth = depth;
    this.span = span;
    this.thickness = thickness;
    this.blindingThickness = blindingThickness;
    this.noOfCells = noOfCells;
    this.workingAllowance = workingAllowance;

    const culvertDepth = depth + 2 * thickness;
    const excavationDepth = culvertDepth + blindingThickness;
    const culvertWidth = thickness * (noOfCells + 1) + noOfCells * width;
    const excavationWidth = culvertWidth + 2 * workingAllowance;

    this.culvertDepth = culvertDepth;
    this.culvertWidth = culvertWidth;
    this.excavationDepth = excavationDepth;
    this.excavationWidth = excavationWidth;
  }

  /**
   * @inheritdoc
   */
  getVolumeOfExcavation(): number {
    return this.excavationDepth * this.excavationWidth * this.span;
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
  getAreaofFormwork(): number {
    const innerFace = (2 * this.depth + this.width) * this.span;
    const externalFace = 2 * this.culvertDepth * this.span;
    const fluidFlowFace =
      2 * (this.getAreaOfFluidFlowFace() - this.getAreaOfHollowSection());
    return innerFace + externalFace + fluidFlowFace;
  }

  /**
   * @inheritdoc
   */
  getVolumeOfConcrete(): number {
    return (
      this.span *
      (this.getAreaOfFluidFlowFace() - this.getAreaOfHollowSection())
    );
  }

  //#region Private methods

  /**
   * Get area of hollow section
   *
   * @returns Area of hollow section
   */
  private getAreaOfHollowSection(): number {
    return this.noOfCells * this.width * this.depth;
  }

  /**
   * Get area of fluid flow face
   *
   * @returns Area of fluid flow face
   */
  private getAreaOfFluidFlowFace(): number {
    return this.culvertWidth * this.culvertDepth;
  }
  //#endregion
}

export default RectangularCulvert;
