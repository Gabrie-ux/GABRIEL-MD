// Plugin: Repite / Repeat / Copiame
// Autor original: mantis-has
// Créditos: mantis-has (GitHub: https://github.com/mantis-has)

const channelRD = {
  id: "120363418542108786@newsletter", // Cambia por tu canal si quieres
  name: "ELISABET - CHANNEL"
}
const thumbnailUrl = 'https://qu.ax/GszaU.png' // Imagen cuadrada y pequeña

let handler = async function (m, { args, command, usedPrefix, conn }) {
  if (!args[0]) {
    // Reacciona con ✖️ al mensaje del usuario
    await conn.sendMessage(m.chat, {
      react: { text: "✖️", key: m.key }
    });
    // Si no hay texto, responde como newsletter y citando el mensaje original del usuario
    const contextNewsletter = {
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.name,
        serverMessageId: -1
      },
      externalAdReply: {
        title: channelRD.name,
        body: 'MAKIMA 2.0 BOT',
        thumbnailUrl: thumbnailUrl,
        mediaType: 1,
        renderLargerThumbnail: false,
        sourceUrl: `https://whatsapp.com/channel/${channelRD.id.replace('@newsletter', '')}`
      }
    };
    await conn.sendMessage(
      m.chat,
      {
        text: '「⚡」Debes ingresar un texto para usar este comando.',
        contextInfo: contextNewsletter
      },
      { quoted: m }
    );
    return;
  }
  // Construye el texto a repetir
  const text = args.join(' ');
  // Mensaje citado
  const quotedMsg = {
    key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: m.chat, id: Math.random().toString(36).slice(2) },
    message: { conversation: 'MAKIMA BOT MD' }
  };
  await conn.sendMessage(m.chat, { text }, { quoted: quotedMsg });
};

handler.help = ['repite', 'repeat', 'copiame'].map(v => v + ' <texto>');
handler.tags = ['tools'];
handler.command = /^(repite|repeat|copiame)$/i;
handler.register = false;
handler.limit = false;
handler.group = false; // pon true si quieres solo en grupos

export default handler;