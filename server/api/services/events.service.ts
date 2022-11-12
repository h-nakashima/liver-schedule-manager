/* eslint-disable class-methods-use-this */
import L from "../../common/logger";
import knex from "../../knex";

const currentId = 0;
interface Event {
  id: number;
  name: string;
}

const localEvents: Event[] = [
  { id: 1, name: "event 0" },
  { id: 2, name: "event 1" },
];

export class EventsService {
  all(): Promise<Event[]> {
    L.info("fetch all events");
    const result = knex
      .select({
        id: "id",
        name: "name",
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
      })
      .from("events")
      .where({
        id,
      });
    return Promise.resolve(result).then((events) => events[0]);
    // return Promise.resolve(events).then((r) => r[id]);
  }

  create(name: string): Promise<Event> {
    L.info(`create event with name ${name}`);
    const event: Event = {
      id: currentId + 1,
      name,
    };
    localEvents.push(event);
    return Promise.resolve(event);
  }
}

export default new EventsService();
