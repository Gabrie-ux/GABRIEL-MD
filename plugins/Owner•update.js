import { execSync} from 'child_process'

let handler = async (m, { conn, text}) => {
  try {
    await m.react(rwait)

    const isOwner = global.owner.some(([id]) => m.sender.includes(id))
    if (!isOwner) {
      await m.react(error)
      return m.reply('✰ Solo el owner principal puede usar este comando.')
}

    const command = 'git pull' + (text? ' ' + text: '')
    const stdout = execSync(command)

    await conn.reply(m.chat, stdout.toString(), m)
    await m.react(done)

} catch (e) {
    await m.react(error)
    await m.reply(
      '🩵 Se han hecho cambios locales que entran en conflicto con las actualizaciones del repositorio.\n\n✦ Para actualizar, reinstala el bot o realiza las actualizaciones manualmente.'
)
}
}

handler.help = ['update', 'actualizar']
handler.tags = ['owner']
handler.command = ['update', 'actualizar']
handler.rowner = true

export default handler
