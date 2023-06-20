const Style = require("../models/Style");

module.exports = async () => {
  const styles = [
    {
      name: "Scottish",
      price: 10.99,
      description:
        " A unique and flavorful amber or brown beer with a malty character and caramel notes. Balancing sweetness and bitterness, it offers a medium to full body with a prominent malt profile and subtle hints of toffee and nuts. Perfect for those seeking intense and full-bodied beer experiences.",
      abv: 5.6,
      photos: [
        "SCOTTISH_bottle-1.jpg",
        "SCOTTISH_bottle-2.jpg",
        "SCOTTISH_bottle-Main.png",
        "SCOTTISH_can-1.jpg",
        "SCOTTISH_can-2.jpg",
        "SCOTTISH_can-Main.png",
        "SCOTTISH_keg-1.jpg",
        "SCOTTISH_keg-2.jpg",
        "SCOTTISH_keg-Main.png",
        "SCOTTISH_logo.svg",
      ],
    },
    {
      name: "IPA",
      price: 10.99,
      description:
        "An exceptional India Pale Ale with a golden color and captivating aroma of citrus and tropical fruits. It perfectly balances hop bitterness and malt sweetness, offering a refreshing and invigorating flavor with notes of grapefruit, pine, and resin. A bold and vibrant beer journey.",
      abv: 4.5,
      photos: [
        "IPA_bottle-1.jpg",
        "IPA_bottle-2.jpg",
        "IPA_bottle-Main.png",
        "IPA_can-1.jpg",
        "IPA_can-2.jpg",
        "IPA_can-Main.png",
        "IPA_keg-1.jpg",
        "IPA_keg-2.jpg",
        "IPA_keg-Main.png",
        "IPA_logo.svg",
      ],
    },
    {
      name: "Stout",
      price: 10.99,
      description:
        "Cerveza negra, con buena formación de espuma. Presenta aromas y sabores de malta tostada a café y cítricos a lúpulo americano. El final es seco y de amargor creciente.",
      abv: 5.5,
      photos: [
        "STOUT_bottle-1.jpg",
        "STOUT_bottle-2.jpg",
        "STOUT_bottle-Main.png",
        "STOUT_can-1.jpg",
        "STOUT_can-2.jpg",
        "STOUT_can-Main.png",
        "STOUT_keg-1.jpg",
        "STOUT_keg-2.jpg",
        "STOUT_keg-Main.png",
        "STOUT_logo.svg",
      ],
    },
    {
      name: "Blonde",
      price: 10.99,
      description:
        "Cerveza rubia clara, refrescante y altamente bebible. La mezcla de levaduras Ale y Lager hacen que esta cerveza sea muy ligera y agradable en el paladar.",
      abv: 5.2,
      photos: [
        "BLONDE_bottle-1.jpg",
        "BLONDE_bottle-2.jpg",
        "BLONDE_bottle-Main.png",
        "BLONDE_can-1.jpg",
        "BLONDE_can-2.jpg",
        "BLONDE_can-Main.png",
        "BLONDE_keg-1.jpg",
        "BLONDE_keg-2.jpg",
        "BLONDE_keg-Main.png",
        "BLONDE_logo.svg",
      ],
    },
    {
      name: "APA",
      price: 10.99,
      description:
        "Cerveza dorada y clara, que presenta notas frutales complejas en el aroma y sabor. De cuerpo mediano, posee buena cremosidad. El alcohol brinda un agradable calentamiento en la garganta.",
      abv: 6,
      photos: [
        "APA_bottle-1.jpg",
        "APA_bottle-2.jpg",
        "APA_bottle-Main.png",
        "APA_can-1.jpg",
        "APA_can-2.jpg",
        "APA_can-Main.png",
        "APA_keg-1.jpg",
        "APA_keg-2.jpg",
        "APA_keg-Main.png",
        "APA_logo.svg",
      ],
    },
    {
      name: "ZERO",
      price: 10.99,
      description:
        "Cerveza dorada y clara, que presenta notas frutales complejas en el aroma y sabor. De cuerpo mediano, posee buena cremosidad. El alcohol brinda un agradable calentamiento en la garganta.",
      abv: 0,

      photos: [
        "ZERO_bottle-1.jpg",
        "ZERO_bottle-2.jpg",
        "ZERO_bottle-Main.png",
        "ZERO_can-1.jpg",
        "ZERO_can-2.jpg",
        "ZERO_can-Main.png",
        "ZERO_keg-1.jpg",
        "ZERO_keg-2.jpg",
        "ZERO_keg-Main.png",
        "ZERO_logo.svg",
      ],
    },
    {
      name: "Pilsener",
      price: 10.99,
      description:
        "Cerveza dorada y clara, que presenta notas frutales complejas en el aroma y sabor. De cuerpo mediano, posee buena cremosidad. El alcohol brinda un agradable calentamiento en la garganta.",
      abv: 5,
      photos: [
        "PILSENER_bottle-1.jpg",
        "PILSENER_bottle-2.jpg",
        "PILSENER_bottle-Main.png",
        "PILSENER_can-1.jpg",
        "PILSENER_can-2.jpg",
        "PILSENER_can-Main.png",
        "PILSENER_keg-1.jpg",
        "PILSENER_keg-2.jpg",
        "PILSENER_keg-Main.png",
        "PILSENER_logo.svg",
      ],
    },
  ];

  await Style.insertMany(styles);
  console.log("[Database] Se corrió el seeder de Style.");
};
