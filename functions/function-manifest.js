const tools = [
  {
    type: "function",
    function: {
      name: "endCall",
      description:
        "Ends the call by hanging up when the user explicitly requests it or when the conversation has naturally concluded with no further actions required.",
      parameters: {
        type: "object",
        properties: {},
        required: [],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "liveAgentHandoff",
      description:
        "Initiates a handoff to a live agent based on user request or specific escalation conditions.",
      parameters: {
        type: "object",
        properties: {
          reason: {
            type: "string",
            description:
              "The reason for the handoff, such as user request, incorrect VIN, mismatched vehicle description, or other issues.",
          },
          context: {
            type: "string",
            description:
              "Any relevant conversation context or details leading to the handoff.",
          },
        },
        required: ["reason"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "verifyVIN",
      description:
        "Verifies the provided VIN number against the vehicle information in the database.",
      parameters: {
        type: "object",
        properties: {
          vin: {
            type: "string",
            description:
              "The Vehicle Identification Number (VIN) provided by the user.",
          },
          vehicleId: {
            type: "string",
            description:
              "The internal database ID for the vehicle the agent is calling about.",
          },
        },
        required: ["vin", "vehicleId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "schedulePickup",
      description:
        "Schedules the vehicle pickup by recording the date when the vehicle will be available and the body shop's working hours.",
      parameters: {
        type: "object",
        properties: {
          vehicleId: {
            type: "string",
            description:
              "The internal database ID for the vehicle being scheduled for pickup.",
          },
          availabilityDate: {
            type: "string",
            description:
              "The date when the vehicle will be available for pickup (YYYY-MM-DD). **Convert any relative date expressions to this format based on {{currentDate}}.**",
          },
          workingHours: {
            type: "string",
            description:
              "The working hours of the body shop during which the pickup can occur.",
          },
        },
        required: ["vehicleId", "availabilityDate", "workingHours"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getPickupInstructions",
      description:
        "Records any special instructions for the pickup, such as who to ask for, specific location details, or other relevant information.",
      parameters: {
        type: "object",
        properties: {
          vehicleId: {
            type: "string",
            description:
              "The internal database ID for the vehicle being picked up.",
          },
          instructions: {
            type: "string",
            description:
              "Any special instructions for the pickup, provided by the user.",
          },
        },
        required: ["vehicleId", "instructions"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "getAdditionalVehicleDetails",
      description:
        "Collects additional required data about the vehicle, such as the number of available keys.",
      parameters: {
        type: "object",
        properties: {
          vehicleId: {
            type: "string",
            description:
              "The internal database ID for the vehicle in question.",
          },
          keys: {
            type: "integer",
            description: "The number of keys available for the vehicle.",
          },
          otherDetails: {
            type: "string",
            description:
              "Any other additional details provided by the user about the vehicle.",
          },
        },
        required: ["vehicleId"],
      },
    },
  },
];

module.exports = tools;
