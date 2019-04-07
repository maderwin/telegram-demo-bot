import {Request, Response, NextFunction, RequestHandler} from 'express';

interface AsyncRequestHandler extends RequestHandler {
    (req: Request, res: Response, next: NextFunction): Promise<any>;
}

/**
 * Wrap async middleware, to catch and handle async errors
 */
export default function (asyncMiddleware: AsyncRequestHandler): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        asyncMiddleware(req, res, next).catch(next);
    };
}
