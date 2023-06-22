const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_APIKEY);

const sendEmail = (order, updated) => {
  const msg = {
    to: [
      "nicomar2004@gmail.com",
      "mvperera@gmail.com",
      "lorec.rincon@gmail.com, estebanc_b@hotmail.com, noahsugliano@gmail.com",
    ],
    from: "unicorn.craftbeer@gmail.com",
    subject: `There is ${updated ? "a new order dispatched" : "an update"} on order N°${order.id}`,
    text: "Contenido del correo electrónico en formato de texto sin formato",
    html: `<h1>Hello Admins,</h1>
    <p>There is a new order dispatched on ${order.createdAt}!</p>
    <p>To view more information, click on the following link:</p>
    <p><a href="http://localhost:5173/admins/${order.id}">[link to order]</a></p>`,
  };

  sgMail.send(msg).then(() => console.log("Email sent"));
};

module.exports = { sendEmail };
