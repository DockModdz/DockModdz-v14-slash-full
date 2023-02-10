const Discord = require("discord.js")
let nome = "say";
let descrição = "Mande uma mensagem";
let tipo = Discord.ApplicationCommandType.ChatInput
module.exports = {
name: nome,
description: descrição,
type: tipo,
options: [
    {
        name: "mensagem",
        description: "Mensagem que será enviada",
        type: Discord.ApplicationCommandOptionType.String,
        required: true,
    }
],
run: async(client, interaction, args) => {
    let mensagem = interaction.options.getString("mensagem")
    let canal = interaction.channel
  
    interaction.reply({ content: `Sua mensagem foi enviada!`, ephemeral: true}).then(() => {
        canal.createWebhook({
            name: interaction.user.username,
            avatar: interaction.user.displayAvatarURL({ dynamic: true, format: "png" }),
        }).then(web => {
    web.send(`${mensagem}`).then(()=> {web.delete() })
        })

    })
     
    
}
}