import 'dotenv/config';
import { DataSource } from 'typeorm';
import { buildDataSourceOptions } from './typeorm.config.js';

export default new DataSource(buildDataSourceOptions());
