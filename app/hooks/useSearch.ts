import { create } from "zustand";

interface SearchModel {
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useSearch = create<SearchModel>((set) => ({
  isActive: false,
  onOpen: () => set({ isActive: true }),
  onClose: () => set({ isActive: false }),
}));

export default useSearch;
