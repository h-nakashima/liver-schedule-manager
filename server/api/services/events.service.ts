/* eslint-disable class-methods-use-this */
import L from "../../common/logger";
import knex from "../../knex";

const currentId = 0;
interface Event {
  id: number;
  name: string;
}

const events: Event[] = [
  { id: 1, name: "event 0" },
  { id: 2, name: "event 1" },
];

export class EventsService {
  all(): Promise<Event[]> {
    L.info(events, "fetch all events");
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
    return Promise.resolve(events).then((r) => r[id]);
  }

  create(name: string): Promise<Event> {
    L.info(`create event with name ${name}`);
    const event: Event = {
      id: currentId + 1,
      name,
    };
    events.push(event);
    return Promise.resolve(event);
  }
}

export default new EventsService();
