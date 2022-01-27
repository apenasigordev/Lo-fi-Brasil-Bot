const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stats")
    .setDescription("[Ping] Status atual"),
  run: async (interaction) => {
    const results = await interaction.client.cluster.fetchClientValues('guilds.cache.size');
    const embed = new MessageEmbed()
    .setTitle("Clusters do bot")
    .setDescription(`Cluster atual ${interaction.client.cluster.id}\nShard atual ${interaction.guild.shardId}`)
    .setColor("#993399");
    interaction.client.cluster.ids.forEach(clust => {
      embed.addField(`Cluster ${clust.id}`, `Ping ${clust.ping} ms`, true)
      console.log(clust.guilds)
    })
    interaction.reply({embeds: [embed], ephemeral:true});
  },
};