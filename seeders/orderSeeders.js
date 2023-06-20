const Order = require("../models/Order");

module.exports = async () => {
  const admins = [];

  await Admin.insertMany(admins);
  console.log("[Database] Se corrió el seeder de Admin.");
};
