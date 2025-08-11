import 'dotenv/config';
import { Sequelize } from 'sequelize';
import configFile from '../config/config.cjs';
import defineMessage from '../models/message.js';

const env = process.env.NODE_ENV || 'development';
const cfg = configFile[env];

const sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg);
const Message = defineMessage(sequelize, Sequelize.DataTypes);

try {
  await sequelize.authenticate();
  let count = 0;
  try {
    count = await Message.count();
  } catch {
    count = 0;
  }
  console.log(count === 0 ? 'YES' : 'NO');
} catch (e) {
  console.error('should-seed error:', e?.message ?? e);
  process.exit(1);
} finally {
  await sequelize.close().catch(() => {});
}
