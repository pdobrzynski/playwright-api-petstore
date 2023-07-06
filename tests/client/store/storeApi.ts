const storeApiInventroyUrl = "/inventory";

export class StoreAPI {
  getOrderById(orderId: string) {
    return "/order/" + orderId;
  }
  addAnOrder(body: any) {
    return body;
  }
  getInventoriesByStatus() {
    return storeApiInventroyUrl;
  }
  deleteOrderById(orderId: string) {
    return "/order/" + orderId;
  }
}
