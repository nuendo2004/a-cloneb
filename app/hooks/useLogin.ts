import { create } from "zustand";

interface LoginModel {
  isActive: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useLogin = create<LoginModel>((set) => ({
  isActive: false,
  onOpen: () => set({ isActive: true }),
  onClose: () => set({ isActive: false }),
}));

export default useLogin;
