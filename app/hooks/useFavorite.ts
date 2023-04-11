import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";
import { SafeUser } from "../types";
import useLogin from "./useLogin";
import { likeListing, unlikeListing } from "../service/rentingService";

interface IUseFavorite {
  listingId: string;
  currentUser: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();
  const login = useLogin();

  const isFavorite = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggle = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        return login.onOpen();
      }
      try {
        let request;
        if (isFavorite) {
          request = () => unlikeListing(listingId);
        } else request = () => likeListing(listingId);
        await request();
        router.refresh();
        toast.success("success");
      } catch (error) {
        toast.error("Something went wrong");
        console.log(error);
      }
    },
    [currentUser, isFavorite, listingId, router, login]
  );

  return {
    isFavorite,
    toggle,
  };
};

export default useFavorite;
