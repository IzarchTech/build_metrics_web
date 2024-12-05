import { FolderOpen, HardDriveDownload } from "lucide-react";
import NewProjectButton from "./_components/new-project-button";
import MenuButton from "./_components/menu-button";
import RecentProjectView from "./_components/recent-project-view";

export default function StartPage() {
  return (
    <div className="container flex items-center justify-center mx-auto h-full">
      <div className="w-full flex flex-col gap-2 px-4 py-6 md:max-w-md shadow-sm md:shadow-md md:rounded-lg md:border bg-card">
        <div className="grid grid-cols-3 gap-2">
          <NewProjectButton />
          <MenuButton
            text="Open Project"
            render={() => (
              <FolderOpen className="size-6 group-hover:fill-yellow-500/90 group-hover:stroke-yellow-500 transition-all duration-300 ease-linear delay-150" />
            )}
            aria-label="Open Project"
          />
          <MenuButton
            text="Import Project"
            render={() => (
              <HardDriveDownload className="size-6 group-hover:stroke-green-700 transition-all duration-300 ease-linear delay-150" />
            )}
            disabled
            aria-label="Import Project"
          />
        </div>

        <RecentProjectView />
      </div>
    </div>
  );
}
