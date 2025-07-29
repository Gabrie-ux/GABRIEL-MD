const handler = async (m, { conn }) => {
  const texto = `
 _*REPO DE LA BOT*_ 

\`\`\`Repositorio OFC:\`\`\`
(texto)

> 🌟 Deja tu estrella así nos motivas a seguir mejorando la bot.

🔥 *Grupo oficial del bot:* https://chat.whatsapp.com/DCySgtmIavX6sXgk1aEmA8?mode=ac_t
  `.trim()

  await conn.reply(m.chat, texto, m)
}

handler.help = ['script']
handler.tags = ['info']
handler.command = ['script']

export default handler
