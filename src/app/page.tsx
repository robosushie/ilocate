"use client";

import Maps from "@/components/Maps";
import Route from "@/components/Route";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

import { useAppState } from "@/states/states";
import { useEffect } from "react";

export default function Home() {
  const { markers, setIsMapLoaded } = useAppState();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    setTimeout(() => {
      setIsMapLoaded(isLoaded);
    }, 2000);
  }, [isLoaded, setIsMapLoaded]);

  return (
    <main className="w-[100dvw] h-[100dvh]">
      <Route />
      <Maps>
        {markers &&
          markers.map((item: any, idx: any) => (
            <Marker key={idx} position={item} />
          ))}
      </Maps>
    </main>
  );
}
