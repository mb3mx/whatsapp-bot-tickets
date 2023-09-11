const { addKeyword } = require("@bot-whatsapp/bot");
//const { getItems } = require("../api/items.service");
//const { getTicket, getUser } = require("../api/users.service");
const { readFileSync } = require("fs");
const { join } = require("path");
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

/**
 * Recuperamos el prompt "VENDEDOR"
 */
const getPrompt = async () => {
  const pathPromp = join(process.cwd(), "promps");
  const text = readFileSync(join(pathPromp, "02_VENDEDOR.txt"), "utf-8");
  return text;
};

/**
 * Exportamos
 * @param {*} chatgptClass
 * @returns
 */
module.exports = {
  flowTicket: (chatgptClass) => {
    return addKeyword("2", { //TODO!!
      sensitive: true,
    })
      .addAction(async (ctx, { endFlow, flowDynamic, provider }) => {
        const jid = ctx.key.remoteJid;
        const refProvider = await provider.getInstance();

        await refProvider.presenceSubscribe(jid);
        await delay(500);

        await refProvider.sendPresenceUpdate("composing", jid);

        const user ="Fjmb"// await getUser(ctx.from);

         
        await flowDynamic("Vamos a levantar un nuevo ticket .....");
      });
  },
};
