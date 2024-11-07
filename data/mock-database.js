// mock-database.js
const mockDatabase = {
  vehicles: [
    {
      vehicleId: "COROLLA-2010",
      make: "Toyota",
      model: "Corolla",
      year: 2010,
      color: "White",
      vin: "1TEABC12", // The VIN number starts with "1TE" and ends with "ABC12"
      odometerReading: 125454,
      features: ["Cloth seats", "Sunroof", "CD player", "Power windows"],
      pickupDetails: {}, // Will be filled during the conversation
      additionalDetails: {}, // Will be filled during the conversation
    },
  ],
};

module.exports = mockDatabase;
