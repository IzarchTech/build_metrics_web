import { Button } from "@/components/ui/button";
import { File, FolderOpen, HardDriveDownload } from "lucide-react";

export default function StartPage() {
  return (
    <div className="container flex items-center justify-center mx-auto h-full">
      <div className="w-full flex flex-col gap-2 px-4 py-6 md:max-w-md shadow-sm md:shadow-md md:rounded-lg md:border bg-card">
        <div className="grid grid-cols-3 gap-2">
          <Button
            variant="outline"
            className="uppercase flex-col group p-4 h-14 md:h-20"
          >
            <File className="size-6 group-hover:fill-[#E2E2E2] group-hover:dark:fill-yellow-200 group-hover:dark:stroke-yellow-200 group-hover:stroke-[#E2E2E2] transition-all duration-300 ease-linear delay-150" />
            <span className="hidden md:inline-block group-hover:tracking-wider transition-all group-hover:text-[14px] duration-300 ease-linear delay-150">
              New Project
            </span>
          </Button>
          <Button
            variant="outline"
            className="uppercase flex-col group p-4 h-14 md:h-20"
          >
            <FolderOpen className="size-6 group-hover:fill-yellow-500/90 group-hover:stroke-yellow-500 transition-all duration-300 ease-linear delay-150" />
            <span className="hidden md:inline-block group-hover:tracking-wider transition-all group-hover:text-[14px] duration-300 ease-linear delay-150">
              Open Project
            </span>
          </Button>
          <Button
            variant="outline"
            className="uppercase flex-col group p-4 h-14 md:h-20"
            disabled
          >
            <HardDriveDownload className="size-6 group-hover:stroke-green-700 transition-all duration-300 ease-linear delay-150" />
            <span className="hidden md:inline-block group-hover:tracking-wider transition-all group-hover:text-[14px] duration-300 ease-linear delay-150">
              Import Project
            </span>
          </Button>
        </div>

        <div className="w-full border p-2 pt-3 relative min-h-[100px] mt-6 md:mt-12 rounded-lg shadow-inner">
          <div className="absolute -top-3 bg-card left-4 font-bold text-sm uppercase">
            Recents
          </div>

          <div className="w-full divide-y max-h-[300px] overflow-y-scroll">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="w-full p-2 space-y hover:bg-muted transition-all ease-out duration-150 group cursor-pointer"
              >
                <p className="font-semibold group-hover:tracking-widest duration-75 ease-out transition-all group-hover:animate-bounce">
                  Untitled Project
                </p>
                <p className="text-xs group-hover:text-[10px] italic group-hover:tracking-widest duration-75 ease-out transition-all">
                  last modified: 2022-01-01
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
