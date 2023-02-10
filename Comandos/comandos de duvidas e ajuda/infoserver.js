const Discord = require("discord.js")

module.exports = {
    name: "info",
    description: "informaçoes do servidor",
    options: [
        {
            name: 'server',
            description: 'Informaçoes do servidor',
            type: Discord.ApplicationCommandOptionType.Subcommand
        }
    ],

    run: async (client, interaction) => {

        let criacao_data = parseInt(interaction.guild.createdTimestamp / 1000)
        let server_icon = interaction.guild.iconURL({ dinamyc: true })
        if (server_icon) {

            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
                        .setTitle(`informaçoes do servidor`)
                        .setColor("#bd6930")
                        .setImage("https://cdn.discordapp.com/attachments/1035757599712366663/1072353104642711673/2fba7ee37077c4fd648c0af4e2eaba71.png")
                        .setTimestamp()
                        .addFields(
                            { name: ` Data de criação:`, value: `<t:${criacao_data}:R>`, inline: true },
                            { name: ` Total de membros:`, value: `Total: **${interaction.guild.memberCount}**`, inline: true },
                            { name: `Canais:`, value: `Total: **${interaction.guild.channels.cache.size}**`, inline: true },
                            { name: `Cargos:`, value: `Total: **${interaction.guild.roles.cache.size}**`, inline: true },
                            { name: `Emojis:`, value: `Total: **${interaction.guild.emojis.cache.size}**`, inline: true },
                            { name: ` Owner`, value: `<@!${interaction.guild.ownerId}>`, inline: true },
                        )
                ],
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setStyle(5)
                                .setLabel(`Baixar Icone de ${interaction.guild.name}`)
                                .setURL(server_icon),
                        )
                ],
            })
        } else {
            interaction.reply({
                embeds: [
                    new Discord.EmbedBuilder()
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dinamyc: true }) })
                        .setTitle(`infoserver`)
                        .setColor("#bd6930")
                        .addFields(
                            { name: ` Data de criação:`, value: `<t:${criacao_data}:R>`, inline: true },
                            { name: `Total de membros:`, value: `Total: **${interaction.guild.memberCount}**`, inline: true },
                            { name: `Canais:`, value: `Total: **${interaction.guild.channels.cache.size}**`, inline: true },
                            { name: `Cargos:`, value: `Total: **${interaction.guild.roles.cache.size}**`, inline: true },
                            { name: `emojis:`, value: `Total: **${interaction.guild.emojis.cache.size}**`, inline: true },
                            { name: ` Owner`, value: `<@929764145212031017>`, inline: true },
                        )
                ],
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setStyle(5)
                                .setLabel(`${interaction.guild.name} Não possui um icone.`)
                                .setURL('https://discord.com/app')
                                .setDisabled(true)
                        )
                ],
            })
        }
    }
}