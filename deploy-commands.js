const { SlashCommandBuilder } = require('discord.js');

module.exports.deployCommands = async (client) => {
    const commands = [
        new SlashCommandBuilder().setName('dropdown').setDescription('Display a dropdown menu with options')
    ]
    .map(command => command.toJSON());

    await client.application.commands.set(commands);
    console.log('Commands deployed!');
};
