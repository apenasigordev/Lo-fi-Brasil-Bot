const Cluster = require("discord-hybrid-sharding");

const manager = new Cluster.Manager(`${__dirname}/src/bot.js`, {
  token: process.env.token,
})
manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn({ });