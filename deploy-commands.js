require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = 'YOUR_CLIENT_ID';  // Replace with your bot's client ID
const guildId = 'YOUR_GUILD_ID';    // Replace with your guild/server ID

const commands = [
    new SlashCommandBuilder().setName('dropdown').setDescription('Opens a dropdown menu with options!')
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
