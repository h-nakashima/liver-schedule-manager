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
          { id: 1, name: "Utawaku" },
          { id: 2, name: "Zatsudan" },
        ];
        expect(response.body).to.be.an("array").of.length(2);
        expect(response.body).to.be.deep.equal(expected);
      }));

  it("should add a new event", () =>
    request(Server)
      .post("/api/v1/events")
      .send({ name: "test" })
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("name")
          .equal("test");
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

  // TODO: delete, searchのエンドポイントのテストを作成
});
