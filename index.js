require('dotenv').config(); // This ensures the environment variables are loaded
const { Client, GatewayIntentBits, ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

// Listening for pinging with the word "dropdown" in messages
client.on('messageCreate', async (message) => {
    // Check if the bot is pinged and the message contains "dropdown"
    if (message.mentions.has(client.user)) {
        const selectMenu = new StringSelectMenuBuilder()
            .setCustomId('select')
            .setPlaceholder('Choose an option...')
            .addOptions([
                { label: 'Handbook', value: 'handbook', description: 'Link to the handbook' },
                { label: 'Rules', value: 'rules', description: 'Rules Channel' },
                { label: 'Uniform', value: 'uniform', description: 'Link to the uniform' },
                { label: 'Vehicle Restrictions', value: 'vehicle', description: 'Information on vehicle restrictions' }, // Added dropdown for Vehicle Restrictions
            ]);

        const row = new ActionRowBuilder().addComponents(selectMenu);

        const embed = new EmbedBuilder()
            .setColor(129936)
            .setTitle('**Information**') // Title remains the same
            .setDescription('Welcome to TLM! Make sure you read the Handbook, buy and wear the uniform, and check the rules before joining any deployments!');

        // Send the embed and dropdown as a new message
        await message.channel.send({ embeds: [embed], components: [row] });
    }
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isStringSelectMenu()) return;

    let responseEmbed = new EmbedBuilder().setColor(129936);

    if (interaction.values[0] === 'handbook') {
        responseEmbed.setTitle('**Handbook**').setDescription('[Link to the Handbook](https://docs.google.com/document/d/1x1ZR0G78dNa6oEx7GdflsLD3ZLzrwojEjmuDPP9a2B4/edit?usp=sharing)');
    } else if (interaction.values[0] === 'rules') {
        responseEmbed.setTitle('Rules').setDescription('Please check the <#1333039858473500743> channel for the rules!');
    } else if (interaction.values[0] === 'uniform') {
        responseEmbed.setTitle('**Uniform**').setDescription('[Uniform Link](https://www.roblox.com/catalog/85787972042536/TLM-Shirt)');
    } else if (interaction.values[0] === 'vehicle') { // New condition for Vehicle Restrictions
        responseEmbed.setTitle('**Vehicle Restrictions**').setDescription(
            '🟢: *Allowed*  🟡: *Only With Permission*\n\n**Vehicles**:\n' +
            '**2018 Bullhorn Pueblo**: 🟢\n' +
            '**2022 Falcon Traveller**: 🟢\n' +
            '**2020 Overland Apache SFP**: 🟢\n' +
            '**2024 Falcon Advance Bolt**: 🟢\n' +
            '**2022 Falcon Advance**: 🟢\n' +
            '**2020 Leland Vault**: 🟢\n' +
            '**2021 Falcon Rampage Bigfoot 2-Door**: 🟢\n' +
            '**2021 Falcon Rampage Beast**: 🟢\n\n' +
            '**2022 Bullhorn SFP Fury**: 🟡\n' +
            '**2020 Bullhorn Prancer Widebody**: 🟡\n' +
            '**2024 Celestial Truckatron**: 🟡\n\n' +
            '**Vehicle Accessories**:\n' +
            'Vehicle Colors: **Only MOSS**\n' +
            'Rim Color: **Only FOSSIL**'
        );
    }

    await interaction.reply({ embeds: [responseEmbed], ephemeral: true });
});

// The bot will automatically use the token from the .env file
client.login(process.env.TOKEN);
