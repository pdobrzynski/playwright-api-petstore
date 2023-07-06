import { test, expect, APIRequestContext } from "@playwright/test";

export class Message {
  readonly reqContext: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.reqContext = request;
  }

  public async getMessage(resource: string, status: any, queryparams?: any) {
    let statusResponse: number;

    await test.step("GET", async () => {
      const response = await this.reqContext.get(resource, {
        headers: {
          accept: "application/json",
          api_key: "special-key",
        },
        params: queryparams,
      });
      statusResponse = response.status();
    });

    await test.step(`Status is ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });
  }

  public async postMessage(
    body: any,
    resource: string,
    returns: any,
    status: any
  ) {
    let statusResponse: number;
    let callResponse: any;

    await test.step("POST", async () => {
      const response = await this.reqContext.post(resource, {
        headers: {
          accept: "application/json",
          api_key: "special-key",
        },
        data: body,
      });
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`Status is ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });

    await test.step("Resposne body matches the expected body", async () => {
      expect
        .soft(
          await callResponse,
          "The response does not match the expected results"
        )
        .toEqual(returns);
    });
  }

  public async deleteMessage(resource: string, returns: any, status: any) {
    let statusResponse: number;
    let callResponse: any;

    await test.step("DELETE", async () => {
      const response = await this.reqContext.delete(resource, {
        headers: {
          accept: "application/json",
          api_key: "special-key",
        },
      });
      statusResponse = response.status();
      callResponse = await response.json();
    });

    await test.step(`Status is ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });

    await test.step("Resposne body matches the expected body", async () => {
      expect
        .soft(
          await callResponse,
          "The response does not match the expected results"
        )
        .toEqual(returns);
    });
  }

  public async putMessage(resource: string, status: any) {
    let statusResponse: number;

    await test.step("PUT", async () => {
      const response = await this.reqContext.put(resource, {
        headers: {
          accept: "application/json",
          api_key: "special-key",
        },
      });
      statusResponse = response.status();
    });

    await test.step(`Status is ${status}`, async () => {
      expect(statusResponse, "Expected status").toBe(status);
    });
  }
}
