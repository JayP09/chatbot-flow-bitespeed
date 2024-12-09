import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type ControlButtonProps = Readonly<ComponentPropsWithoutRef<"button">>;

const ControlButton = ({ children, className, ...props }: ControlButtonProps) => {
  return (
    <button
      className={twMerge(
        "w-7 h-7 flex justify-center items-center cursor-pointer text-black hover:bg-gray-400/15 rounded-md",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default ControlButton;
