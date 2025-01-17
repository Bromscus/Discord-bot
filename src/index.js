const { Client, IntentsBitField } = require("discord.js");
require('dotenv').config()
const gifs = require('./gifs.json');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
});


client.on('ready', (c) => {
    console.log(`${c.user.tag} is online!`);
});


const commandHandlers = {
    ping: (message) => message.reply("pong"),
    test: (message) => message.channel.send("yes"),
    sigma: (message) => {
        if (gifs.notSigma) {
            message.channel.send(gifs.notSigma);
        }
    }
};


client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const command = message.content.toLowerCase();

    if (commandHandlers[command]) {
        commandHandlers[command](message);
    }
    

    if(message.content.toLowerCase().includes('nigga')){
        message.delete()
        message.channel.send(`${message.author.tag} said `+ message.content)
        
    }
    if(message.content.toLowerCase().includes('delete messages')){
        
        const regex = /[^0-9]/gi;
        const numbers = (message.content.replaceAll(regex, ''));
        const num = parseInt(numbers,10);
        message.channel.bulkDelete(num)
        .then(deletedMessages => {
            message.channel.send('sucessfully deleted '+num+" message(s)");
        })
    }
    
});

client.login(process.env.TOKEN)