const Discord = require("discord.js")

module.exports = {
    name:"",
    descripition:"",
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: "",
            type: Discord.ApplicationCommandType.User,
            description: "",
            required: true,

        }

    ],

    run: async (client, interaction, args) => {
        
    }

}