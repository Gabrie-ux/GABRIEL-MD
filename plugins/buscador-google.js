// By Gabriel 
import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const handler = async (m, { conn, args, command }) => {

if (!args[0]) return conn.reply(m.chat, '🪐 Ingresa un texto para buscar', m, fake);

const query = args.join(' ');

try {
await m.react(rwait);

const res = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`, {
headers: { "User-Agent": "Mozilla/5.0" }
});
const html = await res.text();
const $ = cheerio.load(html);
let results = [];

$(".result").each((i, el) => {
if (i >= 5) return false;
const title = $(el).find("a.result__a").text().trim();
const link = $(el).find("a.result__a").attr("href");
if (title && link) {
results.push({ title, link });
}});

if (results.length === 0) return conn.reply(m.chat, 'No hay resultados', m);

let txt = `⛅ *RESULTADOS DE ${command.toUpperCase()} PARA:* ${query.toUpperCase()}\n\n`;
results.forEach((item, index) => {
    txt += `🌴 *${index + 1}:* [${item.title}](${item.link})\n\n`;
});

await conn.reply(m.chat, txt.trim(), m);
await m.react(done);

} catch (e) {
conn.reply(m.chat, `🌴 Error: ${e.message}`, m);
}};

handler.command = ['google', 'buscar', 'duckdock'];
handler.help = ['google <término>', 'duckdock'];
handler.tags = ['buscador'];

export default handler;