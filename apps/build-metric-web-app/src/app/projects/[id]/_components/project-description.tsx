"use client";

/**
 * The ProjectDescription component displays a description of the project.
 *
 * @param description - The project description.
 */
export function ProjectDescription({
  description,
}: Readonly<{ description: string | null }>) {
  /**
   * If the description is null or empty, return a dash, indicating that there is no description.
   */
  if (!description || description.length === 0) {
    return "-";
  }

  /**
   * Return the description as a text span.
   */
  return <span className="text-sm">{description}</span>;
}
