const Product = require("../models/Product");
const Container = require("../models/Container");
const Style = require("../models/Style");
const formidable = require("formidable");

async function index(req, res) {
  try {
    const products = await Product.find().populate("container").populate("style");

    return res.json(products);
  } catch (err) {
    res.status(400).json(err)
  }
}

async function show(req, res) {
  const product = await Product.findById(req.params.id).populate("container").populate("style");

  return res.json(product);
}

async function storeViejo(req, res) {
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

async function store(req, res) {
  try{
    const container = await Container.findOne({name: req.body.container}, "_id");
    const style = await Style.findOne({name: req.body.style})
 
    const newProduct = await Product.create({
      style: style.id,
      container: container,
      price: req.body.price,
      stock: req.body.stock,
      name: req.body.name
    })
    const product = await Product.find(newProduct).populate("container", "name").populate("style", "name") // TODO
  return res.status(200).json(product);
  }catch(err){
    res.status(400).json(err)
  }
}

async function update(req, res) {
  try{
    const product = await Product.findByIdAndUpdate( req.body.productId, {
      stock: req.body.stock,
      price: req.body.price
    })
    res.status(201).json(product)
  }catch(err){
    res.status(404).json(err)
  }
}



async function destroy(req, res) {
  try{
    const product = await Product.findById(req.body.productId);
    await product.delete();
    return res.status(200).send({ message: "Product deleted" });
  }catch(err){
    return res.status(404).send({message: "Todo mal"})
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
