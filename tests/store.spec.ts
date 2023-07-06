import { test } from "@playwright/test";
import { Message } from "./client/restClientBase";
import { StoreAPI } from "./client/store/storeApi";

const addOrderObject = {
  id: 1,
  petId: 1,
  quantity: 1,
  shipDate: "2023-07-06T07:09:30.489Z",
  status: "placed",
  complete: true,
};

const expectedAddOrderResponseObject = {
  id: 1,
  petId: 1,
  quantity: 1,
  shipDate: "2023-07-06T07:09:30.489+0000",
  status: "placed",
  complete: true,
};

const successDeleteResponse = {
  code: 200,
  type: "unknown",
  message: "1",
};

const storeUrl = process.env.STORE_URL;

test.describe("Store API", () => {
  const storeApi = new StoreAPI();
  let message;

  test.beforeEach(async ({ request }) => {
    message = new Message(request);
  });

  test("Place an order for a pet, should returns 200", async () => {
    await message.postMessage(
      storeApi.addAnOrder(addOrderObject),
      storeUrl + "/order",
      expectedAddOrderResponseObject,
      200
    );
  });
  test("Find purchase order by ID, should returns 200", async () => {
    await message.getMessage(
      storeUrl + storeApi.getOrderById(addOrderObject.id.toString()),
      200
    );
  });
  test("Delete purchase order by ID, should returns 200 and 404 on GET order by ID", async () => {
    await message.deleteMessage(
      storeUrl + storeApi.deleteOrderById(addOrderObject.id.toString()),
      successDeleteResponse,
      200
    );
    await message.getMessage(
      storeUrl + storeApi.getOrderById(addOrderObject.id.toString()),
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
