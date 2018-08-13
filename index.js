const Discord = require("discord.js");
const chalk = require("chalk");
const config = require("./config.json");

var bot = new Discord.Client();

bot.on("ready", () => {
    var statusType = config.statusType.toString().toLocaleUpperCase();
    if (!statusType) {
        console.warn(chalk.bold.yellow("WARN :") + ' Status type has not been set, automatically using "PLAYING" status type');
        statusType = "PLAYING"
    } else {
        var statues = ['PLAYING', 'WATCHING', 'LISTENING', 'STREAMING'];
        if (!statues.includes(statusType)) {
            console.warn(chalk.bold.yellow("WARN :") + ` "${statusType}" is not valid status type, automatically using "PLAYING" status type`);
            statusType = "PLAYING"
        }
    }
    console.log(`Logged in as : ${bot.user.tag} with ID : ${bot.user.id}`);
    console.log("Yo! I'm ready!");
    bot.user.setActivity(config.playingStatus, {
        type: statusType
    });
    console.log(`--------------CONFIG--------------\nLogged in as : ${bot.user.tag}\nPrefix : ${config.prefix}\nPlaying status : ${config.playingStatus}\nStatus type : ${statusType}\n----------------------------------`)
});

bot.on("message", async message => {
    var PREFIX = config.prefix

    var args = message.content.substring(PREFIX.length).split(" ");

    if (!message.content.startsWith(PREFIX)) return;

    var command = args[0].toString();

    var cmd = command.toLocaleLowerCase();

    var sender = {
        user: message.author,
        member: message.member
    }
    try {
        if (cmd === 'ping') {
            var start = message.createdTimestamp;
            message.channel.send("Pong!").then(m => {
                var latency = Date.now() - start

                m.edit(`Pong! | ${latency}ms`)
            });
            return;
        }
        if (cmd === 'beep') {
            message.channel.send("boop")
            return;
        }
        if (cmd === 'hello') {
            message.channel.send("hi")
            return;
        }
        if (cmd === 'avatar') {
            var member = message.mentions.members.first() || message.guild.members.get(args[1]);
            if (!member) {
                var embed = new Discord.RichEmbed()
                    .setAuthor(`${sender.user.tag} avatar`)
                    .setImage(message.author.displayAvatarURL)
                    .setFooter(`Requested by : ${sender.user.tag}`)
                    .setColor('GOLD')
                message.channel.send(embed);
            } else {
                var embed = new Discord.RichEmbed()
                    .setAuthor(`${member.user.tag} avatar`)
                    .setImage(member.user.displayAvatarURL)
                    .setFooter(`Requested by : ${sender.user.tag}`)
                    .setColor('GOLD')
                message.channel.send(embed);
            }
            return;
        }
    } catch (err) {
        console.error(err);
    } finally {
        console.log(`${message.author.tag} is using ${cmd} command`);
    }
});

bot.login(config.token); //TOKEN IS A SECRET THING!