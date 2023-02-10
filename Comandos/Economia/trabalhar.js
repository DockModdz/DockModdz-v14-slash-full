const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const db = require("quick.db")
const ms = require("ms")
const cooldowns = {}

module.exports = {
    name: 'trabalhar',
    description: 'trabalhar ´paara ganhar uma graninha estra.',
    options: [
            {
                name: 'trabalhar',
                description: 'escolha um emprego para voce trabalhar.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                    name: "Programador",
                    value: "100",
                
                },
                {
                    name: "Advogado",
                    value: "10",
                
                },
                {
                    name: "Lixeiro",
                    value: "11",
                
                },
                {
                    name: "Medicina",
                    value: "13",
                
                },
              ],
              
            }
        ],
    run: async (client, interaction, args) => {
        let trabalhar = interaction.options.getString('trabalhar');

if(trabalhar === '100') {

    if(!cooldowns[interaction.user.id])cooldowns[interaction.user.id]={ lastCmd:null};let ultimoCmd=cooldowns[interaction.user.id].lastCmd;
    let timeout = ms("10000000")
    if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
    if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

    interaction.reply({ content: `Espere \`${time}\` para poder Trabalhar Novamente`, ephemeral:true});return;}else{cooldowns[interaction.user.id].lastCmd=Date.now()};
    let quantia = Math.ceil(Math.random()* 5000 );
    db.add(`carteira_${interaction.user.id}`, quantia);



    const embed = new EmbedBuilder()
    
    .setTitle('Programador')
    .setDescription(` \`\`\` Vc Trabalhou como programador de sites.\`\`\` \n \`\`\`salario: ${quantia} DockCoins\`\`\` \n \`\`\`Parabens Vc é um Otimo Programador.\`\`\``)
    .setColor("#bd6930")

    interaction.reply({ embeds: [embed] })

} else if (trabalhar === '10') {

    if(!cooldowns[interaction.user.id])cooldowns[interaction.user.id]={ lastCmd:null};let ultimoCmd=cooldowns[interaction.user.id].lastCmd;
    let timeout = ms("10000000")
    if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
    if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

    interaction.reply({ content: `Espere \`${time}\` para poder Trabalhar Novamente`, ephemeral:true});return;}else{cooldowns[interaction.user.id].lastCmd=Date.now()};
    let quantia = Math.ceil(Math.random()* 50000 );
    db.add(`carteira_${interaction.user.id}`, quantia);

    const embed = new EmbedBuilder()
    
    .setTitle('advogado')
    .setDescription(` \`\`\`vc salvou mais um inoscente da cadeia , parabéns!\`\`\` \n \`\`\`salario: ${quantia} DockCoins\`\`\` \n \`\`\`vc é um excelente advogado\`\`\``)
    .setColor("#bd6930")

    interaction.reply({ embeds: [embed] })

} else if (trabalhar === '11') {

    if(!cooldowns[interaction.user.id])cooldowns[interaction.user.id]={ lastCmd:null};let ultimoCmd=cooldowns[interaction.user.id].lastCmd;
    let timeout = ms("10000000")
    if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
    if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

    interaction.reply({ content: `Espere \`${time}\` para poder Trabalhar Novamente`, ephemeral:true});return;}else{cooldowns[interaction.user.id].lastCmd=Date.now()};
    let quantia = Math.ceil(Math.random()* 20000 );
    db.add(`carteira_${interaction.user.id}`, quantia);



    const embed = new EmbedBuilder()
    
    .setTitle('lixeiro')
    .setDescription(` \`\`\`vc trabalhou como lixeiro e deixou a sociedade mais limpa , parabéns!\`\`\` \n \`\`\`salario: ${quantia} DockCoins\`\`\` \n \`\`\`vc é um excelente Lixeiro e uma excelente pessoa\`\`\``)
    .setColor("#bd6930")
 
    interaction.reply({ embeds: [embed] })


} else if (trabalhar === '13') {

    if(!cooldowns[interaction.user.id])cooldowns[interaction.user.id]={ lastCmd:null};let ultimoCmd=cooldowns[interaction.user.id].lastCmd;
    let timeout = ms("10000000")
    if(ultimoCmd!==null&&timeout-(Date.now()-ultimoCmd)>0){let time=ms(timeout-(Date.now()-ultimoCmd));let resta=[time.seconds,'segundos'];
    if(resta[0]==0)resta=['alguns','millisegundos'];if(resta[0]==1)resta=[time.seconds,'segundo'];

    interaction.reply({ content: `Espere \`${time}\` para poder Trabalhar Novamente`, ephemeral:true});return;}else{cooldowns[interaction.user.id].lastCmd=Date.now()};
    let quantia = Math.ceil(Math.random()* 50000 );
    db.add(`carteira_${interaction.user.id}`, quantia);



    const embed = new EmbedBuilder()
    
    .setTitle('Medicina')
    .setDescription(` \`\`\`Vc Trabalhou de medico , parabéns vc salvou mais 1 vida.\`\`\` \n \`\`\`salario: ${quantia} DockCoins\`\`\` \n \`\`\`vc é um otimo medico \`\`\``)
    .setColor("#bd6930")

    interaction.reply({ embeds: [embed] })

     }
      }
       }
