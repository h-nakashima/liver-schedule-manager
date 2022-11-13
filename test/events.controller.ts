import "mocha";
import { expect } from "chai";
import request from "supertest";
import Server from "../server";

describe("Events", () => {
  it("should get all events", () =>
    request(Server)
      .get("/api/v1/events")
      .expect("Content-Type", /json/)
      .then((response) => {
        const expected = [
          { id: 1, name: "Utawaku", platform: "Youtube" },
          { id: 2, name: "Zatsudan", platform: "bilibili" },
        ];
        expect(response.body).to.be.an("array").of.length(2);
        expect(response.body).to.be.deep.equal(expected);
      }));

  it("should add a new event", () =>
    request(Server)
      .post("/api/v1/events")
      .send({ name: "test", platform: "Nico" })
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("name")
          .equal("test");
        expect(r.body)
          .to.be.an("object")
          .that.has.property("platform")
          .equal("Nico");
      }));

  it("should get an event by id", () =>
    request(Server)
      .get("/api/v1/events/2")
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("name")
          .equal("Zatsudan");
      }));

  it("should update an event by id", () =>
    request(Server)
      .patch("/api/v1/events/2")
      .send({ name: "test" })
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("name")
          .equal("test");
      }));

  it("should delete an event by id", () =>
    request(Server)
      .delete("/api/v1/events/2")
      .then((r) => {
        expect(r.statusCode).to.equal(204);
      }));

  it("should not get an event by id after deleting", () =>
    request(Server)
      .get("/api/v1/events/2")
      .then((r) => {
        // eslint-disable-next-line no-unused-expressions
        expect(r.body).to.be.empty;
      }));

  // TODO: searchのエンドポイントのテストを作成
});
