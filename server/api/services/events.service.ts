/* eslint-disable class-methods-use-this */
import L from "../../common/logger";
import knex from "../../knex";

interface Event {
  id: number;
  name: string;
}

export class EventsService {
  all(): Promise<Event[]> {
    L.info("fetch all events");
    const result = knex
      .select({
        id: "id",
        name: "name",
        platform: "platform",
      })
      .from("events");
    return Promise.resolve(result);
  }

  byId(id: number): Promise<Event> {
    L.info(`fetch event with id ${id}`);
    const result = knex
      .select({
        id: "id",
        name: "name",
        platform: "platform",
      })
      .from("events")
      .where({
        id,
      });
    return Promise.resolve(result).then((events) => events[0]);
  }

  create(name: string, platform: string): Promise<Event> {
    L.info(`create event with name ${name}`);
    return knex("events")
      .insert({ name, platform })
      .returning("*")
      .then((events) => events[0]);
  }

  update(id: number, name: string): Promise<Event> {
    L.info(`update id ${id} event with name ${name}`);
    return knex("events")
      .update({ name })
      .where({
        id,
      })
      .returning("*")
      .then((events) => events[0]);
  }

  delete(id: number, name: string): Promise<Event> {
    L.info(`delete id ${id} event with name ${name}`);
    return knex("events")
      .delete()
      .where({
        id,
      })
      .returning("*")
      .then((events) => events[0]);
  }
}

export default new EventsService();
