import { Request, Response, NextFunction } from "express";

export default function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  // TODO: eslintでオフにしているがちゃんと治す
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
): void {
  const errors = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ errors });
}
