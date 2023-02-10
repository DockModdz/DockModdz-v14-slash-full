const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js')
const { MatchPairs, TicTacToe } = require('discord-gamecord');


module.exports = {
    name: 'memory',
    description: 'Memory Game.',
    options: [
            {
                name: 'emojis',
                description: 'Memory Game.',
                type: ApplicationCommandOptionType.String,
                required: true,
                choices: [
                    {
                    name: "comida",
                    value: "100",
                
                },
                {
                    name: "bandeira",
                    value: "10",
                
                },
                {
                    name: "animals",
                    value: "11",
                
                },
                {
                    name: "sport",
                    value: "12",
                
                },
                {
                    name: "cars",
                    value: "13",
                
                },
              ],
              
            }
        ],
    run: async (client, interaction, args) => {
        let emojis = interaction.options.getString('emojis');

if(emojis === '100') {
    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``comida Memory``',
            color: '#bd6930',
            description: 'Click the buttons below to find the pairs!',
        },
        timeoutTime: 6000,
        emojis: ['🍉', '🍇', '🍊', '🥭', '🍎', '🍏', '🥝', '🥥', '🍓', '🫐', '🍍', '🥕', '🥔'],
    });

    Game.startGame();

} else if (emojis === '10') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``bandeira Memory``',
            color: '#bd6930',
            description: 'Click the buttons below to find the pairs!',
        },
        timeoutTime: 6000,
        emojis: ['🇧🇷', '🇧🇫', '🇨🇴', '🇨🇳', '🇫🇮', '🇦🇲', '🇦🇽', '🇦🇨', '🇬🇬', '🇬🇸', '🇯🇪', '🇯🇵', '🇮🇱'],
    });

    Game.startGame();

} else if (emojis === '11') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``animals Memory``',
            color: '#bd6930',
            description: 'Click the buttons below to find the pairs!',
        },
        timeoutTime: 6000,
        emojis: ['🐶', '🐱', '🐭', '🐹', '🐰', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮', '🐷', '🐸'],
    });

    Game.startGame();

} else if (emojis === '12') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``sport Memory``',
            color: '#bd6930',
            description: 'Click the buttons below to find the pairs!',
        },
        timeoutTime: 6000,
        emojis: ['⚽', '🏀', '🏈', '⚾', '🥎', '🏐', '🏉', '🎱', '🥏', '🏓', '🏸', '🏒', '⛳'],
    });

    Game.startGame();

} else if (emojis === '13') {

    const Game = new MatchPairs({
        message: interaction,
        isSlashGame: true,
        embed: {
            title: '``cars Memory``',
            color: '#bd6930',
            description: 'Click the buttons below to find the pairs!',
        },
        timeoutTime: 6000,
        emojis: ['🚔', '🚗', '🚙', '🛺', '🚌', '🚕', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🚛'],
    });

    Game.startGame();
     }
      }
       }
