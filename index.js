require('dotenv').config();
const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    // Check if it's a slash command
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'dropdown') {
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Choose an option...')
            .addOptions([
                {
                    label: 'Handbook',
                    value: 'handbook',
                    description: 'View the handbook'
                },
                {
                    label: 'Rules',
                    value: 'rules',
                    description: 'View the rules channel'
                },
                {
                    label: 'Uniform',
                    value: 'uniform',
                    description: 'View the uniform link'
                }
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
        // Send a private message with the Google Docs link
        await interaction.user.send('Here is the link to the handbook: https://docs.google.com/your-handbook-link');
        responseEmbed.setTitle('Handbook').setDescription('I sent you the handbook link in DMs.');
    } else if (interaction.values[0] === 'rules') {
        // Mention the rules channel
        responseEmbed.setTitle('Rules').setDescription('You can view the rules in the #rules channel.');
        await interaction.reply({ embeds: [responseEmbed], ephemeral: true });
    } else if (interaction.values[0] === 'uniform') {
        // Send a private message with the uniform link
        await interaction.user.send('Here is the link to the uniform: https://your-uniform-link');
        responseEmbed.setTitle('Uniform').setDescription('I sent you the uniform link in DMs.');
    }

    await interaction.reply({ embeds: [responseEmbed], ephemeral: true });
});

client.login(process.env.TOKEN);
