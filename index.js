require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
	
});

client.on('messageCreate', (message) => {
    if (message.author.bot) return; // Ignore bot messages

    if (message.content === '!ping') {
        message.reply('Pong!');
    }
});


client.login(process.env.TOKEN);
