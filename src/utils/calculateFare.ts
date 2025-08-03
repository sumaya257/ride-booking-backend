export function calculateFare(distanceInKm: number): number {
  const baseFare = 50;      // base fare
  const perKmRate = 20;     // per kilometer
  return baseFare + distanceInKm * perKmRate;
}
