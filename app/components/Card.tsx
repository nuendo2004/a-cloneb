import { ReactNode } from "react";
import { IconType } from "react-icons";

interface CardProps {
  content?: ReactNode;
  title: string;
  titleIcon?: IconType;
  subtitle?: string;
  backgroundImg?: string;
  backgroundColor?: string;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  content,
  title,
  titleIcon: Icon,
  subtitle,
  backgroundColor = "bg-white",
  backgroundImg,
  hoverEffect = false,
}) => {
  return (
    <div
      className={`${
        !backgroundImg && backgroundColor
      } w-full h-full shadow-full rounded-md p-[2rem]`}
    >
      {content || (
        <>
          <div className="flex gap-4">
            {Icon && <Icon size={30} className="text-neutral-500" />}
            <h3 className="text-4xl font-bold">{title}</h3>
          </div>

          <p>{subtitle}</p>
        </>
      )}
    </div>
  );
};

export default Card;
