const { SlashCommandBuilder } = require('discord.js');

// Bot ID and Server ID directly included
const botId = '1350787557134176266';  // Replace with your actual bot ID
const serverId = '1332833538587885618';  // Replace with your actual server ID

module.exports = {
    deployCommands: async (client) => {
        const commands = [
            new SlashCommandBuilder().setName('dropdown').setDescription('Display a dropdown menu with options'),
            new SlashCommandBuilder().setName('deploymentvote').setDescription('Starts a deployment vote requiring a certain number of votes')
                .addIntegerOption(option => 
                    option.setName('votes')
                        .setDescription('Number of votes required to approve the deployment')
                        .setRequired(true)
                )
        ]
        .map(command => command.toJSON());

        try {
            await client.application.commands.set(commands, serverId);
            console.log('Successfully registered application commands.');
        } catch (error) {
            console.error('Error deploying commands:', error);
        }
    }
};
