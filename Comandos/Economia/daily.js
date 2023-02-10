
const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("ms")
const cooldowns = {}

module.exports =  {
    name: "daily",
    description: "Resgate seu dinheiro diário.",
    type: ApplicationCommandType.ChatInput,
    
    run: async (client, interaction, args) => {

        if(!cooldowns[interaction.user.id])cooldowns[interaction.user.id]={ lastCmd:null};let ultimoCmd=cooldowns[interaction.user.id].lastCmd;
        let timeout = ms("1 day") // Coloque em ms o tempo
        if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
        if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

        interaction.reply({ content: `Espere \`${time}\` para poder resgatar seu daily novamente!`, ephemeral:true});return;}else{cooldowns[interaction.user.id].lastCmd=Date.now()};
        let quantia = Math.ceil(Math.random()* 5000 );
        db.add(`carteira_${interaction.user.id}`, quantia);



        const embed = new EmbedBuilder()
        
        .setTitle('Recompensa')
        .setDescription(`<:dock:1072214713464803408>  Você resgatou: \`${quantia}\` moedas em seu dinheiro diário. \n<:dock:1072214713464803408> 
         Utilize o comando \`/atm\` para ver seu total de DockCoins.`)
        .setColor("#bd6930")
        .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1072353120765620244/logoo.png")
        
        interaction.reply({ embeds: [embed] })
    }
}