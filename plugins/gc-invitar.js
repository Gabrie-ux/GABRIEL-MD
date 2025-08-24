/by Gabriel 
let handler = async (m, { conn, args, text }) => {

if (!text) return conn.reply(m.chat, `《★》Por favor, ingrese el número al que quiere enviar una invitación al grupo.`, m);

let group = m.chat;
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);
let cNumber = text.replace(/[^0-9]/g, '');
let userJid = `${cNumber}@s.whatsapp.net`;
const groupMetadata = await conn.groupMetadata(m.chat);
const userName = conn.getName(`${cNumber}@s.whatsapp.net`)
const txt = `${emoji} *¡Has recibido una invitación al grupo!* ${emoji}\n\n` +
`🪐 *Nombre del grupo:* ${groupMetadata.subject || 'Grupo sin nombre'}\n` +
`👤 *Invitado por:* ${conn.getName(m.sender) || 'Un miembro del grupo'}\n\n` +
`🌙 *Únete usando este enlace:*\n${link}\n\n` +
`🌴 *Nota:* Este enlace puede expirar.\n\n` +
`${dev}`;

await conn.sendMessage(userJid, { text: txt }, { quoted: m });

m.reply(`${emoji} Se envió un enlace de invitación a ${userName || 'undefined'}.`);
};

handler.help = ['invite *<número>*'];
handler.tags = ['group'];
handler.command = ['agregar', 'añadir', 'invitar', 'invite'];
handler.group = true;
handler.admin = false;
handler.botAdmin = true;

export default handler;