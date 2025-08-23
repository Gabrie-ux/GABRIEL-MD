import fetch from 'node-fetch'

var handler = async (m, { conn, args, usedPrefix, command }) => {

if (!args[0]) {
return m.reply(`《★》Ingrese Un Link De Tiktok.\n*Ejemplo: ${usedPrefix + command}* https://vm.tiktok.com/ZMhAk8tLx/`);
    }

try {
await conn.reply(m.chat, "🪐 *Espere un momento, estoy descargando su video...*", m);
await m.react('💫')
const tiktokData = await tiktokdl(args[0]);

const videoURL = tiktokData.data.play;
const videoURLWatermark = tiktokData.data.wmplay;

let cap = `*╭─「 🪐 ${botname} • ${command} 」*\n`
cap += `│ ❒ *Título:* ${tiktokData.data.title}\n`  
cap += `│ ✶ *Publicado:* ${tiktokData.data.create_time}\n`  
cap += `│ ⤿ *Likes:* ${tiktokData.data.digg_count}\n`
cap += `│ ⤿ *Comentarios:* ${tiktokData.data.comment_count}\n`
cap += `│ ⤿ *Compartidas:* ${tiktokData.data.share_count}\n`
cap += `│ ⤿ *Vistas:* ${tiktokData.data.play_count}\n`
cap += `│ ⤿ *Descargas:* ${tiktokData.data.download_count}\n`
cap += `│ ⤿ *Uploader:* ${tiktokData.data.author.nickname}\n`
cap += `*╰─〔 Tipo: Download 〕*\n\n>`
cap += ` ${dev}`

if (videoURL || videoURLWatermark) {
await conn.sendFile(m.chat, videoURL, "tiktok.mp4", cap, m);
} else {
throw m.reply("No se pudo descargar.");
}

} catch (error1) {
conn.reply(m.chat, `Error: ${error1}`, m)
}}

handler.help = ['tiktokdl']
handler.tags = ['descargas']
handler.command = ['tiktokdl', 'tiktok', 'tt']
handler.estrellas = 5;

export default handler

async function tiktokdl(url) {
    let tikwm = `https://www.tikwm.com/api/?url=${url}?hd=1`
    let response = await (await fetch(tikwm)).json()
    return response
}
