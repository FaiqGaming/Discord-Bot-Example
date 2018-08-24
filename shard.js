const { ShardingManager } = require('discord.js'); //IMPORT MODULES
const config = require("./config.json");

const shards = new ShardingManager('./aoyama-nanami-bot.js', {
    token: config.token,
    totalShards: config.totalShards
});

shards.on('launch', shard => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${shard.id}`);
});

shards.on('message', (shard, msg) => {
    console.log(`[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${msg._eval} | ${msg._result}`);
});

shards.spawn();