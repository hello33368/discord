require('dotenv').config();
const { Client, GatewayIntentBits, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'dropdown') {
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('Choose an Option')
            .setDescription('Select an option from the dropdown below.');

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('menu')
                .setPlaceholder('Select an option...')
                .addOptions([
                    { label: 'Option 1', value: 'option_1' },
                    { label: 'Option 2', value: 'option_2' },
                    { label: 'Option 3', value: 'option_3' }
                ])
        );

        await interaction.reply({ embeds: [embed], components: [row] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    const selected = interaction.values[0];

    if (selected === 'option_1') {
        await interaction.reply('You selected Option 1!');
    } else if (selected === 'option_2') {
        await interaction.reply('You selected Option 2!');
    } else if (selected === 'option_3') {
        await interaction.reply('You selected Option 3!');
    }
});

client.login(process.env.TOKEN);
