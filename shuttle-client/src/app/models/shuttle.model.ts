export interface Shuttle {
    vehicleID: number;
    latitudeCoordinates: number;
    longitudeCoordinates: number;
    xPixelCoordinate?: number;
    yPixelCoordinate?: number;
    status?: string;
    name?: string;
}