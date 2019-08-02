export interface Day {
    date: string;
    vehicleId: number;
    startMileage?: number;
    endMileage?: number;
    startCondition?: string;
    endCondition?: string;
    fuelCost?: number;
    fuelQuantity?: number;
    dayId ?: number;
}
