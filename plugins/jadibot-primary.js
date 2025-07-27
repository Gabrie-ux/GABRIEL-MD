let handler = async (m, { conn, text }) => {
  if (!m.isGroup) throw 'Este comando solo sirve en grupos'

  if (!text) throw 'Etiqueta al bot que será el principal o pasa su número'


  let botJid = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'

  if (!global.db.data.chats[m.chat]) global.db.data.chats[m.chat] = {}

  global.db.data.chats[m.chat].primaryBot = botJid

  m.reply(`El bot principal para este grupo ahora es:\n*${botJid}*`)
}

handler.help = ['setprimary @bot']
handler.tags = ['owner']
handler.command = ['setprimary']
handler.admin = true

export default handler