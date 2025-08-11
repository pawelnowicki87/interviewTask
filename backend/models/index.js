// backend/models/index.js
import { Sequelize } from 'sequelize';
import configFile from '../config/config.cjs';
import defineMessage from './message.js';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const Message = defineMessage(sequelize, Sequelize.DataTypes);

const db = {
  sequelize,
  Sequelize,
  Message,
};

export default db;
export { Message };
