/* eslint-disable class-methods-use-this */
import { Request, Response } from "express";
import EventsService from "../../services/events.service";

export class Controller {
  all(_: Request, res: Response): void {
    EventsService.all().then((r) => res.json(r));
  }

  byId(req: Request, res: Response): void {
    const id = Number.parseInt(req.params.id, 10);
    EventsService.byId(id).then((r) => {
      if (r) res.json(r);
      else res.status(404).end();
    });
  }

  create(req: Request, res: Response): void {
    EventsService.create(
      req.body.name,
      req.body.platform,
      req.body.dateTime
    ).then((r) => res.status(201).location(`/api/v1/events/${r.id}`).json(r));
  }

  update(req: Request, res: Response): void {
    const id = Number.parseInt(req.params.id, 10);
    EventsService.update(
      id,
      req.body.name,
      req.body.platform,
      req.body.dateTime
    ).then((r) => res.status(200).location(`/api/v1/events/${r.id}`).json(r));
  }

  delete(req: Request, res: Response): void {
    const id = Number.parseInt(req.params.id, 10);
    EventsService.delete(id, req.body.name).then((r) =>
      res.status(204).location(`/api/v1/events/${r.id}`).json(r)
    );
  }
}
export default new Controller();
