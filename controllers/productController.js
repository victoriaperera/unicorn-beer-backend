const Product = require("../models/Product");

const formidable = require("formidable");

async function index(req, res) {
  const products = await Product.find().populate("container").populate("style");

  return res.json(products);
}

async function show(req, res) {
  const product = await Product.findById(req.params.id).populate("container").populate("style");

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
      photos: [],
      stock: fields.stock,
      featured: fields.featured,
    });

    if (files.photos !== undefined) {
      if (Array.isArray(files.photos)) {
        for (const photo of files.photos) {
          newProduct.photos.push(photo.originalFilename);
        }
      } else {
        newProduct.photos.push(files.photos.originalFilename);
      }
    }

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
    const product = await Product.findById(req.params.id);
    const newProduct = {
      style: fields.style,
      container: fields.container,
      photos: [],
      stock: fields.stock,
      featured: fields.featured,
    };

    newProduct.photos.push(...product.photos);

    if (files.photos !== undefined) {
      if (Array.isArray(files.photos)) {
        for (const photo of files.photos) {
          newProduct.photos.push(photo.originalFilename);
        }
      } else {
        newProduct.photos.push(files.photos.originalFilename);
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, newProduct, {
      new: true,
    });

    return res.status(201).json(updatedProduct);
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
