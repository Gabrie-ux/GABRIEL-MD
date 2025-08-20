/* import fetch from 'node-fetch';

let handler = async(m, { conn, usedPrefix, command, text }) => {

if (!text) return m.reply(`《★》Ingresa Un Texto Para Buscar En Youtube\n> *Ejemplo:* ${usedPrefix + command}autos edits`);

let api = await (await fetch(`https://delirius-apiofc.vercel.app/search/ytsearch?q=${text}`)).json();

let results = api.data[0];

let txt = `✨ *Título:* ${results.title}\n⌛ *Duración:* ${results.duration || formatDuration(results.duration)}\n📎 *Link:* ${results.url}\n📆 *Publicado:* ${results.publishedAt}`;

let img = results.image;

conn.sendMessage(m.chat, {
        image: { url: img },
        caption: txt, 
        footer: dev, 
        buttons: [
            {
                buttonId: `${usedPrefix}ytmp4doc ${results.url}`,
                buttonText: { displayText: 'Descargar Video' }
            },
            {
                buttonId: `${usedPrefix}ytmp3doc ${results.url}`,
                buttonText: { displayText: 'Descargar Audio' }
            }
        ],
        viewOnce: true,
        headerType: 4
    }, { quoted: m });
}

handler.command = ['play', 'paudio'];

export default handler

function formatDuration(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
*/

import fetch from 'node-fetch';
import yts from 'yt-search';
import { yta, ytv } from '../lib/ytdl-sv.js';

const estados = {};
const TIEMPO_ESPERA = 120000;

let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return m.reply(`🪐 Ingresa un texto para buscar en youtube\n> Ejemplo: ${usedPrefix + command} autos edits`);

const search = await yts(text);
const video = search.videos[0];
if (!video) return m.reply('🪐 Video no encontrado.');

if (estados[m.sender]) clearTimeout(estados[m.sender].timeout);
estados[m.sender] = {
step: 'esperando_tipo',
videoInfo: video,
command,
intentos: 0,
timeout: setTimeout(() => {
delete estados[m.sender];
}, TIEMPO_ESPERA)
}

let info = `*╭─「 🪐 ${video.title} 」*\n` +
           `│ ❒ *Título:* ${video.title}\n` +
           `│ ✶ *Autor:* ${video.author.name}\n` +
           `│ ⤿ *Duración:* ${video.timestamp}\n` +
           `│ ⤿ *Publicado:* ${video.ago}\n` +
           `│ ⤿ *Vistas:* ${video.views.toLocaleString()}\n` +
           `│ ⤿ *Canal:* ${video.author.url.replace('https://', '')}\n` +
           `*╰─〔 Tipo: Descarga 〕*\n\n` +
           `⛅ *¿Quieres el audio o el vídeo?*\nResponde con:\n` +
           `1 o 1️⃣ para Audio\n2 o 2️⃣ para Vídeo`;

await conn.sendMessage(m.chat, { image: { url: video.thumbnail }, caption: info }, { quoted: m });
}

handler.before = async (m, { conn }) => {

const estado = estados[m.sender];
if (!estado) return false;

if (estado.step === 'esperando_tipo') {
const resp = (m.text || '').trim();

if (resp === '1' || resp === '1️⃣') {
clearTimeout(estado.timeout);
await m.reply(`🪐 Espere el audio: ${estado.videoInfo.title}`);
await enviarArchivo(m, conn, estado.videoInfo.url, 'mp3', estado.videoInfo.title);
delete estados[m.sender];
return true;
}

if (resp === '2' || resp === '2️⃣') {
clearTimeout(estado.timeout);
await m.reply(`⛅ Espere el vídeo: ${estado.videoInfo.title}`);
await enviarArchivo(m, conn, estado.videoInfo.url, 'mp4', estado.videoInfo.title);
delete estados[m.sender];
return true;
}

estado.intentos = (estado.intentos || 0) + 1
if (estado.intentos <= 1) {
await m.reply('🪐 Por favor responde con 1 (audio) o 2 (vídeo), o reacciona con 1️⃣ o 2️⃣.')
}
return true;
}

return false;
}

async function enviarArchivo(m, conn, url, tipo, titulo) {
const sendDoc = async (fileUrl, fileName, mimetype) => {
await conn.sendMessage(m.chat, { document: { url: fileUrl }, fileName, caption: `Archivo descargado para: ${titulo}`, mimetype }, { quoted: m });
}

const sendFallback = async () => {
try {
const result = tipo === 'mp3' ? await yta(url) : await ytv(url);
const link = result.result.download || result.result.dl || result.result.url;
if (!link) throw new Error('No hay url de descarga');

await sendDoc(link, `${titulo}.${tipo}`, tipo === 'mp3' ? 'audio/mpeg' : 'video/mp4');
} catch (e) {
await m.reply(`🪐 Error con las fuentes.\n${e.message}`)
}}

try {
const apiUrl = tipo === 'mp3'
      ? `https://api.stellarwa.xyz/dow/ytmp3?url=${encodeURIComponent(url)}&apikey=BrunoSobrino`
      : `https://api.stellarwa.xyz/dow/ytmp4?url=${encodeURIComponent(url)}&apikey=BrunoSobrino`;

const res = await fetch(apiUrl);
const json = await res.json();
const link = json?.result?.dl || json?.data?.dl

if (!link) throw new Error('No hay url de descarga');

await sendDoc(link, `${titulo}.${tipo}`, tipo === 'mp3' ? 'audio/mpeg' : 'video/mp4')
} catch {
await sendFallback()
}}

handler.tag = ['descargas']
handler.help = ['play']
handler.command = ['play', 'musicdl']

export default handler