const { ActivityLog } = require("../models");

const activityLogger = async (job) => {
  await ActivityLog.create({
    userId: job.userId,
    type: job.type,
  });
};

module.exports = {
  activityLogger,
};
