const { Client, GatewayIntentBits, InteractionType, Collection, Partials} = require("discord.js")
const { token } = require("./config.json")
const { readFileSync } = require('node:fs');
const Discord = require("discord.js")

const client = new Client({
  intents:[ 32767, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
  });

module.exports = client;

client.on('interactionCreate', (interaction) => {

  if(interaction.type === InteractionType.ApplicationCommand){
  if (!interaction.guild) return;

 const cmd = client.slashCommands.get(interaction.commandName);

    if (!cmd) return interaction.reply(`Error`);

    interaction["member"] = interaction.guild.members.cache.get(interaction.user.id);

    cmd.run(client, interaction);

  }

});

client.on('ready', () => {
  console.log(`Estou online em ${client.user.username}!`)
});

client.slashCommands = new Collection();

require('./Handler')(client);

client.login(token);

client.on("ready", () => {
    setInterval(() => {
      randActivity(String(readFileSync("activitys.txt")).split("\r\n"));
    }, 5000 );
    client.user.setPresence({ status: 'idle' });
});

function randActivity(array) {
  return client.user.setActivity({ name: array[Math.floor(Math.random() * array.length)] });
}


