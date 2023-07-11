import { PetAPI } from "./client/pet/petApi";
import { test } from "@playwright/test";
import { Message } from "./client/restClientBase";

const examplePetObject = {
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
};

const successResponse = {
  code: 200,
  type: "unknown",
  message: "1",
};

const notFoundResponse = {
  code: 404,
  type: "unknown",
  message: "not found",
};

const petToUpdateObject = {
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
};

const petStatuses = ["available", "pending", "sold"];

const petUrl = process.env.PET_URL;

test.describe("Pet API", () => {
  const petApi = new PetAPI();
  let message;

  test.beforeEach(async ({ request }) => {
    message = new Message(request);
  });

  test("Add a new pet to the store, should returns 200", async () => {
    await message.postMessage(
      petApi.addPet(examplePetObject),
      petUrl,
      examplePetObject,
      200
    );
  });
  test("Find pet by ID, should returns 200", async () => {
    await message.getMessage(
      petUrl + petApi.petById(examplePetObject.id.toString()),
      200
    );
  });
  test(`Update pet by ID ${examplePetObject.id}, should returns 200`, async () => {
    await message.putMessage(petToUpdateObject, petUrl, 200);
  });
  test(`Update pet with id ${examplePetObject.id} by form-data`, async () => {
    await message.postFormDataMessage(
      {
        name: examplePetObject.name,
        status: examplePetObject.status,
      },
      petUrl + petApi.petById(examplePetObject.id.toString()),
      successResponse,
      200
    );
  });
  test("Delete pet by ID, should returns 200 and 404 on find and update pet by ID", async () => {
    await message.deleteMessage(
      petUrl + petApi.deletePet(examplePetObject.id.toString()),
      successResponse,
      200
    );
    await message.getMessage(
      petUrl + petApi.petById(examplePetObject.id.toString()),
      404
    );
    await message.postFormDataMessage(
      {
        name: examplePetObject.name,
        status: examplePetObject.status,
      },
      petUrl + petApi.petById(examplePetObject.id.toString()),
      notFoundResponse,
      404
    );
  });
  for (const petStatus of petStatuses) {
    test(`Find pets by ${petStatus} status, should returns 200`, async () => {
      await message.getMessage(petUrl + "/findByStatus", 200, {
        status: petStatus,
      });
    });
  }
  test("Find pets by incorrect status, should returns 200 and empty body", async () => {
    await message.getMessage(petUrl + "/findByStatus", 200, {
      status: "incorrectStatus",
    });
  });
});
