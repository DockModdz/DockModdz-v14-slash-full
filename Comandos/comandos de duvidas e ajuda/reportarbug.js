const { TextInputStyle } = require('discord.js')
const { InteractionType } = require('discord.js')
const Discord = require('discord.js')

module.exports = {
    name: 'reportar-bug',
    description: 'Reporte O Bug Para O Meu Criador',
    type: Discord.ApplicationCommandType.ChatInput,
    
    run: async(client, interaction) => {

        const modal = new Discord.ModalBuilder()
        .setCustomId('DOCK7')
        .setTitle('REPORT - BUG')
        
        const BUG = new Discord.TextInputBuilder()
        .setCustomId('BUG')
        .setLabel('Qual O Seu BUG ?')

        .setStyle(TextInputStyle.Paragraph)

		const firstActionRow = new Discord.ActionRowBuilder().addComponents(BUG);

        modal.addComponents(firstActionRow)

        await interaction.showModal(modal);

        client.on('interactionCreate', async interaction => {
        if (!interaction.isModalSubmit()) return;

        if (interaction.customId === 'DOCK7') {

	    const REPORTADO = interaction.fields.getTextInputValue('BUG');

        let log = client.channels.cache.get('1064228843877044285')

        interaction.reply({
            content: `Bug Enviado Com Sucesso`, ephemeral: true
        })

       
        log.send({
            embeds: [new Discord.EmbedBuilder()
                .setColor('#f0ea06')
                .setTitle(`Novo BUG Reportado!`)
                .setDescription(`SERVIDOR: \`${interaction.guild.name}\`
                 USUÁRIO: \`${interaction.user.tag}\`
                 BUG REPORTADO: \`${REPORTADO}\``)
            ]
        })

    }

});


    }
}