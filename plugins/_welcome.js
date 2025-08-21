import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

const channelRD = {
  id: "120363418542108786@newsletter", // Cambia por tu canal si quieres
  name: "ELISABET - Md"
};

export async function before(m, { conn, participants, groupMetadata }) {
  if (
    !m.messageStubType ||
    !m.isGroup ||
    !m.messageStubParameters?.[0] ||
    !global.db.data.chats[m.chat]?.welcome
  ) return !0

  const jid = m.messageStubParameters[0]
  const user = `@${jid.split('@')[0]}`
  const thumbnailUrl = 'https://qu.ax/UptRc.jpg'
  const pp = await conn.profilePictureUrl(jid, 'image').catch(() => thumbnailUrl)
  const img = await fetch(pp).then(r => r.buffer())
  const total = [28, 32].includes(m.messageStubType)
    ? participants.length - 1
    : participants.length + 1

  // Contexto newsletter/canal
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
      body: 'ELIZABETH 2.0 BOt',
      thumbnailUrl: thumbnailUrl,
      mediaType: 1,
      renderLargerThumbnail: false,
      sourceUrl: `https://whatsapp.com/channel/${channelRD.id.replace('@newsletter', '')}`
    }
  };

  // Mensaje citado para bienvenida/despedida
  const quotedMsg = (txt) => ({
    key: { fromMe: false, participant: "0@s.whatsapp.net", remoteJid: m.chat, id: Math.random().toString(36).slice(2) },
    message: { conversation: txt }
  });

  if (m.messageStubType == 27) {
    const bienvenida = `
💎 BIENVENIDO - USER 💎

⚡ Usuario: ${user}
⚡ Grupo: ${groupMetadata.subject}
⚡ Miembros: ${total}

⌬ Usa *#help* PARA QUE PUEDAS ABUSAR DE MIS COMANDOS SOLO FALTAS TU QUE ESPERAS? :3 🥵
TE INVITO A SEGUIR EL CANAL 
https://whatsapp.com/channel/0029VbAIBneK0IBjjFDyMn31 😼
`
    // Mensaje de bienvenida como newsletter
    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: bienvenida, 
      contextInfo: contextNewsletter 
    });
    // Mensaje adicional, respondiendo a 《✧》 LLEGO OTRO
    await conn.sendMessage(m.chat, { 
      text: 'SE  UNIÓ UN USUARIO 😼', 
      contextInfo: contextNewsletter
    }, { quoted: quotedMsg('《✧》 LLEGO OTRO MIEMBRO DISFRUTA DEL GRUPO') });
  }

  if ([28, 32].includes(m.messageStubType)) {
    const despedida = `
😿 ASTA SIEMPRE - USER 😫

⚡ Usuario: ${user}
⚡ Grupo: ${groupMetadata.subject}
⚡ Miembros: ${total}

⌬ Espero y vuelvas después te vamos a extrañar un poquito.
`
    // Mensaje de despedida como newsletter
    await conn.sendMessage(m.chat, { 
      image: img, 
      caption: despedida, 
      contextInfo: contextNewsletter 
    });
    // Segundo mensaje, respondiendo a 《✧》 SE FUE
    await conn.sendMessage(m.chat, { 
      text: 'SE NOS FUE UN MIEMBRO 😔', 
      contextInfo: contextNewsletter
    }, { quoted: quotedMsg('《✧》 SE FUE UN MIEMBRO ESPERO VUELVAS🥺') });
  }
}