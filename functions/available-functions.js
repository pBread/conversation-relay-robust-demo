// available-functions.js
const mockDatabase = require("../data/mock-database");
const twilio = require("twilio");
const fs = require("fs");
const path = require("path");

// Twilio client setup (if needed)
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Path to the log file
const logFilePath = path.join(__dirname, "database-logs");

// Utility function to append log entries
function appendLogEntry(entry) {
  const logEntry = JSON.stringify(entry, null, 2);

  fs.access(logFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      // File does not exist, create it and write the log entry
      fs.writeFile(logFilePath, logEntry + "\n", (err) => {
        if (err) {
          console.error("Error creating log file:", err);
        } else {
          console.log("Log file created and log entry written:", entry);
        }
      });
    } else {
      // File exists, append the log entry
      fs.appendFile(logFilePath, logEntry + "\n", (err) => {
        if (err) {
          console.error("Error appending to log file:", err);
        } else {
          console.log("Log entry appended:", entry);
        }
      });
    }
  });
}

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
    return {
      status: "success",
      message: `Call has ended`,
    };
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
  if (context) {
    console.log(`[LiveAgentHandoff] Context provided: ${context}`);
  }

  // Return a message indicating the handoff has been initiated
  return {
    reason: reason,
    context: context || "No additional context provided",
    message: `Handoff initiated due to: ${reason}. Context: ${
      context || "No additional context provided."
    }`,
  };
}

function verifyVIN({ vinInput, vehicleId }) {
  // Remove whitespace and convert to uppercase
  const vinLast6 = vinInput.replace(/\s+/g, "").toUpperCase();

  // Retrieve the vehicle record from the database using vehicleId
  const vehicle = mockDatabase.vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) {
    return {
      isValid: false,
      message: "Vehicle not found in the database.",
    };
  }

  const actualVinLast6 = vehicle.vin.slice(-6).toUpperCase();

  let correctChars = 0;
  for (let i = 0; i < vinLast6.length; i++) {
    if (vinLast6[i] === actualVinLast6[i]) {
      correctChars++;
    }
  }

  return {
    isValid: vinLast6 === actualVinLast6,
    correctChars: correctChars,
    totalChars: vinLast6.length,
  };
}

// Function to set pickup availability
async function setPickupAvailability(args) {
  const { vehicleId, availabilityDate } = args;

  // Prepare the log entry
  const logEntry = {
    fn: "setPickupAvailability",
    payload: {
      date: availabilityDate,
    },
  };

  // Append the log entry to the database-logs file
  appendLogEntry(logEntry);

  console.log(
    `[setPickupAvailability] Availability date recorded for vehicle ID ${vehicleId}.`
  );
  return {
    status: "success",
    message: `Availability date recorded.`,
  };
}

// Function to set pickup instructions
async function setPickupInstructions(args) {
  const { vehicleId, instructions } = args;

  // Prepare the log entry
  const logEntry = {
    fn: "setPickupInstructions",
    payload: {
      instructions,
    },
  };

  // Append the log entry to the database-logs file
  appendLogEntry(logEntry);

  console.log(
    `[setPickupInstructions] Pickup instructions recorded for vehicle ID ${vehicleId}.`
  );
  return {
    status: "success",
    message: `Pickup instructions recorded.`,
  };
}

// Function to set additional vehicle details
async function setAdditionalDetails(args) {
  const { vehicleId, keyCount, isDriveable, otherDetails } = args;

  // Prepare the log entry
  const logEntry = {
    fn: "setAdditionalDetails",
    payload: {
      keyCount,
      isDriveable,
    },
  };

  // Include otherDetails if provided
  if (otherDetails) {
    logEntry.payload.otherDetails = otherDetails;
  }

  // Append the log entry to the database-logs file
  appendLogEntry(logEntry);

  console.log(
    `[setAdditionalDetails] Additional details recorded for vehicle ID ${vehicleId}.`
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
  setPickupAvailability,
  setPickupInstructions,
  setAdditionalDetails,
};
