const Style = require("../models/Style");
const Product = require("../models/Product");
const formidable = require("formidable");

async function index(req, res) {
  const styles = await Style.find().populate("containers");

  return res.json(styles);
}

async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  form.parse(req, async (err, fields, files) => {
    const style = await Style.create({
      name: fields.name,
      description: fields.description,
      price: fields.price,
      photos: [],
    });

    if (files.photos !== undefined) {
      if (Array.isArray(files.photos)) {
        for (const photo of files.photos) {
          style.photos.push(photo.originalFilename);
        }
      } else {
        style.photos.push(files.photos.originalFilename);
      }
    }

    style
      ? res.status(201).json(style)
      : res.status(409).send({ message: "Something went wrong, try again later" });
  });
}

async function update(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      return `${part.originalFilename}`; // Will be joined with options.uploadDir.
    },
  });

  form.parse(req, async (err, fields, files) => {
    const style = await Style.findById(req.params.id);
    const newStyle = {
      name: fields.name,
      description: fields.description,
      price: fields.price,
      photos: [],
    };

    if (Array.isArray(style.photos)) {
      newStyle.photos.push(...style.photos);
    }

    if (files.photos !== undefined) {
      if (Array.isArray(files.photos)) {
        for (const photo of files.photos) {
          newStyle.photos.push(photo.originalFilename);
        }
      } else {
        newStyle.photos.push(files.photos.originalFilename);
      }
    }

    const updatedStyle = await Style.findByIdAndUpdate(req.params.id, newStyle, { new: true });

    return res.status(202).json(updatedStyle);
  });
}

async function destroy(req, res) {
  const style = await Style.findByIdAndDelete(req.params.id);
  const products = await Product.find({ style: style });
  for (const product of products) {
    await Product.findByIdAndDelete(product._id);
  }

  return res.status(200).send({ message: "Style and its products deleted" });
}

module.exports = {
  index,
  store,
  update,
  destroy,
};
