const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

module.exports = (client) => {
    const commands = [];
    const commandFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

    // Read all the command files from the 'commands' folder
    for (const file of commandFiles) {
        const command = require(path.join(__dirname, 'commands', file));
        commands.push(command.data.toJSON());
    }

    // Deploy commands to Discord
    client.once('ready', async () => {
        try {
            console.log('Started refreshing application (/) commands.');

            // This is the right place to deploy commands to the specific guild
            await client.guilds.cache.get(guildId).commands.set(commands);

            console.log('Successfully reloaded application (/) commands.');
        } catch (error) {
            console.error(error);
        }
    });
};
