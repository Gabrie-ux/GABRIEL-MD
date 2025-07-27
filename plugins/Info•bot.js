import fs from 'fs';
const handler = (m) => m;
handler.all = async function(m) {

const chat = global.db.data.chats[m.chat];
if (chat.isBaneed) return
if (/^bot$/i.test(m.text)) {
conn.reply(m.chat, `⚡ ¡Hola! Soy elisabet, en que puedo ayudarte hoy?\n\n✰ Usa *#menu* para ver mis comandos.`, m, fake, )
}
/*if (/^corin|corín|corinplus|corínplus|corinplushost|corínplushost|plus$/i.test(m.text)) {
conn.reply(m.chat, `🚀 CorinPlus Hosting ¡El plus que necesitas!\n2 *Dash:* https://dash.skyultraplus.com\n🌱 *Panel:* https://ctrl.skyultraplus.com`, m, fake, )
}*/
if (/^elisabet$/i.test(m.text)) {
conn.reply(m.chat, `¿Que quieres hijo de puta?`, m, fake, )
}
if (/^tetas|teta$/i.test(m.text)) {
conn.reply(m.chat, `*que caliente eres* 🥵`, m, fake, )
}
if (/^bug$/i.test(m.text)) {
conn.reply(m.chat, `*tu mamá we* 😹`, m, fake, )
}
if (/^pene$/i.test(m.text)) {
conn.reply(m.chat, `*comes* 😹`, m, fake, )
}
return !0;
};
export default handler;