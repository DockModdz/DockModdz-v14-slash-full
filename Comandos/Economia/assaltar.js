
const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")
const ms = require("ms")
const cooldowns = {}

module.exports =  {
    name: "assaltar",
    description: "cometa um assalto",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'comercios',
            type: ApplicationCommandOptionType.String,
            description: 'Escolher lojinha para assaltar',
            require: true,
            choices: [

                {
                    name: "lojinha do seu zé",
                    value: "1",
                },
                {
                    name: "pastelaria reis",
                    value: "2",
                },
                {
                    name: "bar do boy",
                    value: "3",
                },
                {
                    name: "mercearia do kinho",
                    value: "4",
                },

            ]
        }

      ],

      run: async (client, interaction, args) => {

        if(!cooldowns[interaction.user.id])cooldowns[interaction.user.id]={ lastCmd:null};let ultimoCmd=cooldowns[interaction.user.id].lastCmd;
        let timeout = ms("5000000")
        if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
        if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

        interaction.reply({ content: `Vc foi preso espere \`\`${time}\`\` Para Assaltar Novamente`, ephemeral:true});return;}else{cooldowns[interaction.user.id].lastCmd=Date.now()};
        let quantia = Math.ceil(Math.random()* 10000 );
        db.add(`carteira_${interaction.user.id}`, quantia);

        const embed = new EmbedBuilder()

        .setTitle('Assalto')
        .setDescription(`Você Ganhou:\`${quantia}\` \n Por Cometer um Assalto Em Uma lojinha 🔫`)
        .setColor("#bd6930")
        .setThumbnail("https://cdn.discordapp.com/attachments/1035757599712366663/1068289171321524265/animated.gif")
  
              interaction.reply({ embeds: [embed] })

    }
}