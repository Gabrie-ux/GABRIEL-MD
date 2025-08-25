let handler = async (m, { conn, args }) => {

const url = args[0];
if (!url || (!url.includes('youtube.com') && !url.includes('youtu.be'))) {
return m.reply('🪐 Ingresa un enlace válido de YouTube');
}

try {
m.react(rwait);

let videoUrl = null;

try {
const { video } = await global.optishieldAPI.sendMessage({ type: "ytdl", link: url });
if (video) {
videoUrl = video;
} else {
throw new Error('Optishield no dio vídeo');
}

} catch (e) {
console.warn('⚠ Error en Optishield:', e.message);
}

/* if (!videoUrl) {
try {
const info = await ytdl.getInfo(url);
const format = ytdl.chooseFormat(info.formats, { quality: '18' });
if (!format || !format.url) throw new Error('Eror Formato');
videoUrl = format.url;
} catch (e) {
console.warn('⚠ Error en ytdl-core:', e.message);
}}
*/

if (!videoUrl) throw new Error('No se pudo descargar el video con ninguna opción 🌙');

await conn.sendMessage(m.chat, { video: { url: videoUrl }, mimetype: 'video/mp4', caption: '✅ Aquí tienes tu video 🪐' }, { quoted: m });

m.react(done);

} catch (e) {
m.reply(`⛅ Error: ${e.message}`);
m.react(error);
}}

handler.help = ['ytmp4'];
handler.tags = ['descargas'];
handler.command = ['ytmp4', 'ytv', 'ymp4'];

export default handler;