package rest.models.response;

public class DayResponse {
	private String endCondition;
	private String date;
	private Double endMileage;
	private Integer vehicleId;
	private Double fuelCost;
	private Double fuelQuantity;
	private String startCondition;
	private Double startMileage;
	private Integer dayId;

	public String getDate() {
		return date;
	}

	public Integer getDayId() {
		return dayId;
	}

	public String getEndCondition() {
		return endCondition;
	}

	public Double getEndMileage() {
		return endMileage;
	}

	public Double getFuelCost() {
		return fuelCost;
	}

	public Double getFuelQuantity() {
		return fuelQuantity;
	}

	public String getStartCondition() {
		return startCondition;
	}

	public Double getStartMileage() {
		return startMileage;
	}

	public Integer getVehicleId() {
		return vehicleId;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public void setDayId(Integer dayId) {
		this.dayId = dayId;
	}

	public void setEndCondition(String endCondition) {
		this.endCondition = endCondition;
	}

	public void setEndMileage(Double endMileage) {
		this.endMileage = endMileage;
	}

	public void setFuelCost(Double fuelCost) {
		this.fuelCost = fuelCost;
	}

	public void setFuelQuantity(Double fuelQuantity) {
		this.fuelQuantity = fuelQuantity;
	}

	public void setStartCondition(String startCondition) {
		this.startCondition = startCondition;
	}

	public void setStartMileage(Double startMileage) {
		this.startMileage = startMileage;
	}

	public void setVehicleId(Integer vehicleId) {
		this.vehicleId = vehicleId;
	}
}
