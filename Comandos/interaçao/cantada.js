const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: 'cantada',
    description: 'Passe uma cantada para um usuário.',
    type: 1,
    options: [{name: 'user', type: 6, description: 'Coloque um usuário.', required: true }],

  run: async (client, interaction, args) => {
    
    var fortunes = [
        "Tem alguma coisa errada com o meu celular. Não consigo encontrar o seu número nele...",
        "Você acredita em amor à primeira vista ou devo passar por aqui mais uma vez?",
        "As rosas são vermelhas, violetas são azuis, eu não sei rimar, mas posso namorar você?",
        "Então, além de me deixar sem ar, o que mais você faz?",
        "Nossa, estou sentindo uma dor no peito! Espero que seja amor, porque se for infarto, eu nunca mais te verei!",
        "Está vendo aquela estrela ali? Mandei pendurar para você.",
        "Queria desejar noite, porque para ser boa teríamos que estar juntos.",
        "Seu nome é Wi-Fi? Porque eu estou sentindo uma conexão aqui.",
        "Se nada dura para sempre, quer ser o meu nada?",
        " Você foi feita(o) com velas, mel, fitinhas vermelhas e rosas? Porque te achei uma simpatia.",
        " Um mês atrás eu era apaixonado(a) por você. E parece que estamos no mês passado ainda.",
        "Pesquisas apontam que agente junto é erro de gramática, mas a gente separado é erro do destino.",
        "Você é australiano? Porque você tem todas as coala-ificações necessárias para ganhar o meu coração.",
        "Eu não sou Alice, mas, com você, me sinto no País das Maravilhas.",
        "Ei, o cupido te ligou? Ele queria pedir para você devolver o meu coração.",
    ];
    await interaction.reply(
      fortunes[Math.floor(Math.random() * fortunes.length)]
    );
  },
};