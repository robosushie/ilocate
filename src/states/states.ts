import { create } from "zustand";

interface AppState {
  isMapLoaded: boolean;
  loadingAnimation: boolean;
  map: any;
  origin: any;
  destination: any;
  directions: any;
  pathCoordinates: any;
  distance: string;
  duration: string;
  markers: any;
  setIsMapLoaded: (value: boolean) => void;
  setLoadingAnimation: (value: boolean) => void;
  setMap: (value: any) => void;
  setOrigin: (value: any) => void;
  setDestination: (value: any) => void;
  setDirections: (value: any) => void;
  setPathCoordinates: (value: any) => void;
  setDistance: (value: string) => void;
  setDuration: (value: string) => void;
  setMarkers: (value: any) => void;
}

export const useAppState = create<AppState>((set) => ({
  isMapLoaded: false,
  loadingAnimation: false,
  map: null,
  origin: null,
  destination: null,
  directions: null,
  pathCoordinates: null,
  distance: "",
  duration: "",
  markers: null,
  setIsMapLoaded: (value: boolean) => {
    set((state) => ({ isMapLoaded: value }));
  },
  setLoadingAnimation: (value: boolean) => {
    set((state) => ({ loadingAnimation: value }));
  },
  setMap: (value: any) => {
    set((state) => ({ map: value }));
  },
  setOrigin: (value: any) => {
    set((state) => ({ origin: value }));
  },
  setDestination: (value: any) => {
    set((state) => ({ destination: value }));
  },
  setDirections: (value: any) => {
    set((state) => ({ directions: value }));
  },
  setPathCoordinates: (value: any) => {
    set((state) => ({ pathCoordinates: value }));
  },
  setDistance: (value: string) => {
    set((state) => ({ distance: value }));
  },
  setDuration: (value: string) => {
    set((state) => ({ duration: value }));
  },
  setMarkers: (value: any) => {
    set((state) => ({ markers: value }));
  },
}));
