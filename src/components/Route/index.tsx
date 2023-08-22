import React, { useEffect, useRef, useState, useLayoutEffect } from "react";

import polyline from "@mapbox/polyline";

import { Autocomplete } from "@react-google-maps/api";
import { useAppState } from "@/states/states";

import { getStateRouteIntersectionList } from "@/utils/state-route-intersection";

import { motion, AnimatePresence } from "framer-motion";

const GoToLocation: React.FC<{ location: any; id: string }> = ({
  location,
  id,
}) => {
  const { map } = useAppState();
  return (
    <div
      className="relative w-[40px] h-[40px]"
      onClick={() => {
        if (!location) {
          alert("Please select the Source and Destination locations");
          return;
        }
        map.panTo(location.location);
        map.setZoom(15);
      }}
    >
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          location
            ? `fill-[#ea4335] hover:fill-[#960a0a] cursor-pointer`
            : `fill-neutral-600`
        }`}
      >
        <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
      </svg>
      <div className="absolute rounded-full bottom-0 right-0 w-[18px] h-[18px] text-[14px] bg-white flex justify-center items-center">
        {id}
      </div>
    </div>
  );
};

const LocationInput: React.FC<{
  location: string;
  reference: any;
}> = ({ location, reference }) => {
  return (
    <label className="text-gray-700 text-md flex items-center gap-2 w-full lg:w-1/2">
      {location}:
      <div className="flex-1">
        <Autocomplete>
          <input
            type="text"
            placeholder="Enter a location"
            ref={reference}
            className="border-[1px] border-solid border-gray-300 rounded text-md px-[8px] py-1 outline-none transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
            onFocus={(e) => {
              e.target.style.borderColor = "dodgerblue";
              e.target.style.boxShadow = "0 0 0 2px rgba(30, 144, 255, 0.2)";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ccc";
              e.target.style.boxShadow = "none";
            }}
          />
        </Autocomplete>
      </div>
    </label>
  );
};

const Route: React.FC<{}> = () => {
  const {
    isMapLoaded,
    map,
    duration,
    distance,
    origin,
    destination,
    setOrigin,
    setDestination,
    setDirections,
    setPathCoordinates,
    setDistance,
    setDuration,
    setMarkers,
  } = useAppState();
  const [isVisible, setIsVisible] = useState(false);
  const [formSize, setFormSize] = useState(0);
  const originRef = useRef<any>();
  const destinationRef = useRef<any>();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const clearState = () => {
    originRef.current.value = "";
    destinationRef.current.value = "";
    setOrigin(null);
    setDestination(null);
    setDirections(null);
    setPathCoordinates(null);
    setDistance("");
    setDuration("");
    setMarkers(null);
  };

  const calculateRoute = async () => {
    if (originRef.current.value === "" || destinationRef.current.value === "") {
      alert("Please select the Source and Destination locations");
      return;
    }
    console.log(map);
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    try {
      const results = await directionsService.route({
        origin: originRef.current.value,
        destination: destinationRef.current.value,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,
      });
      console.log(results);
      const path = results.routes[0].overview_polyline;
      const pathCoordinates = polyline.decode(path);

      console.log(results);
      setOrigin({
        name: originRef.current.value,
        location: { lat: pathCoordinates[0][0], lng: pathCoordinates[0][1] },
      });
      setDestination({
        name: destinationRef.current.value,
        location: {
          lat: pathCoordinates[pathCoordinates.length - 1][0],
          lng: pathCoordinates[pathCoordinates.length - 1][1],
        },
      });
      setDirections(results);
      setPathCoordinates(pathCoordinates);
      setDistance(results.routes[0].legs[0].distance?.text || "");
      setDuration(results.routes[0].legs[0].duration?.text || "");
      getStateRouteIntersectionList(pathCoordinates, map, setMarkers);
    } catch (e: any) {
      alert(e.message.split(":")[2]);
      clearState();
      console.log(e.message);
    }
  };

  if (!isMapLoaded) {
    return null;
  }
  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 z-10 w-11/12 sm:w-8/12 md:w-7/12 lg:w-9/12 mt-4 box-border flex flex-col ${
        isVisible ? "" : "overflow-hidden rounded-xl"
      }`}
    >
      <motion.div
        className="rounded-xl overflow-hidden shadow-xl"
        initial={{ y: "-100%", opacity: 0 }}
        animate={{ y: isVisible ? 0 : -formSize, opacity: 1 }}
        transition={{ duration: 0.5 }}
        onAnimationComplete={() => {
          if (formSize == 0) {
            const formNode = document.getElementsByClassName("main-form")[0];
            console.log(formNode);
            const height = formNode?.clientHeight;
            setFormSize(height);
          }
        }}
      >
        <div className="main-form w-full p-6 flex flex-col gap-4 bg-white">
          <form className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <LocationInput location="Source" reference={originRef} />
            <LocationInput location="Destination" reference={destinationRef} />
          </form>
          <form className="flex flex-col lg:flex-row gap-4 lg:gap-8 items-center">
            <div className="w-full lg:w-1/2 text-[16px] flex flex-col gap-4 lg:gap-8 lg:flex-row justify-between lg:justify-start">
              <div>Distance: {distance == "" ? "0.0 km" : distance}</div>
              <div>Duration: {duration == "" ? "0 mins" : duration}</div>
            </div>
            <div className="flex gap-8 items-center">
              <div
                className="cursor-pointer bg-[#ea4335] hover:bg-[#960a0a] text-white font-semibold text-[16px] py-2 px-4 rounded shadow-lg"
                onClick={() => {
                  calculateRoute();
                }}
              >
                Calculate Route
              </div>

              <GoToLocation location={origin} id="A" />
              <GoToLocation location={destination} id="B" />
            </div>
          </form>
        </div>

        <div
          className={`w-full h-[40px] cursor-pointer flex justify-center items-center md:hidden ${
            isVisible ? "bg-slate-300" : "bg-neutral-100"
          }`}
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          <div className="w-[32px] h-[32px] flex justify-center items-center">
            <svg
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className={`${isVisible ? "rotate-180" : "rotate-0"}`}
            >
              <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Route;
