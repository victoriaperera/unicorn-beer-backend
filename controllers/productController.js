const Product = require("../models/Product");
const Container = require("../models/Container");
const Style = require("../models/Style");
const formidable = require("formidable");

async function index(req, res) {
  const products = await Product.find().populate("container").populate("style");

  return res.json(products);
}
async function show(req, res) {}
async function store(req, res) {}
async function update(req, res) {
  const form = formidable({
    multiples: false,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
}
async function destroy(req, res) {}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
