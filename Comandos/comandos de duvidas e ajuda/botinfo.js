const Discord = require("discord.js")

module.exports = {
  name: "botinfo",
  description: "Fornece informações sobre o bot.",
  type: Discord.ApplicationCommandType.ChatInput,

  run: async (client, interaction) => {

    let membros = client.users.cache.size;
    let servidores = client.guilds.cache.size;
    let canais = client.channels.cache.size;
    let bot = client.user.tag;
    let avatar_bot = client.user.displayAvatarURL({ dynamic: true });
    let embed = new Discord.EmbedBuilder()
    .setColor("#bd6930")
    .setAuthor({ name: bot, iconURL: avatar_bot })
    .setFooter({ text: bot, iconURL: avatar_bot })
    .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
    .setDescription(`Olá ${interaction.user}, veja minhas informações abaixo:\n\n>  Nome: \`${bot}\`.\n> ** Owner:** <@929764145212031017> \n> **Sub Owner:** <@1010225283275685930>}.
\n>  Membros: \`${membros}\`.\n>  Servidores: \`${servidores}\`.\n>  Canais: \`${canais}\`.\`.`);

    interaction.reply({ embeds: [embed] })


  }
}