"use client";
import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";

interface NotFoundProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

const NotFound: React.FC<NotFoundProps> = ({
  title = "No exact matches",
  subtitle = "Try changing your filters",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} />
      {showReset && (
        <div className="w-46 mt-4">
          <Button
            outline
            label="Remove all filters"
            onClick={() => router.push("/")}
          />
        </div>
      )}
    </div>
  );
};

export default NotFound;
