import { PetAPI } from "./client/pet/petApi";
import { test } from "@playwright/test";
import { Message } from "./client/restClientBase";

const addPetObject = {
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

const successDeleteResponse = {
  code: 200,
  type: "unknown",
  message: "1",
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
      petApi.addPet(addPetObject),
      petUrl,
      addPetObject,
      200
    );
  });
  test("Find pet by ID, should returns 200", async () => {
    await message.getMessage(
      petUrl + petApi.findPetById(addPetObject.id.toString()),
      200
    );
  });
  test("Delete pet by ID, should returns 200 and 404 on GET pet by ID", async () => {
    await message.deleteMessage(
      petUrl + petApi.deletePet(addPetObject.id.toString()),
      successDeleteResponse,
      200
    );
    await message.getMessage(
      petUrl + petApi.findPetById(addPetObject.id.toString()),
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
