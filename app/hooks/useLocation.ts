import { create } from "zustand";

interface UserLocation {
  geoLocation: number[] | null;
  setLocation: (value: number[]) => void;
}

const useLocation = create<UserLocation>((set) => ({
  geoLocation: null,
  setLocation: (value) => set({ geoLocation: value }),
}));

export default useLocation;
