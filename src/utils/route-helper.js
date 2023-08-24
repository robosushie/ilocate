const geolib = require("geolib");

export const removeDuplicates = (array) => {
  const uniqueKeys = new Set();
  return array.filter((item) => {
    if (!uniqueKeys.has(JSON.stringify(item))) {
      uniqueKeys.add(JSON.stringify(item));
      return true;
    }
    return false;
  });
};

export const filterNearestIntersectionPoints = (
  coordinates,
  distanceThreshold
) => {
  let finalCoordinates = [];
  for (let i = 0; i < coordinates.length; i++) {
    console.log(coordinates);
    let cluster = [];
    cluster.push(coordinates[i]);
    for (let j = i + 1; j < coordinates.length; j++) {
      if (
        geolib.isPointWithinRadius(
          coordinates[i],
          coordinates[j],
          distanceThreshold
        )
      ) {
        cluster.push(coordinates[j]);
        i++;
      }
    }
    if (cluster.length == 1) {
      finalCoordinates.push(cluster[0]);
    } else {
      let center = geolib.getCenter(cluster);
      finalCoordinates.push({ lat: center.latitude, lng: center.longitude });
    }
  }
  console.log(finalCoordinates);
  return finalCoordinates;
};

// The function is having issues !!! Do not use
export const interpolatePath = (decodedPath, intervalMeters) => {
  const interpolatedPath = [];

  for (let i = 0; i < decodedPath.length - 1; i++) {
    const startCoord = {
      latitude: decodedPath[i][0],
      longitude: decodedPath[i][1],
    };
    const endCoord = {
      latitude: decodedPath[i + 1][0],
      longitude: decodedPath[i + 1][1],
    };

    const distance = geolib.getDistance(startCoord, endCoord);
    const numSteps = Math.ceil(distance / intervalMeters);

    for (let j = 0; j <= numSteps; j++) {
      const fraction = j / numSteps;
      const interpolatedCoord = geolib.computeDestinationPoint(
        startCoord,
        distance * fraction,
        90
      );
      interpolatedPath.push([
        interpolatedCoord.latitude,
        interpolatedCoord.longitude,
      ]);
    }
  }

  return interpolatedPath;
};
