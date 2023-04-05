import { createRef } from 'react';
import type { Camera, LatLng, Region } from 'react-native-maps';
import MapView from 'react-native-maps';

const mapRef = createRef<MapView>();

const animateCamera = (camera: Partial<Camera>) => {
  mapRef?.current?.animateCamera({ ...camera, zoom: 11.5 }, { duration: 250 });
};

const getEdgePadding = (hasTrip?: boolean) => ({
  top: hasTrip ? 70 : 150,
  right: hasTrip ? 150 : 70,
  bottom: hasTrip ? 70 : 110,
  left: hasTrip ? 150 : 70,
});

const fitToCoordinates = (coordinates?: LatLng[], hasTrip?: boolean) => {
  mapRef?.current?.fitToCoordinates(coordinates, {
    edgePadding: getEdgePadding(hasTrip),
    animated: true,
  });
};

const animateToRegion = (region: Region) => {
  mapRef?.current?.animateToRegion(region, 500);
};

export const MapService = {
  mapRef,
  getEdgePadding,
  animateCamera,
  fitToCoordinates,
  animateToRegion,
};
