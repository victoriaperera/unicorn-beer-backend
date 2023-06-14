const Style = require("../models/Style");
const bcrypt = require("bcryptjs");

module.exports = async () => {
  const styles = [
    {
      name: "Scottish",
      description:
        "Cerveza roja, clara, de cuerpo mediano. Presenta notas de malta a caramelo, ligeramente tostadas y ahumadas. De sabor dulce y terroso, otorgado por el balance de malta y lúpulos.",
    },
    {
      name: "IPA",
      description:
        "Cerveza ámbar, clara y ligera. Las características marcantes son el amargor, los aromas y sabores cítricos y frutales a naranja, pomelo y limón, otorgados por la utilización de los lúpulos americanos.",
    },
    {
      name: "Stout",
      description:
        "Cerveza negra, con buena formación de espuma. Presenta aromas y sabores de malta tostada a café y cítricos a lúpulo americano. El final es seco y de amargor creciente.",
    },
    {
      name: "Blonde",
      description:
        "Cerveza rubia clara, refrescante y altamente bebible. La mezcla de levaduras Ale y Lager hacen que esta cerveza sea muy ligera y agradable en el paladar.",
    },
    {
      name: "APA",
      description:
        "Cerveza dorada y clara, que presenta notas frutales complejas en el aroma y sabor. De cuerpo mediano, posee buena cremosidad. El alcohol brinda un agradable calentamiento en la garganta.",
    },
  ];

  await Style.insertMany(styles);
  console.log("[Database] Se corrió el seeder de Admin.");
};
