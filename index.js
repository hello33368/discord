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

    if (interaction.commandName === 'mymenu') {
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Choose an option...')
            .addOptions([
                { label: 'Option 1', value: 'option_1', description: 'This is the first option' },
                { label: 'Option 2', value: 'option_2', description: 'This is the second option' }
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

    if (interaction.values[0] === 'option_1') {
        responseEmbed.setTitle('You chose Option 1').setDescription('This is the first option.');
    } else if (interaction.values[0] === 'option_2') {
        responseEmbed.setTitle('You chose Option 2').setDescription('This is the second option.');
    }

    await interaction.reply({ embeds: [responseEmbed], ephemeral: true });
});

client.login(process.env.TOKEN);
