 const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const config = require(".././config");
const { Client, Collection } = require("discord.js");
const client = new Client({ intents: config.bot.intents });

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Parar transmissão e sair do canal"),
  run: async (interaction) => {
    if(!interaction.member.voice.channel || !interaction.guild.me.voice) return interaction.reply(":confused: | Erro, o bot, ou você não pode estar em um canal de voz.");
   interaction.guild.me.voice.disconnect();
   interaction.reply({content: ":stop_button: |  Desconectei do canal de voz!", ephemeral: true})
  }
}