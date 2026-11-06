import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { DataSourceOptions } from 'typeorm';

const configDirectory = dirname(fileURLToPath(import.meta.url));

export function buildDataSourceOptions(
    env: NodeJS.ProcessEnv = process.env
): DataSourceOptions {

    return {
        type: 'postgres',
        host: env.DB_HOST ?? 'localhost',
        port: Number(env.DB_PORT ?? 5432),
        username: env.DB_USERNAME ?? 'postgres',
        password: env.DB_PASSWORD ?? 'postgres',
        database: env.DB_DATABASE ?? 'ecommerce_db',
        synchronize: false,
        logging: env.DB_LOGGING === 'true',
        entities: [resolve(configDirectory, '../**/*.entity{.ts,.js}')],
        migrations: [resolve(configDirectory, 'migrations/*{.ts,.js}')],
        uuidExtension: 'pgcrypto',
    };
}
