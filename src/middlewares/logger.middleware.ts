import { Request, Response, NextFunction } from 'express';

import formatDate from '../helpers/formatDate';

export function loggerGlobal(req: Request, res: Response, next: NextFunction) {
  const date = formatDate(new Date());
  console.log(`[INFO] - ${date} - Endpoint ${req.url} - ${req.method}`);
  next();
}
