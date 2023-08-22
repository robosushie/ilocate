const geolib = require("geolib");

export const removeDuplicates = () => {};

export const filterIntersectionPoints = (pointsList) => {};

// The function is having issues
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
