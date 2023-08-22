"use client";

import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";

import { useAppState } from "@/states/states";

import { Player, Controls } from "@lottiefiles/react-lottie-player";

const MapLoaderAnimation: React.FC<{}> = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="relative w-9/12 lg:w-1/2 object-cover flex justify-center items-center ">
        <Player
          autoplay
          loop
          src="map-loader.json"
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>
  );
};

const Maps: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const {
    origin,
    destination,
    directions,
    distance,
    duration,
    isMapLoaded,
    setMap,
  } = useAppState();
  const center = { lat: 28.63479, lng: 77.21258 };

  if (!isMapLoaded) {
    return <MapLoaderAnimation />;
  }

  return (
    <div className="w-full h-full">
      <GoogleMap
        zoom={15}
        center={center}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
        onLoad={(map) => setMap(map)}
      >
        {origin && <Marker position={origin.location} />}
        {directions && <DirectionsRenderer directions={directions} />}
        {children}
      </GoogleMap>
    </div>
  );
};

export default Maps;
