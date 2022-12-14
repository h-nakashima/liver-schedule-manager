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
          {
            id: 1,
            name: "Utawaku",
            platform: "Youtube",
            dateTime: "2022-11-13T10:00:00.000Z",
          },
          {
            id: 2,
            name: "Zatsudan",
            platform: "bilibili",
            dateTime: "2022-11-14T10:00:00.000Z",
          },
        ];
        expect(response.body).to.be.an("array").of.length(2);
        expect(response.body).to.be.deep.equal(expected);
      }));

  it("should add a new event", () =>
    request(Server)
      .post("/api/v1/events")
      .send({
        name: "test",
        platform: "Nico",
        dateTime: "2022-11-15T10:00:00.000Z",
      })
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
        expect(r.body)
          .to.be.an("object")
          .that.has.property("dateTime")
          .equal("2022-11-15T10:00:00.000Z");
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
        expect(r.body)
          .to.be.an("object")
          .that.has.property("platform")
          .equal("bilibili");
        expect(r.body)
          .to.be.an("object")
          .that.has.property("dateTime")
          .equal("2022-11-14T10:00:00.000Z");
      }));

  it("should update an event by id", () =>
    request(Server)
      .patch("/api/v1/events/2")
      .send({
        name: "test",
        platform: "TwitCasting",
        dateTime: "2022-11-14T10:00:00.000Z",
      })
      .expect("Content-Type", /json/)
      .then((r) => {
        expect(r.body)
          .to.be.an("object")
          .that.has.property("name")
          .equal("test");
        expect(r.body)
          .to.be.an("object")
          .that.has.property("platform")
          .equal("TwitCasting");
        expect(r.body)
          .to.be.an("object")
          .that.has.property("dateTime")
          .equal("2022-11-14T10:00:00.000Z");
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

  // TODO: search?????????????????????????????????????????????
});
