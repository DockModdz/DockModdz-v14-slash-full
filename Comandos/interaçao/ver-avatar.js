const Discord = require("discord.js");

module.exports = {
    name: 'ver-avatar',
    type: 2,
    run: async (client, interaction, config) => {

        let member = await interaction.guild.members.fetch(interaction.targetId);
        let user = member.user;

        let AvatarPorBalah = user.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 })
        let SavatarPorBalah = member.displayAvatarURL({ dynamic: true, format: 'png', size: 4096 }) //Avatar do servidor.

        let e = new Discord.EmbedBuilder()
        .setTitle(`${user.username}`)
        .setImage(AvatarPorBalah)
        .setColor("#bd6930")
        .setFooter({text: `Autor: ${interaction.user.username}`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})

        let AvatarPorBalahButton = new Discord.ButtonBuilder()
        .setLabel(`Abrir no navegador`)
        .setEmoji(`<:dock:1072214713464803408> `)
        .setStyle(5)
        .setURL(AvatarPorBalah)

        let b1 = new Discord.ActionRowBuilder().addComponents(AvatarPorBalahButton)

        interaction.reply({embeds: [e], components: [b1], ephemeral: true})
        
    }
}
