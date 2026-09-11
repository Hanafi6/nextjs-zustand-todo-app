import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    server: {
        BASE_URL: z.string().url(),
        AWS_BUCKET_NAME: z.string().min(1),
    },

    client: {
    },

    runtimeEnv: {
        BASE_URL: process.env.BASE_URL,
        AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,

    },
});