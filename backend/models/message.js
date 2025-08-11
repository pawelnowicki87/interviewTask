'use strict';

export default (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
      validate: { len: [1, 500] }
    }
  }, { tableName: 'Messages' });

  return Message;
};
