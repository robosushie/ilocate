"use client";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

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
import { useEffect, useState } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyB3EJ2d0F21e0buQY1nL2zQl5PNCDruG_I",
  authDomain: "ilocate-demo-9fc34.firebaseapp.com",
  projectId: "ilocate-demo-9fc34",
  storageBucket: "ilocate-demo-9fc34.appspot.com",
  messagingSenderId: "489730346177",
  appId: "1:489730346177:web:68c6110fc4e9a6fece9840",
};

const Login: React.FC<{ auth: any; setIsLoggedIn: any }> = ({
  auth,
  setIsLoggedIn,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="absolute w-full h-full top-0 left-0 z-50 flex justify-center items-center">
      <div className="absolute w-full h-full top-0 left-0 -z-10 bg-cover bg-background-map blur-sm" />
      <div className="py-10 px-20 bg-white rounded-lg shadow-xl">
        <div className="text-gray-900 text-xl font-semibold flex items-center gap-4 w-full mb-8">
          Enter Details to Login
        </div>
        <form className="flex justify-start items-start flex-col gap-6">
          <label className="text-gray-700 text-md flex items-center gap-4 w-full">
            Email:
            <div className="flex-1">
              <input
                type="text"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder="Enter email"
                className="border-[1px] border-solid border-gray-300 rounded text-md px-[8px] py-1 outline-none transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                onFocus={(e) => {
                  e.target.style.borderColor = "dodgerblue";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(30, 144, 255, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ccc";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </label>
          <label className="text-gray-700 text-md flex items-center gap-4 w-full">
            Password:
            <div className="flex-1">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter password"
                className="border-[1px] border-solid border-gray-300 rounded text-md px-[8px] py-1 outline-none transition duration-300 focus:border-blue-500 focus:ring focus:ring-blue-200 w-full"
                onFocus={(e) => {
                  e.target.style.borderColor = "dodgerblue";
                  e.target.style.boxShadow =
                    "0 0 0 2px rgba(30, 144, 255, 0.2)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#ccc";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </label>
          <div
            className="cursor-pointer bg-[#ea4335] hover:bg-[#960a0a] text-white font-semibold text-[16px] py-2 px-4 rounded shadow-lg"
            onClick={() => {
              signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                  // Signed in
                  const user = userCredential.user;
                  setIsLoggedIn(true);
                  // ...
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                });
            }}
          >
            Login
          </div>
        </form>
      </div>
    </div>
  );
};

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

const App = () => {
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
};

export default function Home() {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <main className="w-[100dvw] h-[100dvh]">
      {isLoggedIn ? (
        <App />
      ) : (
        <Login auth={auth} setIsLoggedIn={setIsLoggedIn} />
      )}
    </main>
  );
}
