const { exec} = require('child_process');

let handler = async (m, { conn, isOwner, command}) => {
  if (!isOwner) {
    return conn.reply(m.chat, '🚫 Este comando solo puede usarlo el propietario del bot.', m);
}

  conn.reply(m.chat, '🔄 Actualizando el bot desde el repositorio remoto...', m);

  exec('git pull', (err, stdout, stderr) => {
    if (err) {
      return conn.reply(m.chat, `❌ Error al actualizar:\n${stderr}`, m);
}

    conn.reply(m.chat, `✅ Bot actualizado correctamente:\n${stdout}`, m);

    
    // exec('pm2 restart all');
});
};

handler.command = /^update|up|fix$/i; 
handler.owner = true; 
handler.tags = ['owner'];          
handler.help = ['update', 'up', 'fix'];

module.exports = handler;
