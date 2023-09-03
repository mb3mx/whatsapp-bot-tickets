require("dotenv").config();

const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')

const { adapterDB } = require("./provider/database/indexMongo");
const ServerAPI = require("./http");

/**
 * Declaramos las conexiones de MySQL
 */
const MYSQL_DB_HOST = 'srv473.hstgr.io'
const MYSQL_DB_USER = 'u127814904_bot_whatsapp'
const MYSQL_DB_PASSWORD = 'u127814904_Admin'
const MYSQL_DB_NAME = 'u127814904_bot_whatsapp'
const MYSQL_DB_PORT = '3306'

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */
const flowFormulario = addKeyword(['Hola','⬅️ Volver al Inicio'])
.addAnswer(
    ['Hola!','Para enviar el formulario necesito unos datos...' ,'Escriba su *Nombre*'],
    { capture: true, buttons: [{ body: '❌ Cancelar solicitud' }] },

    async (ctx, { flowDynamic, endFlow }) => {
        
        nombre = ctx.body
        return flowDynamic(`Encantado *${nombre}*, continuamos...`)
    }
) 

const main = async () => {
    await adapterDB.init();
 
    const adapterFlow = createFlow([flowFormulario])
    const adapterProvider = createProvider(BaileysProvider)
    const httpServer = new ServerAPI(adapterProvider, adapterDB);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });
    httpServer.start();

    //QRPortalWeb();
}

main();
