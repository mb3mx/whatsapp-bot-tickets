const { Router } = require("express");
const { ctrlNotification } = require("../controllers/notification");
const router = Router()

/**
 * Ruta cuando se realiza un pago exitoso
 */
router.post("/", ctrlNotification);

module.exports = router