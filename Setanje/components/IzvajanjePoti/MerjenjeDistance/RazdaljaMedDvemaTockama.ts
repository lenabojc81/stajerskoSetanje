interface Coordinates {
    latitude: number;
    longitude: number;
}

// Haversine formula za izracun razdalje med dvema tockama v metrih
export function haversineDistance(coords1: Coordinates, coords2: Coordinates) {
    const toRad = (x: number) => (x * Math.PI) / 180;
  
    const R = 6371e3;
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);
    const deltaLat = toRad(coords2.latitude - coords1.latitude);
    const deltaLon = toRad(coords2.longitude - coords1.longitude);
  
    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) *
      Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    return R * c;
}
  