export interface Shuttle {
    vehicleID?: number;
    id?: number;
    latitudeCoordinates: number;
    longitudeCoordinates: number;
    xPixelCoordinate?: number;
    yPixelCoordinate?: number;
    status?: string;
    name?: string;
}