const { ApplicationCommandType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")
//const { bot } = require("../")
const db = require('quick.db')
// const mysql = require("../mysql/mysql")


module.exports = {

    name: "divorciar",
    type: ApplicationCommandType.ChatInput,
    description: "O casamento não deu certo?",
    options: [],

    run: async (bot, message) => {
    let botao1 = new ActionRowBuilder().addComponents(

        new ButtonBuilder()
            .setLabel(`Divorciar`)
            .setCustomId(`sim-${message.user.id}`)
            .setEmoji(`💔`)
            .setStyle(ButtonStyle.Secondary)
            .setDisabled(false)

    )

    if (db.get(`marry_${message.user.id}`)) {
        const embed = new EmbedBuilder()
            .setTitle(`Divórcio`)
            .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
            .setDescription(`Deseja mesmo se divorciar de ${bot.users.cache.get(db.fetch(`marry_${message.user.id}`)).username}?\nVocês são casados ${db.fetch(`marry_${message.user.id}_tempo`)}!`)
            .setColor("#bd6930")
            .setFooter({ text: `Comando requisitado por ${message.user.tag}`, iconURL: message.user.displayAvatarURL({ dynamic: true }) })

        message.reply({ embeds: [embed], components: [botao1] }).then(m => {
            const filter = (i) => i.user.id === message.user.id
            const collector = message.channel.createMessageComponentCollector({ filters: [filter], time: 60000 });

            collector.on("collect", async (collected) => {
                if (collected.customId.startsWith("sim")) {
                    if (!collected.customId.includes(collected.user.id)) return collected.reply({ content: `Este botão não é pra você...`, ephemeral: true });
                    message.deleteReply().catch(err => { })

                    let embedcasado = new EmbedBuilder()
                        .setTitle(`O casamento dos 2 foi de F`)
                        .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
                        .setDescription(`${bot.users.cache.get(collected.user.id).tag} & ${bot.users.cache.get(`${db.fetch(`marry_${message.user.id}`)}`).tag} se separaram, nem tudo da flores...`)
                        .setColor("#bd6930")
                        .setTimestamp()

                    collected.channel.send({ embeds: [embedcasado] }).then(m => {
                        setTimeout(() => {
                            m.delete().catch(err => { });
                        }, 120000);
                        db.delete(`marry_${db.fetch(`marry_${message.user.id}`)}_tempo`) // user2: Marry_IDUSER1_tempo // que seria o id do user2 
                        db.delete(`marry_${db.fetch(`marry_${message.user.id}`)}`) // user2: Marry_IDUSER1 // que seria o id do user2 
                        db.delete(`marry_${message.user.id}_tempo`) // user1 
                        db.delete(`marry_${message.user.id}`) // user1
                    })
                }

            })

            collector.on("end", (i) => {
                if (i.size < 0) {
                    return console.log(i)
                }
                // i.delete().catch(err=> {})
            })

        })


    } else if (!db.fetch(`marry_${message.user.id}`)) {
        
        return message.reply({ content: `Vai se divorciar sendo que você está solteiro? Como é que pode uma coisa dessa? Oxe`, ephemeral: true })
    }

}
}