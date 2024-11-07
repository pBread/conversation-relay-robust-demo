// function-manifest.js
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
        "Verifies the last six characters of a VIN and provides vehicle details.",
      parameters: {
        type: "object",
        properties: {
          vinInput: {
            type: "string",
            description:
              "The last six characters of the VIN provided by the user.",
          },
          vehicleId: {
            type: "string",
            description: "The internal database ID of the vehicle.",
          },
        },
        required: ["vinInput", "vehicleId"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "setPickupAvailability",
      description:
        "Records when the vehicle will be ready for pickup by updating the database with the availability date.",
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
        },
        required: ["vehicleId", "availabilityDate"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "setPickupInstructions",
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
      name: "setAdditionalDetails",
      description:
        "Collects additional required data about the vehicle, such as the number of available keys, and updates the database.",
      parameters: {
        type: "object",
        properties: {
          vehicleId: {
            type: "string",
            description:
              "The internal database ID for the vehicle in question.",
          },
          keyCount: {
            type: "integer",
            description: "The number of keys available for the vehicle.",
          },
          isDriveable: {
            type: "boolean",
            description: "Indicates whether the vehicle is driveable.",
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
