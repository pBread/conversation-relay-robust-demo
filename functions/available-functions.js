// available-functions.js
const mockDatabase = require("../data/mock-database");
const twilio = require("twilio");

// Send SMS using Twilio API (if needed)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Function to end the call
async function endCall(args) {
  const { callSid } = args;
  try {
    setTimeout(async () => {
      const call = await client.calls(callSid).update({
        twiml: "<Response><Hangup></Hangup></Response>",
      });
      console.log("Call ended for:", call.sid);
    }, 3000);
    return { status: "success", message: `Call has ended` };
  } catch (error) {
    console.error("Twilio end error: ", error);
    return {
      status: "error",
      message: `An error occurred while trying to hang up`,
    };
  }
}

// Function to handle live agent handoff
async function liveAgentHandoff(args) {
  const { reason, context } = args;

  // Log the reason for the handoff
  console.log(`[LiveAgentHandoff] Initiating handoff with reason: ${reason}`);
  if (context) console.log(`[LiveAgentHandoff] Context provided: ${context}`);

  // Return a message indicating the handoff has been initiated
  return {
    reason: reason,
    context: context || "No additional context provided",
    message: `Handoff initiated due to: ${reason}. Context: ${
      context || "No additional context provided."
    }`,
  };
}

// Function to verify VIN
async function verifyVIN(args) {
  const { vin, vehicleId } = args;

  // Find the vehicle in the database
  const vehicle = mockDatabase.vehicles.find((v) => v.vehicleId === vehicleId);

  if (!vehicle) {
    console.log(`[verifyVIN] Vehicle with ID ${vehicleId} not found.`);
    return {
      status: "error",
      message: `Vehicle with ID ${vehicleId} not found in the database.`,
    };
  }

  // Check if VIN matches (case-insensitive)
  if (vehicle.vin.toUpperCase() === vin.toUpperCase()) {
    console.log(`[verifyVIN] VIN verified successfully.`);
    return {
      status: "success",
      message: `VIN verified successfully.`,
    };
  } else {
    console.log(`[verifyVIN] VIN verification failed.`);
    return {
      status: "error",
      message: `Provided VIN does not match our records.`,
    };
  }
}

// Function to schedule pickup
async function schedulePickup(args) {
  const { vehicleId, availabilityDate, workingHours } = args;

  // Find the vehicle in the database
  const vehicle = mockDatabase.vehicles.find((v) => v.vehicleId === vehicleId);

  if (!vehicle) {
    console.log(`[schedulePickup] Vehicle with ID ${vehicleId} not found.`);
    return {
      status: "error",
      message: `Vehicle with ID ${vehicleId} not found in the database.`,
    };
  }

  // Update the vehicle's pickup details
  vehicle.pickupDetails = {
    availabilityDate,
    workingHours,
  };

  console.log(`[schedulePickup] Pickup scheduled for vehicle ID ${vehicleId}.`);
  return {
    status: "success",
    message: `Pickup scheduled for ${availabilityDate} during working hours: ${workingHours}.`,
  };
}

// Function to get pickup instructions
async function getPickupInstructions(args) {
  const { vehicleId, instructions } = args;

  // Find the vehicle in the database
  const vehicle = mockDatabase.vehicles.find((v) => v.vehicleId === vehicleId);

  if (!vehicle) {
    console.log(
      `[getPickupInstructions] Vehicle with ID ${vehicleId} not found.`
    );
    return {
      status: "error",
      message: `Vehicle with ID ${vehicleId} not found in the database.`,
    };
  }

  // Update the vehicle's pickup instructions
  vehicle.pickupDetails = vehicle.pickupDetails || {};
  vehicle.pickupDetails.instructions = instructions;

  console.log(
    `[getPickupInstructions] Pickup instructions updated for vehicle ID ${vehicleId}.`
  );
  return {
    status: "success",
    message: `Pickup instructions recorded.`,
  };
}

// Function to get additional vehicle details
async function getAdditionalVehicleDetails(args) {
  const { vehicleId, keys, otherDetails } = args;

  // Find the vehicle in the database
  const vehicle = mockDatabase.vehicles.find((v) => v.vehicleId === vehicleId);

  if (!vehicle) {
    console.log(
      `[getAdditionalVehicleDetails] Vehicle with ID ${vehicleId} not found.`
    );
    return {
      status: "error",
      message: `Vehicle with ID ${vehicleId} not found in the database.`,
    };
  }

  // Update the vehicle's additional details
  vehicle.additionalDetails = {
    keys,
    otherDetails,
  };

  console.log(
    `[getAdditionalVehicleDetails] Additional details updated for vehicle ID ${vehicleId}.`
  );
  return {
    status: "success",
    message: `Additional vehicle details recorded.`,
  };
}

module.exports = {
  endCall,
  liveAgentHandoff,
  verifyVIN,
  schedulePickup,
  getPickupInstructions,
  getAdditionalVehicleDetails,
};
