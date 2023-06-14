const { faker } = require("@faker-js/faker");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

faker.locale = "en";

module.exports = async () => {
  const users = [];

  for (let i = 0; i < 2; i++) {
    users.push(
      new User({
        firstname: faker.name.firstName(),
        lastname: faker.name.lastName(),
        username: faker.internet.userName(),
        password: await bcrypt.hash(process.env.SESSION_CREDENTIAL, 10),
        email: faker.internet.email(),
        description: faker.lorem.sentence(15),
        avatar: faker.image.avatar(),
      }),
    );
  }

  await User.insertMany(users);
  console.log("[Database] Se corrió el seeder de Users.");
};
