// By WillZek 🪐
import fs from 'fs'
import fetch from 'node-fetch'
import FormData from 'form-data'

/* const uploadFile = async (filePath) => {
try {
const form = new FormData()
form.append('reqtype', 'fileupload')
form.append('userhash', '')
form.append('fileToUpload', fs.createReadStream(filePath))

const upload = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form })
const fileUrl = await upload.text()
if (fileUrl && fileUrl.startsWith('http')) return fileUrl
throw new Error('Catbox es una mrd intentando con ugupapi')
} catch (e) {
const form2 = new FormData()
form2.append('file', fs.createReadStream(filePath))
const upload2 = await fetch('https://uguu.se/api.php?d=upload-tool', { method: 'POST', body: form2 })
const fileUrl2 = await upload2.text()
if (!fileUrl2) throw new Error('Ninguna de las dos mrd sirvió')
return fileUrl2.trim()
}}
*/

const uploadFile = async (filePath) => {
try {
const form2 = new FormData()
form2.append('file', fs.createReadStream(filePath))
const upload2 = await fetch('https://uguu.se/api.php?d=upload-tool', { method: 'POST', body: form2 })
const fileUrl2 = await upload2.text()
if (fileUrl2 && fileUrl2.startsWith('http')) return fileUrl2.trim()

const form = new FormData()
form.append('reqtype', 'fileupload')
form.append('userhash', '')
form.append('fileToUpload', fs.createReadStream(filePath))

const upload = await fetch('https://catbox.moe/user/api.php', { method: 'POST', body: form })
const fileUrl = await upload.text()
if (fileUrl && fileUrl.startsWith('http')) return fileUrl.trim()
throw new Error('Ninguna de las dos mrd sirvió')
} catch (e) {
throw new Error(`Error subiendo archivo: ${e.message}`)
}}

const handler = async (m, { conn }) => {
if (!m.quoted) return m.reply('🌙 Responde a un audio o video para identificar la música.')

let q = m.quoted ? m.quoted : m
let mime = (q.msg || q).mimetype || ''
if (!/audio|video/.test(mime)) {
return conn.reply(m.chat, `《★》Por favor, responde a un audio o video para identificar la música.*`, m, fake)
}

await conn.sendMessage(m.chat, { react: { text: '🪐', key: m.key } })

try {
let media = await q.download()
const ext = mime.split('/')[1]
const tmpFile = `./tmp/${m.sender}-${Date.now()}.${ext}`

if (!fs.existsSync('./tmp')) fs.mkdirSync('./tmp')
fs.writeFileSync(tmpFile, media)
const fileUrl = await uploadFile(tmpFile)
const apishield = await global.optishieldAPI.sendMessage({type: 'whatmusic', link: fileUrl})
const result = apishield

const titulo = result.titulo || 'Desconocido'
const artistas = result.artistas || result.texto || 'Desconocido'
const album = result.album || 'Desconocido'
const duracion = result.duracion || 'Desconocido'
const fecha = result.extra?.fecha || 'Desconocido'
const linkVideo = result.extra?.link || fileUrl
const thumbnail = result.thumbnail || 'https://cdn-sunflareteam.vercel.app/images/bee4c2f547.jpg'

const txt = `
\`\`\`乂 RESULTADO - WHATMUSIC\`\`\`

≡ 🌴 *Título:* ${titulo}
≡ 👤 *Artista:* ${artistas}
≡ 🌿 *Álbum:* ${album}
≡ ⏳ *Duración:* ${duracion}
≡ 🌳 *Lanzamiento:* ${fecha}
≡ 🎬 *Video:* ${linkVideo}
`.trim()

await conn.sendMessage(m.chat, { text: txt, contextInfo: { externalAdReply: { title: '⛅ WHATMUSIC - DL', body: 'Server: OptiShield By Ramón 🌷', mediaType: 2, mediaUrl: fileUrl, sourceUrl: fileUrl, thumbnailUrl: 'https://cdn-sunflareteam.vercel.app/images/bee4c2f547.jpg' }}}, { quoted: m })

await conn.sendMessage(m.chat, { react: { text: '🌙', key: m.key } })

if (fs.existsSync(tmpFile)) {
fs.unlinkSync(tmpFile)
}

} catch (e) {
m.reply(`*⛅ Error:* ${e.message || e}`)
}}

handler.help = ['whatmusic']
handler.tags = ['tools']
handler.command = ['quemusica', 'quemusicaes', 'whatmusic']
