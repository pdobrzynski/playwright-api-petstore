import { test } from "@playwright/test";
import { Message } from "./client/restClientBase";
import { StoreAPI } from "./client/store/storeApi";
import { testData } from "./test-data";

const storeUrl = process.env.STORE_URL;
const storeUrlOrder = process.env.STORE_URL_ORDER;

test.describe("Store API", () => {
  const storeApi = new StoreAPI();
  let message;

  test.beforeEach(async ({ request }) => {
    message = new Message(request);
  });

  test("Place an order for a pet, should returns 200", async () => {
    await message.postMessage(
      storeApi.addAnOrder(testData.exampleAddStoreOrderObject[0]),
      storeUrlOrder,
      testData.exampleAddStoreOrderObject[1],
      200
    );
  });
  test("Find purchase order by ID, should returns 200", async () => {
    await message.getMessage(
      storeUrl +
        storeApi.getOrderById(
          testData.exampleAddStoreOrderObject[0].id.toString()
        ),
      200
    );
  });
  test("Delete purchase order by ID, should returns 200 and 404 on GET order by ID", async () => {
    await message.deleteMessage(
      storeUrl +
        storeApi.deleteOrderById(
          testData.exampleAddStoreOrderObject[0].id.toString()
        ),
      testData.validation[0],
      200
    );
    await message.getMessage(
      storeUrl +
        storeApi.getOrderById(
          testData.exampleAddStoreOrderObject[0].id.toString()
        ),
      404
    );
  });
  test("Find an invalid order ID, should returns 404", async () => {
    await message.getMessage(storeUrl + storeApi.getOrderById("-1"), 404);
    await message.getMessage(storeUrl + storeApi.getOrderById("9999"), 404);
  });
  test("Get pet inventories by status, should returns 200", async () => {
    await message.getMessage(storeUrl + storeApi.getInventoriesByStatus(), 200);
  });
});
