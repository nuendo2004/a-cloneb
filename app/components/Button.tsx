"use client";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  className,
}) => {
  return (
    <button
      className={`${className} font-bold px-8 select-none text-center relative cursor-pointer disabled:opacity-70 disabled:cursr-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline ? "bg-white" : "bg-rose-500"
      } ${outline ? "border-neutral-800" : "border-rose-500"} ${
        outline ? "text-neutral-800" : "text-white"
      } ${small ? "py-1" : "py-[12px]"} ${
        outline ? "font-light" : "font-semibold"
      } ${outline ? "border-[2px]" : "border-2"}`}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-[10px]" />}
      {label}
    </button>
  );
};

export default Button;
