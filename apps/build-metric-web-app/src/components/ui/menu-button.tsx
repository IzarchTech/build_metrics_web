import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";

type MenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  ButtonProps & {
    text: string;
    renderIcon?: () => React.ReactNode;
  };

function MenuButton({ renderIcon, text, ...props }: Readonly<MenuButtonProps>) {
  return (
    <Button
      variant="outline"
      className={cn("uppercase flex-col group p-4 h-14 md:h-20")}
      {...props}
    >
      {renderIcon?.()}
      <span className="hidden md:inline-block group-hover:tracking-wider transition-all group-hover:text-[14px] duration-300 ease-linear delay-150">
        {text}
      </span>
    </Button>
  );
}

export default MenuButton;
