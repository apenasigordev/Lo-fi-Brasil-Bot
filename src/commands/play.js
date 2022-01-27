const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
const config = require(".././config");
const { Client, Collection } = require("discord.js");
const client = new Client({ intents: config.bot.intents });
const { Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Toca a rádio ao vivo"),
  run: async (interaction ) => {
    console.log(interaction.guild.me.permissions.has(Permissions.FLAGS.CONNECT)) 
              
    if(!interaction.member.voice.channel) return interaction.reply({content: "🎧 | Entre em um canal de voz"});
     if(!interaction.guild.me.permissions.has(Permissions.FLAGS.CONNECT)) return interaction.reply({content: "Eu não posso conectar no canal de voz", ephemeral:true});
    if(!interaction.guild.me.permissions.has(Permissions.FLAGS.SPEAK)) return interaction.reply({content: "Eu não posso falar no canal de voz", ephemeral:true});

    const channel = interaction.member.voice.channel;
    const connection = joinVoiceChannel({
	channelId: channel.id,
	guildId: channel.guild.id,
	adapterCreator: channel.guild.voiceAdapterCreator,
	selfMute: false,
  selfDeaf: false,
});
    const player = createAudioPlayer();
    const resource = createAudioResource(process.env.stream_relay);
    connection.subscribe(player)
    player.play(resource);
    //interaction.guild.me.voice.setMute(false)
	
    interaction.reply({content: "🎧 | Tocando rádio Lo-Fi Brasil", components: []}).then(i => {
    setTimeout(() => {
    //interaction.followUp({content: "Agora a qualidade está melhor, com taixa de bits alta!\nCaso qualquer problema de conexão, ou algo assim, use /report [Problema na conexão]", ephemeral: true})
    }, 1000)
    });
  },
};
