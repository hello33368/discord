require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

// Replace with your bot's Client ID and Guild ID
const clientId = '1350787557134176266'; // Your bot's client ID
const guildId = '1332833538587885618'; // Your server's (guild's) ID

const commands = [
    new SlashCommandBuilder().setName('dropdown').setDescription('Shows a dropdown with various options!')
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        // Registering the command with the correct Client ID and Guild ID
        await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();
