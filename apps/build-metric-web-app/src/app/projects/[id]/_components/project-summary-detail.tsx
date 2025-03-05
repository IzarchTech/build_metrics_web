import { ReactNode } from "react";

/**
 * A component that displays a summary of a project.
 *
 * It takes a title and a value as props. The title is a string that is
 * displayed in uppercase and the value is a ReactNode that is displayed
 * below the title.
 *
 * @example
 * <ProjectSummaryDetail title="Name" value="My Project" />
 */
export function ProjectSummaryDetail({
  title,
  value,
}: Readonly<{
  /**
   * The title to display
   */
  title: string;
  /**
   * The value to display below the title
   */
  value: ReactNode;
}>) {
  return (
    <div className="p-4 flex flex-col gap-2">
      <span className="font-bold text-secondary-foreground/70 text-[10px] uppercase font-heading">
        {title}
      </span>
      <p className="text-lg select-text">{value}</p>
    </div>
  );
}
