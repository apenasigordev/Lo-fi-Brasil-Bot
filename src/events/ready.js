// Util
const config = require(".././config");
const fs = require("fs");
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require('@discordjs/voice');
// Slash Commands
const slash = require("../util/slash");

module.exports = {
  event: "ready", // Name of the event
  oneTime: true, // If set to true the event will only be fired once until the client is restarted
  run: async (client) => {
    const commandFiles = fs
      .readdirSync("./src/commands")
      .filter((file) => file.endsWith(".js"));

    let commandsArray = [];
    commandFiles.forEach((file) => {
      const command = require(`../commands/${file}`);
      client.commands.set(command.data.name, command);

      commandsArray.push(command);
    });

    const finalArray = commandsArray.map((e) => e.data.toJSON());
    slash.register(client.user.id, finalArray);
    console.log(`${client.user.tag} Started`);
    client.user.setStatus("online");
    // console.log(`servidores: ${client.guilds.cache.size} • Usuarios: ${client.users.cache.size}`)
    try {
    const results = await client.cluster.fetchClientValues('guilds.cache.size');
    console.log(client.cluster.ids.keys())
    client.user.setActivity(`Lo-Fi Brasil | ${results.reduce((acc, guildCount) => acc + guildCount, 0)} servidores [${client.cluster.id}/${client.cluster.count}]`, {type: "WATCHING"});
    } catch(e) {
      console.log(e)
    }
  },
};