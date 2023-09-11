require("dotenv").config();

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const { adapterDB } = require("./provider/database/indexMongo");
const ServerAPI = require("./http");

/**
 * Flows
 */
const flowPrincipal = require("./flows/flowPrincipal");
const flowAgente = require("./flows/flowAgente");
const { flowServiceDesk } = require("./flows/flowServiceDesk");
const { flowTicket } = require("./flows/flowTicket");
 
/**
 * ChatGPT
 */
const ChatGPTClass = require("./chatgpt.class");
const chatGPT = new ChatGPTClass();

const main = async () => {
    await adapterDB.init();
 
    const adapterProvider = createProvider(BaileysProvider)
    const httpServer = new ServerAPI(adapterProvider, adapterDB);

    const adapterFlow = createFlow([
        flowPrincipal,
        flowAgente,
        flowServiceDesk(chatGPT),
        flowTicket(chatGPT),

    ]);
      
    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });
    httpServer.start();

}

main();
