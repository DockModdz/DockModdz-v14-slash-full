const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ApplicationCommandOptionType } = require("discord.js")
// const { bot } = require("../")
const db = require('quick.db')
// const mysql = require("../mysql/mysql")

module.exports = {
    name: "casar",
    type: ApplicationCommandType.ChatInput,
    description: "Case com alguma pessoa.",
    options: [
        {
            name: "usuario",
            description: "Selecione a pessoa que você quer casar!",
            required: false,
            type: ApplicationCommandOptionType.User
        }
    ],
    
    run: async (bot, message) => {
        let user = message.options.getUser("usuario") || message.user;

        let botao1 = new ActionRowBuilder().addComponents(

            new ButtonBuilder()
                .setLabel(`Sim`)
                .setCustomId(`sim-${user.id}`)
                .setEmoji(`<:dock:1072214713464803408> `)
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(false)

        ).addComponents(

            new ButtonBuilder()
                .setLabel(`Não`)
                .setEmoji(`<:dock:1072214713464803408> `)
                .setCustomId(`nao-${user.id}`)
                .setStyle(ButtonStyle.Secondary)
                .setDisabled(false)

        )

        if (!db.fetch(`marry_${message.user.id}`) && user) {
            const embed = new EmbedBuilder()
                .setAuthor({ name: `Pedido de casamento`, iconURL: message.user.displayAvatarURL({ dynamic: true }) })
                .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
                .setDescription(`${message.user} fez um pedido de casamento pra você, você aceitaria ele(a) como Esposo(a)?`)
                .setColor("#bd6930")
                .setFooter({ text: `Pedido de casamento solicitado para ${user.tag}` })

            message.reply({ content: `${user}`, embeds: [embed], components: [botao1] }).then(m => {
                const filter = (i) => i.user.id === user.id
                const collector = message.channel.createMessageComponentCollector({ filters: [filter], time: 60000 });

                collector.on("collect", async (collected) => {

                    if (collected.customId.startsWith("sim")) {
                        if (!collected.customId.includes(collected.user.id)) return collected.reply({ content: `Este botão não é pra você...`, ephemeral: true });

                        message.deleteReply().catch(err => { })
                        // ids marry

                        db.set(`marry_${user.id}`, `${message.user.id}`) // user1 - pra quem vai mandar o pedido
                        db.set(`marry_${message.user.id}`, `${user.id}`) // user2 - pra quem vai aceitar ou rejeitar

                        // tempo marry

                        let embedcasado = new EmbedBuilder()
                            .setTitle(`Pedido de Casamento Aceito`)
                            .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
                            .setDescription(`Agora ${bot.users.cache.get(`${db.fetch(`marry_${message.user.id}`)}`).tag} & ${bot.users.cache.get(`${db.fetch(`marry_${collected.user.id}`)}`).tag}  são casados`)
                            .setColor("#bd6930")
                            .setTimestamp()

                        collected.channel.send({ embeds: [embedcasado] }).then(m => {

                            db.set(`marry_${user.id}_tempo`, `<t:${Math.floor(Date.now() / 1000)}:R>`)
                            db.set(`marry_${message.user.id}_tempo`, `<t:${Math.floor(Date.now() / 1000)}:R>`)
                            setTimeout(() => {
                                m.delete().catch(err => { });
                            }, 120000);
                        })
                    }

                    if (collected.customId.startsWith("nao")) {
                        if (!collected.customId.includes(collected.user.id)) return collected.reply({ content: `Este botão não é pra você...`, ephemeral: true });

                        let negado = new EmbedBuilder()
                            .setTitle(`Pedido de Casamento Recusado`)
                            .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
                            .setDescription(`${message.user.tag}, seu pedido de casamento com <@${user.id}> foi recusado.`)
                            .setColor("#bd6930")
                            .setTimestamp()

                        collected.channel.send({ embeds: [negado] }).then(m => {
                            setTimeout(() => {
                                m.delete().catch(err => { })
                            }, 120000);
                        })
                    }
                })

                collector.on("end", (i) => {
                    if (i.size < 0) {
                        return console.log(i)
                    }
                })

            })

        } else if (!db.fetch(`marry_${message.user.id}`)) {
            let nãocasado = new EmbedBuilder()
                .setTitle(`Suas Informações:`)
                .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
                .setDescription(`${message.user} você está solteiro(a)`)
                .setColor("#bd6930")
                .setFooter({ text: `Comando executado por ${message.user.tag}`/* , iconURL: Mac.displayAvatarURL({ dynamic: true }) */ })

            return message.reply({ embeds: [nãocasado], ephemeral: false })

        } else if (!user && user == message.user) {
            return message.reply({ content: `Sexo. ~~   ~~ Moscou 2022`, ephemeral: false })
        } else if (db.fetch(`marry_${message.user.id}`)) {
            // <t:1665978182:R>
            let embedcasado = new EmbedBuilder()
                .setTitle(`Suas Informações:`)
                .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
                .setDescription(`Casado com o(a) **${bot.users.cache.get(`${db.fetch(`marry_${message.user.id}`)}`).tag}**\nSão casados ${db.get(`marry_${db.fetch(`marry_${message.user.id}`)}_tempo`)}`)
                .setColor("#bd6930")
                .setFooter({ text: `Comando executado por ${message.user.tag}`, iconURL: message.user.displayAvatarURL({ dynamic: true }) })

            return message.reply({ embeds: [embedcasado], ephemeral: false })
        } else if (db.fetch(`marry_${message.user.id}`) == user.id) {

            let jaestacasado = new EmbedBuilder()
                .setTitle(`Informações:`)
                .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
                .setDescription(`${user.username} ja é casado com o(a) ${bot.users.cache.get(`${db.fetch(`marry_${message.user.id}`)}`).username} `)
                .setColor("#bd6930")
                .setFooter({ text: `Comando executado por ${message.user.tag}`, iconURL: message.user.displayAvatarURL({ dynamic: true }) })
            return message.reply({ embeds: [jaestacasado], ephemeral: false })
        }
    }
}