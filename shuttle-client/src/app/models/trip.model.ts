export interface Trip {
    id?: number;
    vehicleId?: number;
    passengerCount: number;
    curbCount: number;
    date?: string;
    routeId: number;
    activityTimestamp?: string;
    dayId?: number;
}
