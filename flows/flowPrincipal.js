const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const flowPrincipal = addKeyword(EVENTS.WELCOME)
  .addAnswer(
    "Bivenido a *Telemetry*"  )
  .addAnswer(
    [
        "¿Como podemos ayudarte?",
        "",
        "*1* Ver estatus de ticket",
        "*2* Nuevo Ticket",
        "*3* Agente",
    ]
  )  
  .addAnswer('Responda con el numero de la opción!')

module.exports = flowPrincipal;