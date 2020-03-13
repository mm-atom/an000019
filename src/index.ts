import { getLogger } from 'log4js';
import { createClient } from 'redis';
import config from '@mmstudio/config';

const logger = getLogger();
const REDIS = config.redis;

export default function an19(key: string, timeout?: number) {
	return new Promise<boolean>((resolve) => {
		const client = open();
		const to = timeout || REDIS.expiration;
		return client.expire(key, to, (error, res) => {
			if (error) {
				logger.error(error);
				resolve(false);
			} else {
				resolve(res === 0);
				client.end(true);
			}
			client.quit();
		});
	});

}

function open() {
	const client = createClient(REDIS.url);
	client.on('error', (e) => {
		logger.error(e);
		logger.error('Redis Error thrown, process will exit with code -1');
		process.exit(-1);
	});
	return client;
}
