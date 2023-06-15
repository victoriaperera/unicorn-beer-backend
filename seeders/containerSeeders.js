const Container = require("../models/Container");

module.exports = async () => {
  const containers = [
    {
      name: "Bottle",
      volume: 0.5,
    },
    {
      name: "Can",
      volume: 0.33,
    },
    {
      name: "Barrel",
      volume: 5,
    },
  ];

  await Container.insertMany(containers);
  console.log("[Database] Se corrió el seeder de Containers.");
};
