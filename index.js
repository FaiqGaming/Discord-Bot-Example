//IMPORTING MODULES...
const Discord = require("discord.js"); 
const chalk = require("chalk"); 
const config = require("./config.json");

var bot = new Discord.Client(); //Variable to Discord.Client();

bot.on("ready", () => { //Ready Event
    //Actually, i can't say anything to this code xd
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

bot.on("message", async message => { //message event
    var PREFIX = config.prefix //Get the prefix from config.json

    var args = message.content.substring(PREFIX.length).split(" "); //args...

    if (!message.content.startsWith(PREFIX)) return; //If the message doesn't start with prefix, it will be ignored

    var command = args[0].toString(); //hmmmmm

    var cmd = command.toLocaleLowerCase(); //variable to command that users type

    var sender = { //just a shortcut to message.author and message.member...
        user: message.author,
        member: message.member
    }
    try { //BEGINS CODE OF COMMANDS
        if (cmd === 'ping') { //PING PONG!
            var start = message.createdTimestamp;
            message.channel.send("Pong!").then(m => {
                var latency = Date.now() - start

                m.edit(`Pong! | ${latency}ms`)
            });
            return;
        }
        if (cmd === 'beep') { //BEEP BOOP!
            message.channel.send("boop")
            return;
        }
        if (cmd === 'hello') { //HELLO THERE
            message.channel.send("hi")
            return;
        }
        if (cmd === 'avatar') { //SIMPLE AVATAR COMMAND (with embed)
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
        console.error(err); //catching error
    } finally {
        console.log(`${message.author.tag} is using ${cmd} command`); //....
    }
});

bot.login(config.token); //TOKEN IS A SECRET THING!
// PLEASE AND PLEASE DO NOT SHARE YOUR TOKEN.

//END OF CODE.