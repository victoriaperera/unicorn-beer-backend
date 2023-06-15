const Style = require("../models/Style");

module.exports = async () => {
  const styles = [
    {
      name: "Scottish",
      price: "10.99",
      description:
        " A unique and flavorful amber or brown beer with a malty character and caramel notes. Balancing sweetness and bitterness, it offers a medium to full body with a prominent malt profile and subtle hints of toffee and nuts. Perfect for those seeking intense and full-bodied beer experiences.",
    },
    {
      name: "IPA",
      price: "10.99",
      description:
        "An exceptional India Pale Ale with a golden color and captivating aroma of citrus and tropical fruits. It perfectly balances hop bitterness and malt sweetness, offering a refreshing and invigorating flavor with notes of grapefruit, pine, and resin. A bold and vibrant beer journey.",
    },
    {
      name: "Stout",
      price: "10.99",
      description:
        "Cerveza negra, con buena formación de espuma. Presenta aromas y sabores de malta tostada a café y cítricos a lúpulo americano. El final es seco y de amargor creciente.",
    },
    {
      name: "Blonde",
      price: "10.99",
      description:
        "Cerveza rubia clara, refrescante y altamente bebible. La mezcla de levaduras Ale y Lager hacen que esta cerveza sea muy ligera y agradable en el paladar.",
    },
    {
      name: "APA",
      price: "10.99",
      description:
        "Cerveza dorada y clara, que presenta notas frutales complejas en el aroma y sabor. De cuerpo mediano, posee buena cremosidad. El alcohol brinda un agradable calentamiento en la garganta.",
    },
  ];

  await Style.insertMany(styles);
  console.log("[Database] Se corrió el seeder de Style.");
};
