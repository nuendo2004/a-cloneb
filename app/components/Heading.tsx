"use client";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
  className?: string;
  headerSize?: string;
}

const Heading: React.FC<HeadingProps> = ({
  title,
  subtitle,
  center,
  className,
  headerSize,
}) => {
  return (
    <div className={`${center ? "text-center" : "text-start"} ${className}`}>
      <div className={`font-bold ${headerSize ? headerSize : "text-2xl"}`}>
        {title}
      </div>
      <div className={`font-light text-neu mt-2`}>{subtitle}</div>
    </div>
  );
};

export default Heading;
