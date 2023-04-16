import { create } from "zustand";
import { SafeReservation } from "../types";

interface UseTripDetail {
  reservation: SafeReservation | null;
  isActive: boolean;
  onOpen: (reservation: SafeReservation) => void;
  onClose: () => void;
}

const useTripDetail = create<UseTripDetail>((set) => ({
  reservation: null,
  isActive: false,
  onOpen: (res) => set({ reservation: res, isActive: true }),
  onClose: () => set({ reservation: null, isActive: false }),
}));

export default useTripDetail;
