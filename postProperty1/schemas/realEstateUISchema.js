export const realEstateUISchema = {
  type: "VerticalLayout",
  elements: [
    {
      type: "Group",
      label: "Step 1: Property Basics",
      elements: [
        {
          type: "Control",
          scope: "#/properties/listingType",
          options: {
            format: "radio",
          },
        },
        {
          type: "Control",
          scope: "#/properties/propertyCategory",
          options: {
            format: "radio",
          },
        },
        {
          type: "Control",
          scope: "#/properties/propertySubType",
          options: {
            format: "radio",
          },
        },
      ],
    },
    {
      type: "Group",
      label: "Step 2: Location Details",
      elements: [
        {
          type: "Control",
          scope: "#/properties/city",
        },
        {
          type: "Control",
          scope: "#/properties/locality",
        },
        {
          type: "Control",
          scope: "#/properties/subLocality",
        },
        {
          type: "Control",
          scope: "#/properties/society",
        },
      ],
    },
    {
      type: "Group",
      label: "Step 3: Features & Amenities",
      elements: [
        {
          type: "Group",
          label: "Basic Amenities",
          elements: [
            {
              type: "Control",
              scope: "#/properties/amenities",
              options: {
                format: "checkbox",
              },
            },
          ],
        },
        {
          type: "Group",
          label: "Property Features",
          elements: [
            {
              type: "Control",
              scope: "#/properties/propertyFeatures",
              options: {
                format: "checkbox",
              },
            },
          ],
        },
        {
          type: "Group",
          label: "Society Features",
          elements: [
            {
              type: "Control",
              scope: "#/properties/societyFeatures",
              options: {
                format: "checkbox",
              },
            },
          ],
        },
      ],
    },
    {
      type: "Group",
      label: "Step 4: Property Details",
      elements: [
        {
          type: "Control",
          scope: "#/properties/carpetArea",
        },
        {
          type: "Group",
          label: "Other Rooms",
          elements: [
            {
              type: "Control",
              scope: "#/properties/otherRooms",
              options: {
                format: "checkbox",
              },
            },
          ],
        },
        {
          type: "Group",
          label: "Furnishing Details",
          elements: [
            {
              type: "Control",
              scope: "#/properties/furnishing",
              options: {
                format: "radio",
              },
            },
          ],
        },
        {
          type: "Group",
          label: "Parking",
          elements: [
            {
              type: "Control",
              scope: "#/properties/parking",
              options: {
                format: "checkbox",
              },
            },
          ],
        },
        {
          type: "Group",
          label: "Floor Details",
          elements: [
            {
              type: "Control",
              scope: "#/properties/totalFloors",
            },
            {
              type: "Control",
              scope: "#/properties/propertyFloor",
            },
          ],
        },
        {
          type: "Control",
          scope: "#/properties/availabilityStatus",
          options: {
            format: "radio",
          },
        },
        {
          type: "Control",
          scope: "#/properties/ageOfProperty",
          options: {
            format: "radio",
          },
        },
      ],
    },
    {
      type: "Group",
      label: "Step 5: Media & Pricing",
      elements: [
        {
          type: "Control",
          scope: "#/properties/images",
          options: {
            format: "file",
          },
        },
        {
          type: "Control",
          scope: "#/properties/video",
          options: {
            format: "file",
          },
        },
        {
          type: "Control",
          scope: "#/properties/price",
        },
      ],
    },
  ],
};
