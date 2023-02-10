const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")

module.exports =  {
    name: "atm",
    description: "Veja sua quantidade de faixacoins em sua conta.",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: ApplicationCommandOptionType.User,
            description: "Veja o saldo de um usuário.",
            required: false 
        }
    ],
    
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("usuário");
        if (!user) user = interaction.user;

        let carteira = await db.get(`carteira_${user.id}`)
        if (carteira === null) carteira = 0;

        if (user.id === interaction.user.id) {

       const embed = new EmbedBuilder()
       .setTitle('Banco')
       .setDescription(`<:dock:1072214713464803408>    O User: \`${user.tag}\` \n <:dock:1072214713464803408>    Conta: \`${carteira}\` \n  `)
       .setColor("#bd6930")
       .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
      // ....

            interaction.reply({ embeds: [embed] })
        } else {


       const embed = new EmbedBuilder()
      .setTitle('Banco')
      .setDescription(`<:dock:1072214713464803408>  O User: \`${user.tag}\` \n <:dock:1072214713464803408>   Quantidade emm conta: \`${carteira}\``)
      .setColor("#bd6930")
      .setThumbnail("https://cdn.discordapp.com/attachments/1067576624205283368/1067627539545198622/Screenshot_30.png")
      // ....

            interaction.reply({ embeds: [embed] })
        }
        
    }
}