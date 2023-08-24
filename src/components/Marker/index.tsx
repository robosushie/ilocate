import React, { useState } from "react";

import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  Autocomplete,
  Circle,
  InfoWindow,
} from "@react-google-maps/api";

const MarkerWrapper: React.FC<{
  item: any;
  index?: any;
  children: React.ReactNode;
}> = ({ item, index, children }) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <Marker
      key={index}
      position={item.location}
      onMouseOver={() => {
        setIsVisible(true);
      }}
      onMouseOut={() => {
        setIsVisible(false);
      }}
    >
      {/* <Circle
        center={item.location}
        radius={5000}
        options={{
          strokeColor: "#ff0000",
        }}
      /> */}
      {isVisible && (
        <InfoWindow position={item.location}>{children}</InfoWindow>
      )}
    </Marker>
  );
};

export default MarkerWrapper;
