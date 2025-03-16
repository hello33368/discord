require('dotenv').config();
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const clientId = '1350787557134176266';  // Replace with your bot's client ID
const guildId = '1332833538587885618';    // Replace with your guild/server ID

const commands = [
    new SlashCommandBuilder().setName('mymenu').setDescription('Opens a dropdown menu!'),
    // Add other commands here if needed
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
