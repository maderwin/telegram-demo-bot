import assert from 'assert';
import express from 'express';
import * as Boom from 'boom';

import logger from './lib/logger';

import v1 from './v1';

const app = express()
    .disable('x-powered-by')
    .get('/ping', (_req, res) => res.end())
    .use('/v1', v1)
    .use((_req, _res, next) => next(Boom.notFound('Endpoint not found')))
    .use((err: any, _req: express.Request, res: express.Response) => {
        if (err.isBoom) {
            sendError(res, err);
        } else {
            logger.error(err.stack || err);
            sendError(res, Boom.internal());
        }
    });

function sendError(res: express.Response, err: Boom): void {
    res.status(err.output.statusCode).json(err.output.payload);
}

if (!module.parent) {
    let customPort: number | undefined;
    if (process.env.NODEJS_PORT !== undefined) {
        customPort = parseInt(process.env.NODEJS_PORT, 10);
        assert(
            !isNaN(customPort),
            'Environment variable NODEJS_PORT must be an integer'
        );
    }
    const port = customPort || 8080;
    app.listen(port, () => {
        logger.info(`Application started on port ${port}`);
    });
}
