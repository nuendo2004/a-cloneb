import { create } from "zustand";
import { SafeReservation } from "../types";

interface UseManageReservation {
  reservation: SafeReservation | null;
  isActive: boolean;
  onOpen: (reservation: SafeReservation) => void;
  onClose: () => void;
}

const useManageReservation = create<UseManageReservation>((set) => ({
  reservation: null,
  isActive: false,
  onOpen: (res) => set({ reservation: res, isActive: true }),
  onClose: () => set({ reservation: null, isActive: false }),
}));

export default useManageReservation;
