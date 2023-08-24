"use client";

import Maps from "@/components/Maps";
import Route from "@/components/Route";

import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

import Marker from "@/components/Marker";

import { useAppState } from "@/states/states";
import { useEffect } from "react";

export default function Home() {
  const { map, markers, setIsMapLoaded } = useAppState();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: ["places"],
  });

  useEffect(() => {
    // let req = new google.maps.places.PlaceSearchRequest()
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
            <Marker item={item} index={idx} key={idx}>
              <div>hi</div>
            </Marker>
          ))}
      </Maps>
    </main>
  );
}
