// Util

const config = require("./config");
const fs = require("fs");
const app = require('express')();

// Slash Commands
const { Collection, MessageEmbed } = require("discord.js");
const { Client } = require("discord.js");
const Cluster = require("discord-hybrid-sharding");
const slash = require("./util/slash");

// Checks
let finalIntents = [];
if (!Array.isArray(config.bot.intents)) {
  console.warn(
    "Intents in config file must be in an array, default intents will be used"
  );
} else {
  finalIntents = config.bot.intents;
  console.log("Loaded intents successfully from the config file");
}

const client = new Client({
  intents: finalIntents, shards: Cluster.data.SHARD_LIST,        //  A Array of Shard list, which will get spawned
  shardCount: Cluster.data.TOTAL_SHARDS, // The Number of Total Shards
});
client.cluster = new Cluster.Client(client);

// topgg
const { AutoPoster } = require('topgg-autoposter');

const Topgg = require('@top-gg/sdk')

const webhook = new Topgg.Webhook(process.env.topggAuth) // add your Top.gg webhook authorization (not bot token)
app.get("/", (req, res) => {
  res.sendStatus(200)
});
app.post('/api/webhook/topgg', webhook.listener(vote => {
  // vote is your vote object
  client.channels.cache.get("934471982681042986").send({ content: `${vote.user} votou em mim! ` })
})) // attach the middleware

//app.listen(3000) // your port

// Commands
client.commands = new Collection();
client.on("ready", () => {
  AutoPoster(process.env.topggtoken, client)
    .on('posted', () => {
      console.log('Posted stats to Top.gg!')
    })
  console.log(`Shard ${client.cluster.id} is ready!`)
})
client.on("guildCreate", (guild) => {
  const embed = new MessageEmbed()
    .setTitle("[+] Adicionado em " + guild.name)
    .setColor("#009900");
  client.channels.cache.get("934419797087748126").send({ embeds: [embed] })

})
client.on("guildDelete", (guild) => {
  const embed = new MessageEmbed()
    .setTitle("[-] Removido em " + guild.name)
    .setColor("#990000");
  client.channels.cache.get("934419797087748126").send({ embeds: [embed] })

})

const events = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));

events.forEach((event) => {
  const eventFile = require(`./events/${event}`);
  if (eventFile.oneTime) {
    client.once(eventFile.event, (...args) => eventFile.run(...args));
  } else {
    client.on(eventFile.event, (...args) => eventFile.run(...args));
  }
});

client.login(config.bot.token);