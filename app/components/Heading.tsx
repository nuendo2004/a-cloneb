"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  longText?: boolean;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  className,
  longText,
}) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} ${className}`}>
      <div
        className={`font-bold ${
          longText ? "text-xl md:text-xl lg:text-3xl" : "text-2xl"
        }`}
      >
        {title}
      </div>
      <div className={`font-light text-neu mt-2 ${longText && "my-0"}`}>
        {subtitle}
      </div>
    </div>
  );
};

export default Heading;
