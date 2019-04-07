import * as winston from 'winston';

const logger = winston.createLogger({});

if (!process.env.DISABLE_LOGGING) {
    logger.add(
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json(),
                winston.format.prettyPrint()
            ),
            debugStdout: true
        })
    );
}

export default logger;
