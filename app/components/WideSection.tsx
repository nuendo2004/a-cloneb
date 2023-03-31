"use client";

interface SectionProps {
  children: React.ReactNode;
}

const WideSection: React.FC<SectionProps> = ({ children }) => {
  return (
    <div className="max-w-[2520px] mx-auto xl:px-24 md:px-16 xm:px-4 px-8">
      {children}
    </div>
  );
};

export default WideSection;
