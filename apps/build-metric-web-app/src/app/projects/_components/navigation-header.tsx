"use client";

import BackButton from "./back-button";

function NavigationHeader({
  children,
  path,
  title,
}: Readonly<{ title: string; path?: string; children?: React.ReactNode }>) {
  return (
    <div className="w-full p-4 md:p-6 flex gap-2 border-b select-none items-center">
      <BackButton href={path} />
      <h3 className="uppercase">{title}</h3>
      {children}
    </div>
  );
}

export default NavigationHeader;
