import clsx from "clsx";
import React from "react";

type Props = {
  isPressed: boolean;
  onPress?: () => void;
  className?: string;
  children?: React.ReactNode;
};

const KeyboardButton = ({ isPressed, onPress, className, children }: Props) => {
  return (
    <div className={clsx("w-[75px] keyboard-button-housing", className)}>
      <div className={clsx("w-full h-full keyboard-button-mask")}>
        <button
          className={clsx(
            "w-full h-full font-thin flex items-center justify-center p-1 keyboard-button",
            isPressed ? "keyboard-button-pressed" : "keyboard-button-unpressed"
          )}
          onClick={onPress}
        >
          {children}
        </button>
      </div>
    </div>
  );
};

export default KeyboardButton;
