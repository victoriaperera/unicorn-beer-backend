const Product = require("../models/Product");

const formidable = require("formidable");

async function index(req, res) {
  const products = await Product.find().populate("container").populate("style");

  return res.json(products);
}

async function show(req, res) {
  const product = await Product.findById(req.body.id).populate("container").populate("style");

  return res.json(product);
}

async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const newProduct = Product.create({
      style: fields.styleId,
      container: fields.containerId,
      photos: files.photos,
      stock: fields.stock,
      featured: fields.featured,
    });

    return res.status(201).json(newProduct);
  });
}

async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        style: fields.style,
        container: fields.container,
        photos: files.photos,
        stock: fields.stock,
        featured: fields.featured,
      },
      { new: true },
    );
    return res.status(201).json(product);
  });
}

async function destroy(req, res) {
  await Product.findByIdAndDelete(req.body.id);
  return res.status(200).send({ message: "Product deleted" });
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
