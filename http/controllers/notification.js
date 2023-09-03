const { decryptData } = require("../../utils/hash");
const { getClient, saveTicket } = require("../services/tickets");

const COURSE_ID = process.env.COURSE_ID ?? "";

const ctrlNotification = async (req, res) => {
  const {phone, message} = req.body;
  const adapterDB = req.db;
  const adapterProvider = req.ws;

  if (!phone) {
    res.send({ data: "Ups algo paso con pago intenta de nuevo!" });
    return;
  } 

  console.log(phone);
  var response = await adapterProvider.sendText(`${phone}@c.us`, message);

 
  res.send({ data: response});

};

module.exports = { ctrlNotification };
