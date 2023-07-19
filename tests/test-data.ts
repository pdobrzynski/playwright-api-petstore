export const testData = {
  examplePetObject: [
    {
      id: 1,
      category: {
        id: 1,
        name: "string",
      },
      name: "doggie",
      photoUrls: ["string"],
      tags: [
        {
          id: 1,
          name: "string",
        },
      ],
      status: "available",
    },
    {
      id: 1,
      category: {
        id: 1,
        name: "string",
      },
      name: "doggie_v2",
      photoUrls: ["string"],
      tags: [
        {
          id: 1,
          name: "string",
        },
      ],
      status: "available",
    },
  ],
  exampleAddStoreOrderObject: [
    {
      id: 1,
      petId: 1,
      quantity: 1,
      shipDate: "2023-07-06T07:09:30.489Z",
      status: "placed",
      complete: true,
    },
    {
      id: 1,
      petId: 1,
      quantity: 1,
      shipDate: "2023-07-06T07:09:30.489+0000",
      status: "placed",
      complete: true,
    },
  ],
  validation: [
    {
      code: 200,
      type: "unknown",
      message: "1",
    },
    {
      code: 404,
      type: "unknown",
      message: "not found",
    },
    {
      id: 1,
      petId: 1,
      quantity: 1,
      shipDate: "2023-07-06T07:09:30.489+0000",
      status: "placed",
      complete: true,
    },
  ],
};
