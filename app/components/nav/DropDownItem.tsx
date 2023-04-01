"use client";

interface DropDownItemProps {
  onClick: () => void;
  label: string;
  className?: string | null;
}

const DropDownItem: React.FC<DropDownItemProps> = ({
  className,
  onClick,
  label,
}) => {
  return (
    <div
      className={`${className} px-4 py-4 hover:bg-neutral-100 transition font-semibold`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

export default DropDownItem;
