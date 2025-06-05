export const realEstateSchema = {
  type: "object",
  properties: {
    listingType: {
      type: "string",
      enum: ["Rent", "Sell"],
      default: "Rent",
      title: "Listing Type",
    },
    propertyCategory: {
      type: "string",
      enum: ["Residential", "Commercial"],
      default: "Residential",
      title: "Property Type",
    },
    propertySubType: {
      type: "string",
      enum: ["Flat/Apartment", "Independent House/Villa", "Plot/Land"],
      default: "Flat/Apartment",
      title: "Property Subtype",
    },
    city: {
      type: "string",
      title: "City",
    },
    locality: {
      type: "string",
      title: "Locality",
    },
    subLocality: {
      type: "string",
      title: "Sub Locality",
    },
    society: {
      type: "string",
      title: "Apartment/Society",
    },
    amenities: {
      type: "array",
      title: "Amenities",
      items: {
        type: "string",
        enum: [
          "Maintenance Staff",
          "Water Storage",
          "Security/Fire Alarm",
          "Visitor Parking",
          "Park",
          "Intercom Facility",
        ],
      },
      uniqueItems: true,
    },
    propertyFeatures: {
      type: "array",
      title: "Property Features",
      items: {
        type: "string",
        enum: [
          "High Ceiling Height",
          "False Ceiling Lighting",
          "Piped-gas",
          "Internet connectivity",
          "Centrally Air Conditioned",
          "Water purifier",
          "Recently Renovated",
          "Private Garden/Terrace",
          "Natural Light",
          "Airy Rooms",
          "Spacious Interiors",
        ],
      },
      uniqueItems: true,
    },
    societyFeatures: {
      type: "array",
      title: "Society/Building Features",
      items: {
        type: "string",
        enum: [
          "Water softening plant",
          "Shopping Centre",
          "Fitness Centre/Gym",
          "Swimming Pool",
          "Club house/Community Center",
          "Security Personnel",
        ],
      },
      uniqueItems: true,
    },
    carpetArea: {
      type: "string",
      title: "Carpet Area (sq.ft.)",
    },
    otherRooms: {
      type: "array",
      title: "Other Rooms",
      items: {
        type: "string",
        enum: ["Pooja Room", "Study Room", "Servant Room", "Store Room"],
      },
      uniqueItems: true,
    },
    furnishing: {
      type: "string",
      enum: ["Furnished", "Semi-furnished", "Un-furnished"],
      title: "Furnishing",
    },
    parking: {
      type: "array",
      title: "Reserved Parking",
      items: {
        type: "string",
        enum: ["Covered Parking", "Open Parking"],
      },
      uniqueItems: true,
    },
    totalFloors: {
      type: "string",
      title: "Total Floors",
    },
    propertyFloor: {
      type: "string",
      title: "Property On the floors",
    },
    availabilityStatus: {
      type: "string",
      enum: ["Ready to move", "Under construction"],
      title: "Availability Status",
    },
    ageOfProperty: {
      type: "string",
      enum: ["0-1 years", "1-5 years", "5-10 years", "10+ years"],
      title: "Age of Property",
    },
    images: {
      type: "array",
      title: "Photos",
      items: {
        type: "string",
      },
    },
    video: {
      type: "string",
      title: "Video",
    },
    price: {
      type: "string",
      title: "Price",
    },
  },
  required: [
    "listingType",
    "propertyCategory",
    "propertySubType",
    "city",
    "locality",
    "carpetArea",
    "totalFloors",
    "propertyFloor",
    "availabilityStatus",
  ],
};
