const User = require("../models/User");


async function index(req, res) {
  const user = await User.findOne({ username: req.params.username })
    .populate({
      path: "tweets",
      populate: { path: "author", options: { strictPopulate: false } },
    })
    .select("-password");

  return res.json(user);
}

async function show(req, res) {

}

async function update(req, res) {
 

  form.parse(req, async (err, fields, files) => {
    const userUpdate = {
      firstname: fields.firstname,
      lastname: fields.lastname,
      username: fields.username,
      description: fields.description,
      avatar: files.avatar.newFilename,
    };

    const user = await User.findByIdAndUpdate(req.auth.userId, userUpdate, { new: true }).select(
      "-password",
    );
    return res.json(user);
  });
}

async function destroy(req, res) {
  await User.findByIdAndDelete(req.params.id)
  res.status(200).json("Se ha borrado el usuario correctamente");
}




module.exports = {
  index,
  show,
  update,
  destroy
};
