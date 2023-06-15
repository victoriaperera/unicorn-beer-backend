const Style = require("../models/Style");

async function index(req, res) {
  const styles = await Style.find();

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
      photos: files.photos,
    });

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
  });
  form.parse(req, async (err, fields, files) => {
    const style = await Style.findByIdAndUpdate(
      req.body.styleId,
      {
        name: fields.name,
        description: fields.description,
        photos: files.photos,
      },
      { new: true },
    );

    return res.status(202).json(style);
  });
}

async function destroy(req, res) {
  await Style.findByIdAndDelete(req.params.id);
  return res.status(200).send({ message: "Style deleted" });
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
