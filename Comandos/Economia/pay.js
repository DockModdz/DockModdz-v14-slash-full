const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const db = require("quick.db")

module.exports =  {
    name: "pay",
    description: "Tranfira Uma Quantia de Dinheiro De algum user",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "usuário",
            type: ApplicationCommandOptionType.User,
            description: "Mencione um User Para Receber o dinheiro",
            required: true
        },
        {
            name: "quantia",
            type: ApplicationCommandOptionType.Number,
            description: "Coloque a quantidade a ser enviada",
            required: true
        }
    
    ],
    
    run: async (client, interaction, args) => {

        let user = interaction.options.getUser("usuário");
        let quantia = interaction.options.getNumber("quantia");
        let carteira = db.get(`carteira_${interaction.user.id}`);
        if (carteira === null) carteira = 0;
        if(quantia < 1) return interaction.reply("você deve dizer um valor maior do que 1 para fazer uma tranferenciar");

        if (quantia > carteira) {
            interaction.reply(`Você não possui \`${quantia}\` DockCoins, possui apenas \`${carteira}\` DockCoins.`);


        } else {
            db.add(`carteira_${user.id}`, quantia)
            db.subtract(`carteira_${interaction.user.id}`, quantia)


            const embed = new EmbedBuilder()
        
            .setTitle('Transferencia')
            .setDescription(`<:dock:1072214713464803408>  tranferencia enviada para: ${user}\n<:dock:1072214713464803408>   no valor de: \`${quantia}\` DockCoins`)
            .setColor("#bd6930")
            .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
            
            interaction.reply({ embeds: [embed] })
        }
        
    }

 }
