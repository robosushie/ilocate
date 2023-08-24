"use client";

import Maps from "@/components/Maps";
import Route from "@/components/Route";

import {
  GoogleMap,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

import Marker from "@/components/Marker";

import { Player, Controls } from "@lottiefiles/react-lottie-player";

import { useAppState } from "@/states/states";
import { useEffect } from "react";

const Loader: React.FC<{}> = () => {
  return (
    <div className="absolute w-full h-full bg-opacity-40 z-20 bg-white flex justify-center items-center backdrop-blur">
      <div className="relative w-9/12 lg:w-1/3 aspect-square bg-white bg-opacity-50 border-[4px] overflow-hidden object-cover flex flex-col justify-center items-center rounded-full">
        <Player
          autoplay
          loop
          src="loader.json"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

export default function Home() {
  const { loadingAnimation, markers, setIsMapLoaded } = useAppState();
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
      {loadingAnimation && <Loader />}
      <Route />
      <Maps>
        {markers &&
          markers.map((item: any, idx: any) => (
            <Marker item={item} index={idx} key={idx}>
              <div className="w-[200px] flex flex-col p-2">
                <div className="w-full flex flex-col gap-2">
                  <div className="w-full h-[120px] bg-neutral-300 rounded-md flex justify-center items-center">
                    .N.A
                  </div>
                  <div className="font-bold">{item.name}</div>
                  <hr />
                  <div>State: {item.state}</div>
                  <div>Petrol: INR {item.petrol}</div>
                </div>
              </div>
            </Marker>
          ))}
      </Maps>
    </main>
  );
}
