const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
const {Permissions} = require('discord.js')
module.exports = {
  event: "interactionCreate",
  oneTime: false,
  run: async (i) => {
    var interaction = i;
    try {
    if (!i.isCommand()) return;
  
    const commandCheck = i.client.commands.get(i.commandName);

    if (!commandCheck) {
      return console.log(`Could not find command" '${i.commandName}'`);
    } else {
      await commandCheck.run(i);
      i.client.channels.cache.get("934424486009266176").send({content: `${i.user.tag} usou o comando ${i.commandName} em ${i.guild.name}`});
     /* setTimeout(() => {
        i.followUp({content: "Agora a qualidade está melhor, com taixa de bits alta!", ephemeral: true})
      },1000)*/
    }
  } catch(e) {
    console.log(e)
    i.reply({content: "Algo deu errado :(", ephemeral: true})
  }
  },
};