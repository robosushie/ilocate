const turf = require("@turf/turf");
// https://nominatim.openstreetmap.org/search.php?q=West+Bengal&polygon_geojson=1&format=json
import AndamanNicobarIslandsJson from "@/assets/andaman-nicobar-islands-geojson.json";
import AndhraPradeshJson from "@/assets/andhra-pradesh-geojson.json";
import ArunachalPradeshJson from "@/assets/arunachal-pradesh-geojson.json";
import AssamJson from "@/assets/assam-geojson.json";
import BiharJson from "@/assets/bihar-geojson.json";
import ChandigarhJson from "@/assets/chandigarh-geojson.json";
import ChhattisgarhJson from "@/assets/chhattisgarh-geojson.json";
import DadraandNagarHaveliJson from "@/assets/dadra-and-nagar-haveli-geojson.json";
import DelhiJson from "@/assets/delhi-geojson.json";
import GoaJson from "@/assets/goa-geojson.json";
import GujaratJson from "@/assets/gujarat-geojson.json";
import HaryanaJson from "@/assets/haryana-geojson.json";
import HimachalPradeshJson from "@/assets/himachal-pradesh-geojson.json";
import JammuandKashmirJson from "@/assets/jammu-and-kashmir-geojson.json";
import JharkhandJson from "@/assets/jharkhand-geojson.json";
import KarnatakaJson from "@/assets/karnataka-geojson.json";
import KeralaJson from "@/assets/kerala-geojson.json";
import MadhyaPradeshJson from "@/assets/madhya-pradesh-geojson.json";
import MaharashtraJson from "@/assets/maharashtra-geojson.json";
import ManipurJson from "@/assets/manipur-geojson.json";
import MeghalayaJson from "@/assets/meghalaya-geojson.json";
import MizoramJson from "@/assets/mizoram-geojson.json";
import NagalandJson from "@/assets/nagaland-geojson.json";
import OdishaJson from "@/assets/odisha-geojson.json";
import PunjabJson from "@/assets/punjab-geojson.json";
import RajasthanJson from "@/assets/rajasthan-geojson.json";
import SikkimJson from "@/assets/sikkim-geojson.json";
import TamilNaduJson from "@/assets/tamil-nadu-geojson.json";
import TelanganaJson from "@/assets/telangana-geojson.json";
import TripuraJson from "@/assets/tripura-geojson.json";
import UttarPradeshJson from "@/assets/uttar-pradesh-geojson.json";
import UttarakhandJson from "@/assets/uttarakhand-geojson.json";
import WestBengalJson from "@/assets/west-bengal-geojson.json";

import {
  filterNearestIntersectionPoints,
  removeDuplicates,
} from "./route-helper";

const STATE_LIST = [
  "Andaman Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const StateBoundaryList = [
  {
    name: "Andaman Nicobar Islands",
    json: AndamanNicobarIslandsJson,
    petrol: 84.1,
  },
  { name: "Andhra Pradesh", json: AndhraPradeshJson, petrol: 111.58 },
  { name: "Arunachal Pradesh", json: ArunachalPradeshJson, petrol: 92.78 },
  { name: "Assam", json: AssamJson, petrol: 98.44 },
  { name: "Bihar", json: BiharJson, petrol: 109.1 },
  { name: "Chandigarh", json: ChandigarhJson, petrol: 96.18 },
  { name: "Chhattisgarh", json: ChhattisgarhJson, petrol: 103.58 },
  {
    name: "Dadra and Nagar Haveli",
    json: DadraandNagarHaveliJson,
    petrol: 94.29,
  },
  { name: "Delhi", json: DelhiJson, petrol: 96.76 },
  { name: "Goa", json: GoaJson, petrol: 97.17 },
  { name: "Gujarat", json: GujaratJson, petrol: 96.41 },
  { name: "Haryana", json: HaryanaJson, petrol: 97.46 },
  { name: "Himachal Pradesh", json: HimachalPradeshJson, petrol: 97.05 },
  { name: "Jammu and Kashmir", json: JammuandKashmirJson, petrol: 100.92 },
  { name: "Jharkhand", json: JharkhandJson, petrol: 100.07 },
  { name: "Karnataka", json: KarnatakaJson, petrol: 102.46 },
  { name: "Kerala", json: KeralaJson, petrol: 108.05 },
  { name: "Madhya Pradesh", json: MadhyaPradeshJson, petrol: 110.55 },
  { name: "Maharashtra", json: MaharashtraJson, petrol: 105.95 },
  { name: "Manipur", json: ManipurJson, petrol: 101.23 },
  { name: "Meghalaya", json: MeghalayaJson, petrol: 97.45 },
  { name: "Mizoram", json: MizoramJson, petrol: 95.86 },
  { name: "Nagaland", json: NagalandJson, petrol: 98.27 },
  { name: "Odisha", json: OdishaJson, petrol: 104.53 },
  { name: "Punjab", json: PunjabJson, petrol: 98.69 },
  { name: "Rajasthan", json: RajasthanJson, petrol: 108.05 },
  { name: "Sikkim", json: SikkimJson, petrol: 102.55 },
  { name: "Tamil Nadu", json: TamilNaduJson, petrol: 103.57 },
  { name: "Telangana", json: TelanganaJson, petrol: 111.88 },
  { name: "Tripura", json: TripuraJson, petrol: 99.49 },
  { name: "Uttar Pradesh", json: UttarPradeshJson, petrol: 96.33 },
  { name: "Uttarakhand", json: UttarakhandJson, petrol: 95.6 },
  { name: "West Bengal", json: WestBengalJson, petrol: 106.01 },
];

// const getStateBoundaryList = () => {
//   const StateBoundaryList = STATE_LIST.map((item) => {
//     const key1 = item.split(" ").join("") + "Json";
//     const key = item.toLowerCase().split(" ").join("-");
//     const value = `@/assets/${key}-geojson.json`;
//     // console.log(`import ${key1}Json from '${value}'`);
//     console.log(`{'name': "${item}",'json': ${key1}},`);
//     // return { key: require(value) };
//   });
//   console.log(StateBoundaryList.length);
//   return StateBoundaryList;
// };

function performNearbySearch(service, location) {
  return new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location: location,
        radius: 50000,
        type: "gas_station",
      },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          resolve(results);
        } else {
          reject(status);
        }
      }
    );
  });
}

export const getPetrolPumpsList = async (coordinates, map) => {
  if (coordinates.length > 5) return;
  let service = new google.maps.places.PlacesService(map);
  let petrolPumpsList = [];
  for (const item of coordinates) {
    try {
      const pumpList = await performNearbySearch(service, item);
      pumpList.forEach((pump) => {
        const tmpLocation = {
          lat: pump.geometry?.location.lat(),
          lng: pump.geometry?.location.lng(),
        };
        const state = coordinateToState({
          lat: pump.geometry?.location.lat(),
          lng: pump.geometry?.location.lng(),
        });
        petrolPumpsList.push({
          name: pump.name,
          location: {
            lat: pump.geometry?.location.lat(),
            lng: pump.geometry?.location.lng(),
          },
          details: pump,
          state: state.name,
          petrol: state.petrol,
        });
      });
    } catch (error) {
      console.error("Error fetching petrol pumps:", error);
    }
  }
  console.log(petrolPumpsList);
  return petrolPumpsList;
};

export const filterPetrolPumpsAlongRoute = (
  pathCoordinates,
  allPetrolPumpsList
) => {
  console.log(allPetrolPumpsList);
  const filteredList = [];
  const rotatedPathCoordinates = pathCoordinates.map((item) => {
    return [item[1], item[0]];
  });
  const routeLineString = turf.lineString(rotatedPathCoordinates);
  allPetrolPumpsList.map((pump) => {
    const point = turf.point([pump.location.lng, pump.location.lat]);
    const distance = turf.pointToLineDistance(point, routeLineString, {
      units: "meters",
    });
    if (distance <= 1000) {
      filteredList.push(pump);
    }
  });

  return filteredList;
};

export const getStateRouteIntersectionList = (pathCoordinates, map) => {
  let totalMarkers = [];
  StateBoundaryList.map((item) => {
    const markers = getStateRouteIntersection(pathCoordinates, map, item.json);
    totalMarkers.push(...markers);
  });
  totalMarkers = removeDuplicates(totalMarkers);
  console.log(totalMarkers);
  totalMarkers = filterNearestIntersectionPoints([...totalMarkers], 10000);
  return totalMarkers;
};

export const coordinateToState = (coordinate) => {
  let turfCoordinate = [coordinate.lng, coordinate.lat];
  for (let i = 0; i < StateBoundaryList.length; i++) {
    let polygon;
    if (StateBoundaryList[i].json[0].geojson.type == "Polygon") {
      polygon = turf.polygon(StateBoundaryList[i].json[0].geojson.coordinates);
    } else if (StateBoundaryList[i].json[0].geojson.type == "MultiPolygon") {
      polygon = turf.multiPolygon(
        StateBoundaryList[i].json[0].geojson.coordinates
      );
    }
    // const finalPolygon = turf.flatten(polygon);
    console.log(turf.booleanPointInPolygon(turfCoordinate, polygon));
    if (turf.booleanPointInPolygon(turfCoordinate, polygon)) {
      return StateBoundaryList[i];
    }
  }
  return { name: "Puducherry", petrol: 95.93 };
};

export const getStateRouteIntersection = (pathCoordinates, map, boundary) => {
  // console.log(boundary);
  let polygon;
  if (boundary[0].geojson.type == "Polygon") {
    polygon = turf.polygon(boundary[0].geojson.coordinates);
  } else if (boundary[0].geojson.type == "MultiPolygon") {
    polygon = turf.multiPolygon(boundary[0].geojson.coordinates);
  }
  // const multiPolygon = turf.multiPolygon(boundary[0].geojson.coordinates);

  const finalPolygon = turf.flatten(polygon);

  const rotatedPathCoordinates = pathCoordinates.map((item) => {
    return [item[1], item[0]];
  });

  const routeLineString = turf.lineString(rotatedPathCoordinates);
  // map.data.addGeoJson(finalMultiPolygon);
  // map.data.addGeoJson(routeLineString);

  const intersection = turf.lineIntersect(routeLineString, finalPolygon);
  return intersection.features.map((item) => {
    return {
      lat: item.geometry.coordinates[1],
      lng: item.geometry.coordinates[0],
    };
  });
};
