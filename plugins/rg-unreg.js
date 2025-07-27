let handler = async function (m, { conn }) {
  let user = global.db.data.users[m.sender]
  
  if (!user.registered) {
    return m.reply(`
🩵 *ERROR*
`)
  }

  user.registered = false
  m.reply(`
「⚡」 *Registro eliminado.*

《✧》Ya no podrás usar mis comandos.
`)

  // Datos del canal/newsletter (para el efecto de reenviado)
  const channelRD = { id: "120363418542108786@newsletter", name: "AVISO DE MI CREADOR" }
  
  // El mensaje que TÚ quieras (puedes cambiarlo)
  let mensaje = "「🚨」Debido a que eliminaste tu registro en la bot,ya no podras usar sus funciones registrate🗣️."

  // Envía el mensaje simulado como reenviado desde el canal
  await conn.sendMessage(m.chat, {
    text: mensaje,
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        newsletterName: channelRD.name,
        serverMessageId: -1,
      },
      forwardingScore: 999,
      externalAdReply: {
        title: channelRD.name,
        body: 'ELIZABETH - md',
        thumbnailUrl: 'https://qu.ax/GszaU.png', // Opcional, cámbiala si quieres
        mediaType: 1,
        renderLargerThumbnail: true,
      }
    }
  }, { quoted: m })
}

handler.help = ['unreg']
handler.tags = ['rg']
handler.command = ['unreg']
handler.register = true

export default handler