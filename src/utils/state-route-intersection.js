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
  { name: "Andaman Nicobar Islands", json: AndamanNicobarIslandsJson },
  { name: "Andhra Pradesh", json: AndhraPradeshJson },
  { name: "Arunachal Pradesh", json: ArunachalPradeshJson },
  { name: "Assam", json: AssamJson },
  { name: "Bihar", json: BiharJson },
  { name: "Chandigarh", json: ChandigarhJson },
  { name: "Chhattisgarh", json: ChhattisgarhJson },
  { name: "Dadra and Nagar Haveli", json: DadraandNagarHaveliJson },
  { name: "Delhi", json: DelhiJson },
  { name: "Goa", json: GoaJson },
  { name: "Gujarat", json: GujaratJson },
  { name: "Haryana", json: HaryanaJson },
  { name: "Himachal Pradesh", json: HimachalPradeshJson },
  { name: "Jammu and Kashmir", json: JammuandKashmirJson },
  { name: "Jharkhand", json: JharkhandJson },
  { name: "Karnataka", json: KarnatakaJson },
  { name: "Kerala", json: KeralaJson },
  { name: "Madhya Pradesh", json: MadhyaPradeshJson },
  { name: "Maharashtra", json: MaharashtraJson },
  { name: "Manipur", json: ManipurJson },
  { name: "Meghalaya", json: MeghalayaJson },
  { name: "Mizoram", json: MizoramJson },
  { name: "Nagaland", json: NagalandJson },
  { name: "Odisha", json: OdishaJson },
  { name: "Punjab", json: PunjabJson },
  { name: "Rajasthan", json: RajasthanJson },
  { name: "Sikkim", json: SikkimJson },
  { name: "Tamil Nadu", json: TamilNaduJson },
  { name: "Telangana", json: TelanganaJson },
  { name: "Tripura", json: TripuraJson },
  { name: "Uttar Pradesh", json: UttarPradeshJson },
  { name: "Uttarakhand", json: UttarakhandJson },
  { name: "West Bengal", json: WestBengalJson },
];

const getStateBoundaryList = () => {
  const StateBoundaryList = STATE_LIST.map((item) => {
    const key1 = item.split(" ").join("") + "Json";
    const key = item.toLowerCase().split(" ").join("-");
    const value = `@/assets/${key}-geojson.json`;
    // console.log(`import ${key1}Json from '${value}'`);
    console.log(`{'name': "${item}",'json': ${key1}},`);
    // return { key: require(value) };
  });
  console.log(StateBoundaryList.length);
  return StateBoundaryList;
};

function performNearbySearch(service, location) {
  return new Promise((resolve, reject) => {
    service.nearbySearch(
      {
        location: location,
        radius: 10000,
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

export const getPetrolPumpsList = async (coordinates, map, setMarkers) => {
  if (coordinates.length > 5) return;
  let service = new google.maps.places.PlacesService(map);
  let petrolPumpsList = [];
  for (const item of coordinates) {
    try {
      const pumpList = await performNearbySearch(service, item);
      pumpList.forEach((pump) => {
        petrolPumpsList.push({
          name: pump.name,
          location: {
            lat: pump.geometry?.location.lat(),
            lng: pump.geometry?.location.lng(),
          },
          details: pump,
        });
      });
    } catch (error) {
      console.error("Error fetching petrol pumps:", error);
    }
  }
  console.log(petrolPumpsList);
  setMarkers(petrolPumpsList);
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
