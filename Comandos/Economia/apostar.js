const { ButtonStyle } = require('discord.js')
const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "apostar",
    description: "Aposte moedas contra usuários.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuario",
            type: ApplicationCommandOptionType.User,
            description: "Mencione um usuário para apostar moedas.",
            required: true

        },
        {
            name: "quantidade",
            type: ApplicationCommandOptionType.Number,
            description: "Quantidade de moedas à ser apostada.",
            required: true

        }

    ],

    run: async (client, interaction, args) => {
        let user = interaction.options.getUser("usuario");
        let quantidade = interaction.options.getNumber("quantidade");

        let carteira_jg1 = db.get(`carteira_${interaction.user.id}`);
        let carteira_jg2 = db.get(`carteira_${user.id}`);

        if (carteira_jg1 < quantidade) {
            interaction.reply(`Você não possui \`${quantidade}\` moedas para apostar.`)
        } else if (carteira_jg2 < quantidade) {
            interaction.reply(`O usuário \`${user.tag}\` não possui \`${quantidade}\` moedas para apostar.`)
        } else {

            let competidores = [user, interaction.user];
            let vencedor = competidores[Math.floor(Math.random() * competidores.length)];

            if(interaction.user.id === user.id) {
                return interaction.reply("vc n pd apostar com vc mesma(o)!")
                }
                
            interaction.reply({
        
                content: `<:dock:1072214713464803408>  Olá ${user} \n<:dock:1072214713464803408>    ${interaction.user} Te chamou para uma aposta \n<:dock:1072214713464803408>   valendo: \`${quantidade}\` DockCoins`,
                components: [
                    new Discord.ActionRowBuilder()
                        .addComponents(
                            new Discord.ButtonBuilder()
                                .setStyle(ButtonStyle.Secondary)
                                .setEmoji("<:dock:1072214713464803408> ")
                                .setLabel("Apostar")
                                .setCustomId(`aceitar`)
                        )
                ]
                
            }).then(() => {
                
        
                let filtro = (msg) => msg.customId === `aceitar` && msg.user.id === user.id;
                let coletor = interaction.channel.createMessageComponentCollector({ filter: filtro, max: 1 })

                coletor.on("collect", (c) => {

                    if (vencedor.id === user.id) {

                        c.reply(`Parabéns ${vencedor}! Você ganhou \`${quantidade}\` DockCoins  <:dock:1072214713464803408>   `);
                        db.add(`carteira_${user.id}`, quantidade);
                        db.subtract(`carteira_${interaction.user.id}`, quantidade);

                    } else if (vencedor.id === interaction.user.id) {

                        c.reply(`Parabéns ${vencedor}! Você ganhou \`${quantidade}\` DockCoins. <:dock:1072214713464803408>    `);
                        db.add(`carteira_${interaction.user.id}`, quantidade);
                        db.subtract(`carteira_${user.id}`, quantidade);

                    }

                });

                coletor.on("end", () => {
                    interaction.editReply({
                        components: [
                            new Discord.ActionRowBuilder()
                                .addComponents(
                                    new Discord.ButtonBuilder()
                                        .setDisabled(true)
                                        .setStyle(ButtonStyle.Secondary)
                                        .setLabel("Aposta Finalizada!")
                                        .setEmoji("<:zmembroBR:1067398640534028338>")
                                        .setCustomId(`aceitar` + interaction.id)
                                )
                        ]
                    })
                })
            })

        }

    }

}



