require('dotenv').config();
const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'dropdown') {
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Choose an option...')
            .addOptions([
                { label: 'Handbook', value: 'handbook', description: 'Link to the handbook' },
                { label: 'Rules', value: 'rules', description: 'Link to the rules' },
                { label: 'Uniform', value: 'uniform', description: 'Link to the uniform' },
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('Dropdown Menu')
            .setDescription('Select an option from the menu below.');

        await interaction.reply({ embeds: [embed], components: [row] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    let responseEmbed = new EmbedBuilder().setColor(0x0099ff);

    if (interaction.values[0] === 'handbook') {
        responseEmbed.setTitle('Handbook').setDescription('[Link to the Handbook](https://example.com)');
    } else if (interaction.values[0] === 'rules') {
        responseEmbed.setTitle('Rules').setDescription('Please check the #rules channel!');
    } else if (interaction.values[0] === 'uniform') {
        responseEmbed.setTitle('Uniform').setDescription('[Uniform Link](https://example.com)');
    }

    await interaction.reply({ embeds: [responseEmbed], ephemeral: true });
});

client.login(process.env.TOKEN);
