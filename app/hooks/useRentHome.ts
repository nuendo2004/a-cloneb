import { create } from "zustand";

interface RentHomeStore {
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentHome = create<RentHomeStore>((set) => ({
  isActive: false,
  onOpen: () => set({ isActive: true }),
  onClose: () => set({ isActive: false }),
}));

export default useRentHome;
