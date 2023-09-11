const { addKeyword } = require("@bot-whatsapp/bot");
//const { getUser, getTicket } = require("../api/users.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res =>  setTimeout(res, ms)))

/**
 * Recuperamos el prompt "SERVICE DESK"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "01_SERVICE_DESK.txt"), "utf-8");
  return text;
};

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  flowServiceDesk: (chatgptClass) => {
    return addKeyword("1", {
      sensitive: true,
    })
      .addAction(async (ctx, { endFlow, flowDynamic, provider }) => {

        await flowDynamic("Consultando en la base de datos...");

        const jid = ctx.key.remoteJid
        const refProvider = await provider.getInstance()

        await refProvider.presenceSubscribe(jid)
        await delay(500)

        await refProvider.sendPresenceUpdate('composing', jid)


        const user = "Franciso Javier"; //await consultarAPI

        const lastTicket = "TK001"; //consultar ticket await getTicket(user[0].id);

        if (!lastTicket) {
          await flowDynamic("No tienes ticket abierto!");
          return endFlow();
        } 
        
        const listTickets= "ID_TICKET	Descripcion	Telefono	Estatus" +
        "TK001	Falla en equipo medico tomografo	5572147137	Finalizado" +
        "TK002	Falla en equipo medico de rayos x	5572147137	Pausado" +
        "TK003	Sensor de temperatura dañado	5572147137	Finalizado" +
        "TK004	Sensore de aire dañado	5572147137	En revision" +
        "TK005	Falla en incubadora	5572147137	En proceso";
        ;
        const data = await getPrompt();

        await chatgptClass.handleMsgChatGPT(data);//Dicinedole actua!!
        const dataInput= `ticket= ${lastTicket}, cliente=${user}, lista_de_tickets="${listTickets}"`;
        console.log(dataInput)

        const textFromAI = await chatgptClass.handleMsgChatGPT(dataInput);
        console.log(textFromAI)

        await flowDynamic(textFromAI.text);
      })
      .addAnswer(
        `Tienes otra pregunta? o duda?`,
        { capture: true },
        async (ctx, { fallBack }) => {
          // ctx.body = es lo que la peronsa escribe!!
          
          if(!ctx.body.toLowerCase().includes('ofertas')){
              const textFromAI = await chatgptClass.handleMsgChatGPT(ctx.body);
              await fallBack(textFromAI.text);
          }
        }
      );
  },
};
