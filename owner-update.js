import { execSync} from 'child_process';

let handler = async (m, { conn, args}) => {
  try {
    await conn.reply(m.chat, '⏳ *Actualizando el bot... Por favor espera.*', m);

    // Ejecutar git pull con argumentos si existen
    const cmd = 'git pull' + (args.length? ' ' + args.join(' '): '');
    const output = execSync(cmd).toString();

    const response = output.includes('Already up to date')
? '✅ *El bot ya está actualizado.*'
: `✅ *Actualización completada:*\n\n${output}`;

    await conn.reply(m.chat, response, m);

} catch (error) {
  
    try {
      const statusOutput = execSync('git status --porcelain').toString().trim();

      if (statusOutput) {
        const conflictedFiles = statusOutput
.split('\n')
.filter(line =>
!line.includes('Session/') &&
!line.includes('.cache/') &&
!line.includes('tmp/')
);

        if (conflictedFiles.length> 0) {
          const conflictMsg = `⚠️ *Conflictos detectados en los siguientes archivos:*\n\n` +
            conflictedFiles.map(f => '• ' + f.slice(3)).join('\n') +
            `\n\n📌 *Solución recomendada:* Reinstala el bot o resuelve los conflictos manualmente.`;

          return await conn.reply(m.chat, conflictMsg, m);
}
}
} catch (statusError) {
      console.error('Error al verificar conflictos:', statusError);
}

    await conn.reply(m.chat, `❌ *Error al actualizar:* ${error.message || 'Error desconocido.'}`, m);
}
};

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = /^update|actualizar|up|fix$/i;
handler.rowner = true;

handler.all = async function (m) {
  if (!m.text) return;
  const txt = m.text.trim().toLowerCase();
  if (['update', 'fix', 'up'].includes(txt)) {
    return handler(m, { conn: this, args: []});
}
};

export default handler;