"use client";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";

interface CategoryProps {
  label: string;
  icon: IconType;
  description?: string;
  selected?: boolean;
}

const Category: React.FC<CategoryProps> = ({
  label,
  icon: Icon,
  description,
  selected,
}) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let query = {};
    if (params) {
      query = queryString.parse(params.toString());
    }
    const update: any = {
      ...query,
      category: label,
    };
    if (params?.get("category") === label) {
      delete update.category;
    }
    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: update,
      },
      { skipNull: true }
    );
    router.push(url);
  }, [label, params, router]);
  return (
    <div
      className={`flex flex-col items-center justify-center gap-2 py-3 hover:text-neutral-800 transition cursor-pointer border-b-2 ${
        selected ? "border-b-neutral-800" : "border-b-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"} 
      ${
        selected ? "hover:border-b-neutral-800" : "hover:border-b-neutral-200"
      }`}
      onClick={handleClick}
    >
      <Icon size={26} />
      <p className="text-[0.8rem] font-bold">{label}</p>
    </div>
  );
};

export default Category;
