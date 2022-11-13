import { Application } from "express";
import eventsRouter from "./api/controllers/events/router";

export default function routes(app: Application): void {
  app.use("/api/v1/events", eventsRouter);
}
