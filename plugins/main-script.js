const handler = async (m, { conn }) => {
  const texto = `
 _*REPO DE LA BOT*_ 

\`\`\`Repositorio OFC:\`\`\`
(texto)

> 🌟 Deja tu estrella así nos motivas a seguir mejorando la bot.

🔥 *Grupo oficial del bot:* https://chat.whatsapp.com/Fl22Fx2sMatAe1jDN8lk9y?mode=ac_t
  `.trim()

  await conn.reply(m.chat, texto, m)
}

handler.help = ['script']
handler.tags = ['info']
handler.command = ['script']

export default handler
