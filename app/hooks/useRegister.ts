import { create } from "zustand";

interface RegisterStore {
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRegister = create<RegisterStore>((set) => ({
  isActive: false,
  onOpen: () => set({ isActive: true }),
  onClose: () => set({ isActive: false }),
}));

export default useRegister;
