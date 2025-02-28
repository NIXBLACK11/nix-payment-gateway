import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL!);

export const callbackQueue = new Queue('callbackQueue', { connection });

export const emailQueue = new Queue('emailQueue', { connection });
