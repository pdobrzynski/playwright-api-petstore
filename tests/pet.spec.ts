import { PetAPI } from "./client/pet/petApi";
import { test } from "@playwright/test";
import { Message } from "./client/restClientBase";
import { testData } from "./test-data";

const petStatuses = ["available", "pending", "sold"];

const petUrl = process.env.PET_URL;
const petUrlFindByStatus = process.env.PET_URL_FIND_BY_STATUS;

test.describe("Pet API", () => {
  const petApi = new PetAPI();
  let message;

  test.beforeEach(async ({ request }) => {
    message = new Message(request);
  });

  test("Add a new pet to the store, should returns 200", async () => {
    await message.postMessage(
      petApi.addPet(testData.examplePetObject[0]),
      petUrl,
      testData.examplePetObject[0],
      200
    );
  });
  test("Find pet by ID, should returns 200", async () => {
    await message.getMessage(
      petUrl + petApi.petById(testData.examplePetObject[0].id.toString()),
      200
    );
  });
  test(`Update pet by ID ${testData.examplePetObject[0].id}, should returns 200`, async () => {
    await message.putMessage(testData.examplePetObject[1], petUrl, 200);
  });
  test(`Update pet with id ${testData.examplePetObject[0].id} by form-data`, async () => {
    await message.postFormDataMessage(
      {
        name: testData.examplePetObject[0].name,
        status: testData.examplePetObject[0].status,
      },
      petUrl + petApi.petById(testData.examplePetObject[0].id.toString()),
      testData.validation[0],
      200
    );
  });
  test("Delete pet by ID, should returns 200 and 404 on find and update pet by ID", async () => {
    await message.deleteMessage(
      petUrl + petApi.deletePet(testData.examplePetObject[0].id.toString()),
      testData.validation[0],
      200
    );
    await message.getMessage(
      petUrl + petApi.petById(testData.examplePetObject[0].id.toString()),
      404
    );
    await message.postFormDataMessage(
      {
        name: testData.examplePetObject[0].name,
        status: testData.examplePetObject[0].status,
      },
      petUrl + petApi.petById(testData.examplePetObject[0].id.toString()),
      testData.validation[1],
      404
    );
  });
  for (const petStatus of petStatuses) {
    test(`Find pets by ${petStatus} status, should returns 200`, async () => {
      await message.getMessage(petUrlFindByStatus, 200, {
        status: petStatus,
      });
    });
  }
  test("Find pets by incorrect status, should returns 200 and empty body", async () => {
    await message.getMessage(petUrlFindByStatus, 200, {
      status: "incorrectStatus",
    });
  });
});
