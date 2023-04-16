"use client";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { IoClose } from "react-icons/io5";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  error: FieldErrors;
  className?: string;
  placeholder?: string;
  value: string;
  onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
  onClose?: () => void;
}

const SearchInput: React.FC<InputProps> = ({
  id,
  value,
  type,
  disabled,
  required,
  error,
  placeholder,
  className,
  onChange,
  onClose,
}) => {
  return (
    <div className={`w-full relative ${className}`}>
      <input
        id={id}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        type={type}
        className={`
        peer px-4 py-3 w-full font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
        ${error[id] ? "border-rose-500" : "border-neutral-300"}
        ${error[id] ? "focus:border-rose-500" : "focus:border-black"}`}
      />
      <IoClose size={20} className="absolute right-3 top-4" onClick={onClose} />
    </div>
  );
};

export default SearchInput;
